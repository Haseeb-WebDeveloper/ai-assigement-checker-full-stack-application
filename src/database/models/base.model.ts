import { Document } from 'mongoose';

export interface IBaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  isActive: boolean;
} 