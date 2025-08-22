import React from 'react';
import { QuestionFeed } from '../components/QuestionFeed';
import { useAuth } from '../hooks/useAuth';
import { useRealTimeVotes } from '../hooks/useRealTimeVotes';
import { mockQuestions } from '../data/mockQuestions';
import { Question } from '../types';

interface HomePageProps {
  questions: Question[];
  onLoginClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLoginClick }) => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const { isAuthenticated, user } = useAuth();

  // Handle real-time vote updates
  const handleVoteUpdate = (updatedQuestion: Question) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
  };

  const { sendVoteUpdate, isConnected, connectionState } = useRealTimeVotes({
    questions,
    onVoteUpdate: handleVoteUpdate,
  });

  const handleVote = (questionId: string, voteType: 'yes' | 'no') => {
    if (!isAuthenticated || !user) {
      onLoginClick();
      return;
    }

const handleVote = async (questionId: string, voteType: 'yes' | 'no') => {
  if (!isAuthenticated || !user) {
    // In a real app, this would redirect to login or show a login modal
    return;
  }

  // Find the question to update
  const question = questions.find(q => q.id === questionId);
  if (!question || question.userVote) return;

  // Calculate new vote counts
  const newYesVotes = voteType === 'yes' ? question.yesVotes + 1 : question.yesVotes;
  const newNoVotes = voteType === 'no' ? question.noVotes + 1 : question.noVotes;
  const newTotalVotes = newYesVotes + newNoVotes;

  // Update local state immediately (optimistic update)
  const updatedQuestion = {
    ...question,
    userVote: voteType,
    yesVotes: newYesVotes,
    noVotes: newNoVotes,
    totalVotes: newTotalVotes,
  };

  setQuestions(prev => prev.map(q => q.id === questionId ? updatedQuestion : q));

  // Send vote update to other clients via WebSocket
  if (isConnected) {
    sendVoteUpdate(questionId, newYesVotes, newNoVotes, user.id);
  }
};

const handleAskQuestion = (questionText: string, hashtags: string[], country: string, category: string) => {
  if (!isAuthenticated || !user) return;

  const newQuestion: Question = {
    id: Date.now().toString(),
    text: questionText,
    hashtags,
    country,
    category, // Add category from your branch
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
        
        {/* Connection Status Indicator */}
        {isAuthenticated && (
          <div className="mt-4 flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-600">
              {isConnected ? 'Real-time updates active' : `Connection: ${connectionState}`}
            </span>
          </div>
        )}
      </div>

      <QuestionFeed questions={questions} onVote={handleVote} />
    </main>
  );
};