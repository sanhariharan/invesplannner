import React from 'react';
import { UserProfile } from '../../types/investment';
import { DollarSign, BarChart3, Clock, Users } from 'lucide-react';

interface StatisticsPanelProps {
  profile: UserProfile;
}

export default function StatisticsPanel({ profile }: StatisticsPanelProps) {
  const projectedValue = calculateProjectedValue(
    profile.currentSavings,
    profile.monthlyInvestment,
    profile.timeHorizon
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        icon={<Users className="w-6 h-6 text-orange-500" />}
        title="Projected Value"
        value={`$${projectedValue.toLocaleString()}`}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function StatCard({ icon, title, value }: StatCardProps) {
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