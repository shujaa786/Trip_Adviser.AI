# 🌍 Trip Adviser AI

> **AI-powered multi-agent travel planner** built with **React 18,
> TypeScript, Node.js, Prisma, PostgreSQL, Groq & Gemini**.

## 🚀 Live Demo

-   Frontend: https://trip-adviser-ai-frontend.vercel.app
-   Backend Health: https://trip-adviser-ai.onrender.com/api/v1/health

## 📸 Screenshots

| Landing Page | AI Planner |
|--------------|------------|
| ![](./screenshots/trip-adviser-homeScreen.png) | ![](./screenshots/chatwindow-trip_adviser.png) |

<br>

| Generated Trip |
|----------------|
| ![](./screenshots/chat-screen-trip_adviser.png) |

## ✨ Features

-   Multi-Agent AI Orchestration
-   Destination, Itinerary & Budget Agents
-   JWT Authentication
-   PostgreSQL + Prisma
-   Trip History & Delete Trip
-   Responsive UI
-   Mobile Drawer Navigation
-   Groq + Gemini Fallback
-   Turborepo Monorepo

## 🏗 System Architecture

```mermaid
graph TD

    %% Frontend
    FE["React Frontend<br/>Vite + TypeScript + Tailwind"]

    %% API Layer
    API["Express REST API<br/>Authentication + Validation + Middleware"]

    %% Core Orchestration
    ORCH["AI Orchestrator"]

    CTX["Context Manager"]
    PLAN["Execution Planner"]
    REG["Agent Registry"]
    EXEC["Execution Engine"]
    RESP["Response Composer"]

    %% AI Agents
    INT["Interpreter Agent"]
    DEST["Destination Agent"]
    ITI["Itinerary Agent"]
    BUD["Budget Agent"]

    %% LLM Layer
    LLM["LLM Provider Layer"]
    GROQ["Groq (fallback)"]
    GEM["Google Gemini (Primary)"]

    %% Persistence
    PERSIST["Persistence Layer<br/>Repositories + Prisma ORM"]
    DB[("PostgreSQL (Neon)")]

    %% Flow

    FE --> API
    API --> ORCH

    ORCH --> CTX
    ORCH --> PLAN
    ORCH --> REG
    ORCH --> EXEC

    EXEC --> INT

    INT --> DEST
    DEST --> ITI
    ITI --> BUD

    INT --> LLM
    DEST --> LLM
    ITI --> LLM
    BUD --> LLM

    LLM --> GEM
    GEM -. Fallback .-> GROQ

    EXEC --> RESP
    RESP --> PERSIST
    PERSIST --> DB
```

## 🔄 Workflow

```mermaid
sequenceDiagram

    participant U as User
    participant FE as React Frontend
    participant API as Express API
    participant O as AI Orchestrator
    participant C as Context Manager
    participant P as Execution Planner
    participant E as Execution Engine
    participant I as Interpreter Agent
    participant D as Destination Agent
    participant T as Itinerary Agent
    participant B as Budget Agent
    participant L as LLM Provider
    participant DB as PostgreSQL

    U->>FE: Enter travel request

    FE->>API: POST /api/v1/trips/plan

    API->>O: Create Workflow

    O->>C: Build Workflow Context
    C-->>O: Validated Context

    O->>P: Determine Execution Plan
    P-->>O: Agent Pipeline

    O->>E: Execute Workflow

    E->>I: Interpret User Intent
    I->>L: Parse Natural Language
    L-->>I: Structured Context

    E->>D: Generate Destination
    D->>L: Destination Prompt
    L-->>D: Destination Response

    E->>T: Generate Itinerary
    T->>L: Itinerary Prompt
    L-->>T: Itinerary Response

    E->>B: Estimate Budget
    B->>L: Budget Prompt
    L-->>B: Budget Response

    E->>O: Agent Results

    O->>DB: Persist Trip
    DB-->>O: Success

    O->>FE: Unified Response

    FE-->>U: Display Trip Plan
```

## 📁 Project Structure

``` text
Trip_Adviser.AI
├── apps
│   ├── backend
│   └── frontend
├── packages
│   └── shared
├── docs
├── turbo.json
└── pnpm-workspace.yaml
```

## 🛠 Tech Stack

### Frontend

-   React 18
-   TypeScript
-   Vite
-   Tailwind CSS

### Backend

-   Node.js
-   Express
-   Prisma
-   PostgreSQL

### AI

-   Groq
-   Google Gemini

### Deployment

-   Vercel
-   Render
-   Neon PostgreSQL

## 📦 API

-   POST /api/v1/auth/register
-   POST /api/v1/auth/login
-   POST /api/v1/trips/plan
-   GET /api/v1/trips
-   GET /api/v1/trips/:id
-   DELETE /api/v1/trips/:id

## ⚙️ Setup

``` bash
git clone https://github.com/shujaa786/Trip_Adviser.AI.git
cd Trip_Adviser.AI
pnpm install
pnpm dev
```

## 🌍 Environment

``` env
DATABASE_URL=
JWT_SECRET=
GROQ_API_KEY=
GEMINI_API_KEY=
VITE_API_BASE_URL=
```

## 📈 Future Improvements

-   Streaming responses
-   Weather integration
-   Maps integration
-   Conversation memory
-   Role-based access
-   Observability

## 📄 License

MIT
