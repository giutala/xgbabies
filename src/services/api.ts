import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AnalysisData {
  description: string;
  competitorData: File | null;
  balanceSheet: File | null;
  discountRate: number;
  investmentAmount: number;
  marketData?: File | null;
  productDescription: string;
  marketArea: string;
}

export interface AnalysisResponse {
  reportUrl: string;
  summary: string;
  status: 'success' | 'error';
  message?: string;
}

export const analyzeInvestment = async (data: AnalysisData): Promise<AnalysisResponse> => {
  try {
    const formData = new FormData();
    
    // Append text fields
    formData.append('description', data.description);
    formData.append('discountRate', data.discountRate.toString());
    formData.append('investmentAmount', data.investmentAmount.toString());
    formData.append('productDescription', data.productDescription);
    formData.append('marketArea', data.marketArea);

    // Append files
    if (data.competitorData) {
      formData.append('competitorData', data.competitorData);
    }
    if (data.balanceSheet) {
      formData.append('balanceSheet', data.balanceSheet);
    }
    if (data.marketData) {
      formData.append('marketData', data.marketData);
    }

    const response = await api.post<AnalysisResponse>('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: 'error',
        message: error.response?.data?.detail || 'Failed to analyze investment',
        reportUrl: '',
        summary: '',
      };
    }
    return {
      status: 'error',
      message: 'An unexpected error occurred',
      reportUrl: '',
      summary: '',
    };
  }
};