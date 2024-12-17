from app.models.investment import UserProfile, InvestmentRecommendation, AiInsights
from app.services.ai_service import AiService

class InvestmentService:
    def __init__(self):
        self.ai_service = AiService()

    async def generate_recommendation(self, profile: UserProfile) -> InvestmentRecommendation:
        base_allocation = self._calculate_base_allocation(profile)
        ai_insights = await self.ai_service.generate_insights(profile)
        
        return InvestmentRecommendation(
            **base_allocation,
            ai_insights=ai_insights
        )

    def _calculate_base_allocation(self, profile: UserProfile) -> dict:
        # Implementation of portfolio allocation logic
        allocations = {
            RiskTolerance.CONSERVATIVE: {"stocks": 40, "bonds": 50, "cash": 10},
            RiskTolerance.MODERATE: {"stocks": 60, "bonds": 35, "cash": 5},
            RiskTolerance.AGGRESSIVE: {"stocks": 80, "bonds": 15, "cash": 5}
        }
        
        base = allocations[profile.risk_tolerance].copy()
        
        # Apply time horizon adjustments
        if profile.time_horizon < 5:
            base["stocks"] -= 20
            base["bonds"] += 10
            base["cash"] += 10
        elif profile.time_horizon > 15:
            base["stocks"] += 10
            base["bonds"] -= 5
            base["cash"] -= 5
            
        # Normalize allocations
        total = sum(base.values())
        for key in base:
            base[key] = round((base[key] / total) * 100, 2)
            
        base["description"] = self._generate_description(profile, base)
        return base

    def _generate_description(self, profile: UserProfile, allocation: dict) -> str:
        time_frame = "short-term" if profile.time_horizon < 5 else "long-term" if profile.time_horizon > 15 else "medium-term"
        
        return f"Based on your {profile.risk_tolerance.value} risk tolerance and {time_frame} investment horizon, " \
               f"we recommend a portfolio allocation of {allocation['stocks']}% stocks, {allocation['bonds']}% bonds, " \
               f"and {allocation['cash']}% cash."