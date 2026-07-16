# TaskFlow 🚀

A modern, full-stack Project Management and Task Tracking application built with Next.js 15. TaskFlow allows teams and individuals to organize their work, create projects, and manage tasks using an interactive Kanban board.

## ✨ Features

- **Project Management**: Create and manage multiple projects seamlessly.
- **Interactive Kanban Board**: Drag and drop tasks between `TODO`, `IN_PROGRESS`, and `DONE` columns.
- **Quick Actions**: One-click buttons to instantly start or complete tasks.
- **Real-time Updates**: Experience instant UI updates without page reloads using Next.js Server Actions and Cache Revalidation.
- **Secure Authentication**: Secure login and registration powered by Auth.js (NextAuth v5).
- **Modern UI**: Clean, responsive, and beautiful interface styled with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Database**: MySQL
- **ORM**: [Prisma v5](https://www.prisma.io/)
- **Authentication**: [Auth.js](https://authjs.dev/) (NextAuth v5)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://www.mysql.com/) database server running locally or remotely

### 1. Clone the repository

```bash
git clone https://github.com/godhaniyaarbham2000-spec/Next.js-Capstone-project.git
cd taskflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add your database connection string and NextAuth secret:

```env
DATABASE_URL="mysql://username:password@localhost:3306/taskflow_db"
AUTH_SECRET="your-super-secret-auth-key-change-this"
```
*(Replace `username`, `password`, and `taskflow_db` with your actual MySQL credentials).*

### 4. Setup the Database

Run Prisma migrations to create the required tables in your MySQL database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

Start the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. (Make sure no other app is running on port 3001, or check your terminal for the exact port).

## 📁 Project Structure

- `/src/app` - Next.js App Router pages (Frontend routes).
- `/src/app/actions` - Server Actions handling backend logic and database mutations.
- `/src/components` - Reusable React components (KanbanBoard, Modals, UI elements).
- `/src/lib` - Utility configurations (Prisma client singleton).
- `/prisma` - Database schema definitions.

## 🤝 Contribution

This project was built as a Capstone Project. Feel free to fork, explore, and modify it!
