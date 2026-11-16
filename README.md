# Bachu Venkata Sai Sandeep — Personal Portfolio (React + Python FastAPI)

A modern, multi-page academic and developer portfolio built for **Bachu Venkata Sai Sandeep** (B.Tech in Artificial Intelligence & Machine Learning, Jain University, Bangalore).

The project combines a **React 19 + TypeScript + Vite 8 + Tailwind CSS 4** frontend with a **Python FastAPI + Pydantic v2 + SQLAlchemy 2.0 + ReportLab** backend inside `backend/`, configured for direct deployment on **Vercel's native Python runtime**.

---

## Architecture Overview

- **Frontend (`src/`)**: React 19, TypeScript, Vite 8, Tailwind CSS 4, Motion, Lucide React
  - Preserves the Burgundy & Cream visual identity (`#FAF7F2`, `#642E3B`, `#A65D70`, `#EBDDD7`, `#40363A`, `#FFFFFF`).
  - Multi-page navigation across `/`, `/about`, `/skills`, `/projects`, `/projects/jain-smart-navigation`, `/education`, `/achievements`, and `/contact`.
  - Centralized typed API client at `src/services/api.ts`.
- **Backend (`backend/`)**: Python 3.10+, FastAPI, Pydantic v2, SQLAlchemy 2.0 (SQLite), ReportLab
  - `GET /` — Root status endpoint
  - `GET /api/health` — Backend service and SQLite database health check
  - `GET /api/profile` — Verified candidate profile and contact details
  - `GET /api/skills` — Verified programming skills, tools, areas of interest, and spoken languages
  - `GET /api/projects` — Featured academic projects (`JAIN Smart Campus Navigation`)
  - `GET /api/education` — Verified academic timeline and semester SGPA records (`8.45` & `8.95`)
  - `GET /api/achievements` — Verified hackathon participation (`Smart India Hackathon`)
  - `POST /api/contact` — Validated, rate-limited contact submission with honeypot spam check, SQLite persistence, and optional SMTP notification
  - `GET /api/resume` & `GET /api/resume/download` — Resume metadata and server-generated single-page PDF download

---

## Deploying the Python FastAPI Backend Directly on Vercel

The `backend/` directory is structured as a standalone Vercel Python project using **Vercel's native FastAPI detection** (no Supabase, Neon, Render, Railway, or external database required):

1. Import the repository (`https://github.com/sandeep-bachu08/sandeep-portfolio`) into Vercel.
2. Set **Root Directory** to `backend`.
3. Vercel automatically detects:
   - **Main Entrypoint**: `main.py`
   - **FastAPI Application Variable**: `app`
   - **Dependencies**: `requirements.txt`
   - No custom server startup command or separate Uvicorn process is needed on Vercel.

### Important Note on SQLite Storage on Vercel

- In local development, SQLite writes to `backend/portfolio.db`.
- When running on Vercel's serverless Python runtime (`VERCEL=1` or read-only filesystem), `backend/config.py` automatically configures SQLite to use the writable `/tmp/sandeep_portfolio.db` location.
- **Persistence Limitation**: Because Vercel serverless functions use ephemeral `/tmp` storage, **SQLite data on Vercel is temporary and is not guaranteed to persist** across cold starts or separate function instances. For permanent notification delivery without an external database, configure the optional `SMTP_*` environment variables.

---

## Local Development Setup

### 1. Frontend + Auto-Proxied Backend

```bash
npm install
npm run dev
```

### 2. Running the FastAPI Backend Directly from `backend/`

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt uvicorn
uvicorn main:app --reload --port 8000
```
