# @ratelock/express

Drop-in rate limiting middleware for Express, powered by [RateLock](../../README.md). Two lines and any Express endpoint is protected — Redis-backed sliding windows, dashboard, and alerts included.

## Install

```bash
npm install @ratelock/express
```

## Usage

```ts
import express from "express";
import { rateLimiter } from "@ratelock/express";

const app = express();

// protect every route with the rules configured for this project
app.use(rateLimiter({ apiKey: process.env.RATELOCK_KEY! }));

app.get("/api/search", (req, res) => res.json({ ok: true }));
app.listen(3000);
```

Apply it to a subset of routes just like any middleware:

```ts
app.use("/api/auth", rateLimiter({ apiKey: process.env.RATELOCK_KEY! }));
```

## Options

| Option       | Type                      | Default                      | Description                                                        |
| ------------ | ------------------------- | ---------------------------- | ------------------------------------------------------------------ |
| `apiKey`     | `string` (required)       | —                            | Your project API key from the RateLock dashboard.                  |
| `serviceUrl` | `string`                  | `https://api.ratelock.com`   | Base URL of your RateLock control plane (self-hosted? point here). |
| `failOpen`   | `boolean`                 | `true`                       | Allow traffic through if RateLock is unreachable.                  |
| `timeoutMs`  | `number`                  | `1500`                       | Abort the check after this many ms.                                |
| `endpoint`   | `(req) => string`         | request path                 | Override the endpoint string used for rule matching.              |
| `identify`   | `(req) => string`         | client IP / X-Forwarded-For  | Override the client identifier used for the limit window.          |

When a request is blocked the middleware responds with `429` and the body returned
by the control plane, and always mirrors the `X-RateLimit-Limit`,
`X-RateLimit-Remaining`, `X-RateLimit-Reset` and `Retry-After` headers.

## Self-hosting

Running RateLock yourself? Point the SDK at your own deployment:

```ts
app.use(rateLimiter({
  apiKey: process.env.RATELOCK_KEY!,
  serviceUrl: "http://localhost:4000", // or your nginx host
}));
```

## Build (from source)

```bash
npm install
npm run build   # emits dist/
```
