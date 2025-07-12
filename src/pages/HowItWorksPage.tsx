import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Vote, TrendingUp, Shield, MessageCircle, BarChart3 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">How Ask the Government Works</h1>
            <p className="text-gray-600">Empowering democratic participation through transparent public consensus</p>
          </div>

          <div className="space-y-12">
            {/* Overview */}
            <section>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-3">Our Mission</h2>
                <p className="text-blue-800">
                  Ask the Government bridges the gap between citizens and their representatives by creating a transparent platform 
                  where public opinion on important policy questions can be measured and communicated to decision-makers.
                </p>
              </div>
            </section>

            {/* Step by Step Process */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Ask Questions</h3>
                  <p className="text-gray-700 text-sm">
                    Citizens submit clear Yes/No questions about government policies, spending, or accountability. 
                    Questions are reviewed for relevance and clarity.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                    <Vote className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Vote & Engage</h3>
                  <p className="text-gray-700 text-sm">
                    Registered users vote Yes or No on questions. Each person gets one vote per question, 
                    creating authentic public sentiment data.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Show Results</h3>
                  <p className="text-gray-700 text-sm">
                    Real-time results show public consensus. Data is shared with relevant government officials 
                    and made publicly available for transparency.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">One Person, One Vote</h3>
                    <p className="text-gray-700 text-sm">
                      Each registered user can vote only once per question, ensuring authentic representation 
                      of public opinion without manipulation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Quality Control</h3>
                    <p className="text-gray-700 text-sm">
                      Questions are moderated to ensure they're relevant, clear, and constructive. 
                      Spam, hate speech, and off-topic content is removed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Real-time Analytics</h3>
                    <p className="text-gray-700 text-sm">
                      Live vote counts, demographic breakdowns, and trending topics help identify 
                      what matters most to citizens right now.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Question Guidelines */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Question Guidelines</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Good Questions Are:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Clear and specific:</strong> "Should the city increase public transit funding by 20%?"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Actionable:</strong> Questions about policies that can actually be implemented</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Yes/No format:</strong> Allows for clear voting and consensus measurement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Relevant to government:</strong> About policies, spending, or accountability</span>
                  </li>
                </ul>

                <h3 className="font-semibold text-gray-900 mb-3 mt-6">Avoid:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Vague questions: "Should things be better?"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Personal attacks on individuals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Questions outside government scope</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Duplicate or repetitive content</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Impact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Making an Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-2">For Citizens</h3>
                  <ul className="space-y-1 text-green-800 text-sm">
                    <li>• Voice your opinion on important issues</li>
                    <li>• See what others in your community think</li>
                    <li>• Hold representatives accountable</li>
                    <li>• Participate in democracy beyond elections</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">For Government</h3>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• Understand public sentiment on policies</li>
                    <li>• Make data-driven decisions</li>
                    <li>• Increase transparency and trust</li>
                    <li>• Engage with constituents effectively</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Join the Conversation</h3>
                <p className="mb-4 opacity-90">
                  Create your account today and start participating in democratic decision-making. 
                  Your voice matters, and together we can build more responsive government.
                </p>
                <Link 
                  to="/" 
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Start Voting Now
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};