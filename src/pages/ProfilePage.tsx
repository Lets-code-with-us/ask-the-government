import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { mockQuestions } from '../data/mockQuestions';
import { QuestionFeed } from '../components/QuestionFeed';

import type { Question } from '../types';

export interface QuestionFeedProps {
  questions: Question[];
  onVote: (questionId: string, vote: number) => void;
  showUserVote?: boolean;
}

export const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <p className="text-lg text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  // Questions asked by the user
  const asked = mockQuestions.filter(q => q.author.id === user.id);

  // Questions the user has voted on
  const voted = mockQuestions.filter(q => q.userVote && q.author.id !== user.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Your Questions</h3>
      <QuestionFeed questions={asked} onVote={() => {}} />

      <h3 className="text-xl font-semibold mt-8 mb-2">Questions You Voted On</h3>
      <QuestionFeed questions={voted} onVote={() => {}}/>
    </div>
  );
};