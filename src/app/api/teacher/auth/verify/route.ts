import { NextResponse } from "next/server";
import { Teacher } from "@/database/models/teacher.model";
import connectDB from "@/database/connect";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Verifying OTP for:", body);

    const { email, code } = body;
    console.log("Email:", email, "Code:", code);

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find teacher with matching email and OTP
    const teacher = await Teacher.findOne({
      email,
      verificationOtp: code,
      isVerified: false,
    });

    console.log("Found teacher:", teacher);

    if (!teacher) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Update teacher verification status
    teacher.isVerified = true;
    teacher.verificationOtp = "";
    await teacher.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in verify OTP:", error);
    return NextResponse.json(
      { message: "Failed to verify email" },
      { status: 500 }
    );
  }
} 