import { NextResponse } from "next/server";
import { Teacher } from "@/database/models/teacher.model";
import connectDB from "@/database/connect";
import { generateVerificationOTP } from "@/utils/generate-otp";
import { sendVerificationEmail } from "@/utils/send-mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    // Generate new OTP
    const verificationOtp = generateVerificationOTP();
    teacher.verificationOtp = verificationOtp;
    await teacher.save();

    // Send new verification email
    try {
      await sendVerificationEmail(email, verificationOtp);
    } catch (error) {
      console.error("Error in sending verification email:", error);
      teacher.verificationOtp = "";
      await teacher.save();
      return NextResponse.json(
        { message: "Failed to send verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Verification code resent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in resend OTP:", error);
    return NextResponse.json(
      { message: "Failed to resend verification code" },
      { status: 500 }
    );
  }
} 