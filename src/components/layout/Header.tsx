import React from 'react';
import { BarChart3 } from 'lucide-react';

export function Header() {
  const handleDemoClick = () => {
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      const demoButton = formElement.querySelector('button[type="button"]');
      if (demoButton instanceof HTMLButtonElement) {
        demoButton.click();
      }
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            InvestAnalyzer
          </span>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <button
                onClick={handleDemoClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Demo
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}