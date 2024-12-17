import { UserProfile } from '../types/investment';

export function validateProfile(profile: Partial<UserProfile>): profile is UserProfile {
  const requiredFields: (keyof UserProfile)[] = [
    'riskTolerance',
    'investmentGoal',
    'monthlyInvestment',
    'timeHorizon',
    'age',
    'currentSavings'
  ];

  return requiredFields.every((field) => {
    const value = profile[field];
    if (value === undefined || value === null) return false;
    if (typeof value === 'number' && isNaN(value)) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    return true;
  });
}

export function validateNumber(value: number, min: number, max?: number): boolean {
  if (isNaN(value)) return false;
  if (value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}