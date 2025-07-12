export interface Question {
  id: string;
  text: string;
  hashtags: string[];
  country: string;
  yesVotes: number;
  noVotes: number;
  totalVotes: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  userVote?: 'yes' | 'no' | null;
  isVerified?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
  questionsSubmitted: number;
  totalVotes: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface VoteStats {
  yesPercentage: number;
  noPercentage: number;
  totalVotes: number;
  isControversial: boolean;
}

export interface Report {
  id: string;
  questionId: string;
  reporterId: string;
  reason: 'spam' | 'hate_speech' | 'false_info' | 'inappropriate' | 'other';
  explanation: string;
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}