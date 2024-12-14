"use client";

import { VerifyOTPForm } from "@/components/forms/verify-otp-form";


export default function VerifyOTPPage({ params }: { params: { email: string } }) {
  console.log("Email:", params.email);
  return (
   <div className="flex justify-center items-center min-h-screen w-full bg-background py-16">
      <VerifyOTPForm email={params.email} />
    </div>
  );
}
