import mongoose, { Schema } from 'mongoose';
import { IBaseDocument } from './base.model';

export interface ITeacher extends IBaseDocument {
  name: string;
  email: string;
  password: string;
  teacherId: string;
  profileImage?: string;
  department: string;
  designation: string;
  specialization: string[];
  subjects: Array<{
    subjectId: mongoose.Schema.Types.ObjectId;
    name: string;
    semester: string;
    year: number;
    studentsCount: number;
    status: 'Active' | 'Completed' | 'Planned';
  }>;
  assignments: Array<{
    assignmentId: mongoose.Schema.Types.ObjectId;
    subjectId: mongoose.Schema.Types.ObjectId;
    title: string;
    dueDate: Date;
    submissionsCount: number;
    gradedCount: number;
    status: 'Draft' | 'Published' | 'Closed';
  }>;
  analytics: {
    totalAssignmentsGraded: number;
    averageGradingTime: number;
    averageResponseTime: number;
    studentSatisfactionScore: number;
    aiAgreementRate: number;
  };
  availability: {
    status: 'Available' | 'Busy' | 'On Leave' | 'Offline';
    nextAvailableDate?: Date;
    officeHours: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
  };
  notifications: Array<{
    message: string;
    type: 'Assignment' | 'Student' | 'System' | 'Admin';
    read: boolean;
    createdAt: Date;
  }>;
  preferences: {
    emailNotifications: boolean;
    autoGrading: boolean;
    language: string;
    timezone: string;
    gradingScale: 'Letter' | 'Percentage' | 'Points';
  };
}

const TeacherSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    specialization: [String],
    
    subjects: [{
      subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
      name: { type: String, required: true },
      semester: { type: String, required: true },
      studentsCount: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ['Active', 'Completed', 'Planned'],
        default: 'Active'
      }
    }],

    assignments: [{
      assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
      subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
      title: { type: String, required: true },
      dueDate: Date,
      submissionsCount: { type: Number, default: 0 },
      gradedCount: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ['Draft', 'Published', 'Closed'],
        default: 'Draft'
      }
    }],

    analytics: {
      totalAssignmentsGraded: { type: Number, default: 0 },
      averageGradingTime: { type: Number, default: 0 }, // in minutes
      averageResponseTime: { type: Number, default: 0 }, // in hours
      studentSatisfactionScore: { type: Number, default: 0 },
      aiAgreementRate: { type: Number, default: 0 } // percentage of agreement with AI grading
    },

    availability: {
      status: {
        type: String,
        enum: ['Available', 'Busy', 'On Leave', 'Offline'],
        default: 'Available'
      },
      nextAvailableDate: Date,
    },

    notifications: [{
      message: String,
      type: {
        type: String,
        enum: ['Assignment', 'Student', 'System', 'Admin']
      },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }],

    preferences: {
      emailNotifications: { type: Boolean, default: true },
      autoGrading: { type: Boolean, default: true },
      language: { type: String, default: 'en' },
      timezone: String,
      gradingScale: {
        type: String,
        enum: ['Letter', 'Percentage', 'Points'],
        default: 'Letter'
      }
    },

    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Indexes for better query performance
TeacherSchema.index({ email: 1 }, { unique: true });
TeacherSchema.index({ teacherId: 1 }, { unique: true });
TeacherSchema.index({ department: 1 });
TeacherSchema.index({ 'subjects.subjectId': 1 });
TeacherSchema.index({ 'assignments.assignmentId': 1 });
TeacherSchema.index({ 'availability.status': 1 });

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);