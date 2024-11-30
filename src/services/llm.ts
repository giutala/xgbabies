import axios from 'axios';

interface LLMConfig {
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface LLMResponse {
  analysis: string;
  confidence: number;
  recommendations: string[];
}

interface LLMError {
  message: string;
  code: string;
}

const DEFAULT_CONFIG: LLMConfig = {
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
};

class LLMService {
  private readonly api: ReturnType<typeof axios.create>;
  private config: LLMConfig;

  constructor(baseURL: string, config: Partial<LLMConfig> = {}) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async analyzeInvestment(data: {
    description: string;
    marketAnalysis: string;
    financials: string;
  }): Promise<LLMResponse> {
    try {
      const response = await this.api.post<LLMResponse>('/analyze', {
        ...data,
        config: { ...this.config },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const llmError = error.response.data as LLMError;
        throw new Error(`LLM Analysis failed: ${llmError.message}`);
      }
      throw new Error('Failed to analyze investment data');
    }
  }

  async generateReport(analysis: LLMResponse): Promise<string> {
    try {
      const response = await this.api.post<{ reportUrl: string }>('/generate-report', {
        analysis: {
          ...analysis,
          recommendations: [...analysis.recommendations],
        },
        config: { ...this.config },
      });

      return response.data.reportUrl;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const llmError = error.response.data as LLMError;
        throw new Error(`Report generation failed: ${llmError.message}`);
      }
      throw new Error('Failed to generate report');
    }
  }

  async validateInput(input: string): Promise<{
    isValid: boolean;
    feedback: string;
  }> {
    try {
      const response = await this.api.post<{
        isValid: boolean;
        feedback: string;
      }>('/validate', {
        input,
        config: { ...this.config },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const llmError = error.response.data as LLMError;
        throw new Error(`Input validation failed: ${llmError.message}`);
      }
      throw new Error('Failed to validate input');
    }
  }

  setConfig(config: Partial<LLMConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Create and export a singleton instance
export const llmService = new LLMService(
  import.meta.env.VITE_LLM_API_URL || 'http://localhost:8000/llm'
);