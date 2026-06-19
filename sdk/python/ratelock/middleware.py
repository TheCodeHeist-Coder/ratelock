"""Starlette / FastAPI middleware for RateLock.

    from ratelock import RateLimiter
    app.add_middleware(RateLimiter, api_key="YOUR_PROJECT_API_KEY")
"""
from __future__ import annotations

from typing import Callable, Optional

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

from .client import RateLockClient, DEFAULT_SERVICE_URL


class RateLimiter(BaseHTTPMiddleware):
    def __init__(
        self,
        app,
        api_key: str,
        service_url: str = DEFAULT_SERVICE_URL,
        fail_open: bool = True,
        timeout: float = 1.5,
        endpoint: Optional[Callable[[Request], str]] = None,
        identify: Optional[Callable[[Request], str]] = None,
    ) -> None:
        super().__init__(app)
        self.client = RateLockClient(
            api_key=api_key,
            service_url=service_url,
            timeout=timeout,
            fail_open=fail_open,
        )
        self._endpoint = endpoint
        self._identify = identify

    def _resolve_endpoint(self, request: Request) -> str:
        if self._endpoint:
            return self._endpoint(request)
        return request.url.path

    def _resolve_ip(self, request: Request) -> str:
        if self._identify:
            return self._identify(request)
        fwd = request.headers.get("x-forwarded-for")
        if fwd:
            return fwd.split(",")[0].strip()
        return request.client.host if request.client else "unknown"

    async def dispatch(self, request: Request, call_next) -> Response:
        result = await self.client.acheck(
            endpoint=self._resolve_endpoint(request),
            method=request.method,
            ip=self._resolve_ip(request),
        )

        if not result.allowed:
            headers = {
                "X-RateLimit-Limit": str(result.limit),
                "X-RateLimit-Remaining": str(result.remaining),
                "X-RateLimit-Reset": str(result.reset),
            }
            if result.retry_after is not None:
                headers["Retry-After"] = str(result.retry_after)
            return JSONResponse(
                {
                    "error": "Rate limit exceeded",
                    "limit": result.limit,
                    "remaining": 0,
                    "reset": result.reset,
                    "retry_after": result.retry_after,
                },
                status_code=429,
                headers=headers,
            )

        response = await call_next(request)
        if result.limit >= 0:
            response.headers["X-RateLimit-Limit"] = str(result.limit)
            response.headers["X-RateLimit-Remaining"] = str(result.remaining)
            response.headers["X-RateLimit-Reset"] = str(result.reset)
        return response
