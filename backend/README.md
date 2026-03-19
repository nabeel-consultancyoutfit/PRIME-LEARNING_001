# Prime Learning Platform — Backend API

NestJS + MongoDB backend for the Prime Learning Apprenticeship LMS.

---

## Quick Start

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Copy env file and configure
cp .env.example .env
# Edit .env — set MONGODB_URI, JWT secrets, etc.

# 3. Start dev server
npm run start:dev
```

Server starts on **http://localhost:3001**
Swagger docs at **http://localhost:3001/api/v1/docs**

---

## Environment Variables

See `.env.example` for all required variables. Key ones:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Secret for access tokens (15m lifetime) |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens (7d lifetime) |
| `CORS_ORIGINS` | Comma-separated list of allowed origins |
| `PORT` | Server port (default: 3001) |

---

## Architecture

```
backend/src/
├── main.ts                     # Bootstrap: CORS, pipes, Swagger
├── app.module.ts               # Root module
├── config/                     # App, Database, JWT config
├── common/
│   ├── decorators/             # @CurrentUser, @Roles, @Public
│   ├── guards/                 # JwtAuthGuard, RolesGuard
│   ├── interceptors/           # Response wrapper, Logger
│   ├── filters/                # Global exception filter
│   ├── dto/                    # PaginationDto
│   └── utils/                  # Pagination helpers
├── database/                   # MongooseModule setup
├── modules/
│   ├── auth/                   # JWT auth, register, login, refresh
│   ├── users/                  # User CRUD
│   ├── learners/               # Learner profiles
│   ├── trainers/               # Trainer profiles
│   ├── programmes/             # Apprenticeship programmes + KSBs
│   ├── tasks/                  # Assessment tasks
│   ├── evidence/               # Learner evidence
│   ├── journals/               # Learning journals
│   ├── progress/               # Progress tracking
│   ├── scorecard/              # KSB scorecard
│   ├── messages/               # Conversations + messages
│   ├── notifications/          # In-app notifications
│   ├── courses/                # Course catalogue + lessons
│   ├── enrollments/            # Course enrollments
│   ├── dashboard/              # Role-based dashboard stats
│   ├── reports/                # Learner & cohort reports
│   └── admin/                  # Admin management
└── websocket/
    ├── chat.gateway.ts         # Socket.io /chat namespace
    └── notifications.gateway.ts # Socket.io /notifications namespace
```

---

## API Endpoints Summary

### Auth  `POST /api/v1/auth/*`
| Method | Path | Description |
|--------|------|-------------|
| POST | /register | Register new user |
| POST | /login | Login, get tokens |
| POST | /refresh | Refresh access token |
| POST | /logout | Logout (clear refresh token) |
| POST | /change-password | Change password |

### Tasks  `GET|POST|PATCH /api/v1/tasks/*`
| Method | Path | Description |
|--------|------|-------------|
| GET | /tasks/my | Get my tasks (learner) |
| POST | /tasks/:id/submit | Submit task for review |
| GET | /tasks/trainer | Get cohort tasks (trainer) |
| POST | /tasks/:id/approve | Approve task |
| POST | /tasks/:id/reject | Reject task with reason |
| GET | /tasks | List all tasks (admin) |
| POST | /tasks | Create task |
| GET | /tasks/:id | Get task detail |
| PATCH | /tasks/:id | Update task |

### Evidence `GET|POST|PATCH /api/v1/evidence/*`
| Method | Path | Description |
|--------|------|-------------|
| GET | /evidence/my | Get my evidence |
| POST | /evidence | Upload evidence |
| POST | /evidence/:id/submit | Submit for review |
| POST | /evidence/:id/review | Approve/reject (trainer) |
| GET | /evidence | List all (admin/trainer) |
| PATCH | /evidence/:id | Update evidence |

### Dashboard `GET /api/v1/dashboard/*`
| Method | Path | Roles |
|--------|------|-------|
| GET | /dashboard/learner | learner |
| GET | /dashboard/trainer | trainer, iqa |
| GET | /dashboard/admin | admin |

### Messages `GET|POST /api/v1/messages/*`
- Conversations CRUD + real-time via Socket.io `/chat` namespace

### Notifications `GET|PATCH|DELETE /api/v1/notifications/*`
- CRUD + real-time via Socket.io `/notifications` namespace

---

## Authentication

All endpoints require Bearer JWT except public ones (`/auth/register`, `/auth/login`, `/auth/refresh`).

```
Authorization: Bearer <accessToken>
```

Refresh flow:
1. Access token expires (15 min) → 401
2. Client sends `POST /api/v1/auth/refresh` with `{ refreshToken }`
3. New access + refresh tokens returned

---

## WebSocket Events

### Chat Gateway (`/chat` namespace)

**Client → Server:**
- `join-conversation` `{ conversationId }` — join a room
- `leave-conversation` `{ conversationId }` — leave a room
- `send-message` `{ conversationId, content, type? }` — send message
- `typing` `{ conversationId, isTyping }` — typing indicator

**Server → Client:**
- `new-message` `{ conversationId, senderId, content, createdAt }`
- `user-typing` `{ userId, isTyping }`

### Notifications Gateway (`/notifications` namespace)

**Server → Client:**
- `notification` `{ title, message, type, link, createdAt }`

---

## Roles & Permissions

| Role | Can access |
|------|-----------|
| `learner` | Own tasks, evidence, journals, progress, scorecard, messages, enrollments |
| `trainer` | All their learners' data, can approve/reject tasks & evidence |
| `iqa` | Read-only across all learners, scorecard review |
| `admin` | Full system access + admin endpoints |

---

## MongoDB Collections (16)

`users`, `learners`, `trainers`, `programmes`, `tasks`, `evidence`, `journals`, `progress`, `scorecards`, `conversations`, `messages`, `notifications`, `courses`, `enrollments`

---

## Response Format

All responses follow:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

Errors:
```json
{
  "success": false,
  "statusCode": 400,
  "error": "BadRequest",
  "message": "Validation failed",
  "path": "/api/v1/tasks",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
