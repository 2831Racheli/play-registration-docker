FROM node:20

WORKDIR /usr/src/app

COPY package.json ./

# מבצע את האיתחול בתוך הסביבה המבודדת
RUN npm install && npm cache clean --force
COPY . .

# מעקף נטפרי לצורך יצירת ה-Client
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# יצירת ה-Client של Prisma
RUN ./node_modules/.bin/prisma generate

# החזרת הגדרות אבטחה
ENV NODE_TLS_REJECT_UNAUTHORIZED=1

# הרצה: דחיפת הסכימה ליצירת טבלאות ואז הרצת הקוד
CMD ["sh", "-c", "npx prisma db push && node src/main.js"]