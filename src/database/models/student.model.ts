import mongoose, { Schema } from 'mongoose';
import { IBaseDocument } from './base.model';

export interface IStudent extends IBaseDocument {
  name: string;
  email: string;
  password: string;
  studentId: string;
  profileImage?: string;
  university: string;
  department: string;
  enrollmentYear: number;
  currentSemester: number;
  subjects: Array<{
    subjectId: mongoose.Schema.Types.ObjectId;
    name: string;
    grade?: string;
    status: 'Active' | 'Completed' | 'Dropped';
  }>;
  assignments: Array<{
    assignmentId: mongoose.Schema.Types.ObjectId;
    status: 'Pending' | 'Submitted' | 'Late' | 'Graded';
    grade?: string;
  }>;
  academicStatus: 'Active' | 'Graduated' | 'On Probation' | 'Suspended';
  notifications: Array<{
    message: string;
    type: 'Assignment' | 'Grade' | 'System';
    read: boolean;
    createdAt: Date;
  }>;
  preferences: {
    emailNotifications: boolean;
    language: string;
    timezone: string;
  };
}

const StudentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    studentId: { type: String, unique: true, required: true },
    profileImage: String,
    university: { type: String, required: true },
    department: { type: String, required: true },
    enrollmentYear: { type: Number, required: true },
    currentSemester: { type: Number, required: true },
    subjects: [{
      subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
      name: String,
      grade: String,
      status: {
        type: String,
        enum: ['Active', 'Completed', 'Dropped'],
        default: 'Active'
      }
    }],
    assignments: [{
      assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment' },
      status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Late', 'Graded'],
        default: 'Pending'
      },
      grade: String
    }],
    academicStatus: {
      type: String,
      enum: ['Active', 'Graduated', 'On Probation', 'Suspended'],
      default: 'Active'
    },
    notifications: [{
      message: String,
      type: {
        type: String,
        enum: ['Assignment', 'Grade', 'System']
      },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }],
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      language: { type: String, default: 'en' },
      timezone: String
    },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes
StudentSchema.index({ email: 1 }, { unique: true });
StudentSchema.index({ studentId: 1 }, { unique: true });
StudentSchema.index({ academicStatus: 1 });
StudentSchema.index({ 'subjects.subjectId': 1 });

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
