import React from 'react';
import { Upload, FileSpreadsheet, Download } from 'lucide-react';

const steps = [
  {
    title: 'Upload Your Data',
    description: 'Simply upload your financial data in CSV format.',
    icon: Upload,
  },
  {
    title: 'Enter Investment Details',
    description: 'Provide key information about your investment strategy.',
    icon: FileSpreadsheet,
  },
  {
    title: 'Download Your Report',
    description: 'Get your comprehensive analysis report instantly.',
    icon: Download,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-100" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <step.icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}