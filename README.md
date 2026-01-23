# Task Management System – Backend

This is the backend service for the **Task Management System**, built using **Node.js, Express, MongoDB**, and **JWT-based authentication with HTTP-only cookies**.  
It handles user authentication, role-based authorization, task management, and admin operations.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (HTTP-only cookies)
- Role-based Access Control (Admin, Sub-Admin, User)
- Axios (for internal/external API calls)

---

## 📁 Features

- User authentication (Login / Logout)
- JWT-based auth using HTTP-only cookies
- Role-based authorization (Admin, Sub-Admin, User)
- Task CRUD operations
- Task assignment to users
- Task completion tracking
- Admin dashboard APIs (user & task counts)
- Secure cookie handling (CORS supported)

---

## 🛠️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
