from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
import asyncpg
import os

app = FastAPI(title="LMS Python Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/lms")

@app.on_event("startup")
async def startup():
    app.state.pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=10)

@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()

@app.get("/health")
async def health():
    return {"status": "ok", "service": "python", "time": datetime.utcnow()}

@app.get("/api/analytics/summary")
async def analytics_summary():
    """Aggregated stats for the dashboard - heavy math lives here."""
    async with app.state.pool.acquire() as conn:
        incoming_total = await conn.fetchval("SELECT COUNT(*) FROM incoming_letters")
        outgoing_total = await conn.fetchval("SELECT COUNT(*) FROM outgoing_letters")
        pending_approvals = await conn.fetchval(
            "SELECT COUNT(*) FROM approval_workflow WHERE status = 'pending'"
        )
        by_status = await conn.fetch(
            "SELECT status, COUNT(*) as count FROM incoming_letters GROUP BY status"
        )
        by_priority = await conn.fetch(
            "SELECT priority, COUNT(*) as count FROM outgoing_letters GROUP BY priority"
        )
    return {
        "incoming_total": incoming_total,
        "outgoing_total": outgoing_total,
        "pending_approvals": pending_approvals,
        "incoming_by_status": [dict(r) for r in by_status],
        "outgoing_by_priority": [dict(r) for r in by_priority],
    }

@app.get("/api/erp/export/{letter_type}")
async def export_for_erp(letter_type: str):
    """ERP-facing endpoint (normalized payload)."""
    if letter_type not in ("incoming", "outgoing"):
        raise HTTPException(400, "Invalid type")
    table = f"{letter_type}_letters"
    async with app.state.pool.acquire() as conn:
        rows = await conn.fetch(f"SELECT * FROM {table} ORDER BY created_at DESC LIMIT 500")
    return {"type": letter_type, "count": len(rows), "data": [dict(r) for r in rows]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)