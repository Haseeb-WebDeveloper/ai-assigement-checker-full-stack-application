"use client";

import { LoginForm } from "@/components/forms/login-form";

export default function TeacherLoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
      <LoginForm role="teacher" />
    </div>
  );
}
