import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todo";

export async function GET(req: NextRequest) {

  if (!req.nextUrl.searchParams.has("userEmail")) {
    return NextResponse.json(
      { error: "Missing userEmail" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const userEmail = req.nextUrl.searchParams.get("userEmail");
    const todos = await Todo.find({ userEmail }).sort({ createdAt: -1 });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const todo = await Todo.create(body);
    return NextResponse.json(todo);
  } catch (error) {
    console.error(error); 
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await dbConnect();

  try {
    const { id, completed, content, favorite, status, email } =
      await req.json();

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields: id or email" },
        { status: 400 }
      );
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userEmail: email }, 
      { completed, content, favorite, status }, 
      { new: true } 
    );

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { id } = await req.json();
    const deleted = await Todo.findByIdAndDelete(id);
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
