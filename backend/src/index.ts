import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.js";
import { prisma } from "./lib/prisma.js";
import { redis } from "./config/redis.js";

const PORT = process.env.PORT || 3000;

async function AllisWell() {

    try {
        await prisma.$connect();
        console.log('Connected to Postgres');

        // redis uses lazyConnect — open the connection explicitly on boot
        await redis.connect();

        app.listen(PORT, () => {
            console.log(`SRVR is still alive at port ${PORT}`);
        })
    } catch (error) {
        console.log('error in starting server:', error);
        process.exit(1);
    }

}

AllisWell();


//! garcefully shutting down the server
async function shutdown(signal: string) {
    console.log(`Shutting down due to ${signal}`);

    try {
        await redis.quit();
    } catch {
        // ignore — connection may already be closed
    }
    await prisma.$disconnect();
    process.exit(0);

}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));  