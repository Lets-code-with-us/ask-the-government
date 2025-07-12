import React, { useState, useMemo } from 'react';
import { QuestionCard } from './QuestionCard';
import { SearchBar } from './SearchBar';
import { Question } from '../types';
import { Filter, TrendingUp, Clock, Zap } from 'lucide-react';

interface QuestionFeedProps {
  questions: Question[];
  onVote: (questionId: string, voteType: 'yes' | 'no') => void;
}

type SortOption = 'trending' | 'recent' | 'controversial';

export const QuestionFeed: React.FC<QuestionFeedProps> = ({ questions, onVote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');

  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = questions;

    // Filter by search query
    if (searchQuery) {
      filtered = questions.filter(question =>
        question.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.hashtags.some(hashtag =>
          hashtag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort questions
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return b.totalVotes - a.totalVotes;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'controversial':
          const aYesPercent = (a.yesVotes / a.totalVotes) * 100;
          const bYesPercent = (b.yesVotes / b.totalVotes) * 100;
          const aControversy = Math.abs(50 - aYesPercent);
          const bControversy = Math.abs(50 - bYesPercent);
          return aControversy - bControversy;
        default:
          return 0;
      }
    });

    return sorted;
  }, [questions, searchQuery, sortBy]);

  const getSortIcon = (option: SortOption) => {
    switch (option) {
      case 'trending':
        return <TrendingUp size={16} />;
      case 'recent':
        return <Clock size={16} />;
      case 'controversial':
        return <Zap size={16} />;
    }
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'trending':
        return 'Most Voted';
      case 'recent':
        return 'Recent';
      case 'controversial':
        return 'Controversial';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">Sort by:</span>
          </div>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(['trending', 'recent', 'controversial'] as SortOption[]).map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {getSortIcon(option)}
                <span>{getSortLabel(option)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-900">
              {filteredAndSortedQuestions.length} Questions Found
            </h3>
            <p className="text-sm text-blue-700">
              Showing {getSortLabel(sortBy).toLowerCase()} questions
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">
              {filteredAndSortedQuestions.reduce((sum, q) => sum + q.totalVotes, 0).toLocaleString()}
            </div>
            <div className="text-sm text-blue-700">Total Votes</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAndSortedQuestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">No questions found</p>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredAndSortedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onVote={onVote}
            />
          ))
        )}
      </div>
    </div>
  );
};