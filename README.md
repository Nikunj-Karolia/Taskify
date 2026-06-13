# Taskify

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

A production-ready full-stack task management application. React frontend served directly from Express — single port, no CORS, no proxy. Features JWT authentication with refresh token rotation, session-aware token refresh prompts, toast notifications, and a fully documented REST API.

---

## Features

### Backend
- **JWT Authentication** — access token + refresh token rotation with httpOnly cookie storage
- **Custom JWT Middleware** — built from scratch using `jsonwebtoken`, no third-party auth libraries
- **HS512 Token Signing** — stronger symmetric signing algorithm
- **Input Validation** — every endpoint validated with Zod before touching the database
- **Soft Deletes** — tasks are never permanently removed, data integrity preserved
- **PostgreSQL Functions** — all DB operations via stored procedures with a dedicated least-privilege DB role
- **Swagger UI** — fully documented API at `/api/docs`
- **Rate Limiting** — brute force protection on auth endpoints
- **Centralised Error Handling** — consistent error responses across all endpoints
- **React served from Express** — single port, zero CORS configuration needed

### Frontend
- **Authentication flow** — register, login, logout with httpOnly cookie-based sessions
- **Token refresh prompt** — dialog appears 5 minutes before session expiry, letting users extend their session without losing work
- **Toast notifications** — success and error feedback on every user action via react-hot-toast
- **Global auth context** — authentication state shared across the entire app
- **Task CRUD** — create, view, update, and soft-delete tasks
- **Protected routes** — unauthenticated users redirected to login automatically

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, react-hot-toast |
| Backend | Node.js, Express |
| Database | PostgreSQL 16 |
| Auth | JWT (HS512), bcrypt |
| Validation | Zod |
| Documentation | Swagger UI (OAS 3.0) |
| Containerisation | Docker Compose |
| Package Manager | npm |

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed
- That's it

### Run locally

```bash
# 1. Clone the repo
git clone https://github.com/nikunj-karolia/taskify
cd taskify

# 2. Copy environment file
cp .env.example .env

# 3. Start the stack
docker compose up
```

App is live at `http://localhost:5000`  
Swagger docs at `http://localhost:5000/api/docs`

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
PORT=5000
NODE_ENV=production

# PostgreSQL
DB_HOST=db
DB_PORT=5432
DB_NAME=taskify
DB_USER=taskify_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_256_bit_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## API Reference

Base URL: `http://localhost:5000`

### Auth

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive tokens | No |
| POST | `/api/auth/refresh` | Rotate refresh token | No |
| POST | `/api/auth/logout` | Invalidate session | Yes |

### Tasks

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| GET | `/api/task` | Get all tasks (paginated, filterable) | Yes |
| POST | `/api/task` | Create a new task | Yes |
| PATCH | `/api/task/:id` | Update a task | Yes |
| DELETE | `/api/task/:id` | Soft delete a task | Yes |

Full request/response schemas with examples available in Swagger UI at `/api/docs`.

---

## Architecture Decisions

### React served from Express
The React production build is served as static files directly from Express. All API routes (`/api/*`) are handled by Express first — everything else falls through to the React app. This means the entire application runs on a single port with no CORS configuration, no proxy, and no separate frontend server.

### Custom JWT middleware
Authentication middleware is implemented from scratch using the `jsonwebtoken` package. This gives full control over token verification, error messages, and the shape of `req.user` — with no hidden behaviour from third-party packages like `express-jwt` or Passport.js.

### HS512 algorithm
Tokens are signed with HMAC-SHA512. Since a single backend service both signs and verifies tokens, a symmetric algorithm is correct. HS512 provides stronger security than HS256 with negligible performance difference at this scale.

### PostgreSQL functions with dedicated DB role
All database operations are executed via PostgreSQL stored procedures rather than inline SQL. A dedicated least-privilege database role is used for application queries — it has no DDL permissions and can only execute the defined functions. This isolates the application layer from the schema and eliminates inline SQL injection risk entirely.

### Soft deletes
Tasks are never permanently deleted. A `deleted_at` timestamp is set instead, preserving data integrity and allowing recovery if something is removed by mistake.

### Zod validation
All incoming request bodies are validated with Zod schemas before reaching the controller or database layer. Invalid requests are rejected at the middleware level with structured error responses.

### Refresh token rotation
On every `/api/auth/refresh` call the old refresh token is invalidated and a new one is issued. This limits the window of exposure if a refresh token is ever compromised.

### Session-aware refresh prompt
The frontend tracks the access token expiry time and shows a session extension dialog 5 minutes before expiry. This prevents users from losing unsaved work due to a silent session timeout — the token is refreshed in the background if the user confirms.

### Global auth context
Authentication state is managed via React Context and shared across the entire application. Components never manage auth state locally — they read from and dispatch to the global context, keeping auth logic in one place.

---

## Project Structure

```
taskify/
├── taskify-ui/                   — React frontend
│   ├── public/
│   └── src/
│       ├── components/       — reusable UI components
│       │   ├── authbutton   — custom JWT middleware
│       │   │   ├── button.js   — custom JWT middleware
│       │   │   └── button.module.css   — custom JWT middleware
│       │   ├── authinput   — custom JWT middleware
│       │   │   ├── input.js   — custom JWT middleware
│       │   │   └── input.module.css   — custom JWT middleware
│       │   ├── deletebutton   — custom JWT middleware
│       │   │   ├── delete.js   — custom JWT middleware
│       │   │   └── delete.module.css   — custom JWT middleware
│       │   ├── editbutton   — custom JWT middleware
│       │   │   ├── edit.js   — custom JWT middleware
│       │   │   └── edit.module.css   — custom JWT middleware
│       │   ├── header   — custom JWT middleware
│       │   │   ├── header.js   — custom JWT middleware
│       │   │   └── header.module.css   — custom JWT middleware
│       │   ├── notification   — custom JWT middleware
│       │   │   ├── notification.js   — custom JWT middleware
│       │   │   └── notification.module.css   — custom JWT middleware
│       │   └── refreshtoken   — custom JWT middleware
│       │       ├── refreshtoken.js   — custom JWT middleware
│       │       └── refreshtoken.module.css   — custom JWT middleware
│       ├── routes/         — API call functions
│       │   ├── dashboard   — custom JWT middleware
│       │   │   ├── Dashboard.js   — custom JWT middleware
│       │   │   └── Dashboard.module.css   — custom JWT middleware
│       │   ├── login   — custom JWT middleware
│       │   │   ├── Login.js   — custom JWT middleware
│       │   │   └── Login.module.css   — custom JWT middleware
│       │   ├── new   — custom JWT middleware
│       │   │   └── NewTask.js   — custom JWT middleware
│       │   ├── signup   — custom JWT middleware
│       │   │   ├── Signup.js   — custom JWT middleware
│       │   │   └── Signup.module.css   — custom JWT middleware
│       └── App.js
├── taskify-api/                   — React frontend
│   ├── public/
│   ├── components/       — reusable UI components
│   │   └── pg.js
│   ├── db/               — reusable UI components
│   ├── middleware/       — reusable UI components
│   │   ├── cors.js
│   │   ├── error.js
│   │   ├── jwt.js
│   │   ├── sps.js
│   │   └── validate.js
│   ├── router/               — reusable UI components
│   │   ├── auth.js
│   │   └── task.js
│   ├── schema/       — reusable UI components
│   │   ├── authSchema.js
│   │   └── taskSchema.js
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── swagger.js
│   └── .env
├── .gitignore
└── README.md
```

---

## Author

**Nikunj Karolia**  
Backend & Cloud Engineer  
[LinkedIn](https://linkedin.com/in/nikunj-karolia) · [GitHub](https://github.com/nikunj-karolia)

---

## License

MIT
