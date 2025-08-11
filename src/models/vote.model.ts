import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IVote extends Document {
  questionId: Types.ObjectId;
  userId?: Types.ObjectId;
  sessionId?: string;
  vote: 'yes' | 'no';
  createdAt: Date;
}

const voteSchema = new Schema<IVote>({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    sparse: true // Allows null values in unique index
  },
  sessionId: {
    type: String,
    sparse: true // Allows null values in unique index
  },
  vote: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Unique sparse compound indexes to prevent duplicate votes
// One vote per user per question (for authenticated users)
voteSchema.index(
  { questionId: 1, userId: 1 },
  { 
    unique: true, 
    sparse: true,
    name: 'unique_question_user_vote'
  }
);

// One vote per session per question (for anonymous users)
voteSchema.index(
  { questionId: 1, sessionId: 1 },
  { 
    unique: true, 
    sparse: true,
    name: 'unique_question_session_vote'
  }
);

// Additional index for efficient querying
voteSchema.index({ createdAt: -1 });

// Validation: Either userId or sessionId must be provided, but not both
voteSchema.pre('save', function(next) {
  if (!this.userId && !this.sessionId) {
    return next(new Error('Either userId or sessionId must be provided'));
  }
  if (this.userId && this.sessionId) {
    return next(new Error('Cannot provide both userId and sessionId'));
  }
  next();
});

export const Vote = mongoose.model<IVote>('Vote', voteSchema);