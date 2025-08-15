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
    const user = await User.findOne({ email }).select("masterPasswordHash");

    if (!user || !user.masterPasswordHash) {
      return NextResponse.json(
        { success: false, error: "No master password set." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.masterPasswordHash);

    return NextResponse.json({ success: isMatch });
  } catch (err) {
    console.error("VERIFY route error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
