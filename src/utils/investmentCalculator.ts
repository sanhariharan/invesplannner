import { UserProfile, InvestmentRecommendation } from '../types';

export function calculateInvestmentStrategy(profile: UserProfile): InvestmentRecommendation {
  let stocks = 0;
  let bonds = 0;
  let cash = 0;

  // Base allocation on risk tolerance
  switch (profile.riskTolerance) {
    case 'conservative':
      stocks = 40;
      bonds = 50;
      cash = 10;
      break;
    case 'moderate':
      stocks = 60;
      bonds = 35;
      cash = 5;
      break;
    case 'aggressive':
      stocks = 80;
      bonds = 15;
      cash = 5;
      break;
  }

  // Adjust based on time horizon
  if (profile.timeHorizon < 5) {
    stocks -= 20;
    bonds += 10;
    cash += 10;
  } else if (profile.timeHorizon > 15) {
    stocks += 10;
    bonds -= 5;
    cash -= 5;
  }

  // Ensure allocations are within reasonable bounds
  stocks = Math.max(20, Math.min(90, stocks));
  bonds = Math.max(10, Math.min(70, bonds));
  cash = Math.max(5, Math.min(30, cash));

  // Normalize to ensure total is 100%
  const total = stocks + bonds + cash;
  stocks = Math.round((stocks / total) * 100);
  bonds = Math.round((bonds / total) * 100);
  cash = 100 - stocks - bonds;

  return {
    stocks,
    bonds,
    cash,
    description: generateRecommendationDescription(profile, { stocks, bonds, cash })
  };
}

function generateRecommendationDescription(
  profile: UserProfile,
  allocation: { stocks: number; bonds: number; cash: number }
): string {
  const { stocks, bonds, cash } = allocation;
  const timeFrame = profile.timeHorizon < 5 ? 'short-term' : profile.timeHorizon > 15 ? 'long-term' : 'medium-term';
  
  return `Based on your ${profile.riskTolerance} risk tolerance and ${timeFrame} investment horizon, we recommend a portfolio allocation of ${stocks}% stocks, ${bonds}% bonds, and ${cash}% cash. This strategy aims to ${profile.riskTolerance === 'conservative' ? 'preserve capital while generating steady income' : profile.riskTolerance === 'moderate' ? 'balance growth with stability' : 'maximize long-term growth potential'}.`;
}