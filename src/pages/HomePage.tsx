import React from 'react';
import { QuestionFeed } from '../components/QuestionFeed';
import { useAuth } from '../hooks/useAuth';
import { Question } from '../types';

interface HomePageProps {
  questions: Question[];
  onLoginClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ questions, onLoginClick }) => {
  const { isAuthenticated } = useAuth();

  const handleVote = (questionId: string, voteType: 'yes' | 'no') => {
    if (!isAuthenticated) {
      onLoginClick();
      return;
    }

    // Note: In a real app, this would update the backend
    // For now, we'll just show the login modal
    console.log('Vote recorded:', { questionId, voteType });
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