import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, Database, Shield, Globe } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="space-y-8">
            {/* Data Collection */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Database className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Data We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Account Information:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Email address (required for account creation)</li>
                    <li>Display name (chosen by you)</li>
                    <li>Account creation date</li>
                    <li>Login timestamps and IP addresses</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Platform Activity:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Questions you submit (including text, hashtags, and country)</li>
                    <li>Your votes on questions (Yes/No responses)</li>
                    <li>Search queries and browsing patterns</li>
                    <li>Reports you submit about content</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technical Data:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Device type and browser information</li>
                    <li>IP address and general location (country/region)</li>
                    <li>Session duration and page views</li>
                    <li>Error logs and performance data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Data */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="text-green-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">How We Use Your Data</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain the Ask the Government platform</li>
                  <li>Authenticate your account and prevent unauthorized access</li>
                  <li>Display your questions and votes to other users</li>
                  <li>Generate aggregate statistics about public opinion</li>
                  <li>Improve platform features and user experience</li>
                  <li>Detect and prevent spam, abuse, and fraudulent activity</li>
                  <li>Comply with legal obligations and respond to lawful requests</li>
                  <li>Send important account and security notifications</li>
                </ul>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Data Sharing & Third Parties</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold text-green-800 mb-2">Our Commitment:</p>
                  <p className="text-green-700">
                    We do not sell, rent, or share your personal data with third parties for commercial purposes.
                  </p>
                </div>
                <p>We may share data only in these limited circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Public Content:</strong> Questions, votes, and usernames are publicly visible by design</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                  <li><strong>Safety & Security:</strong> To protect users from harm or prevent illegal activity</li>
                  <li><strong>Service Providers:</strong> With trusted partners who help operate our platform (under strict confidentiality)</li>
                  <li><strong>Aggregate Data:</strong> Anonymous, aggregated statistics that cannot identify individuals</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="text-red-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>We implement industry-standard security measures:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication and password protection</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls limiting who can view your data</li>
                  <li>Automated monitoring for suspicious activity</li>
                  <li>Secure backup and disaster recovery procedures</li>
                </ul>
                <p className="text-sm bg-yellow-50 border border-yellow-200 rounded p-3">
                  <strong>Note:</strong> While we take security seriously, no system is 100% secure. 
                  We cannot guarantee absolute security of your data.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="text-indigo-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Your Rights (GDPR & Data Protection)</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of all data we have about you</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                  <li><strong>Erasure:</strong> Request deletion of your account and associated data</li>
                  <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to certain types of data processing</li>
                  <li><strong>Withdraw Consent:</strong> Revoke permission for data processing</li>
                </ul>
                <p className="text-sm">
                  To exercise these rights, contact us at{' '}
                  <a href="mailto:privacy@askthegovernment.com" className="text-blue-600 hover:text-blue-700">
                    privacy@askthegovernment.com
                  </a>
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Data Retention</h3>
                <div className="text-gray-700 text-sm space-y-2">
                  <p><strong>Account Data:</strong> Retained while your account is active, plus 30 days after deletion</p>
                  <p><strong>Public Content:</strong> Questions and votes may be retained for historical/research purposes</p>
                  <p><strong>Technical Logs:</strong> Automatically deleted after 90 days</p>
                  <p><strong>Legal Holds:</strong> Data may be retained longer if required by law</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Questions about this privacy policy? Contact our Data Protection Officer at{' '}
                <a href="mailto:privacy@askthegovernment.com" className="text-blue-600 hover:text-blue-700">
                  privacy@askthegovernment.com
                </a>
              </p>
              <p className="text-gray-500 text-xs mt-2">
                This policy may be updated periodically. We'll notify users of significant changes via email or platform notification.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};