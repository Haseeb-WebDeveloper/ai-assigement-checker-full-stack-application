"use client";

import * as React from "react";
import { VerifyOTPForm } from "@/components/forms/verify-otp-form";

export default function VerifyOTPPage({ params }: { params: { email: string; role: string } }) {
  const decodedEmail = decodeURIComponent(params.email);
  const { role } = params;

  console.log("Verify OTP Page - Email:", decodedEmail);
  console.log("Verify OTP Page - Role:", role);

  if (!decodedEmail || !role) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
        <p className="text-destructive">Invalid verification link</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
      <VerifyOTPForm email={decodedEmail} role={role} />
    </div>
  );
} 