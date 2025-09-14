import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { Password } from "@/models/password";

export async function GET(req: NextRequest) {
  await dbConnect();
  const userEmail = req.nextUrl.searchParams.get("userEmail");
  console.log("Fetching passwords for user:", userEmail);

  try {
    if (!userEmail)
      return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });
    const passwords = await Password.find({ email: userEmail }).sort({
      createdAt: -1,
    });
    return NextResponse.json(passwords, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const newPassword = await Password.create(body);
    return NextResponse.json(newPassword, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed to create" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    console.log(body);
    const { id, action, passwordData } = body;
    const thisPassword = await Password.findById(id);

    console.log(id, action);

    if (!thisPassword) {
      return NextResponse.json(
        { error: "Password not found" },
        { status: 404 }
      );
    }
    let updatedPassword;

    switch (action) {
      case "togglePin":
        updatedPassword = await thisPassword.togglefavorite();
        break;
      case "update":
        updatedPassword = await thisPassword.update(passwordData);
        return NextResponse.json({
          status: true,
          message: "updated",
          password: updatedPassword
        })
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(
      { favorite: updatedPassword.favorite },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const { id } = await req.json();
    const deletedPassword = await Password.findByIdAndDelete(id);
    return NextResponse.json(deletedPassword, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 400 });
  }
}
