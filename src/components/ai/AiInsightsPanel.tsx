import React from 'react';
import { AiInsights } from '../../types/investment';
import { Brain, AlertTriangle, TrendingUp, List, FileText } from 'lucide-react';

interface AiInsightsPanelProps {
  insights: AiInsights;
}

export default function AiInsightsPanel({ insights }: AiInsightsPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold">AI Investment Insights</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p className="text-gray-600">{insights.summary}</p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Risk Analysis</h3>
          </div>
          <p className="text-gray-600">{insights.riskAnalysis}</p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Market Conditions</h3>
          </div>
          <p className="text-gray-600">{insights.marketConditions}</p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <List className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {insights.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold">Key Considerations</h3>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {insights.considerations.map((consideration, index) => (
              <li key={index}>{consideration}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}