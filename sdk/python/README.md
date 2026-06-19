# ratelock (Python)

Drop-in rate limiting for Python backends, powered by [RateLock](../../README.md). Redis-backed sliding windows, dashboard, and alerts — without running your own gateway.

## Install

```bash
pip install ratelock          # raw client only
pip install "ratelock[fastapi]"   # + FastAPI / Starlette middleware
```

## FastAPI / Starlette

```python
from fastapi import FastAPI
from ratelock import RateLimiter

app = FastAPI()
app.add_middleware(RateLimiter, api_key="YOUR_PROJECT_API_KEY")
```

Self-hosting? Point it at your own deployment:

```python
app.add_middleware(
    RateLimiter,
    api_key="YOUR_PROJECT_API_KEY",
    service_url="http://localhost:4000",
)
```

Blocked requests get a `429` with `X-RateLimit-*` and `Retry-After` headers; allowed
requests pass through with the same headers attached.

## Any framework (raw client)

```python
from ratelock import RateLockClient

client = RateLockClient(api_key="YOUR_PROJECT_API_KEY", service_url="http://localhost:4000")

result = client.check(endpoint="/api/search", method="GET", ip="203.0.113.1")
if not result.allowed:
    raise Exception(f"Rate limited, retry after {result.retry_after}s")

# async variant
result = await client.acheck(endpoint="/api/search", method="GET", ip="203.0.113.1")
```

## Options

| Option        | Default                    | Description                                            |
| ------------- | -------------------------- | ------------------------------------------------------ |
| `api_key`     | — (required)               | Your project API key from the RateLock dashboard.      |
| `service_url` | `https://api.ratelock.com` | Base URL of your RateLock control plane.               |
| `fail_open`   | `True`                     | Allow traffic if RateLock is unreachable.              |
| `timeout`     | `1.5`                      | Per-request timeout in seconds.                        |
| `endpoint`    | request path               | Callable `(request) -> str` to override rule matching. |
| `identify`    | client IP                  | Callable `(request) -> str` to override the limit key. |
