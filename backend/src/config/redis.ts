import {Redis} from "ioredis";


const redisConfig = {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 3,
    lazyConnect: true,

    retryStrategy(times: number) {
        if (times > 10) return null;
        return Math.min(times * 200, 2000);
    }
}


export const redis = new Redis(redisConfig);

redis.on('error', (error) => {
    console.error('Redis error:', error);
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});


export const SLIDING_WINDOW_SCRIPT = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local window = tonumber(ARGV[3])
local request_id = ARGV[4]

-- remove expired entries
redis.call('ZREMRANGEBYSCORE', key, 0, now - window * 1000)

-- count current window
local count = redis.call('ZCARD', key)

if count >= limit then
  -- get oldest entry to compute retyr-after
    local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
    local retry_after = 0
    if oldest and #oldest > 0 then
        retry_after = math.ceil((tonumber(oldest[2]) + window * 1000 - now) / 1000)
    end
    return {0, limit, 0, retry_after}
end


-- add current request

redis.call('ZADD', key, now, request_id)
redis.call('PEXPIRE', key, window * 1000)

local remaining = limit - count - 1

local reset = math.ceil((now + window * 1000) / 1000)

return {1, limit, remaining, reset}
`;

export const SLIDING_WINDOW_SHA = 'sliding_window_v1';