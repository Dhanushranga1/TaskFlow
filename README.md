# TaskFlow - Next.js App with Prisma & NextAuth

## Overview
TaskFlow is a task management system built using **Next.js (App Router)**, **Prisma**, **NextAuth**, and **PostgreSQL**. It supports user authentication and basic task management functionalities.

## Features
- **User Authentication** (Signup, Login) using **NextAuth.js**
- **Task Management** (Create, List)
- **Secure API Routes** with **TypeScript**
- **Database Integration** with **Prisma & PostgreSQL**
- **Modern UI** using **Tailwind CSS**

---
## Tech Stack

| Component          | Technology |
|-------------------|------------|
| Frontend         | Next.js (App Router) |
| Backend          | API Routes in Next.js |
| Database         | PostgreSQL |
| ORM             | Prisma |
| Authentication   | NextAuth.js |
| UI Framework    | Tailwind CSS |

---
## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/taskflow.git
cd taskflow
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup Database
1. Install **PostgreSQL** and start the database server.
2. Update the `.env` file with your **DATABASE_URL**:
```env
DATABASE_URL="postgresql://dhanush:zeus@localhost:5432/taskflow"
```
3. Run Prisma migrations:
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the Development Server
```sh
npm run dev
```
Your app will be running at: **http://localhost:3000**

---
## Folder Structure
```
src/
 ├── app/
 │   ├── api/
 │   │   ├── auth/
 │   │   │   ├── [...nextauth]/
 │   │   │   │   ├── route.ts  # NextAuth API
 │   │   ├── tasks/
 │   │   │   ├── create/
 │   │   │   │   ├── route.ts  # Create Task API
 │   │   │   ├── get/
 │   │   │   │   ├── route.ts  # Get Tasks API
 │   ├── components/
 │   │   ├── Login.tsx  # Authentication UI
 │   │   ├── TaskList.tsx  # Task Management UI
```

---
## API Endpoints

### **Authentication**
- `POST /api/auth/signup` → User Signup
- `POST /api/auth/signin` → User Login

### **Task Management**
- `POST /api/tasks/create` → Create Task
- `GET /api/tasks/get` → Get Tasks

---
## Next Steps
- Implement **Task Deletion & Updates**
- Add **Real-Time WebSocket Updates**
- Improve **UI with Drag-and-Drop Kanban**

---
## Contribution
Feel free to contribute by opening an issue or pull request!

---
## License
This project is **MIT Licensed**.
