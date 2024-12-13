import connectDB from '@/database/connect';
import { Teacher } from '@/database/models/teacher.model';
import { hashPassword } from '@/utils/bcrypt';
import { generateVerificationOTP } from '@/utils/generate-otp';
import { sendVerificationEmail } from '@/utils/send-mail';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
    const { name, email, password, department, bio } = await req.json();

    if ( !name || !email || !password || !department || !bio ) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    console.log("Connecting to database");
    await connectDB();
    console.log("Connected to database");

    console.log("Checking if teacher exists");
    const existingTeacher = await Teacher.findOne({ email });
    console.log("Teacher exists:", existingTeacher);
    if (existingTeacher) {
        return NextResponse.json({ message: "Teacher already exists" }, { status: 400 });
    }

    console.log("Hashing password");
    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);

    console.log("Generating verification OTP");
    const verificationOtp = generateVerificationOTP();
    console.log("Verification OTP:", verificationOtp);

    console.log("Creating teacher");
    const teacher = await Teacher.create({ name, email, password: hashedPassword, department, bio });
    console.log("Teacher created:", teacher);

    try {
        await sendVerificationEmail(email, verificationOtp);
    } catch (error) {
        await Teacher.deleteOne({ email });
        console.error("Failed to send verification email", error);
        return NextResponse.json({ message: "Failed to send verification email" }, { status: 500 });
    }

    const teacherData = {
        name,
        email,
        department,
        bio,
        verificationOtp
    }

    return NextResponse.json({ message: "Teacher created successfully", teacherData }, { status: 201 });
   } catch (error) {
    console.error("Error in signup", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
   }
}
