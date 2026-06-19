/**
 * @ratelock/express — drop-in rate limiting middleware for Express.
 *
 *   import { rateLimiter } from "@ratelock/express";
 *   app.use(rateLimiter({ apiKey: process.env.RATELOCK_KEY! }));
 *
 * The middleware calls your RateLock control plane's hot-path endpoint
 * (POST /api/rl/check) on every request and short-circuits with a 429 when a
 * matching rule is exceeded. It mirrors the standard X-RateLimit-* headers
 * back onto the response.
 */

// Minimal structural types so this package compiles without depending on
// @types/express. Real Express req/res/next satisfy these at runtime.
export interface RLRequest {
  method: string;
  path?: string;
  originalUrl?: string;
  url?: string;
  ip?: string;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

export interface RLResponse {
  setHeader(name: string, value: string): void;
  status(code: number): RLResponse;
  json(body: unknown): unknown;
}

export type RLNext = (err?: unknown) => void;

export interface RateLimiterOptions {
  /** Your project API key from the RateLock dashboard. */
  apiKey: string;
  /** Base URL of your RateLock control plane. Defaults to https://api.ratelock.com */
  serviceUrl?: string;
  /**
   * If the RateLock service is unreachable, allow the request through (true)
   * or reject it with 503 (false). Defaults to true — never take your API
   * down because the limiter is down.
   */
  failOpen?: boolean;
  /** Abort the check after this many ms. Defaults to 1500. */
  timeoutMs?: number;
  /** Override how the endpoint string is derived from the request. */
  endpoint?: (req: RLRequest) => string;
  /** Override how the client IP is derived from the request. */
  identify?: (req: RLRequest) => string;
}

const DEFAULT_SERVICE_URL = "https://api.ratelock.com";

function defaultEndpoint(req: RLRequest): string {
  const raw = req.path ?? req.originalUrl ?? req.url ?? "/";
  // strip query string
  return raw.split("?")[0] || "/";
}

function defaultIdentify(req: RLRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0]!.trim();
  if (Array.isArray(fwd) && fwd.length) return fwd[0]!;
  return req.ip ?? req.socket?.remoteAddress ?? "unknown";
}

export function rateLimiter(options: RateLimiterOptions) {
  if (!options || !options.apiKey) {
    throw new Error("[@ratelock/express] `apiKey` is required");
  }

  const serviceUrl = (options.serviceUrl ?? DEFAULT_SERVICE_URL).replace(/\/$/, "");
  const failOpen = options.failOpen ?? true;
  const timeoutMs = options.timeoutMs ?? 1500;
  const resolveEndpoint = options.endpoint ?? defaultEndpoint;
  const resolveIp = options.identify ?? defaultIdentify;

  return async function rateLockMiddleware(req: RLRequest, res: RLResponse, next: RLNext) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const resp = await fetch(`${serviceUrl}/api/rl/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RL-Key": options.apiKey,
          "X-RL-Endpoint": resolveEndpoint(req),
          "X-RL-Method": req.method,
          "X-RL-IP": resolveIp(req),
        },
        signal: controller.signal,
      });

      // mirror the standard rate-limit headers onto the caller's response
      for (const h of ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset", "Retry-After"]) {
        const v = resp.headers.get(h);
        if (v != null) res.setHeader(h, v);
      }

      if (resp.status === 429) {
        const body = (await resp.json().catch(() => ({}))) as Record<string, unknown>;
        res.status(429).json({ error: "Rate limit exceeded", ...body });
        return;
      }

      // other 4xx (e.g. invalid key): surface it unless we're failing open
      if (resp.status >= 400) {
        if (failOpen) return next();
        const body = (await resp.json().catch(() => ({}))) as Record<string, unknown>;
        res.status(resp.status).json(body);
        return;
      }

      return next();
    } catch {
      // network error / timeout
      if (failOpen) return next();
      res.status(503).json({ error: "Rate limiter unavailable" });
      return;
    } finally {
      clearTimeout(timer);
    }
  };
}

export default rateLimiter;
