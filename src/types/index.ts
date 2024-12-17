export interface UserProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoal: 'retirement' | 'shortTerm' | 'wealth' | 'education';
  monthlyInvestment: number;
  timeHorizon: number;
  age: number;
  currentSavings: number;
}

export interface InvestmentRecommendation {
  stocks: number;
  bonds: number;
  cash: number;
  description: string;
}