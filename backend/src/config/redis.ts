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