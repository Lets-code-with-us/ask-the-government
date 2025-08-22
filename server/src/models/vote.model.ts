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
    default: null
  },
  sessionId: {
    type: String,
    default: null
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
}, {
  timestamps: true
});

// Unique partial index for registered users (questionId + userId)
// Only applies when userId exists and is not null
voteSchema.index(
  { questionId: 1, userId: 1 }, 
  { 
    unique: true,
    partialFilterExpression: { userId: { $exists: true, $type: 'objectId' } },
    name: 'unique_user_vote_per_question'
  }
);

// Unique partial index for anonymous users (questionId + sessionId) 
// Only applies when sessionId exists and is not null
voteSchema.index(
  { questionId: 1, sessionId: 1 }, 
  { 
    unique: true,
    partialFilterExpression: { sessionId: { $exists: true, $type: 'string' } },
    name: 'unique_session_vote_per_question'
  }
);

// Additional indexes for performance
voteSchema.index({ questionId: 1 });
voteSchema.index({ createdAt: -1 });

// Validation: Ensure either userId or sessionId is provided
voteSchema.pre('save', function(next) {
  if (!this.userId && !this.sessionId) {
    next(new Error('Either userId or sessionId must be provided'));
  } else if (this.userId && this.sessionId) {
    next(new Error('Cannot provide both userId and sessionId'));
  } else {
    next();
  }
});

export const Vote = mongoose.model<IVote>('Vote', voteSchema);
