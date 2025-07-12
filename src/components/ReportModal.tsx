import React, { useState } from 'react';
import { X, Flag, AlertTriangle, Send } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionText: string;
}

type ReportReason = 'spam' | 'hate_speech' | 'false_info' | 'inappropriate' | 'other';

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  questionId,
  questionText,
}) => {
  const [reason, setReason] = useState<ReportReason>('spam');
  const [explanation, setExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const reportReasons = [
    { value: 'spam', label: 'Spam or Repetitive Content', description: 'Duplicate or irrelevant questions' },
    { value: 'hate_speech', label: 'Hate Speech', description: 'Discriminatory or offensive language' },
    { value: 'false_info', label: 'False Information', description: 'Deliberately misleading content' },
    { value: 'inappropriate', label: 'Inappropriate Content', description: 'Off-topic or unprofessional' },
    { value: 'other', label: 'Other', description: 'Please explain in the text area below' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) return;

    setIsSubmitting(true);

    // Simulate API call to submit report
    try {
      const report = {
        id: Date.now().toString(),
        questionId,
        reporterId: user.id,
        reason,
        explanation: explanation.trim(),
        createdAt: new Date(),
        status: 'pending',
      };

      // In a real app, this would be sent to your backend
      console.log('Report submitted:', report);
      
      // Store in localStorage for demo purposes
      const existingReports = JSON.parse(localStorage.getItem('askGov_reports') || '[]');
      existingReports.push(report);
      localStorage.setItem('askGov_reports', JSON.stringify(existingReports));

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setReason('spam');
        setExplanation('');
      }, 2000);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSubmitted(false);
      setReason('spam');
      setExplanation('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Flag className="text-red-600" size={20} />
            <h2 className="text-xl font-semibold">Report Question</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="text-green-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Submitted</h3>
            <p className="text-gray-600">
              Thank you for helping keep our community safe. We'll review this report and take appropriate action.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Question Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Reporting this question:</p>
              <p className="text-gray-900 text-sm italic">"{questionText}"</p>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important:</p>
                  <p>False reports may result in restrictions on your account. Only report content that genuinely violates our community guidelines.</p>
                </div>
              </div>
            </div>

            {/* Reason Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Why are you reporting this question? *
              </label>
              <div className="space-y-3">
                {reportReasons.map((reportReason) => (
                  <label
                    key={reportReason.value}
                    className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reportReason.value}
                      checked={reason === reportReason.value}
                      onChange={(e) => setReason(e.target.value as ReportReason)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{reportReason.label}</div>
                      <div className="text-sm text-gray-500">{reportReason.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional details {reason === 'other' ? '(required)' : '(optional)'}
              </label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Please provide more context about why you're reporting this question..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                required={reason === 'other'}
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Help us understand the issue better</span>
                <span className={explanation.length > 450 ? 'text-red-500' : ''}>
                  {explanation.length}/500
                </span>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (reason === 'other' && !explanation.trim())}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
              >
                <Flag size={16} />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};