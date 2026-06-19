"""RateLock — drop-in rate limiting for Python backends.

    from ratelock import RateLimiter
    app.add_middleware(RateLimiter, api_key="YOUR_PROJECT_API_KEY")

The raw client (``RateLockClient``) works without Starlette/FastAPI installed;
``RateLimiter`` (the ASGI middleware) requires Starlette.
"""
from .client import RateLockClient, RateLimitResult, RateLimitExceeded

__all__ = ["RateLockClient", "RateLimitResult", "RateLimitExceeded"]

try:
    from .middleware import RateLimiter  # noqa: F401

    __all__.append("RateLimiter")
except ImportError:  # Starlette not installed — middleware unavailable
    RateLimiter = None  # type: ignore

__version__ = "0.1.0"
