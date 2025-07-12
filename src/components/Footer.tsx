import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Mail, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Ask the Government</h3>
            <p className="text-gray-600 text-sm mb-4">
              Empowering citizens to ask important questions and create government accountability through public consensus.
            </p>
            <div className="flex space-x-3">
              <a 
                href="mailto:contact@askthegovernment.com"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://github.com/askthegovernment"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  <FileText size={16} />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  <Shield size={16} />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">About</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/how-it-works" className="hover:text-gray-900 transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/community-guidelines" className="hover:text-gray-900 transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/contact-support" className="hover:text-gray-900 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2025 Ask the Government. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Made with ❤️ for democratic participation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};