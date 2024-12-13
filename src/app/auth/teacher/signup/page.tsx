"use client";

import { motion } from "framer-motion";
import { TeacherSignupForm } from "@/components/forms/teacher-signup-form";


export default function TeacherSignup() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
        <TeacherSignupForm />
    </div>
  );
}
