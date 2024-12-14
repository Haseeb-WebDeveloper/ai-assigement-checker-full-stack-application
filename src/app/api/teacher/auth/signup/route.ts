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

    console.log("Connecting to database");
    await connectDB();
    console.log("Connected to database");

    // Drop the teacherId index if it exists
    try {
        await Teacher.collection.dropIndex("teacherId_1");
        console.log("Dropped teacherId index");
    } catch (error) {
        // Ignore error if index doesn't exist
        console.log("No teacherId index to drop");
    }

    // Clean up any existing unverified accounts with this email
    await Teacher.deleteMany({ email, isVerified: false });

    console.log("Checking if verified teacher exists");
    const existingTeacher = await Teacher.findOne({ email, isVerified: true });
    console.log("Verified teacher exists:", existingTeacher);
    if (existingTeacher) {
        return NextResponse.json({ 
            message: "An account with this email already exists" 
        }, { status: 400 });
    }

    console.log("Hashing password");
    const hashedPassword = await hashPassword(password);

    console.log("Generating verification OTP");
    const verificationOtp = generateVerificationOTP();
    console.log("Verification OTP:", verificationOtp);

    console.log("Creating teacher");
    const teacher = await Teacher.create({ 
        name, 
        email, 
        password: hashedPassword, 
        department, 
        bio,
        verificationOtp,
        isVerified: false
    });
    console.log("Teacher created:", teacher);

    try {
        await sendVerificationEmail(email, verificationOtp);
    } catch (error) {
        // If email sending fails, delete the created teacher
        await Teacher.findByIdAndDelete(teacher._id);
        console.error("Failed to send verification email", error);
        return NextResponse.json({ 
            message: "Failed to send verification email" 
        }, { status: 500 });
    }

    const teacherData = {
        id: teacher._id,
        name,
        email,
        department,
        bio
    }

    return NextResponse.json({ 
        message: "Teacher account created successfully", 
        data: teacherData 
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