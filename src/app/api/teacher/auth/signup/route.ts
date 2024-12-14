import connectDB from '@/database/connect';
import { Teacher } from '@/database/models/teacher.model';
import { hashPassword } from '@/utils/bcrypt';
import { generateVerificationOTP } from '@/utils/generate-otp';
import { sendVerificationEmail } from '@/utils/send-mail';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
    const { name, email, password, department, bio } = await req.json();

    if (!name || !email || !password || !department || !bio) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    // Clean up any existing unverified accounts with this email
    await Teacher.deleteMany({ email, isVerified: false });

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
        return NextResponse.json({ 
            message: "An account with this email already exists" 
        }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const verificationOtp = generateVerificationOTP();

    const teacher = await Teacher.create({ 
        name, 
        email, 
        password: hashedPassword, 
        department, 
        bio,
        verificationOtp,
        isVerified: false
    });

    try {
        await sendVerificationEmail(email, verificationOtp);
    } catch (error) {
        await Teacher.findByIdAndDelete(teacher._id);
        return NextResponse.json({ 
            message: "Failed to send verification email" 
        }, { status: 500 });
    }

    return NextResponse.json({ 
        message: "Teacher account created successfully", 
        data: {
            id: teacher._id,
            name,
            email,
            department,
            bio
        }
    }, { status: 201 });

   } catch (error: any) {
    console.error("Error in signup:", error);
    if (error.code === 11000) {
        return NextResponse.json({ 
            message: "An account with this email already exists" 
        }, { status: 400 });
    }
    return NextResponse.json({ 
        message: "Failed to create account. Please try again." 
    }, { status: 500 });
   }
}