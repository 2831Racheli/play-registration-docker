const { PrismaClient } = require('@prisma/client');
const { joinGame } = require('./play.service');

const prisma = new PrismaClient();

async function main() {
    try {
        // 1. התחברות למסד הנתונים (מתבצע אוטומטית בקריאה הראשונה)
        console.log("Connecting to database...");

        // 2. יצירת נתוני דמי (Seed)
        // יוצרים משתמש אחד
        const user = await prisma.user.create({
            data: { username: `user_${Date.now()}` } // שם ייחודי למניעת שגיאות
        });

        // יוצרים משחק אחד בסטטוס Waiting
        const game = await prisma.game.create({
            data: { status: 'Waiting' }
        });

        console.log(`Created User ID: ${user.id}, Game ID: ${game.id}`);

        // 3. קריאה לפונקציית joinGame
        await joinGame(user.id, game.id);

        // 4. הדפסת הודעת הצלחה
        console.log("Success: User joined game");

    } catch (error) {
        // הדפסת הודעת כישלון במקרה של שגיאה
        console.error("Action failed:", error.message);
    } finally {
        // ניתוק מהמסד בסיום
        await prisma.$disconnect();
    }
}

// הרצת הסקריפט
main();
