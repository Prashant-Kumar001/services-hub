import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    let user = await User.findOne({ email });
    if (user && user.masterPasswordHash) {
      return NextResponse.json(
        { error: "Master password already set." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    if (!user) {
      user = await User.create({
        email,
        masterPasswordHash: hashed,
      });
    } else {
      user.masterPasswordHash = hashed;
      await user.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SETUP route error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
