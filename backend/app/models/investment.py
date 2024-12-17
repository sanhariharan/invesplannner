from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from enum import Enum

class RiskTolerance(str, Enum):
    CONSERVATIVE = "conservative"
    MODERATE = "moderate"
    AGGRESSIVE = "aggressive"

class InvestmentGoal(str, Enum):
    RETIREMENT = "retirement"
    SHORT_TERM = "shortTerm"
    WEALTH = "wealth"
    EDUCATION = "education"

class UserProfile(BaseModel):
    risk_tolerance: RiskTolerance
    investment_goal: InvestmentGoal
    monthly_investment: float = Field(gt=0)
    time_horizon: int = Field(gt=0)
    age: int = Field(gt=0)
    current_savings: float = Field(ge=0)
    income: Optional[float] = Field(default=None, ge=0)
    expenses: Optional[float] = Field(default=None, ge=0)
    dependents: Optional[int] = Field(default=None, ge=0)
    existing_investments: Optional[Dict[str, float]] = None

class AiInsights(BaseModel):
    summary: str
    risk_analysis: str
    market_conditions: str
    recommendations: List[str]
    considerations: List[str]

class InvestmentRecommendation(BaseModel):
    stocks: float = Field(ge=0, le=100)
    bonds: float = Field(ge=0, le=100)
    cash: float = Field(ge=0, le=100)
    description: str
    ai_insights: AiInsights