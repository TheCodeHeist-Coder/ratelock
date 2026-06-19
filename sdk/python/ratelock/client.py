"""HTTP client for the RateLock hot-path check endpoint (POST /api/rl/check)."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

import httpx

DEFAULT_SERVICE_URL = "https://api.ratelock.com"


@dataclass
class RateLimitResult:
    allowed: bool
    limit: int
    remaining: int
    reset: int
    retry_after: Optional[int] = None


class RateLockClient:
    """Calls the RateLock control plane to check a single request.

    Fails open by default — if the service is unreachable the request is
    allowed, so RateLock being down never takes your API down.
    """

    def __init__(
        self,
        api_key: str,
        service_url: str = DEFAULT_SERVICE_URL,
        timeout: float = 1.5,
        fail_open: bool = True,
    ) -> None:
        if not api_key:
            raise ValueError("ratelock: api_key is required")
        self.api_key = api_key
        self.service_url = service_url.rstrip("/")
        self.timeout = timeout
        self.fail_open = fail_open

    # --- internal helpers -------------------------------------------------

    @property
    def _url(self) -> str:
        return f"{self.service_url}/api/rl/check"

    def _headers(self, endpoint: str, method: str, ip: str) -> dict:
        return {
            "X-RL-Key": self.api_key,
            "X-RL-Endpoint": endpoint or "/",
            "X-RL-Method": method or "GET",
            "X-RL-IP": ip or "unknown",
            "Content-Type": "application/json",
        }

    def _parse(self, resp: httpx.Response) -> RateLimitResult:
        data = {}
        try:
            data = resp.json()
        except Exception:
            pass
        allowed = resp.status_code != 429 and resp.status_code < 400
        return RateLimitResult(
            allowed=bool(data.get("allowed", allowed)),
            limit=int(data.get("limit", resp.headers.get("X-RateLimit-Limit", -1) or -1)),
            remaining=int(data.get("remaining", resp.headers.get("X-RateLimit-Remaining", 0) or 0)),
            reset=int(data.get("reset", resp.headers.get("X-RateLimit-Reset", 0) or 0)),
            retry_after=(
                int(data["retry_after"]) if data.get("retry_after") is not None
                else (int(resp.headers["Retry-After"]) if resp.headers.get("Retry-After") else None)
            ),
        )

    def _allow(self) -> RateLimitResult:
        return RateLimitResult(allowed=True, limit=-1, remaining=-1, reset=0)

    # --- sync -------------------------------------------------------------

    def check(self, endpoint: str, method: str = "GET", ip: str = "unknown") -> RateLimitResult:
        try:
            with httpx.Client(timeout=self.timeout) as client:
                resp = client.post(self._url, headers=self._headers(endpoint, method, ip))
            return self._parse(resp)
        except Exception:
            if self.fail_open:
                return self._allow()
            raise

    # --- async ------------------------------------------------------------

    async def acheck(self, endpoint: str, method: str = "GET", ip: str = "unknown") -> RateLimitResult:
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                resp = await client.post(self._url, headers=self._headers(endpoint, method, ip))
            return self._parse(resp)
        except Exception:
            if self.fail_open:
                return self._allow()
            raise


class RateLimitExceeded(Exception):
    """Raised by helpers that prefer exceptions over result objects."""

    def __init__(self, result: RateLimitResult) -> None:
        self.result = result
        super().__init__("Rate limit exceeded")
