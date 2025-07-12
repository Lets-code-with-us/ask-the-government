import { VoteStats } from '../types';

export const calculateVoteStats = (yesVotes: number, noVotes: number): VoteStats => {
  const totalVotes = yesVotes + noVotes;
  
  if (totalVotes === 0) {
    return {
      yesPercentage: 0,
      noPercentage: 0,
      totalVotes: 0,
      isControversial: false,
    };
  }

  const yesPercentage = (yesVotes / totalVotes) * 100;
  const noPercentage = (noVotes / totalVotes) * 100;
  
  // Consider controversial if the split is between 40-60%
  const isControversial = yesPercentage >= 40 && yesPercentage <= 60;

  return {
    yesPercentage: Math.round(yesPercentage * 10) / 10,
    noPercentage: Math.round(noPercentage * 10) / 10,
    totalVotes,
    isControversial,
  };
};

export const formatVoteCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};