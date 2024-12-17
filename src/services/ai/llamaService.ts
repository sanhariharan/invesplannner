import { pipeline } from '@xenova/transformers';

class LlamaService {
  private static instance: LlamaService;
  private model: any;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): LlamaService {
    if (!LlamaService.instance) {
      LlamaService.instance = new LlamaService();
    }
    return LlamaService.instance;
  }

  public async initialize() {
    if (!this.initialized) {
      try {
        this.model = await pipeline(
          'text-generation',
          'Xenova/LaMini-Flan-T5-783M' // Using a smaller model suitable for browser
        );
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize AI model:', error);
        throw error;
      }
    }
  }

  public async generateInvestmentAdvice(profile: string): Promise<string> {
    if (!this.initialized) {
      await this.initialize();
    }

    const prompt = `As a financial advisor, provide detailed investment advice for the following investor profile: ${profile}. 
    Consider market conditions, risk tolerance, and long-term goals. Format the response with clear recommendations.`;

    try {
      const result = await this.model(prompt, {
        max_length: 500,
        temperature: 0.7,
      });

      return result[0].generated_text;
    } catch (error) {
      console.error('Error generating investment advice:', error);
      throw error;
    }
  }

  public async analyzeRiskProfile(profile: string): Promise<string> {
    if (!this.initialized) {
      await this.initialize();
    }

    const prompt = `Analyze the risk profile and provide insights for: ${profile}. 
    Consider age, investment horizon, and financial goals. Provide specific recommendations for risk management.`;

    try {
      const result = await this.model(prompt, {
        max_length: 300,
        temperature: 0.6,
      });

      return result[0].generated_text;
    } catch (error) {
      console.error('Error analyzing risk profile:', error);
      throw error;
    }
  }
}