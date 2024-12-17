import { create } from 'zustand';
import { UserProfile, InvestmentRecommendation } from '../types/investment';
import { InvestmentService } from '../services/investment/investmentService';

interface InvestmentState {
  profile: UserProfile | null;
  recommendation: InvestmentRecommendation | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  generateRecommendation: (profile: UserProfile) => Promise<void>;
  reset: () => void;
}

export const useInvestmentStore = create<InvestmentState>((set) => ({
  profile: null,
  recommendation: null,
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  generateRecommendation: async (profile) => {
    const investmentService = InvestmentService.getInstance();
    
    set({ isLoading: true, error: null });
    
    try {
      const recommendation = await investmentService.generateRecommendation(profile);
      set({ recommendation, profile, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to generate investment recommendation. Please try again.',
        isLoading: false 
      });
    }
  },

  reset: () => set({ 
    profile: null, 
    recommendation: null, 
    error: null 
  }),
}));