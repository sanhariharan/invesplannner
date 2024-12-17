export interface UserProfile {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoal: 'retirement' | 'shortTerm' | 'wealth' | 'education';
  monthlyInvestment: number;
  timeHorizon: number;
  age: number;
  currentSavings: number;
  income?: number;
  expenses?: number;
  dependents?: number;
  existingInvestments?: {
    stocks?: number;
    bonds?: number;
    cash?: number;
    other?: number;
  };
}

export interface InvestmentRecommendation {
  stocks: number;
  bonds: number;
  cash: number;
  description: string;
  aiInsights: AiInsights;
}

export interface AiInsights {
  summary: string;
  riskAnalysis: string;
  marketConditions: string;
  recommendations: string[];
  considerations: string[];
}