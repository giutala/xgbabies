import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';

const features = [
  {
    title: 'Market Analysis',
    description: 'Comprehensive market trend analysis with advanced algorithms.',
    icon: TrendingUp,
  },
  {
    title: 'Balance Sheet Insights',
    description: 'Deep dive into financial statements with AI-powered insights.',
    icon: BarChart,
  },
  {
    title: 'Investment Projections',
    description: 'Data-driven forecasting for informed investment decisions.',
    icon: PieChart,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Smart Investing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}