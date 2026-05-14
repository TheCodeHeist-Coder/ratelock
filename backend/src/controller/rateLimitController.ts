import { type Request, type Response } from "express"
import { errorResponse } from "../utils/errot.js";
import { prisma } from "../lib/prisma.js";
import { checkRateLimit, logEvent } from "../services/rateLimitService.js";
import { error } from "node:console";

export const rateLimitCheckController = async (req: Request, res: Response) => {
    try {

        const start = Date.now();


        const apiKey = (req.headers['x-rl-key'] as string) ?? req.body.api_key;
        const endpoint = (req.headers['x-rl-endpoint'] as string) ?? req.body?.endpoint ?? '/';
        const method = (req.headers['x-rl-method'] as string) ?? req.body?.method ?? 'GET';

        const clientIp = (req.headers['x-rl-ip'] as string) ?? (req.headers['x-forwarded-for'] as string) ?? req.socket.remoteAddress ?? 'unknown';

        if (!apiKey) return errorResponse(res, 400, 'Api key is missing....');

        // resolve project from API key
        const project = await prisma.project.findUnique({
            where: { apiKey },
            select: { id: true }
        });

        if (!project) return errorResponse(res, 401, 'Invalid API Key');

        const result = await checkRateLimit(project.id, apiKey, endpoint);
        const latencyMs = Date.now() - start;

        // async log - never awaited
        logEvent({
            projectId: project.id,
            apiKeyUsed: apiKey,
            endpoint,
            method,
            allowed: result.allowed,
            ipAddress: clientIp,
            userAgent: req.headers["user-agent"]!,
            latencyMs,
        });


        // standard rate-limit response headers
        res.set({
            'x-RateLimit-Limit': String(result.limit),
            'X-RateLimit-Remaining': String(result.remaining),
            'X-RateLimit-Reset': String(result.reset),
            ...(result.retryAfter ? { 'Retry-After': String(result.retryAfter) } : {}),
        });


        if (!result.allowed) {
            return res.status(429).json({
                alloewed: false,
                error: 'Rate limit exceeded',
                limit: result.limit,
                remaining: 0,
                reset: result.reset,
                retry_after: result.retryAfter
            });
        }

        return res.json({
            allowed: true,
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset,
        });

    } catch (error) {
        console.log('error in ratelimiting', error);
        errorResponse(res, 500, 'Internal Server Error');
    }
}