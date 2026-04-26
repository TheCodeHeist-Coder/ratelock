import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 3000;

async function AllisWell() {

    try {
        await prisma.$connect();
        //? Redis server starting

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

    // redis disconnest

    await prisma.$disconnect();
    process.exit(0);

}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));  