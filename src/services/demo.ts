import type { AnalysisData } from './api';

// Sample balance sheet CSV content
const balanceSheetContent = `Date,Assets,Liabilities,Equity
2023-12-31,1000000,400000,600000
2023-09-30,950000,380000,570000
2023-06-30,900000,350000,550000
2023-03-31,850000,320000,530000`;

// Sample competitor data CSV content
const competitorDataContent = `Competitor,MarketShare,Revenue,Growth
EcoSolar Inc.,25%,5000000,15%
GreenPower Co.,20%,4000000,12%
SunTech Solutions,15%,3000000,18%
RenewableFirst,10%,2000000,20%`;

// Sample market data CSV content
const marketDataContent = `Quarter,MarketSize,Growth,Trend
Q4 2023,50000000,12%,Upward
Q3 2023,48000000,10%,Upward
Q2 2023,45000000,8%,Stable
Q1 2023,42000000,7%,Stable`;

function createFileFromContent(content: string, name: string): File {
  const blob = new Blob([content], { type: 'text/csv' });
  return new File([blob], name, { type: 'text/csv' });
}

export const getDemoData = (): AnalysisData => {
  return {
    description: "Renewable energy startup focusing on innovative solar panel technology with integrated energy storage solutions. Our patented technology increases energy efficiency by 30% compared to traditional solar panels while reducing installation costs by 25%.",
    competitorData: createFileFromContent(competitorDataContent, 'competitor_data.csv'),
    balanceSheet: createFileFromContent(balanceSheetContent, 'balance_sheet.csv'),
    discountRate: 12.5,
    investmentAmount: 2000000,
    marketData: createFileFromContent(marketDataContent, 'market_data.csv'),
    productDescription: "Next-generation solar panels with integrated battery storage and AI-powered energy management system",
    marketArea: "North American residential and commercial solar energy market"
  };
};