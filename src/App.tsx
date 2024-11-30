import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { HowItWorks } from './components/home/HowItWorks';
import { AnalysisForm } from './components/analysis/AnalysisForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Start Your Analysis
            </h2>
            <AnalysisForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;