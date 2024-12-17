import React, { useState } from 'react';
import { UserProfile } from '../types';

interface QuestionnaireProps {
  onSubmit: (profile: UserProfile) => void;
}

export default function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const updateProfile = (update: Partial<UserProfile>) => {
    setProfile({ ...profile, ...update });
  };

  const handleSubmit = () => {
    if (isProfileComplete(profile)) {
      onSubmit(profile as UserProfile);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`w-1/4 h-2 rounded-full mx-1 ${
                num <= step ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">
          Step {step} of 4
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Risk Tolerance</h2>
          <div className="space-y-4">
            {['conservative', 'moderate', 'aggressive'].map((risk) => (
              <button
                key={risk}
                className={`w-full p-4 text-left rounded-lg border ${
                  profile.riskTolerance === risk
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updateProfile({ riskTolerance: risk as UserProfile['riskTolerance'] })}
              >
                <span className="capitalize font-medium">{risk}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Investment Goal</h2>
          <div className="space-y-4">
            {[
              { value: 'retirement', label: 'Retirement Planning' },
              { value: 'shortTerm', label: 'Short-term Savings' },
              { value: 'wealth', label: 'Wealth Building' },
              { value: 'education', label: 'Education Fund' },
            ].map(({ value, label }) => (
              <button
                key={value}
                className={`w-full p-4 text-left rounded-lg border ${
                  profile.investmentGoal === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => updateProfile({ investmentGoal: value as UserProfile['investmentGoal'] })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Financial Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Savings ($)
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profile.currentSavings || ''}
                onChange={(e) => updateProfile({ currentSavings: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monthly Investment ($)
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profile.monthlyInvestment || ''}
                onChange={(e) => updateProfile({ monthlyInvestment: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profile.age || ''}
                onChange={(e) => updateProfile({ age: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Investment Time Horizon (years)
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profile.timeHorizon || ''}
                onChange={(e) => updateProfile({ timeHorizon: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="ml-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Get Recommendations
          </button>
        )}
      </div>
    </div>
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