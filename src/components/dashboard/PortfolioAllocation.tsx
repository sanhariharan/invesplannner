import React from 'react';
import { InvestmentRecommendation } from '../../types/investment';
import { PieChart } from 'lucide-react';

interface PortfolioAllocationProps {
  recommendation: InvestmentRecommendation;
}

export default function PortfolioAllocation({ recommendation }: PortfolioAllocationProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <PieChart className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Portfolio Allocation</h2>
      </div>

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

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700">{recommendation.description}</p>
      </div>
    </div>
  );
}

interface AllocationChartProps {
  allocation: InvestmentRecommendation;
}

function AllocationChart({ allocation }: AllocationChartProps) {
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

interface AllocationLegendItemProps {
  color: string;
  label: string;
  value: number;
}

function AllocationLegendItem({ color, label, value }: AllocationLegendItemProps) {
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