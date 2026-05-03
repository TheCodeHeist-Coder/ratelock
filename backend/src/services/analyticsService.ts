import { count } from "node:console";
import {prisma} from "../lib/prisma.js"
import { errorResponse } from "../utils/errot.js";
import { type Response } from "express";

export async function getDashboardStates(projectId: string, hours: number = 24) {

const since = new Date(Date.now() - hours * 60 * 60 * 1000);

const where = {projectId, timestamp: {gte: since}};

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
        orderBy: {_count: {endpoint: 'desc'}},
        take: 10
    });


    // for each endpoint get blocked count separatly
    const  topEndPoints = await Promise.all(
        endpointGroups.map(async(group) => {
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


    








}




