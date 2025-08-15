import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email }).select("masterPasswordHash");
    const hasMasterPassword = !!user?.masterPasswordHash;

    return NextResponse.json({ hasMasterPassword });
  } catch (err) {
    console.error("HAS route error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
