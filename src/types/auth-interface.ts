import { z } from "zod";

// Teacher signup schema
export const teacherSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  department: z.string().min(2, "Please select a department"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(300, "Bio cannot exceed 300 characters"),
});

export type TeacherSignupInput = z.infer<typeof teacherSignupSchema>;

// Verify OTP schema
export const verifyOTPSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  code: z.string().length(6, "Verification code must be 6 digits")
    .regex(/^\d+$/, "Verification code must only contain numbers"),
});

export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;

// Add this to your existing auth-interface.ts
export const teacherLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type TeacherLoginInput = z.infer<typeof teacherLoginSchema>;





// student

// Teacher signup schema
export const studentSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  university: z.string().min(2, "Please select a university"),
  department: z.string().min(2, "Please select a department"),
  rollNo: z.string().min(2, "Please enter your roll number"),
  currentSemester: z.number().min(1, "Please enter your current semester"),
  subjects: z.array(z.object({})),
});

export type StudentSignupInput = z.infer<typeof studentSignupSchema>;


// Add this to your existing auth-interface.ts
export const studentLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type StudentLoginInput = z.infer<typeof studentLoginSchema>;



