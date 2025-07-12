import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Users, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';

export const CommunityGuidelinesPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Guidelines</h1>
            <p className="text-gray-600">Building a respectful space for democratic participation</p>
          </div>

          <div className="space-y-8">
            {/* Our Values */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="text-red-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Our Values</h2>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-800 mb-4">
                  Ask the Government is built on the principles of respectful dialogue, democratic participation, 
                  and constructive civic engagement. We believe that diverse perspectives make our democracy stronger.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="text-white" size={20} />
                    </div>
                    <h3 className="font-semibold text-blue-900">Respect</h3>
                    <p className="text-blue-700 text-sm">Treat all community members with dignity</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="text-white" size={20} />
                    </div>
                    <h3 className="font-semibold text-blue-900">Integrity</h3>
                    <p className="text-blue-700 text-sm">Share honest, factual information</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MessageSquare className="text-white" size={20} />
                    </div>
                    <h3 className="font-semibold text-blue-900">Constructive</h3>
                    <p className="text-blue-700 text-sm">Focus on solutions and progress</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Expected Behavior */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="text-green-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Expected Behavior</h2>
              </div>
              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-900 mb-2">✓ Be Respectful and Civil</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Treat all users with courtesy and respect</li>
                    <li>• Disagree with ideas, not people</li>
                    <li>• Use inclusive language that welcomes all participants</li>
                    <li>• Acknowledge different perspectives and experiences</li>
                  </ul>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-900 mb-2">✓ Stay On Topic</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Focus on government policy and civic issues</li>
                    <li>• Ask clear, actionable questions about public matters</li>
                    <li>• Use relevant hashtags to categorize your questions</li>
                    <li>• Contribute meaningfully to democratic discourse</li>
                  </ul>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-900 mb-2">✓ Be Honest and Accurate</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Share factual information and cite sources when possible</li>
                    <li>• Correct mistakes when you become aware of them</li>
                    <li>• Distinguish between facts and personal opinions</li>
                    <li>• Vote authentically - one person, one vote per question</li>
                  </ul>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-900 mb-2">✓ Help Build Community</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Welcome new members and help them understand the platform</li>
                    <li>• Report content that violates guidelines</li>
                    <li>• Encourage thoughtful participation from others</li>
                    <li>• Share the platform with others who care about civic engagement</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prohibited Behavior */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="text-red-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Prohibited Behavior</h2>
              </div>
              <div className="space-y-4">
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-semibold text-red-900 mb-2">✗ Harassment and Abuse</h3>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Personal attacks, insults, or threats against individuals</li>
                    <li>• Doxxing (sharing private information without consent)</li>
                    <li>• Stalking or persistent unwanted contact</li>
                    <li>• Discriminatory language based on protected characteristics</li>
                  </ul>
                </div>

                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-semibold text-red-900 mb-2">✗ Hate Speech and Discrimination</h3>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Content promoting hatred based on race, religion, gender, sexuality, etc.</li>
                    <li>• Derogatory stereotypes or generalizations about groups</li>
                    <li>• Symbols, images, or language associated with hate groups</li>
                    <li>• Content that dehumanizes or promotes violence against any group</li>
                  </ul>
                </div>

                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-semibold text-red-900 mb-2">✗ Misinformation and Manipulation</h3>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Deliberately false or misleading information</li>
                    <li>• Conspiracy theories without factual basis</li>
                    <li>• Vote manipulation through fake accounts or bots</li>
                    <li>• Coordinated inauthentic behavior</li>
                  </ul>
                </div>

                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <h3 className="font-semibold text-red-900 mb-2">✗ Spam and Off-Topic Content</h3>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Repetitive or duplicate questions</li>
                    <li>• Commercial advertising or self-promotion</li>
                    <li>• Content unrelated to government or civic issues</li>
                    <li>• Excessive posting that disrupts normal discussion</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Enforcement */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Enforcement</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">How We Handle Violations</h3>
                <div className="space-y-3 text-yellow-800 text-sm">
                  <div>
                    <strong>First Violation:</strong> Warning and content removal. We'll explain what guideline was violated and how to avoid future issues.
                  </div>
                  <div>
                    <strong>Repeated Violations:</strong> Temporary suspension (1-7 days) depending on severity and frequency.
                  </div>
                  <div>
                    <strong>Serious Violations:</strong> Immediate permanent ban for hate speech, threats, doxxing, or coordinated manipulation.
                  </div>
                  <div>
                    <strong>Appeals Process:</strong> Users can appeal enforcement actions by contacting support with additional context.
                  </div>
                </div>
              </div>
            </section>

            {/* Reporting */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reporting Violations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">How to Report</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Click the flag icon on any question</li>
                    <li>• Select the appropriate violation category</li>
                    <li>• Provide specific details about the issue</li>
                    <li>• Submit the report for review</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">What Happens Next</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Reports are reviewed within 24-48 hours</li>
                    <li>• Action is taken if guidelines are violated</li>
                    <li>• Reporters are notified of the outcome</li>
                    <li>• Serious issues are escalated immediately</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Special Considerations */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Special Considerations</h2>
              <div className="space-y-4">
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-blue-900 mb-2">Political Discourse</h3>
                  <p className="text-blue-800 text-sm">
                    We welcome diverse political viewpoints and encourage healthy debate. However, discussions must remain 
                    civil and focused on policies rather than personal attacks on political figures or fellow users.
                  </p>
                </div>

                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <h3 className="font-semibold text-purple-900 mb-2">Controversial Topics</h3>
                  <p className="text-purple-800 text-sm">
                    Sensitive or controversial topics are allowed if they relate to government policy and are discussed 
                    respectfully. We encourage thoughtful engagement even on difficult subjects.
                  </p>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-900 mb-2">International Users</h3>
                  <p className="text-green-800 text-sm">
                    Users from all countries are welcome. Please specify which country's government your questions 
                    address, and respect that different nations have different political systems and challenges.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Questions About Guidelines?</h3>
              <p className="text-gray-600 text-sm">
                If you have questions about these guidelines or need clarification on what's acceptable, 
                please contact our community team at{' '}
                <a href="mailto:community@askthegovernment.com" className="text-blue-600 hover:text-blue-700">
                  community@askthegovernment.com
                </a>
              </p>
              <p className="text-gray-500 text-xs mt-2">
                These guidelines may be updated as our community grows. We'll notify users of significant changes.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};