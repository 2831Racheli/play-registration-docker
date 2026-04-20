const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * פונקציה לרישום משתמש למשחק
 * @param {number} userId - מזהה המשתמש
 * @param {number} gameId - מזהה המשחק
 */
async function joinGame(userId, gameId) {
    // 1. בדיקה שהמשחק קיים ושהסטטוס שלו הוא Waiting
    const game = await prisma.game.findUnique({
        where: { id: gameId }
    });

    if (!game) {
        throw new Error("Game not found"); // 
    }

    if (game.status !== 'Waiting') {
        throw new Error("Cannot join: Game has already started or finished"); // [cite: 20, 23]
    }

    // 2. בדיקה שהמשתמש עדיין לא רשום למשחק זה
    const existingParticipant = await prisma.gameParticipant.findUnique({
        where: {
            userId_gameId: { userId, gameId }
        }
    });

    if (existingParticipant) {
        throw new Error("User is already registered for this game"); // [cite: 21, 23]
    }

    // 3. רישום המשתמש לטבלת GameParticipant בתפקיד Player
    return await prisma.gameParticipant.create({
        data: {
            userId: userId,
            gameId: gameId,
            role: 'Player' // [cite: 22]
        }
    });
}

module.exports = { joinGame };