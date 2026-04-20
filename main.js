const { PrismaClient } = require('@prisma/client');
const { joinPlay } = require('./play.service');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Connecting to database...");

        // 1. יצירת נתוני דמי (Seed)
        const user = await prisma.user.create({
            data: { username: `user_${Date.now()}` }
        });

        const play = await prisma.play.create({
            data: { status: 'Waiting' }
        });

        console.log(`Created User ID: ${user.id}, Play ID: ${play.id}`);

        // 2. קריאה לפונקציית joinPlay
        await joinPlay(user.id, play.id);

        console.log("Success: User joined play session");

    } catch (error) {
        console.error("Action failed:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
