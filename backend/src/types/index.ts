

//! rate-limit result
export interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number
}



//! dashboard analytics
export interface DashboardStats {
    total_requests: number;
    allowed_requests: number;
    blocked_requests: number;
    block_rate: number;
    avg_latency_ms: number;
    top_endpoints: {
        endpoint: string;
        count: number;
        block_rate: number;
    }[];
    requests_over_time: {
        time: string;
        allowed: number;
        blocked: number;
    }[];
}