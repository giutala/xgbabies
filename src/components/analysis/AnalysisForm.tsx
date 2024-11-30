import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FileUpload } from './FileUpload';
import { analyzeInvestment, type AnalysisData } from '../../services/api';
import { getDemoData } from '../../services/demo';

interface FormState {
  description: string;
  competitorData: File | null;
  balanceSheet: File | null;
  discountRate: string;
  investmentAmount: string;
  marketData: File | null;
  productDescription: string;
  marketArea: string;
}

interface FormErrors {
  [key: string]: string;
}

export function AnalysisForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    description: '',
    competitorData: null,
    balanceSheet: null,
    discountRate: '',
    investmentAmount: '',
    marketData: null,
    productDescription: '',
    marketArea: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.competitorData) {
      newErrors.competitorData = 'Competitor data is required';
    }
    if (!formData.balanceSheet) {
      newErrors.balanceSheet = 'Balance sheet is required';
    }
    if (!formData.discountRate) {
      newErrors.discountRate = 'Discount rate is required';
    }
    if (!formData.investmentAmount) {
      newErrors.investmentAmount = 'Investment amount is required';
    }
    if (!formData.productDescription.trim()) {
      newErrors.productDescription = 'Product description is required';
    }
    if (!formData.marketArea.trim()) {
      newErrors.marketArea = 'Market area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const analysisData: AnalysisData = {
        ...formData,
        discountRate: parseFloat(formData.discountRate),
        investmentAmount: parseFloat(formData.investmentAmount),
      };

      const response = await analyzeInvestment(analysisData);
      
      if (response.status === 'success') {
        toast.success('Analysis report generated successfully!');
        window.open(response.reportUrl, '_blank');
      } else {
        toast.error(response.message || 'Failed to generate report');
      }
    } catch (error) {
      toast.error('An error occurred while generating the report');
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const loadDemoData = () => {
    const demoData = getDemoData();
    setFormData({
      description: demoData.description,
      competitorData: demoData.competitorData,
      balanceSheet: demoData.balanceSheet,
      discountRate: demoData.discountRate.toString(),
      investmentAmount: demoData.investmentAmount.toString(),
      marketData: demoData.marketData,
      productDescription: demoData.productDescription,
      marketArea: demoData.marketArea,
    });
    setErrors({});
    toast.success('Demo data loaded successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8 text-center">
        <button
          type="button"
          onClick={loadDemoData}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Try Demo Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Investment Idea Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe your investment idea..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="space-y-4">
          <FileUpload
            id="competitorData"
            label="Competitor Data"
            accept=".csv,.xlsx"
            onChange={(file) => setFormData(prev => ({ ...prev, competitorData: file }))}
            error={errors.competitorData}
            value={formData.competitorData}
          />

          <FileUpload
            id="balanceSheet"
            label="Balance Sheet"
            accept=".csv,.xlsx"
            onChange={(file) => setFormData(prev => ({ ...prev, balanceSheet: file }))}
            error={errors.balanceSheet}
            value={formData.balanceSheet}
          />

          <FileUpload
            id="marketData"
            label="Market Data (Optional)"
            accept=".csv,.xlsx"
            onChange={(file) => setFormData(prev => ({ ...prev, marketData: file }))}
            value={formData.marketData}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 mb-1">
              Discount Rate (%)
            </label>
            <input
              type="number"
              id="discountRate"
              name="discountRate"
              value={formData.discountRate}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-blue-500 ${
                errors.discountRate ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter rate..."
              step="0.01"
              min="0"
            />
            {errors.discountRate && (
              <p className="mt-1 text-sm text-red-600">{errors.discountRate}</p>
            )}
          </div>
          <div>
            <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Investment Amount ($)
            </label>
            <input
              type="number"
              id="investmentAmount"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-blue-500 ${
                errors.investmentAmount ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter amount..."
              min="0"
            />
            {errors.investmentAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.investmentAmount}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Product Description
          </label>
          <input
            type="text"
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-blue-500 ${
              errors.productDescription ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe your product..."
          />
          {errors.productDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.productDescription}</p>
          )}
        </div>

        <div>
          <label htmlFor="marketArea" className="block text-sm font-medium text-gray-700 mb-1">
            Market Area
          </label>
          <input
            type="text"
            id="marketArea"
            name="marketArea"
            value={formData.marketArea}
            onChange={handleInputChange}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-blue-500 ${
              errors.marketArea ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter target market area..."
          />
          {errors.marketArea && (
            <p className="mt-1 text-sm text-red-600">{errors.marketArea}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating Report...' : 'Generate Report'}
        </button>
      </form>
    </div>
  );
}