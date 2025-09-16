import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../models/User"; // مسیر نسبی

// اتصال به MongoDB
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    // نسخه ساده: فقط پیام موفقیت
    // در نسخه واقعی → باید یک توکن بسازی و ایمیل ریست بفرستی
    return NextResponse.json(
      { message: "Password reset link sent to your email" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
