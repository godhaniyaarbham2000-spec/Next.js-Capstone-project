# 🚀 TaskFlow (Full-Stack Project Management Web App)

A complete, production-grade web application built entirely on the modern **Next.js App Router**. This project demonstrates the power of building full-stack applications using a single framework (Frontend + Backend unified) running on **Node.js**.

It covers everything from advanced routing concepts, Server Components, and Server Actions to database integration with **Prisma (MySQL)** and secure authentication using **Auth.js v5**.

---

## 🚀 Features

- ⚡ **Next.js Full-Stack Architecture**: Unified frontend and backend.
- 🔐 **Secure Authentication**: Credentials login & registration via Auth.js v5.
- 🛡️ **Role-Based Access Control (RBAC)**: Protected Admin, Owner, and User routes.
- 🗄️ **Database Integration**: MySQL database connected via Prisma ORM.
- 🔄 **Advanced Routing**: Route Groups, Parallel Routes (`@modal`, `@stats`, `@users`), and Intercepting Routes (`(.)tasks`).
- 📝 **Server Actions**: Secure form handling and CRUD operations without traditional API routes.
- 🚀 **Next.js Caching**: Implementation of `revalidatePath` and aggressive caching mechanisms.
- 🎨 **Modern UI**: Clean, responsive, and beautiful interface styled with Tailwind CSS.
- 📋 **Interactive Kanban Board**: Dynamic task tracking across `TODO`, `IN_PROGRESS`, and `DONE` stages.
- 📝 **Inline Editing**: Instantly edit project details and task metadata with intuitive modals.

---

## 🛠️ Tech Stack

### Framework & Language
- **Next.js 15 (App Router)**: The core full-stack framework.
- **React.js**: Used internally by Next.js for building Client and Server Components.
- **Node.js**: The runtime environment powering Next.js Server Actions, APIs, and SSR.
- **TypeScript**: Strictly typed programming language.

### Database & Backend
- **MySQL**: Relational database for storing users, projects, and tasks data.
- **Prisma ORM v5**: Type-safe database client and schema management.
- **Auth.js v5 (NextAuth)**: Next-generation authentication library.
- **bcryptjs**: For secure password hashing.

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

---

## 📌 Topics Covered

- Next.js Server Components vs Client Components
- Data Fetching and Mutation with Server Actions
- Advanced Routing (Parallel slots `@folder`, Intercepting `(.)folder`)
- Prisma ORM Data Modeling and Relations
- Next.js Caching & Revalidation Strategies (`revalidatePath`)
- Middleware for Route Protection
- Component State Management in Next.js 15
- Full CRUD Operations (Projects, Tasks)

---

## 📂 Project Structure
```text
taskflow/
│
├── .env
├── .gitignore
├── app/
│   ├── (app)/
│   │   ├── @modal/
│   │   │   ├── (.)tasks/
│   │   │   │   └── [taskId]/
│   │   │   │       └── page.tsx
│   │   │   └── default.tsx
│   │   ├── admin/
│   │   │   ├── @stats/
│   │   │   ├── @users/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── tasks/
│   │   │   └── [taskId]/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── actions/
│   │   ├── auth.ts
│   │   ├── projects.ts
│   │   └── tasks.ts
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── upload/route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── middleware.ts
├── components/
│   ├── AddTaskModal.tsx
│   ├── EditProjectModal.tsx
│   ├── EditTaskForm.tsx
│   ├── KanbanBoard.tsx
│   ├── TaskDetailsView.tsx
│   └── TaskModal.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── types/
│   └── next-auth.d.ts
├── next.config.mjs
├── package.json
└── tailwind.config.ts
```

---

## ⚙️ Installation & Setup (Step-by-Step)

Follow these steps to run the project from scratch on your local machine.

### 1. Clone the Repository
Download the code to your local machine:
```bash
git clone https://github.com/godhaniyaarbham2000-spec/Next.js-Capstone-project.git
cd taskflow
```

### 2. Install Node.js Dependencies
This command will read the `package.json` file and install all required packages:
```bash
npm install
```

### 3. Setup Environment Variables (.env)
Create a new file named `.env` in the root folder and add your database and auth credentials:
```env
# MySQL Database Connection String (Update with your local MySQL username/password)
DATABASE_URL="mysql://root:password@localhost:3306/taskflow_db"

# NextAuth Secret (Can be any random string for local development)
AUTH_SECRET="my_super_secret_auth_key_123"

# Cloudinary Setup for attachments (Optional)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### 4. Setup MySQL Database with Prisma
Ensure your local MySQL server is running. Then, execute this command to create the tables in your database based on the Prisma schema:
```bash
npx prisma db push
```
Generate the Prisma Client to interact with the DB:
```bash
npx prisma generate
```

### 5. Start the Development Server
Run the Next.js/Node.js development server:
```bash
npm run dev
```

### 6. Open in Browser
The application will be live at:
```text
http://localhost:3000
```

---

## 💡 Usage Guide

- **Home Page (`/`)**: View the Marketing/Landing page.
- **Projects (`/projects`)**: Create and view your active projects.
- **Kanban Board (`/projects/[slug]`)**: Manage tasks intuitively with state transitions.
- **Modals (`/tasks/[taskId]`)**: Click on a task in the Kanban board to trigger Intercepting Routes for inline viewing and editing without losing context.
- **Admin Panel (`/admin`)**: Test RBAC by viewing the parallel routed admin dashboard (Stats and Users).

---

## ⚠️ Notes

- Ensure your MySQL database is active before running `npx prisma db push`.
- Never commit your `.env` file to GitHub (it is ignored via `.gitignore`).
- All Next.js dependencies (including React 19 / Next.js 15) are automatically installed when you run `npm install`.

---

## 📸 Preview Highlights

- ⚡ Ultra-fast Server Actions
- 🔐 Secure Login & Registration
- 🎨 Modern Tailwind UI with interactive modals
- 🖼️ Intercepting Modals for seamless Task Management

---

## 🧠 Key Learning Points

- Unifying Backend and Frontend logic seamlessly in a single framework.
- Utilizing **Node.js** for powerful Next.js Server Actions.
- Mastering **Prisma ORM** for type-safe database queries.
- Managing Next.js **Caching mechanisms** (`revalidatePath`).
- Implementing advanced layouts and parallel routing.
