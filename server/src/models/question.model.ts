import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IQuestion extends Document {
  title: string;
  body: string;
  institution: string;
  createdBy: Types.ObjectId;
  status: 'pending' | 'answered' | 'closed' | 'flagged';
  yesCount: number;
  noCount: number;
  voteCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 200
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
    maxlength: 2000
  },
  institution: {
    type: String,
    required: true,
    trim: true,
    enum: [
      'Department of Health',
      'Department of Education',
      'Department of Transportation',
      'Department of Justice',
      'Department of Defense',
      'Environmental Protection Agency',
      'Federal Trade Commission',
      'Securities and Exchange Commission',
      'Internal Revenue Service',
      'Social Security Administration',
      'Other'
    ]
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'answered', 'closed', 'flagged'],
    default: 'pending'
  },
  yesCount: {
    type: Number,
    default: 0,
    min: 0
  },
  noCount: {
    type: Number,
    default: 0,
    min: 0
  },
  voteCount: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true
});

// Text index on title and body for search functionality
questionSchema.index({ 
  title: 'text', 
  body: 'text' 
}, {
  weights: {
    title: 10,
    body: 5
  }
});

// Other useful indexes
questionSchema.index({ institution: 1 });
questionSchema.index({ createdBy: 1 });
questionSchema.index({ status: 1 });
questionSchema.index({ createdAt: -1 });
questionSchema.index({ voteCount: -1 });
questionSchema.index({ tags: 1 });

// Compound indexes
questionSchema.index({ status: 1, createdAt: -1 });
questionSchema.index({ institution: 1, status: 1 });

export const Question = mongoose.model<IQuestion>('Question', questionSchema);
