import { useEffect, useCallback } from 'react';
import { websocketService, VoteUpdateMessage } from '../utils/websocketService';
import { Question } from '../types';

interface UseRealTimeVotesProps {
  questions: Question[];
  onVoteUpdate: (updatedQuestion: Question) => void;
}

export const useRealTimeVotes = ({ questions, onVoteUpdate }: UseRealTimeVotesProps) => {
  // Handle incoming vote updates
  const handleVoteUpdate = useCallback((voteUpdate: VoteUpdateMessage) => {
    const questionIndex = questions.findIndex(q => q.id === voteUpdate.questionId);
    
    if (questionIndex !== -1) {
      const updatedQuestion = {
        ...questions[questionIndex],
        yesVotes: voteUpdate.yesVotes,
        noVotes: voteUpdate.noVotes,
        totalVotes: voteUpdate.totalVotes,
      };
      
      onVoteUpdate(updatedQuestion);
    }
  }, [questions, onVoteUpdate]);

  // Send vote update to other clients
  const sendVoteUpdate = useCallback((questionId: string, yesVotes: number, noVotes: number, userId: string) => {
    const totalVotes = yesVotes + noVotes;
    
    const voteUpdate: VoteUpdateMessage = {
      questionId,
      yesVotes,
      noVotes,
      totalVotes,
      userId,
    };

    websocketService.sendVoteUpdate(voteUpdate);
  }, []);

  useEffect(() => {
    // Subscribe to vote updates
    websocketService.onMessage('vote_update', handleVoteUpdate);

    // Cleanup subscription
    return () => {
      websocketService.offMessage('vote_update', handleVoteUpdate);
    };
  }, [handleVoteUpdate]);

  return {
    sendVoteUpdate,
    isConnected: websocketService.isConnected(),
    connectionState: websocketService.getConnectionState(),
  };
};
