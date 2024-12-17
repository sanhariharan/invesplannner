import React from 'react';
import { UserProfile } from '../../types/investment';
import { useInvestmentStore } from '../../store/investmentStore';

export default function QuestionnaireForm() {
  const generateRecommendation = useInvestmentStore((state) => state.generateRecommendation);
  const [formData, setFormData] = React.useState<Partial<UserProfile>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProfileComplete(formData)) {
      await generateRecommendation(formData);
    }
  };

  const updateFormData = (update: Partial<UserProfile>) => {
    setFormData((prev) => ({ ...prev, ...update }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Risk Tolerance</label>
        <div className="mt-2 space-y-2">
          {['conservative', 'moderate', 'aggressive'].map((risk) => (
            <button
              key={risk}
              type="button"
              className={`w-full p-4 text-left rounded-lg border ${
                formData.riskTolerance === risk
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => updateFormData({ riskTolerance: risk as UserProfile['riskTolerance'] })}
            >
              <span className="capitalize font-medium">{risk}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Investment Goal</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.investmentGoal || ''}
          onChange={(e) => updateFormData({ investmentGoal: e.target.value as UserProfile['investmentGoal'] })}
        >
          <option value="">Select a goal</option>
          <option value="retirement">Retirement Planning</option>
          <option value="shortTerm">Short-term Savings</option>
          <option value="wealth">Wealth Building</option>
          <option value="education">Education Fund</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Savings ($)</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.currentSavings || ''}
            onChange={(e) => updateFormData({ currentSavings: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Investment ($)</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.monthlyInvestment || ''}
            onChange={(e) => updateFormData({ monthlyInvestment: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            min="18"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.age || ''}
            onChange={(e) => updateFormData({ age: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Time Horizon (years)</label>
          <input
            type="number"
            min="1"
            max="50"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.timeHorizon || ''}
            onChange={(e) => updateFormData({ timeHorizon: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          disabled={!isProfileComplete(formData)}
        >
          Get Recommendations
        </button>
      </div>
    </form>
  );
}

function isProfileComplete(profile: Partial<UserProfile>): profile is UserProfile {
  return !!(
    profile.riskTolerance &&
    profile.investmentGoal &&
    profile.monthlyInvestment &&
    profile.timeHorizon &&
    profile.age &&
    profile.currentSavings
  );
}