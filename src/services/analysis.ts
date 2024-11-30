import { llmService } from './llm';
import type { AnalysisData, AnalysisResponse } from './api';

export async function processInvestmentData(data: AnalysisData): Promise<AnalysisResponse> {
  try {
    // First, validate the input data
    const validation = await llmService.validateInput(JSON.stringify({
      description: data.description,
      productDescription: data.productDescription,
      marketArea: data.marketArea,
    }));

    if (!validation.isValid) {
      return {
        status: 'error',
        message: validation.feedback,
        reportUrl: '',
        summary: '',
      };
    }

    // Process files and convert to text for LLM analysis
    const marketAnalysis = await processMarketData(data);
    const financials = await processFinancials(data);

    // Analyze the investment using LLM
    const analysis = await llmService.analyzeInvestment({
      description: data.description,
      marketAnalysis,
      financials,
    });

    // Generate the final report
    const reportUrl = await llmService.generateReport(analysis);

    return {
      status: 'success',
      reportUrl,
      summary: analysis.analysis,
    };
  } catch (error) {
    console.error('Investment analysis failed:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Analysis failed',
      reportUrl: '',
      summary: '',
    };
  }
}

async function processMarketData(data: AnalysisData): Promise<string> {
  const marketInfo: string[] = [];
  
  if (data.competitorData) {
    const competitorText = await readFileAsText(data.competitorData);
    marketInfo.push(`Competitor Analysis:\n${competitorText}`);
  }
  
  if (data.marketData) {
    const marketText = await readFileAsText(data.marketData);
    marketInfo.push(`Market Data:\n${marketText}`);
  }

  return marketInfo.join('\n\n');
}

async function processFinancials(data: AnalysisData): Promise<string> {
  const financials: string[] = [];

  if (data.balanceSheet) {
    const balanceSheetText = await readFileAsText(data.balanceSheet);
    financials.push(`Balance Sheet:\n${balanceSheetText}`);
  }

  financials.push(`Discount Rate: ${data.discountRate}%`);
  financials.push(`Investment Amount: $${data.investmentAmount}`);

  return financials.join('\n\n');
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}