import streamlit as st
import httpx
from typing import Dict, Any
import json

# Configure page
st.set_page_config(
    page_title="Investment Planning AI",
    page_icon="📈",
    layout="wide"
)

# Constants
API_URL = "http://localhost:8000/api"

def main():
    st.title("Investment Planning AI 📈")
    st.write("with 💖by San ")
    
    # Sidebar for user input
    with st.sidebar:
        st.header("Your Profile")
        profile = collect_user_profile()
        
        if st.button("Generate Recommendations"):
            if validate_profile(profile):
                with st.spinner("Analyzing your profile..."):
                    recommendation = get_investment_recommendation(profile)
                    if recommendation:
                        st.session_state.recommendation = recommendation
                        st.success("Analysis complete!")
    
    # Main content area
    if "recommendation" in st.session_state:
        display_recommendation(st.session_state.recommendation)

def collect_user_profile() -> Dict[str, Any]:
    risk_tolerance = st.selectbox(
        "Risk Tolerance",
        ["conservative", "moderate", "aggressive"]
    )
    
    investment_goal = st.selectbox(
        "Investment Goal",
        ["retirement", "shortTerm", "wealth", "education"]
    )
    
    current_savings = st.number_input(
        "Current Savings ($)",
        min_value=0,
        value=10000
    )
    
    monthly_investment = st.number_input(
        "Monthly Investment ($)",
        min_value=0,
        value=500
    )
    
    age = st.number_input(
        "Age",
        min_value=18,
        max_value=100,
        value=30
    )
    
    time_horizon = st.number_input(
        "Investment Time Horizon (years)",
        min_value=1,
        max_value=50,
        value=10
    )
    
    return {
        "risk_tolerance": risk_tolerance,
        "investment_goal": investment_goal,
        "current_savings": current_savings,
        "monthly_investment": monthly_investment,
        "age": age,
        "time_horizon": time_horizon
    }

def validate_profile(profile: Dict[str, Any]) -> bool:
    required_fields = [
        "risk_tolerance",
        "investment_goal",
        "current_savings",
        "monthly_investment",
        "age",
        "time_horizon"
    ]
    
    return all(profile.get(field) is not None for field in required_fields)

def get_investment_recommendation(profile: Dict[str, Any]) -> Dict[str, Any]:
    try:
        with httpx.Client() as client:
            response = client.post(
                f"{API_URL}/investments/recommend",
                json=profile
            )
            response.raise_for_status()
            return response.json()
    except Exception as e:
        st.error(f"Error getting recommendations: {str(e)}")
        return None

def display_recommendation(recommendation: Dict[str, Any]):
    # Display portfolio allocation
    st.header("Portfolio Allocation")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Stocks", f"{recommendation['stocks']}%")
    with col2:
        st.metric("Bonds", f"{recommendation['bonds']}%")
    with col3:
        st.metric("Cash", f"{recommendation['cash']}%")
    
    # Display AI insights
    st.header("AI Investment Insights")
    insights = recommendation["ai_insights"]
    
    with st.expander("Summary", expanded=True):
        st.write(insights["summary"])
    
    with st.expander("Risk Analysis"):
        st.write(insights["risk_analysis"])
    
    with st.expander("Market Conditions"):
        st.write(insights["market_conditions"])
    
    with st.expander("Recommendations"):
        for rec in insights["recommendations"]:
            st.write(f"• {rec}")
    
    with st.expander("Key Considerations"):
        for consideration in insights["considerations"]:
            st.write(f"• {consideration}")

if __name__ == "__main__":
    main()
