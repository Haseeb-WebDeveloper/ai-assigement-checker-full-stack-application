import mongoose, { Schema } from 'mongoose';
import { IBaseDocument } from './base.model';

export interface IAdmin extends IBaseDocument {
  name: string;
  email: string;
  password: string;
  adminId: string;
  profileImage?: string;
  role: 'Super Admin' | 'Department Admin' | 'System Admin';
  department?: string;
  permissions: {
    users: {
      create: boolean;
      update: boolean;
      delete: boolean;
      view: boolean;
    };
    assignments: {
      manage: boolean;
      review: boolean;
      delete: boolean;
    };
    analytics: {
      view: boolean;
      export: boolean;
    };
    settings: {
      system: boolean;
      security: boolean;
      notifications: boolean;
    };
  };
  activityLog: Array<{
    action: string;
    details: string;
    timestamp: Date;
    ip: string;
  }>;
  systemMetrics: {
    activeUsers: number;
    totalAssignments: number;
    storageUsed: number;
    aiUsageMinutes: number;
    lastUpdated: Date;
  };
  notifications: Array<{
    message: string;
    type: 'System' | 'Security' | 'User' | 'Performance';
    severity: 'Low' | 'Medium' | 'High';
    read: boolean;
    createdAt: Date;
  }>;
  preferences: {
    emailNotifications: boolean;
    language: string;
    timezone: string;
    theme: 'Light' | 'Dark' | 'System';
  };
}

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adminId: { type: String, required: true, unique: true },
    profileImage: String,
    role: {
      type: String,
      enum: ['Super Admin', 'Department Admin', 'System Admin'],
      required: true
    },
    department: String,

    permissions: {
      users: {
        create: { type: Boolean, default: false },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        view: { type: Boolean, default: true }
      },
      assignments: {
        manage: { type: Boolean, default: false },
        review: { type: Boolean, default: true },
        delete: { type: Boolean, default: false }
      },
      analytics: {
        view: { type: Boolean, default: true },
        export: { type: Boolean, default: false }
      },
      settings: {
        system: { type: Boolean, default: false },
        security: { type: Boolean, default: false },
        notifications: { type: Boolean, default: true }
      }
    },

    activityLog: [{
      action: String,
      details: String,
      timestamp: { type: Date, default: Date.now },
      ip: String
    }],

    systemMetrics: {
      activeUsers: { type: Number, default: 0 },
      totalAssignments: { type: Number, default: 0 },
      storageUsed: { type: Number, default: 0 }, // in bytes
      aiUsageMinutes: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },

    notifications: [{
      message: String,
      type: {
        type: String,
        enum: ['System', 'Security', 'User', 'Performance']
      },
      severity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
      },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }],

    preferences: {
      emailNotifications: { type: Boolean, default: true },
      language: { type: String, default: 'en' },
      timezone: String,
      theme: {
        type: String,
        enum: ['Light', 'Dark', 'System'],
        default: 'System'
      }
    },

    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Indexes
AdminSchema.index({ email: 1 }, { unique: true });
AdminSchema.index({ adminId: 1 }, { unique: true });
AdminSchema.index({ role: 1 });
AdminSchema.index({ 'activityLog.timestamp': -1 });

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
