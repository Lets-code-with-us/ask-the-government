import React, { useState } from 'react';
import { QuestionFeed } from '../components/QuestionFeed';
import { useAuth } from '../hooks/useAuth';
import { mockQuestions } from '../data/mockQuestions';
import { Question } from '../types';

interface HomePageProps {
  onLoginClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLoginClick }) => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const { isAuthenticated } = useAuth();

  const handleVote = (questionId: string, voteType: 'yes' | 'no') => {
    if (!isAuthenticated) {
      onLoginClick();
      return;
    }

    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId && !q.userVote) {
          const updatedQuestion = {
            ...q,
            userVote: voteType,
            yesVotes: voteType === 'yes' ? q.yesVotes + 1 : q.yesVotes,
            noVotes: voteType === 'no' ? q.noVotes + 1 : q.noVotes,
          };
          updatedQuestion.totalVotes = updatedQuestion.yesVotes + updatedQuestion.noVotes;
          return updatedQuestion;
        }
        return q;
      })
    );
  };

  const handleAskQuestion = (questionText: string, hashtags: string[], country: string) => {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated || !user) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      hashtags,
      country,
      yesVotes: 0,
      noVotes: 0,
      totalVotes: 0,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      createdAt: new Date(),
    };

    setQuestions(prev => [newQuestion, ...prev]);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ask the Government
        </h1>
        <p className="text-gray-600">
          Vote Yes or No on important questions to show public consensus and create accountability.
        </p>
      </div>

      <QuestionFeed questions={questions} onVote={handleVote} />
    </main>
  );
};