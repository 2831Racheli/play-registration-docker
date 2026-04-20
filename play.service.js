const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * פונקציה לרישום משתמש למפגש (Play)
 * @param {number} userId - מזהה המשתמש
 * @param {number} playId - מזהה הפעילות
 */
async function joinPlay(userId, playId) {
    // 1. בדיקה שהפעילות קיימת ושהסטטוס שלה הוא Waiting
    const play = await prisma.play.findUnique({
        where: { id: playId }
    });

    if (!play) {
        throw new Error("Play session not found"); 
    }

    if (play.status !== 'Waiting') {
        throw new Error("Cannot join: Session has already started or finished"); //
    }

    // 2. בדיקה שהמשתמש עדיין לא רשום
    const existingParticipant = await prisma.playParticipant.findUnique({
        where: {
            userId_playId: { userId, playId }
        }
    });

    if (existingParticipant) {
        throw new Error("User is already registered for this session"); //
    }

    // 3. רישום המשתמש לטבלת PlayParticipant בתפקיד Player
    return await prisma.playParticipant.create({
        data: {
            userId: userId,
            playId: playId,
            role: 'Player' //
        }
    });
}

module.exports = { joinPlay };
