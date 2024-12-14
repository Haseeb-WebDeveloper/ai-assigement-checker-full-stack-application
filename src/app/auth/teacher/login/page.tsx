"use client";

import { TeacherLoginForm } from "@/components/forms/teacher-login-form";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TeacherLoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
      <TeacherLoginForm />
    </div>
  );
}