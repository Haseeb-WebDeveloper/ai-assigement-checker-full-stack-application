import connectDB from '@/database/connect';
import { hashPassword } from '@/utils/bcrypt';
import { generateVerificationOTP } from '@/utils/generate-otp';
import { sendVerificationEmail } from '@/utils/send-mail';
import { NextRequest, NextResponse } from "next/server";
import { Student } from '@/database/models/student.model';

export async function POST(req: NextRequest) {
   try {
    const { name, email, password, university, department, rollNo, currentSemester, subjects } = await req.json();

    if (!name || !email || !password || !university || !department || !rollNo || !currentSemester) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    // Clean up any existing unverified accounts with this email
    await Student.deleteMany({ email, isVerified: false });

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        return NextResponse.json({ 
            message: "An account with this email already exists" 
        }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const verificationOtp = generateVerificationOTP();

    const student = await Student.create({ 
        name, 
        email, 
        password: hashedPassword, 
        university,
        department,
        rollNo,
        currentSemester,
        subjects: subjects || [],
        verificationOtp,
        isVerified: false
    });

    console.log("Student created:", student);

    try {
        await sendVerificationEmail(email, verificationOtp);
    } catch (error) {
        await Student.findByIdAndDelete(student._id);
        return NextResponse.json({ 
            message: "Failed to send verification email" 
        }, { status: 500 });
    }

    return NextResponse.json({ 
        message: "Student account created successfully", 
        data: {
            id: student._id,
            name,
            email,
            university,
            department,
            rollNo,
            currentSemester
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