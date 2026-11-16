

## Deploying the Python FastAPI Backend Directly on Vercel https://bachu-portfolio.vercel.app/

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
