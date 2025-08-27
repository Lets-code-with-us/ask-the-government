import React, { useState } from 'react';
import { Hash, Calendar, User, Shield, Share2, TrendingUp, MapPin, Flag, Tag, Wifi } from 'lucide-react';
import { Question } from '../types';
import { useAuth } from '../hooks/useAuth';
import { VoteButton } from './VoteButton';
import { ReportModal } from './ReportModal';
import { calculateVoteStats } from '../utils/voteCalculations';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants/categories';

interface QuestionCardProps {
  question: Question;
  onVote: (questionId: string, voteType: 'yes' | 'no') => void;
}

const websocketService = {
  isConnected: () => true
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onVote }) => {
  const { isAuthenticated } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const voteStats = calculateVoteStats(question.yesVotes, question.noVotes);
  const isConnected = websocketService.isConnected();

  const handleVote = async (voteType: 'yes' | 'no') => {
    if (!isAuthenticated || question.userVote || isVoting) return;
    
    setIsVoting(true);
    await onVote(question.id, voteType);
    setIsVoting(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ask the Government',
        text: question.text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${question.text} - ${window.location.href}`);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <User size={16} />
          <span className="font-medium">{question.author.name}</span>
          {question.isVerified && (
            <div title="Verified Question">
              <Shield size={16} className="text-blue-600"  />
            </div>
            
          )}
          <span>•</span>
          <MapPin size={16} />
          <span className="font-medium">{question.country}</span>
          <span>•</span>
          <Calendar size={16} />
          <span>{formatDate(question.createdAt)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {voteStats.isControversial && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
              <TrendingUp size={12} />
              <span>Controversial</span>
            </div>
          )}
          
          {/* Real-time Status Indicator */}
          {isAuthenticated && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              <Wifi size={12} className={isConnected ? 'text-green-600' : 'text-red-600'} />
              <span className="hidden sm:inline">
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>
          )}
          
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Report this question"
          >
            <Flag size={16} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Share this question"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Question Text */}
      <p className="text-gray-900 mb-4 leading-relaxed font-medium">
        {question.text}
      </p>

      {/* Category Badge */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${CATEGORY_COLORS[question.category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-800'}`}
        >
          <span className="mr-2">{CATEGORY_ICONS[question.category as keyof typeof CATEGORY_ICONS] || '📋'}</span>
          {question.category}
        </span>
      </div>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {question.hashtags.map((hashtag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
          >
            <Hash size={12} className="mr-1" />
            {hashtag}
          </span>
        ))}
      </div>

      {/* Vote Results Summary */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Total Votes: {voteStats.totalVotes.toLocaleString()}</span>
          <span className={`font-medium ${
            voteStats.yesPercentage > voteStats.noPercentage ? 'text-green-600' : 'text-red-600'
          }`}>
            {voteStats.yesPercentage > voteStats.noPercentage ? 'Yes Leading' : 'No Leading'}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="flex h-full">
            <div 
              className="bg-green-500 transition-all duration-500"
              style={{ width: `${voteStats.yesPercentage}%` }}
            />
            <div 
              className="bg-red-500 transition-all duration-500"
              style={{ width: `${voteStats.noPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Voting Buttons */}
      <div className="flex space-x-3">
        <VoteButton
          type="yes"
          count={question.yesVotes}
          percentage={voteStats.yesPercentage}
          isSelected={question.userVote === 'yes'}
          isDisabled={!isAuthenticated || !!question.userVote || isVoting}
          onClick={() => handleVote('yes')}
        />
        <VoteButton
          type="no"
          count={question.noVotes}
          percentage={voteStats.noPercentage}
          isSelected={question.userVote === 'no'}
          isDisabled={!isAuthenticated || !!question.userVote || isVoting}
          onClick={() => handleVote('no')}
        />
      </div>

      {/* Vote Status */}
      {!isAuthenticated && (
        <p className="text-center text-sm text-gray-500 mt-3">
          Login to vote on this question
        </p>
      )}
      
      {question.userVote && (
        <p className="text-center text-sm text-green-600 mt-3 font-medium">
          ✓ You voted {question.userVote.toUpperCase()} on this question
        </p>
      )}

      {/* Real-time Sync Status */}
      {isAuthenticated && isVoting && (
        <p className="text-center text-sm text-blue-600 mt-3 font-medium">
          🔄 Syncing your vote...
        </p>
      )}

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        questionId={question.id}
        questionText={question.text}
      />
    </div>
  );
};