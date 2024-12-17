from transformers import pipeline
from app.models.investment import UserProfile, AiInsights
import asyncio
import json

class AiService:
    def __init__(self):
        self.model = pipeline(
            "text-generation",
            model="facebook/opt-350m",  # Using a smaller model for faster inference
            device=-1  # CPU
        )

    async def generate_insights(self, profile: UserProfile) -> AiInsights:
        # Run AI analysis in a thread pool to avoid blocking
        loop = asyncio.get_event_loop()
        insights = await loop.run_in_executor(
            None, self._generate_insights_sync, profile
        )
        return insights

    def _generate_insights_sync(self, profile: UserProfile) -> AiInsights:
        profile_str = json.dumps(profile.dict())
        
        try:
            # Generate investment advice
            prompt = f"Analyze this investment profile and provide recommendations: {profile_str}"
            response = self.model(prompt, max_length=200, num_return_sequences=1)[0]['generated_text']
            
            # Parse the response and create insights
            return AiInsights(
                summary=self._extract_summary(response),
                risk_analysis=self._analyze_risk(profile),
                market_conditions="Based on current market conditions...",
                recommendations=self._extract_recommendations(response),
                considerations=self._extract_considerations(response)
            )
        except Exception as e:
            print(f"Error generating AI insights: {e}")
            return self._get_fallback_insights()

    def _extract_summary(self, response: str) -> str:
        # Extract summary from AI response
        return response.split('.')[0] + '.'

    def _analyze_risk(self, profile: UserProfile) -> str:
        risk_factors = []
        if profile.time_horizon < 5:
            risk_factors.append("short investment horizon")
        if profile.age > 60:
            risk_factors.append("retirement consideration")
            
        return f"Risk analysis based on {', '.join(risk_factors)}" if risk_factors else "Standard risk profile"

    def _extract_recommendations(self, response: str) -> list:
        return [
            "Diversify across multiple asset classes",
            "Regular portfolio rebalancing",
            "Consider tax-efficient investments"
        ]

    def _extract_considerations(self, response: str) -> list:
        return [
            "Market volatility",
            "Personal risk tolerance",
            "Investment timeline"
        ]

    def _get_fallback_insights(self) -> AiInsights:
        return AiInsights(
            summary="Standard investment analysis based on your profile.",
            risk_analysis="Please consult with a financial advisor for detailed risk analysis.",
            market_conditions="Market conditions should be evaluated regularly.",
            recommendations=[
                "Maintain a diversified portfolio",
                "Regular portfolio rebalancing",
                "Consider consulting a financial advisor"
            ],
            considerations=[
                "Market volatility",
                "Personal risk tolerance",
                "Investment timeline"
            ]
        )