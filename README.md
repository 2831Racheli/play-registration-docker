# Game Registration Docker

A containerized Node.js backend application using Prisma ORM and PostgreSQL to manage game registrations. Fully orchestrated with Docker Compose for an easy local setup.

## Technologies Used
* **Node.js** - Backend environment
* **PostgreSQL** - Relational database
* **Prisma ORM** - Database access and schema management
* **Docker & Docker Compose** - Containerization and orchestration

## Project Structure
The project demonstrates a simple user registration flow for a game. It includes:
* Checking if a game exists and is in a "Waiting" status.
* Preventing duplicate registrations.
* Assigning a default "Player" role upon successful registration.

## How to Run Locally

1. Make sure you have **Docker** and **Docker Compose** installed and running on your machine.
2. Clone this repository to your local machine.
3. Open a terminal in the root directory of the project.
4. Run the following command to build and start the containers:

   ```bash
   docker-compose up --build
What happens next?

Docker will pull the necessary images and build the Node.js environment.

The PostgreSQL database will start and wait until it's healthy.

The Node.js app will automatically push the Prisma schema to the database, create dummy data (User and Game), and execute the registration logic.

Check your terminal logs for the success message!


---

### קובץ `.gitignore`
צרי קובץ בשם `.gitignore` (שימי לב לנקודה בהתחלה) בתיקייה הראשית, והדביקי לתוכו את הטקסט הבא (הוספתי גם כמה הגדרות סטנדרטיות וחשובות לפרויקטים של Node.js):

```text
# Dependency directories
node_modules/

# Environment variables (Security)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Prisma generated files
/generated/prisma

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db