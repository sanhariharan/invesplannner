import React, { useState } from 'react';
import { UserProfile, InvestmentRecommendation } from './types';
import { calculateInvestmentStrategy } from './utils/investmentCalculator';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import { Bot } from 'lucide-react';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendation, setRecommendation] = useState<InvestmentRecommendation | null>(null);

  const handleQuestionnaireSubmit = (userProfile: UserProfile) => {
    setProfile(userProfile);
    const investmentRecommendation = calculateInvestmentStrategy(userProfile);
    setRecommendation(investmentRecommendation);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Investment Planning AI</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!profile ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Plan Your Financial Future
              </h2>
              <p className="text-lg text-gray-600">
                Answer a few questions to get personalized investment recommendations
                powered by AI.
              </p>
            </div>
            <Questionnaire onSubmit={handleQuestionnaireSubmit} />
          </div>
        ) : (
          recommendation && <Dashboard profile={profile} recommendation={recommendation} />
        )}
      </main>
    </div>
  );
}

export default App;