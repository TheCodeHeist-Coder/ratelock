import { count } from "node:console";
import { prisma } from "../lib/prisma.js"
import { errorResponse } from "../utils/errot.js";
import { type Response } from "express";

export async function getDashboardStates(projectId: string, hours: number = 24) {

    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    const where = { projectId, timestamp: { gte: since } };

    // total -> coutn, allowed, blocked, avg latency
    const [total, allowed, blocked, latencyAgg] = await Promise.all([

        prisma.event.count({ where }),


        prisma.event.count({
            where: {
                ...where,
                allowed: true
            }
        }),

        prisma.event.count({
            where: {
                ...where,
                allowed: false
            }
        }),

        prisma.event.aggregate({
            where,
            _avg: {
                latencyMs: true,
            },
        }),
    ])

    // getting group by endpoint (count total + blocked)
    const endpointGroups = await prisma.event.groupBy({
        by: ['endpoint'],
        where,
        _count: {
            _all: true
        },
        orderBy: { _count: { endpoint: 'desc' } },
        take: 10
    });


    // for each endpoint get blocked count separatly
    const topEndpoints = await Promise.all(
        endpointGroups.map(async (group) => {
            const blockedCount = await prisma.event.count({
                where: {
                    ...where,
                    endpoint: group.endpoint,
                    allowed: false
                }
            });

            const cnt = group._count._all;
            return {
                endpoint: group.endpoint,
                count: cnt,
                block_rate: cnt > 0 ? Math.round((blockedCount / cnt) * 100) : 0,
            }
        })

    );



    // fetching all events then bucket by hour

    const rawEvents = await prisma.event.findMany({
        where,
        select: { allowed: true, timestamp: true },
        orderBy: { timestamp: 'asc' },
    });


    // Group into hourly buckets
    const bucketMap = new Map<string, { allowed: number; blocked: number }>();

    for (const e of rawEvents) {
        const d = new Date(e.timestamp);
        d.setMinutes(0, 0, 0); // floor to hour
        const key = d.toISOString();

        const bucket = bucketMap.get(key) ?? { allowed: 0, blocked: 0 };
        if (e.allowed) bucket.allowed += 1;
        else bucket.blocked += 1;
        bucketMap.set(key, bucket);
    }

    const requests_over_time = Array.from(bucketMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([time, bucket]) => ({ time, ...bucket }));

    return {
        total_requests: total,
        allowed_requests: allowed,
        blocked_requests: blocked,
        block_rate: total > 0 ? Math.round((blocked / total) * 1000) / 10 : 0,
        avg_latency_ms: Math.round(latencyAgg._avg.latencyMs ?? 0),
        top_endpoints: topEndpoints,
        requests_over_time,
    };
}










