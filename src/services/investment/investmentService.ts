import { UserProfile, InvestmentRecommendation, AiInsights } from '../../types/investment';
import LlamaService from '../ai/llamaService';

export class InvestmentService {
  private static instance: InvestmentService;
  private llamaService: LlamaService;

  private constructor() {
    this.llamaService = LlamaService.getInstance();
  }

  public static getInstance(): InvestmentService {
    if (!InvestmentService.instance) {
      InvestmentService.instance = new InvestmentService();
    }
    return InvestmentService.instance;
  }

  public async generateRecommendation(profile: UserProfile): Promise<InvestmentRecommendation> {
    const baseAllocation = this.calculateBaseAllocation(profile);
    const aiInsights = await this.generateAiInsights(profile);

    return {
      ...baseAllocation,
      aiInsights,
    };
  }

  private calculateBaseAllocation(profile: UserProfile) {
    let stocks = 0;
    let bonds = 0;
    let cash = 0;

    // Risk-based allocation
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

    // Time horizon adjustments
    if (profile.timeHorizon < 5) {
      stocks -= 20;
      bonds += 10;
      cash += 10;
    } else if (profile.timeHorizon > 15) {
      stocks += 10;
      bonds -= 5;
      cash -= 5;
    }

    // Age-based adjustments
    if (profile.age > 60) {
      stocks -= 10;
      bonds += 5;
      cash += 5;
    }

    // Normalize allocations
    const total = stocks + bonds + cash;
    stocks = Math.round((stocks / total) * 100);
    bonds = Math.round((bonds / total) * 100);
    cash = 100 - stocks - bonds;

    return {
      stocks,
      bonds,
      cash,
      description: this.generateDescription(profile, { stocks, bonds, cash }),
    };
  }

  private async generateAiInsights(profile: UserProfile): Promise<AiInsights> {
    const profileString = JSON.stringify(profile);
    
    try {
      const [adviceResponse, riskAnalysisResponse] = await Promise.all([
        this.llamaService.generateInvestmentAdvice(profileString),
        this.llamaService.analyzeRiskProfile(profileString),
      ]);

      return this.parseAiResponses(adviceResponse, riskAnalysisResponse);
    } catch (error) {
      console.error('Error generating AI insights:', error);
      return this.getFallbackInsights();
    }
  }

  private parseAiResponses(adviceResponse: string, riskAnalysis: string): AiInsights {
    return {
      summary: this.extractSummary(adviceResponse),
      riskAnalysis: riskAnalysis,
      marketConditions: this.extractMarketConditions(adviceResponse),
      recommendations: this.extractRecommendations(adviceResponse),
      considerations: this.extractConsiderations(adviceResponse),
    };
  }

  private extractSummary(response: string): string {
    // Implementation to extract summary from AI response
    return response.split('\n')[0] || 'AI-generated investment summary not available.';
  }

  private extractMarketConditions(response: string): string {
    // Implementation to extract market conditions from AI response
    return 'Current market conditions analysis based on AI insights.';
  }

  private extractRecommendations(response: string): string[] {
    // Implementation to extract recommendations from AI response
    return ['Diversify portfolio across multiple asset classes', 'Consider regular rebalancing'];
  }

  private extractConsiderations(response: string): string[] {
    // Implementation to extract considerations from AI response
    return ['Market volatility', 'Long-term investment horizon'];
  }

  private getFallbackInsights(): AiInsights {
    return {
      summary: 'AI-generated insights temporarily unavailable.',
      riskAnalysis: 'Standard risk analysis based on your profile.',
      marketConditions: 'Please consult current market conditions.',
      recommendations: [
        'Maintain diversified portfolio',
        'Regular portfolio rebalancing',
        'Consider consulting a financial advisor',
      ],
      considerations: [
        'Market volatility',
        'Personal risk tolerance',
        'Investment timeline',
      ],
    };
  }

  private generateDescription(
    profile: UserProfile,
    allocation: { stocks: number; bonds: number; cash: number }
  ): string {
    const { stocks, bonds, cash } = allocation;
    const timeFrame = profile.timeHorizon < 5 ? 'short-term' : profile.timeHorizon > 15 ? 'long-term' : 'medium-term';
    
    return `Based on your ${profile.riskTolerance} risk tolerance and ${timeFrame} investment horizon, we recommend a portfolio allocation of ${stocks}% stocks, ${bonds}% bonds, and ${cash}% cash. This strategy aims to ${profile.riskTolerance === 'conservative' ? 'preserve capital while generating steady income' : profile.riskTolerance === 'moderate' ? 'balance growth with stability' : 'maximize long-term growth potential'}.`;
  }
}