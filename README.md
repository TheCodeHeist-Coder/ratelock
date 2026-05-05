# RateLock — API Rate Limiter as a Service

> Stop paying for API gateways you don't need. Ratelock adds rate limiting to any backend in 2 lines — Redis-powered, dashboard included, zero infra to manage.

---

## Table of Contents

- [Why Ratelock](#why-ratelock)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Who Is It For](#who-is-it-for)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Database Schema](#database-schema)
- [SDK Usage](#sdk-usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Business Model](#business-model)

---

## Why RateLock

Every public-facing API needs rate limiting. Without it, a single bad actor — or a buggy client — can bring down your entire backend. A DDoS attack, a runaway cron job, a competitor scraping your endpoints: all of these become your problem the moment your API is live.

The existing solutions fall into two categories:

**Too heavy** — Kong, Tyk, AWS API Gateway, and Zuplo are full API gateways. They solve routing, auth, transformations, logging, and a dozen other things on top of rate limiting. Before you can limit a single endpoint in Kong, you're making architectural decisions between three product tiers, writing Lua plugins, and managing a Redis cluster. Zuplo runs across 300+ edge nodes — impressive, but total overkill if you just want to cap your `/api/search` endpoint at 30 requests per minute.

**Too basic** — Library-level solutions like `express-rate-limit` are single-process and in-memory. They break the moment you run more than one server instance. They have no dashboard, no alerts, no cross-service visibility.

RateLock lives in the gap: **drop-in rate limiting only**, for developers who already have a working backend and just need it protected.

---

## The Problem

| Pain point | Reality |
|---|---|
| Full API gateways are overkill | You just want rate limiting, not a new routing layer |
| In-memory limiters don't scale | Break across multiple server instances or restarts |
| No visibility | You have no idea how many requests are being blocked or why |
| Enterprise pricing | Kong Advanced, Tyk, Zuplo — all require sales calls or $500+/mo plans |
| Complex setup | Redis clusters, Lua scripts, infrastructure decisions just to get started |
| No alerts | You find out your API is being hammered after it's already down |

---

## The Solution

RateLock is a **proxy + SDK hybrid** with three integration modes:

1. **SDK (2 lines of code)** — drop the middleware into your existing Express or FastAPI app, point it at your RateLock project API key, done.
2. **HTTP check endpoint** — call `/api/rl/check` from any language before processing a request.
3. **Proxy mode** *(coming soon)* — point your DNS at RateLock, zero code changes at all.

Under the hood, every request check runs through a **Redis-backed sliding window algorithm** via an atomic Lua script. Rules, projects, users, and events are stored in **PostgreSQL via Prisma ORM**. A rule cache in Node.js memory keeps the hot path under 10ms even at high concurrency.

The dashboard gives you real-time visibility: request volume charts, block rates, top endpoints, a live request log, configurable alert thresholds, and per-project API key management — all in one place.

---

## Who Is It For

- **Indie developers** shipping APIs who don't want to run a gateway
- **Small startups** that need production-grade rate limiting before they can afford platform engineering
- **Backend developers** adding rate limiting to an existing service without changing its architecture
- **Teams** who want a dashboard and alerts without instrumenting everything themselves

---

## Features

### Core
- ✅ **Sliding window rate limiting** — most accurate algorithm, handles burst traffic cleanly
- ✅ **Per-project API keys** — isolate limiting rules per service or environment
- ✅ **Endpoint pattern matching** — `*` for global limits, `/api/auth/*` for path prefixes, exact match for specific routes
- ✅ **Multiple algorithms** — Sliding Window, Fixed Window, Token Bucket (configurable per rule)
- ✅ **Rule tiers** — label rules by tier (default, strict, premium) for logical grouping
- ✅ **Fail-open design** — if Redis goes down, requests are allowed through; your API never goes dark because of the limiter

### Dashboard
- ✅ **Request volume chart** — hourly area chart showing allowed vs blocked over 1h / 6h / 24h / 7d windows
- ✅ **4 stat cards** — total requests, allowed, blocked, average latency
- ✅ **Top endpoints table** — ranked by volume with per-endpoint block rate and color coding
- ✅ **Live request log** — last 100 requests with method, endpoint, status, IP, latency, and timestamp
- ✅ **API key management** — reveal, copy, rotate keys directly from the dashboard

### Alerts
- ✅ **Threshold alerts** — trigger when block rate exceeds X% in a rolling window
- ✅ **Multi-channel** — Email, Slack webhook, or custom webhook
- ✅ **Enable/disable** — toggle alerts without deleting them

### Developer Experience
- ✅ **Node.js + Express SDK** — 2-line middleware integration
- ✅ **Python + FastAPI SDK** — 2-line middleware integration
- ✅ **Standard rate-limit headers** — `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`
- ✅ **Prisma-typed database** — full type safety from schema to API response
- ✅ **Docker Compose** — one command to run the full stack locally

---

## Tech Stack

### Frontend

| Technology | Role |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Full type safety across components and stores |
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **Zustand** | Lightweight global state management (auth store + project store) |
| **Recharts** | Area charts for request volume visualization |
| **React Router** | Client-side routing with protected routes |
| **Axios** | HTTP client with JWT interceptors |
| **date-fns** | Date formatting for the live log and charts |
| **Vite** | Fast dev server and build tool |
| **React Icons** | Icon library |

### Backend

| Technology | Role |
|---|---|
| **Node.js** | Runtime |
| **Express** | HTTP framework |
| **TypeScript** | End-to-end type safety |
| **Prisma ORM** | Type-safe database access, migrations, and schema management |
| **PostgreSQL 16** | Primary database — users, projects, rules, events, alerts |
| **Redis 7** | Rate limit engine hot path — sliding window via Lua scripts |
| **ioredis** | Redis client with lazy connect and retry strategy |
| **bcrypt** | Password hashing |
| **jsonwebtoken** | JWT auth (7-day expiry) |
| **Helmet** | HTTP security headers |
| **Morgan** | Request logging |

### DevOps & Infrastructure

| Technology | Role |
|---|---|
| **Docker** | Container runtime for all services |
| **Docker Compose** | Local orchestration of all 5 services |
| **Nginx** | Reverse proxy, routes `/api/*` to backend, `/` to frontend |
| **Prisma Migrate** | Schema migrations — `migrate dev` for development, `migrate deploy` for production |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client SDKs / HTTP                        │
│           Express SDK   │  FastAPI SDK  │  Raw HTTP          │
└──────────────────┬──────┴───────┬───────┴──────┬────────────┘
                   │              │              │
                   └──────────────▼──────────────┘
                          ┌───────────────┐
                          │     Nginx     │
                          │  Reverse proxy│
                          └───────┬───────┘
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
          ┌──────────────────┐       ┌──────────────────┐
          │  Rate Limit      │       │  Control Plane   │
          │  Engine          │       │                  │
          │  POST /api/rl/   │       │  Auth / Projects │
          │  check (hot path)│       │  Rules / Alerts  │
          └────────┬─────────┘       └────────┬─────────┘
                   │                          │
          ┌────────▼─────────┐      ┌─────────▼────────┐
          │  In-memory rule  │      │   Prisma ORM      │
          │  cache (30s TTL) │◄─────│                  │
          └────────┬─────────┘      └─────────┬────────┘
                   │                          │
          ┌────────▼─────────┐      ┌─────────▼────────┐
          │    Redis 7        │      │  PostgreSQL 16    │
          │  Sliding window   │      │                  │
          │  Lua atomic ops   │      │  users           │
          └──────────────────┘      │  projects        │
                   │                │  rules           │
                   │ async log      │  events          │
                   └───────────────►│  alerts          │
                                    └──────────────────┘
```

### Request Flow (Hot Path)

```
Incoming SDK request
       │
       ▼
  X-RL-Key header
       │
       ▼
  Prisma → find project by apiKey
       │
       ▼
  In-memory rule cache (30s TTL)
       │ cache miss
       ▼
  Prisma → fetch rules → cache them
       │
       ▼
  Match endpoint pattern (most specific rule wins)
       │
       ▼
  Redis Lua script (atomic sliding window)
       │
    ┌──┴──┐
    ▼     ▼
 ALLOW  BLOCK
    │     │
    │     └─► 429 + Retry-After header
    │
    ▼
  Pass through + set X-RateLimit-* headers
    │
    ▼
  Async Prisma event log (fire-and-forget, never blocks)
```

### Why Sliding Window?

The sliding window counter is the most accurate rate limiting algorithm for real-world traffic:

- **Fixed window** is simple but allows 2x the limit at window boundaries (burst attacks)
- **Token bucket** is great for burst allowance but complex to reason about
- **Sliding window** tracks the exact count within a rolling time range, giving precise and predictable limiting

Implementation uses a Redis Sorted Set (`ZADD` / `ZREMRANGEBYSCORE`) wrapped in a Lua script for atomicity. The key structure is:

```
rl:{api_key}:{rule_id}
```

Each request adds an entry with `score = timestamp_ms`. Old entries outside the window are pruned atomically on every check.

---

## Database Schema

Managed entirely by **Prisma** — the `schema.prisma` file is the single source of truth. No raw SQL, no manual migration files by hand.

```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  name         String
  plan         Plan      @default(free)  // free | pro | team
  projects     Project[]
}

model Project {
  id          String   @id @default(uuid())
  userId      String
  name        String
  apiKey      String   @unique  // auto-generated 64-char hex
  rules       Rule[]
  events      Event[]
  alerts      Alert[]
}

model Rule {
  id              String    @id @default(uuid())
  projectId       String
  name            String
  endpointPattern String    // *, /api/users/*, /api/auth/login
  limitCount      Int       // max requests
  windowSeconds   Int       // rolling window size
  algorithm       Algorithm // sliding_window | fixed_window | token_bucket
  isActive        Boolean
}

model Event {
  id         BigInt   @id @default(autoincrement())
  projectId  String
  endpoint   String
  method     String
  allowed    Boolean
  ipAddress  String?
  latencyMs  Int?
  timestamp  DateTime @default(now())
}

model Alert {
  id               String       @id @default(uuid())
  projectId        String
  thresholdPercent Int          // trigger when block rate >= this
  windowMinutes    Int          // rolling window for alert evaluation
  channel          AlertChannel // email | slack | webhook
  destination      String
  isActive         Boolean
}
```

### Analytics Queries (Pure Prisma)

All dashboard analytics — totals, top endpoints, hourly time-series — are done using the **Prisma client only**, with zero raw SQL. Aggregations use `prisma.event.count()`, `prisma.event.aggregate()`, and `prisma.event.groupBy()`. The hourly bucketing for the chart is done in JavaScript after fetching minimal `{ allowed, timestamp }` columns, since Prisma's `groupBy` does not support `date_trunc`.

---

## SDK Usage

### Node.js / Express

```bash
npm install @ratelock/express
```

```typescript
import { rateLimiter } from '@ratelock/express'

// That's it. 2 lines.
app.use(rateLimiter({ apiKey: 'YOUR_PROJECT_API_KEY' }))
```

**Options:**

```typescript
app.use(rateLimiter({
  apiKey:     'YOUR_KEY',
  serviceUrl: 'https://api.ratelock.com',  // default
  failOpen:   true,                           // allow requests if service unreachable
}))
```

### Python / FastAPI

```bash
pip install ratelock
```

```python
from ratelock import RateLimiter

# That's it. 2 lines.
app.add_middleware(RateLimiter, api_key="YOUR_PROJECT_API_KEY")
```

### Raw HTTP (any language)

```bash
curl -X POST https://api.ratelock.com/api/rl/check \
  -H "X-RL-Key: YOUR_KEY" \
  -H "X-RL-Endpoint: /api/users" \
  -H "X-RL-Method: GET" \
  -H "X-RL-IP: 203.0.113.1"
```

**Response (allowed):**

```json
{
  "allowed": true,
  "limit": 100,
  "remaining": 67,
  "reset": 1717600860
}
```

**Response (blocked):**

```json
{
  "allowed": false,
  "error": "Rate limit exceeded",
  "limit": 100,
  "remaining": 0,
  "reset": 1717600860,
  "retry_after": 23
}
```

Response headers on every request:

```
X-RateLimit-Limit:     100
X-RateLimit-Remaining: 67
X-RateLimit-Reset:     1717600860
Retry-After:           23   (only on 429)
```

---

## API Reference

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Get JWT token |
| `GET` | `/api/auth/me` | Current user (requires Bearer token) |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | List all projects |
| `POST` | `/api/projects` | Create a project |
| `GET` | `/api/projects/:id` | Get a single project |
| `PATCH` | `/api/projects/:id` | Update name / description |
| `DELETE` | `/api/projects/:id` | Delete project and all data |
| `POST` | `/api/projects/:id/rotate-key` | Rotate the API key |
| `GET` | `/api/projects/:id/stats?hours=24` | Dashboard analytics |
| `GET` | `/api/projects/:id/events?limit=50` | Request log |

### Rules

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects/:id/rules` | List rules |
| `POST` | `/api/projects/:id/rules` | Create rule |
| `PATCH` | `/api/projects/:id/rules/:ruleId` | Update rule |
| `DELETE` | `/api/projects/:id/rules/:ruleId` | Delete rule |

### Alerts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects/:id/alerts` | List alerts |
| `POST` | `/api/projects/:id/alerts` | Create alert |
| `PATCH` | `/api/projects/:id/alerts/:alertId` | Update alert |
| `DELETE` | `/api/projects/:id/alerts/:alertId` | Delete alert |

### Rate Limit Engine

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/rl/check` | `X-RL-Key` header | Check and record a request |
| `GET` | `/api/rl/health` | — | Engine health check |

---

## Project Structure

```
ratelock/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma         # Single source of truth for DB schema
│   │   └── seed.ts               # Demo user, project, rules, events
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts             # Prisma client singleton (hot-reload safe)
│   │   │   └── redis.ts          # Redis client + sliding window Lua script
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT verify + project ownership guard
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.ts           # Register / login / me
│   │   │   ├── projects.ts       # Project CRUD + stats + events
│   │   │   ├── rules.ts          # Rate limit rule CRUD
│   │   │   ├── alerts.ts         # Alert CRUD
│   │   │   └── rateLimit.ts      # POST /api/rl/check (hot path)
│   │   │
│   │   ├── services/
│   │   │   ├── rateLimitService.ts   # Redis engine, rule cache, event logger
│   │   │   └── analyticsService.ts  # Dashboard stats (pure Prisma)
│   │   │
│   │   ├── types/
│   │   │   └── index.ts          # Domain types + Express augmentations
│   │   │
│   │   ├── app.ts                # Express app, middleware, routes
│   │   └── server.ts             # Bootstrap, DB connect, graceful shutdown
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── api.ts            # Axios instance with JWT interceptor
│   │   │
│   │   ├── stores/
│   │   │   ├── authStore.ts      # Zustand: user, token, login, logout
│   │   │   └── projectStore.ts   # Zustand: projects, rules, alerts, stats, events
│   │   │
│   │   ├── types/
│   │   │   └── index.ts          # Frontend domain types
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx # Projects overview and create
│   │   │   └── ProjectPage.tsx   # Tabs: Overview | Rules | Alerts | Live Log
│   │   │
│   │   ├── components/
│   │   │   ├── Layout.tsx        # Sidebar + outlet shell
│   │   │   └── project/
│   │   │       ├── OverviewTab.tsx   # Stats + area chart + top endpoints
│   │   │       ├── RulesTab.tsx      # Rule list + create form
│   │   │       ├── AlertsTab.tsx     # Alert list + create form
│   │   │       ├── EventsTab.tsx     # Paginated request log table
│   │   │       └── ApiKeyCard.tsx    # Reveal / copy / rotate key
│   │   │
│   │   ├── App.tsx               # Router + protected routes
│   │   ├── main.tsx              # React root
│   │   └── index.css             # Tailwind + global design tokens
│   │
│   ├── public/
│   │   └── favicon.svg
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── sdk/
│   ├── nodejs/
│   │   └── rateLimiter.ts        # Express middleware (publishable as npm package)
│   └── python/
│       └── ratelock.py         # Starlette/FastAPI middleware
│
├── nginx/
│   └── nginx.conf                # Reverse proxy + rate zones for /api/auth
│
├── docker-compose.yml            # postgres + redis + backend + frontend + nginx
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- Node.js 20+ (for local development without Docker)

### With Docker (recommended)

```bash
# 1. Clone the repo
git clone https://github.com/yourname/ratelock.git
cd ratelock

# 2. Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start all services
docker compose up -d

# 4. Run database migrations
docker compose exec backend npx prisma migrate deploy

# 5. Seed demo data
docker compose exec backend npm run db:seed

# 6. Open the dashboard
open http://localhost:3000
```

**Demo credentials:**
```
Email:    demo@ratelock.dev
Password: demo1234
API Key:  demo_key_abcdef1234567890abcdef1234567890
```

### Local Development (without Docker)

```bash
# Start postgres and redis only via Docker
docker compose up postgres redis -d

# Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev              # runs on :4000

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev              # runs on :3000
```

### Prisma Commands

```bash
# After editing schema.prisma:
npm run db:generate      # regenerate Prisma client types

# Create and apply a new migration:
npm run db:migrate       # prompts for migration name

# Apply existing migrations in production:
npm run db:deploy

# Re-seed demo data:
npm run db:seed

# Open Prisma Studio (visual DB browser):
npm run db:studio        # opens at localhost:5555
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Backend port | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://ratelock:ratelock_secret@localhost:5432/ratelock` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | Secret for signing JWTs (min 32 chars in prod) | — |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:3000` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `/api` |

---

## Roadmap

### MVP (current)
- [x] Sliding window rate limiting via Redis Lua script
- [x] Node.js (Express) and Python (FastAPI) SDKs
- [x] Real-time dashboard with charts, top endpoints, live log
- [x] Per-project rules with endpoint pattern matching
- [x] API key management (reveal, copy, rotate)
- [x] Alert configuration (email, Slack, webhook)
- [x] Full Prisma ORM — no raw SQL anywhere
- [x] Docker Compose for one-command local setup

### Post-MVP
- [ ] **Proxy mode** — point DNS at RateLock, zero code changes
- [ ] **Per-user quotas** — limit by user ID, not just API key
- [ ] **Stripe billing** — free / pro / team subscription tiers
- [ ] **Multi-region Redis** — globally synchronized state
- [ ] **Go, Ruby, PHP SDKs**
- [ ] **IP allowlist / blocklist** — per project
- [ ] **Webhook event stream** — subscribe to real-time allow/block events
- [ ] **Terraform provider** — manage rules as infrastructure

---

## Business Model

RateLock is designed as a SaaS product with a freemium model:

| Plan | Price | Projects | Requests/mo | Rules/project | Alerts |
|------|-------|----------|-------------|---------------|--------|
| **Free** | $0 | 1 | 50,000 | 3 | — |
| **Pro** | $19/mo | 10 | 5,000,000 | Unlimited | 10 |
| **Team** | $79/mo | Unlimited | Unlimited | Unlimited | Unlimited |

**Why this pricing works:**
- Free tier is generous enough to prove value to indie devs
- Pro tier is priced far below Kong Enterprise or Tyk Cloud
- The core value proposition — time saved on setup, visibility, peace of mind — justifies $19/mo for the first billing cycle

---

## License

MIT — use it, fork it, ship it.

---

<div align="center">
  <strong>Built for developers who just want their API protected.</strong><br/>
  No gatekeepers. No enterprise sales calls. No Lua plugins.
</div>
