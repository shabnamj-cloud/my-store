import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Contact from "/models/Contact"; // مسیر نسبی

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return NextResponse.json({ message: "Your message has been sent successfully!" }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
