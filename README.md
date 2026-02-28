# 📚 Library Management System

Full Stack CRUD Application using **React + TypeScript (Frontend)** and **ASP.NET Core (.NET) + SQLite (Backend)**.

---

## 🚀 Project Overview

This project is a full-stack CRUD application that allows users to:

* ➕ Add books
* 📖 View all books
* 🔍 View book details
* ✏️ Update books
* ❌ Delete books

The frontend is built using **React with TypeScript**, and the backend is developed using **ASP.NET Core Web API** with **SQLite** as the database.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Axios
* React Router DOM
* Vite

### Backend

* ASP.NET Core Web API (.NET 8)
* Entity Framework Core
* SQLite
* Postman (API testing)

---

# 📂 Project Structure

```
book-management-system/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Program.cs
│   └── appsettings.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Setup Instructions

## 🔹 1️⃣ Clone the Repository

```bash
git clone https://github.com/rageeshan/library_management_system.git
cd library_management_system
```

---

# 🖥️ Backend Setup (.NET API)

### 📌 Prerequisites

* .NET 8 SDK installed
* SQLite installed (optional GUI tool like DB Browser for SQLite)

### ▶️ Steps

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

The backend will run at:

```
http://localhost:5258
```

---

# 🌐 Frontend Setup (React + TypeScript)

### 📌 Prerequisites

* Node.js (v18+ recommended)
* npm

### ▶️ Steps

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:4002
```

---

# 📬 API Testing (Postman)

You can test endpoints using **Postman**.

Example Endpoints:

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/book      |
| GET    | /api/book/{id} |
| POST   | /api/book      |
| PUT    | /api/book/{id} |
| DELETE | /api/book/{id} |

---

# 📦 Important Dependencies

### Frontend

```bash
npm install axios react-router-dom
npm install -D typescript @types/react @types/react-dom
```

### Backend

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

---

# 📄 Report Submission

The repository includes:

* ✅ Complete source code
* ✅ Setup instructions (this README)
* ✅ Project Report (PDF)
