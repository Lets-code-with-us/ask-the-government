import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, Users, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="space-y-8">
            {/* User Responsibilities */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">User Responsibilities</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>By using Ask the Government, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information when creating an account</li>
                  <li>Use the platform responsibly and in good faith</li>
                  <li>Respect other users and maintain civil discourse</li>
                  <li>Only submit questions that are relevant to government policy and accountability</li>
                  <li>Not attempt to manipulate voting results through fake accounts or automated systems</li>
                  <li>Report any violations of these terms that you encounter</li>
                </ul>
              </div>
            </section>

            {/* Prohibited Content */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="text-red-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Prohibited Content</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>The following types of content are strictly prohibited:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Hate Speech:</strong> Content that promotes hatred or discrimination based on race, religion, gender, sexual orientation, or other protected characteristics</li>
                  <li><strong>Spam:</strong> Repetitive, irrelevant, or promotional content that disrupts the platform</li>
                  <li><strong>Misinformation:</strong> Deliberately false or misleading information presented as fact</li>
                  <li><strong>Personal Attacks:</strong> Content that targets individuals with harassment, threats, or defamatory statements</li>
                  <li><strong>Illegal Content:</strong> Any content that violates local, national, or international laws</li>
                  <li><strong>Off-topic Content:</strong> Questions or discussions not related to government policy or civic engagement</li>
                  <li><strong>Private Information:</strong> Sharing personal information of others without consent</li>
                </ul>
              </div>
            </section>

            {/* Voting Limitations */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="text-green-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Voting Limitations</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-2">
                  <li>Each registered user may vote only once per question</li>
                  <li>Votes cannot be changed or withdrawn once submitted</li>
                  <li>Creating multiple accounts to vote multiple times is prohibited</li>
                  <li>Automated voting systems or bots are strictly forbidden</li>
                  <li>Vote manipulation through any means will result in account suspension</li>
                  <li>We reserve the right to audit and remove suspicious voting patterns</li>
                </ul>
              </div>
            </section>

            {/* Liability Disclaimer */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Liability Disclaimer</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>Ask the Government is provided "as is" without warranties of any kind. We disclaim all liability for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The accuracy, completeness, or reliability of user-generated content</li>
                  <li>Any decisions made by governments or officials based on platform data</li>
                  <li>Technical issues, downtime, or data loss</li>
                  <li>Actions taken by other users on the platform</li>
                  <li>Any damages resulting from use of the platform</li>
                </ul>
                <p className="mt-4">
                  <strong>Important:</strong> This platform is for civic engagement and does not constitute official government communication. 
                  For official government services, please contact relevant government agencies directly.
                </p>
              </div>
            </section>

            {/* Enforcement */}
            <section>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Enforcement</h3>
                <p className="text-blue-800 text-sm">
                  Violations of these terms may result in content removal, account suspension, or permanent ban. 
                  We reserve the right to modify these terms at any time. Continued use of the platform constitutes 
                  acceptance of any changes.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t pt-6">
              <p className="text-gray-600 text-sm">
                Questions about these terms? Contact us at{' '}
                <a href="mailto:legal@askthegovernment.com" className="text-blue-600 hover:text-blue-700">
                  legal@askthegovernment.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};