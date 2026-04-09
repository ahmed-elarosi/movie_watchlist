
# 🎬 Movie Watchlist – Backend Documentation

## 📌 Overview

The **Movie Watchlist Backend** is a RESTful API that enables users to manage their personal movie watchlists. It provides endpoints for authentication, movie management, and user-specific operations.

The backend is designed with scalability and modularity in mind, following standard backend architecture practices.

---
## 🏗️ Architecture
The backend follows a **layered architecture**:

Client → Routes → Controllers → Services → Database

### Key Components:
- **Routes** → Define API endpoints
- **Controllers** → Handle request/response logic
- **Services** → Business logic layer
- **Prisma Client** → Database access layer
- **Middleware** → Authentication, validation, error handling

---

movie_watchlist/
│
├── prisma/
│ ├── schema.prisma # Prisma schema definition
│ └── migrations/ # Database migrations
│
├── src/
│ ├── controllers/ # Request handlers
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── middleware/ # Auth & error handling
│ ├── config/ # App configuration
│ └── app.js # Express app setup
│
├── .env # Environment variables
├── package.json
└── README.md

---

## 🗄️ Database (Neon + Prisma)
This project uses:
- **Neon** → Serverless PostgreSQL database
- **Prisma ORM** → Type-safe database client
### Prisma Workflow

1. Define models in `schema.prisma`
2. Run migrations:
   ```
   npx prisma migrate dev
3. Generate Prisma Client:
    ```
    npx prisma generate
---
## 🧠 Data Models




### User Model
| Field      | Type     | Constraints              | Description                  |
|-----------|----------|--------------------------|------------------------------|
| id        | String   | Primary Key, UUID        | Unique user identifier       |
| username  | String   | Required                 | User's display name          |
| email     | String   | Unique, Required         | User's email address         |
| password  | String   | Required                 | Hashed user password         |
| movies    | Relation | One-to-Many (Movie[])    | User's movie watchlist       |
| createdAt | DateTime | Default: now()           | Account creation timestamp   |

---

### Movie Model

| Field        | Type     | Constraints                              | Description                    |
|-------------|----------|------------------------------------------|--------------------------------|
| id          | String   | Primary Key, UUID                        | Unique movie identifier        |
| title       | String   | Required                                 | Movie title                    |
| description | String   | Optional                                 | Movie description              |
| releaseYear | Int      | Optional                                 | Year of release                |
| genre       | String   | Optional                                 | Movie genre                    |
| watched     | Boolean  | Default: false                           | Watch status                   |
| userId      | String   | Foreign Key → User.id                    | Owner of the movie             |
| user        | Relation | Many-to-One (User)                       | Associated user                |
| createdAt   | DateTime | Default: now()                           | Record creation timestamp      |

---

## 🔐 Authentication

Authentication is handled using **JWT (JSON Web Tokens)**.

### 🔄 Authentication Flow
1. User registers or logs in
2. Server validates credentials
3. Server generates a JWT token
4. Client stores the token (cookies)
5. Client sends the token in each request:

   Authorization: Bearer <token>

6. Server verifies the token via middleware
7. Access is granted to protected routes

---


## 📡 API Endpoints
### 🔑 Auth Endpoints

| Method | Endpoint              | Description        | Auth Required |
|--------|----------------------|--------------------|---------------|
| POST   | /api/auth/register   | Register new user  | ❌ No         |
| POST   | /api/auth/login      | Login user         | ❌ No         |

---