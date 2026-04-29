import { prisma } from "../lib/prisma.js";
import { redis } from "../config/redis.js";
import type { Rule } from "@prisma/client";



//! caching of rules related to a project
const ruleCache = new Map<string, {rules: Rule[]; cachedAt: number}>();

const RULE_CACHE_TTL_MS = 30_000;


export const getRulesForProject = async(projectId: string) => {
    const entry = ruleCache.get(projectId);

    if(entry && Date.now() - entry.cachedAt < RULE_CACHE_TTL_MS) {
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

    ruleCache.set(projectId, {rules, cachedAt: Date.now()});
    return rules;

}