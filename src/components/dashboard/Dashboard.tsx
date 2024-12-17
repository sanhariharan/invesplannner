import React from 'react';
import { UserProfile, InvestmentRecommendation } from '../../types/investment';
import StatisticsPanel from './StatisticsPanel';
import PortfolioAllocation from './PortfolioAllocation';
import AiInsightsPanel from '../ai/AiInsightsPanel';

interface DashboardProps {
  profile: UserProfile;
  recommendation: InvestmentRecommendation;
}

export default function Dashboard({ profile, recommendation }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <StatisticsPanel profile={profile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PortfolioAllocation recommendation={recommendation} />
        <AiInsightsPanel insights={recommendation.aiInsights} />
      </div>
    </div>
  );
}