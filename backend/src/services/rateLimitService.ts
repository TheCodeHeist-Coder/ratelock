import { prisma } from "../lib/prisma.js";
import { redis, SLIDING_WINDOW_SCRIPT } from "../config/redis.js";
import type { Rule } from "@prisma/client";
import {v4 as uuidv4} from 'uuid'



//! caching of rules related to a project
const ruleCache = new Map<string, { rules: Rule[]; cachedAt: number }>();

const RULE_CACHE_TTL_MS = 30_000;


export const getRulesForProject = async (projectId: string) => {
    const entry = ruleCache.get(projectId);

    if (entry && Date.now() - entry.cachedAt < RULE_CACHE_TTL_MS) {
        return entry.rules;
    };


    const rules = await prisma.rule.findMany({
        where: {
            projectId, isActive: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    ruleCache.set(projectId, { rules, cachedAt: Date.now() });
    return rules;

}

//! invalidate or delete the cache rules
export const invalidateRuleCache = (projectId: string) => {
    ruleCache.delete(projectId);
}



// ! for mathing endpoints
const matchEndpoint = (pattern: string, endpoint: string) => {

    if(pattern === '*') return true;
    if(pattern === endpoint) return true;
    if(pattern.endsWith('*')) return endpoint.startsWith(pattern.slice(0, -1));
    return false

}



//! rate limiting checking
export const checkRateLimit = async(projectId: string, apiKey: string, endpoint: string) => {

    const rules = await getRulesForProject(projectId);

    // most specific mathcing rule wins (longest non-wildcard prefix first)
    const sorted = [...rules].sort((a, b) => {
        const aWild = a.endpointPattern.endsWith('*') ? 0 : 1;
        const bWild = b.endpointPattern.endsWith('*') ? 0 : 1;
        return bWild - aWild || b.endpointPattern.length - a.endpointPattern.length;
    });

    const matchingRule = sorted.find((r) => matchEndpoint(r.endpointPattern, endpoint));

    if(!matchingRule) {
        // no rule, allow by default
        return {allowed: true, limit: -1, remaining: -1, reset: 0};
    }

    const now = Date.now();
    const key = `rl:${apiKey}:${matchingRule.id}`;
    const requestId = `${now} - ${uuidv4()}`;


    try {
        const result = (await redis.eval(
            SLIDING_WINDOW_SCRIPT,
            1,
            key,
            String(now),
            String(matchingRule.windowSeconds),
            String(matchingRule.limitCount),
            requestId
        )) as number[];

        const [allowed, limit, remaining, resetOrRetry] = result;

        return {
            allowed: allowed === 1,
            limit,
            remaining: Math.max(0, remaining!),
            reset: allowed === 1 ? resetOrRetry : Math.floor(Date.now() / 1000) + resetOrRetry!,
            retryAfter: allowed === 0 ? resetOrRetry: undefined,
        };

    } catch (error) {
        console.log('Rate limit engine error: ', error);
        return {
            allowed: true,
            limit: matchingRule.limitCount,
            remaining: 0,
            reset: 0
        };
    }

}



// event logger (fire and forget, never blocks the hot path)
export function logEvent(params: {
    projectId: string;
    apiKeyUsed: string;
    endpoint: string;
    method: string;
    allowed: boolean;
    ipAddress?: string;
    userAgent?: string;
    latencyMs?: number
}): void {
    prisma.event.create({
        data: {
            projectId: params.projectId,
            apiKeyUsed: params.apiKeyUsed,
            endpoint: params.endpoint,
            method: params.method,
            allowed: params.allowed,
            ipAddress: params.ipAddress ?? null,
            userAgent: params.userAgent ?? null,
            latencyMs: params.latencyMs ?? null
        }
    }).catch((error) => {
        console.log("Event logging error", error);
    })
}