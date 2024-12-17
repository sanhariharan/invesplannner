import React from 'react';
import { PieChart, BarChart3, DollarSign, Clock } from 'lucide-react';
import { UserProfile, InvestmentRecommendation } from '../types';

interface DashboardProps {
  profile: UserProfile;
  recommendation: InvestmentRecommendation;
}

export default function Dashboard({ profile, recommendation }: DashboardProps) {
  const projectedValue = calculateProjectedValue(
    profile.currentSavings,
    profile.monthlyInvestment,
    profile.timeHorizon
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-blue-500" />}
          title="Current Savings"
          value={`$${profile.currentSavings.toLocaleString()}`}
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6 text-green-500" />}
          title="Monthly Investment"
          value={`$${profile.monthlyInvestment.toLocaleString()}`}
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-purple-500" />}
          title="Time Horizon"
          value={`${profile.timeHorizon} years`}
        />
        <StatCard
          icon={<PieChart className="w-6 h-6 text-orange-500" />}
          title="Projected Value"
          value={`$${projectedValue.toLocaleString()}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Portfolio Allocation</h2>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <AllocationChart allocation={recommendation} />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <AllocationLegendItem color="bg-blue-500" label="Stocks" value={recommendation.stocks} />
            <AllocationLegendItem color="bg-green-500" label="Bonds" value={recommendation.bonds} />
            <AllocationLegendItem color="bg-yellow-500" label="Cash" value={recommendation.cash} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Investment Strategy</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {recommendation.description}
          </p>
          <div className="space-y-4">
            <RecommendationCard
              title="Risk Level"
              value={profile.riskTolerance}
              description="Your selected risk tolerance level affects the portfolio allocation"
            />
            <RecommendationCard
              title="Investment Goal"
              value={profile.investmentGoal}
              description="Your primary investment objective"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function AllocationChart({ allocation }: { allocation: InvestmentRecommendation }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <svg className="w-full h-full -rotate-90 transform">
      {[
        { color: '#3B82F6', value: allocation.stocks },
        { color: '#22C55E', value: allocation.bonds },
        { color: '#EAB308', value: allocation.cash },
      ].map((segment, index) => {
        const percentage = segment.value / 100;
        const strokeDasharray = `${circumference * percentage} ${circumference}`;
        const strokeDashoffset = -circumference * accumulatedPercentage;
        accumulatedPercentage += percentage;

        return (
          <circle
            key={index}
            cx="50%"
            cy="50%"
            r={radius}
            stroke={segment.color}
            strokeWidth="12"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            fill="none"
          />
        );
      })}
    </svg>
  );
}

function AllocationLegendItem({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className={`w-4 h-4 rounded-full ${color}`} />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="font-medium">{value}%</span>
    </div>
  );
}

function RecommendationCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <p className="text-lg font-semibold text-blue-600 mt-2 capitalize">{value}</p>
    </div>
  );
}

function calculateProjectedValue(
  currentSavings: number,
  monthlyInvestment: number,
  timeHorizon: number
): number {
  const annualReturn = 0.07; // 7% average annual return
  const monthlyRate = annualReturn / 12;
  const months = timeHorizon * 12;

  // Future value of current savings
  const futureValueSavings = currentSavings * Math.pow(1 + annualReturn, timeHorizon);

  // Future value of monthly investments
  const futureValueInvestments =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return Math.round(futureValueSavings + futureValueInvestments);
}