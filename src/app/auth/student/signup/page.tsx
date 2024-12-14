"use client";

import { StudentSignupForm } from "@/components/forms/student-signup-form";

export default function StudentSignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
      <StudentSignupForm />
    </div>
  );
}