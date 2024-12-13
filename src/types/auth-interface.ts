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

// Available options for form selects
export const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Business",
  "Arts",
] as const;

