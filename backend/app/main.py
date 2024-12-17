from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import investment, ai_insights, user
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router, prefix="/api/users", tags=["users"])
app.include_router(investment.router, prefix="/api/investments", tags=["investments"])
app.include_router(ai_insights.router, prefix="/api/ai-insights", tags=["ai-insights"])