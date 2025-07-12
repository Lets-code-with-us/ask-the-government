import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Phone, MapPin, Send, Clock, HelpCircle, Bug, Shield } from 'lucide-react';

export const ContactSupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const supportCategories = [
    { value: 'general', label: 'General Question', icon: HelpCircle },
    { value: 'technical', label: 'Technical Issue', icon: Bug },
    { value: 'account', label: 'Account Problem', icon: MessageCircle },
    { value: 'safety', label: 'Safety & Abuse', icon: Shield },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: Mail },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      const supportTicket = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        status: 'open',
      };

      // In a real app, this would be sent to your backend
      console.log('Support ticket submitted:', supportTicket);
      
      // Store in localStorage for demo purposes
      const existingTickets = JSON.parse(localStorage.getItem('askGov_support_tickets') || '[]');
      existingTickets.push(supportTicket);
      localStorage.setItem('askGov_support_tickets', JSON.stringify(existingTickets));

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        category: 'general',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting support ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="text-green-600" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We've received your message and will respond within 24-48 hours.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Check your email for a confirmation with your ticket number</p>
              <p>• For urgent issues, we'll respond within 4 hours</p>
              <p>• You can reply to our email to add more information</p>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6"
            >
              Return to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact Support</h1>
                <p className="text-gray-600">
                  We're here to help! Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {supportCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide as much detail as possible about your issue or question..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Include any error messages, steps to reproduce issues, or relevant details
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <a href="mailto:support@askthegovernment.com" className="text-blue-600 hover:text-blue-700 text-sm">
                      support@askthegovernment.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Response Time</p>
                    <p className="text-gray-600 text-sm">Usually within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Categories</h2>
              <div className="space-y-3">
                {supportCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={category.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <IconComponent className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-700">{category.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">Frequently Asked Questions</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-blue-900">How do I reset my password?</p>
                  <p className="text-blue-700">Use the "Forgot Password" link on the login page.</p>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Can I change my vote?</p>
                  <p className="text-blue-700">No, votes are final to ensure integrity.</p>
                </div>
                <div>
                  <p className="font-medium text-blue-900">How are questions moderated?</p>
                  <p className="text-blue-700">All questions are reviewed for relevance and guidelines compliance.</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-red-900 mb-3">Urgent Issues</h2>
              <p className="text-red-800 text-sm mb-3">
                For safety concerns, harassment, or security issues that need immediate attention:
              </p>
              <a 
                href="mailto:urgent@askthegovernment.com" 
                className="inline-flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <Mail size={16} />
                <span>urgent@askthegovernment.com</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};