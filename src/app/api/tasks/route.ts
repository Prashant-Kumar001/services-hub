import connectToDatabase from "@/lib/mongoose";
import Task from "@/models/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const userEmail = req.nextUrl.searchParams.get("userEmail");

  if (!userEmail)
    return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });

  if (id) {
    const task = await Task.findById(id);
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(task);
  }

  const tasks = await Task.find({userEmail}).sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { title, description, userEmail } = body;

  if (!userEmail)
    return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  console.log(body)

  const newTask = await Task.create({
    title,
    description,
    status: "pending",
    userEmail,
  });
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const body = await req.json();
  const updated = await Task.findByIdAndUpdate(id, body, { new: true });
  if (!updated)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return new NextResponse(null, { status: 204 });
}
