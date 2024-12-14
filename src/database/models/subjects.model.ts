import mongoose, { Document, Schema } from 'mongoose';

// Interface for type safety
export interface ISubject extends Document {
    name: string;
    description: string;
    teachers: mongoose.Schema.Types.ObjectId[];
    students: mongoose.Schema.Types.ObjectId[];
    assignments: mongoose.Schema.Types.ObjectId[];
  }

// Define the schema for the Subject model
const SubjectSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },  // Name of the subject (e.g., "Mathematics", "Physics")
    description: { type: String, required: true },  // A brief description of the subject
    teachers: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },  // References to Teacher model who teach the subject
    ],
    students: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },  // References to students enrolled in this subject
    ],
    assignments: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },  // References to assignments related to this subject
    ],
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

export const Subject = mongoose.models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
