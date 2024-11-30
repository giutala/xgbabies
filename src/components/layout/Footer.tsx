import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">InvestAnalyzer</h3>
            <p className="text-gray-600 text-sm">
              Revolutionizing investment decisions through data-driven analysis.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} InvestAnalyzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}