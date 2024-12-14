import { NextResponse } from "next/server";
import { Student } from "@/database/models/student.model";
import connectDB from "@/database/connect";
import { comparePassword } from "@/utils/bcrypt";
import { studentLoginSchema } from "@/types/auth-interface";
import { generateRefreshToken, generateToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body
    const validatedData = studentLoginSchema.parse(body);
    const { email, password } = validatedData;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find teacher
    const student = await Student.findOne({ email });
    if (!student) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Check if email is verified
    if (!student.isVerified) {
      return NextResponse.json(
        { message: "Please verify your email first" },
        { status: 400 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, student.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const accessToken = generateToken({ id: student._id });
    const refreshToken = generateRefreshToken({ id: student._id });

    // Set cookies
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully",
        data: { user: student, accessToken, refreshToken },
      },
      { status: 200 }
    );

    response.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600
    });
    
    response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 3600
    });

    return response;
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { message: "Failed to login" },
      { status: 500 }
    );
  }
}
