import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IQuestion extends Document {
  title: string;
  body: string;
  institution: string;
  createdBy: Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
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
    trim: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'archived'],
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
questionSchema.index({ title: 'text', body: 'text' });

// Additional indexes for efficient querying
questionSchema.index({ status: 1, createdAt: -1 });
questionSchema.index({ createdBy: 1 });
questionSchema.index({ institution: 1 });
questionSchema.index({ tags: 1 });

export const Question = mongoose.model<IQuestion>('Question', questionSchema);