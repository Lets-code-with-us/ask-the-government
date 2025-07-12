import React, { useState } from 'react';
import { X, MessageCircle, Hash, Send, AlertCircle, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [question, setQuestion] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  const popularCountries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Japan', 'South Korea', 'Brazil', 'India', 'Mexico', 'Spain',
    'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !question.trim() || !country.trim()) return;

    setIsSubmitting(true);
    
    const hashtags = hashtagInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);

    // In a real app, this would submit to your backend
    console.log('Question submitted:', {
      question: question.trim(),
      hashtags,
      country: country.trim(),
      author: { id: 'current-user', name: 'Current User' },
      createdAt: new Date(),
    });
    
    setQuestion('');
    setHashtagInput('');
    setCountry('');
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setQuestion('');
    setHashtagInput('');
    setCountry('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Ask a Question</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Question Guidelines:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Frame as a Yes/No question for clear voting</li>
                  <li>• Be specific and actionable</li>
                  <li>• Focus on government policy or accountability</li>
                  <li>• Avoid personal attacks or inflammatory language</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Question *
            </label>
            <div className="relative">
              <MessageCircle size={20} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Should the government...?"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                required
                maxLength={500}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Frame as a clear Yes/No question</span>
              <span className={question.length > 450 ? 'text-red-500' : ''}>
                {question.length}/500
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <div className="relative">
              <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Select or type your country"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                list="countries"
              />
              <datalist id="countries">
                {popularCountries.map((countryName) => (
                  <option key={countryName} value={countryName} />
                ))}
              </datalist>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Specify which country's government this question is for
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hashtags (optional)
            </label>
            <div className="relative">
              <Hash size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                placeholder="education, healthcare, infrastructure (comma separated)"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Add relevant hashtags to help categorize your question
            </p>
          </div>

          {/* Preview */}
          {question.trim() && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              {country.trim() && (
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                  <MapPin size={14} />
                  <span className="font-medium">{country}</span>
                </div>
              )}
              <p className="text-gray-900 mb-2">{question}</p>
              {hashtagInput.trim() && (
                <div className="flex flex-wrap gap-1">
                  {hashtagInput.split(',').map((tag, index) => (
                    tag.trim() && (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Hash size={10} className="mr-1" />
                        {tag.trim()}
                      </span>
                    )
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!question.trim() || !country.trim() || isSubmitting}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Question'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};