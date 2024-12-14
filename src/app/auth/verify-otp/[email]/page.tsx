"use client";

import { VerifyOTPForm } from "@/components/forms/verify-otp-form";

export default function VerifyOTPPage({ params }: { params: { email: string } }) {
  const decodedEmail = decodeURIComponent(params.email);
  console.log("Decoded Email:", decodedEmail);

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
      <VerifyOTPForm email={decodedEmail} />
    </div>
  );
} 