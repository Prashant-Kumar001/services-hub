import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import {Note} from "@/models/Note";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userEmail = req.nextUrl.searchParams.get("userEmail");
    const search = req.nextUrl.searchParams.get("search");
    const category = req.nextUrl.searchParams.get("category");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "newest";

    if (!userEmail) {
      return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });
    }

    let query: any = { userEmail };

    if (category && category !== "all") {
      query.category = category;
    }

    let notes;

    if (search && search.trim()) {
      console.log(search);
      notes = await Note.searchNotes(userEmail, search.trim());
    } else {
      notes = await Note.find(query);
    }

    switch (sortBy) {
      case "oldest":
        notes = notes.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "title":
        notes = notes.sort((a: any, b: any) => a.title.localeCompare(b.title));
        break;
      case "updated":
        notes = notes.sort(
          (a: any, b: any) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case "newest":
      default:
        notes = notes.sort((a: any, b: any) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        break;
    }

    return NextResponse.json(notes);
  } catch (error) {
    console.error("GET /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, content, userEmail, category } = body;

    console.log(body);

    if (!title || !userEmail) {
      return NextResponse.json(
        { error: "Title and userEmail are required" },
        { status: 400 }
      );
    }

    const noteData = {
      title: title.trim(),
      content: content?.trim() || "",
      userEmail,
      category: category?.trim() || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log('new note', noteData);

    const newNote = await Note.create({
      title: noteData.title,
      content: noteData.content,
      category: noteData.category,
      userEmail: noteData.userEmail,
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error("POST /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { _id, title, content, category, isPinned } = body;

    console.log(body)

    if (!_id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (category !== undefined) updateData.category = category?.trim() || null;
    if (isPinned !== undefined) updateData.isPinned = isPinned;

    const updatedNote = await Note.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    console.log('updated note', updatedNote);

    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("PUT /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { id, action } = body;

    console.log(body);

    if (!id || !action) {
      return NextResponse.json(
        { error: "Note ID and action are required" },
        { status: 400 }
      );
    }

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    let updatedNote;

    switch (action) {
      case "togglePin":
        updatedNote = await note.togglePin();
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("PATCH /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to perform action" },
      { status: 500 }
    );
  }
}
