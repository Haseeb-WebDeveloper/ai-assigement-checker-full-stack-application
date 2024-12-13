import mongoose, { Schema } from 'mongoose';
import { IBaseDocument } from './base.model';

export interface IAssignment extends IBaseDocument {
  title: string;
  description: string;
  fileUrl: string;
  dueDate: Date;
  subjectId: mongoose.Schema.Types.ObjectId;
  status: 'Pending' | 'Submitted' | 'Late' | 'Graded' | 'In Review';
  studentId: mongoose.Schema.Types.ObjectId;
  teacherId: mongoose.Schema.Types.ObjectId | null;
  grade: {
    score: number;
    letter: string;
    feedback: string;
    gradedBy: 'AI' | 'Teacher' | null;
  } | null;
  plagiarism: {
    score: number;
    matches: Array<{
      url: string;
      percentage: number;
    }>;
    checkedAt: Date;
  } | null;
  aiAnalysis: {
    grade: string;
    feedback: string;
    confidence: number;
    analyzedAt: Date;
  } | null;
  metadata: {
    wordCount?: number;
    pageCount?: number;
    fileType: string;
    fileSize: number;
  };
  submissionHistory: Array<{
    submittedAt: Date;
    fileUrl: string;
    status: string;
  }>;
}

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    dueDate: { type: Date, required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    status: {
      type: String,
      enum: ['Pending', 'Submitted', 'Late', 'Graded', 'In Review'],
      default: 'Pending',
    },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    grade: {
      score: Number,
      letter: String,
      feedback: String,
      gradedBy: {
        type: String,
        enum: ['AI', 'Teacher'],
      },
    },
    plagiarism: {
      score: { type: Number, default: 0 },
      matches: [{
        url: String,
        percentage: Number,
      }],
      checkedAt: Date,
    },
    aiAnalysis: {
      grade: String,
      feedback: String,
      confidence: Number,
      analyzedAt: Date,
    },
    metadata: {
      wordCount: Number,
      pageCount: Number,
      fileType: { type: String, required: true },
      fileSize: { type: Number, required: true },
    },
    submissionHistory: [{
      submittedAt: { type: Date, required: true },
      fileUrl: { type: String, required: true },
      status: String,
    }],
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Add indexes for better query performance
AssignmentSchema.index({ studentId: 1, status: 1 });
AssignmentSchema.index({ teacherId: 1, status: 1 });
AssignmentSchema.index({ dueDate: 1 });
AssignmentSchema.index({ 'plagiarism.score': 1 });

export default mongoose.models.Assignment || mongoose.model<IAssignment>('Assignment', AssignmentSchema);
