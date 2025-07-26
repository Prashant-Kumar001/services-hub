"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Form from "./ShowSecureNoteForm";
import ShowSecureEditForm from "./ShowSecureEditForm";
import { Note } from "@/types/index";
import { Pin, PinOff } from "lucide-react";
import { InputField } from "../Password/SearchAndFilter";
import { CiSearch } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { MdViewList } from "react-icons/md";
type ViewMode = "grid" | "list";
type SortBy = "newest" | "oldest" | "title" | "updated";

export default function SecureNotes() {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const userEmail = session?.user?.email;

  const categories = [
    ...new Set(notes.map((note) => note.category).filter(Boolean)),
  ];

  useEffect(() => {
    if (!userEmail) return;
    setLoading(true);
    fetch(`/api/notes?userEmail=${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userEmail]);

  useEffect(() => {
    let filtered = notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || "").getTime() -
            new Date(b.createdAt || "").getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "updated":
          return (
            new Date(b.updatedAt || "").getTime() -
            new Date(a.updatedAt || "").getTime()
          );
        default:
          return 0;
      }
    });
    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedCategory, sortBy]);

  const addNote = async () => {
    if (!title.trim()) return;

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      category: category.trim() || undefined,
      userEmail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    });

    const newNote = await res.json();
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setCategory("");
    setShowAddForm(false);
  };

  const updateNote = async (updatedNote: Note) => {
    const res = await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });
    const updated = await res.json();
    setNotes(notes.map((n) => (n._id === updated._id ? updated : n)));
    setEditingNote(null);
  };

  const togglePin = async (id: string) => {
    const updated = { id, action: "togglePin" };
    const res = await fetch("/api/notes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const pinned = await res.json();
    setNotes(notes.map((n) => (n._id === pinned._id ? pinned : n)));
  };

  const deleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotes(notes.filter((n) => n._id !== id));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 text-lg">
            Loading your secure space...
          </span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Please log in to access your secure notes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
                🛡️ Secure Notes
                <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {notes.length} notes
                </span>
              </h1>
              <p className="text-gray-600 mt-1">
                Your private, encrypted note-taking space
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + New Note
            </button>
          </div>
        </div>

        {showAddForm && (
          <Form
            setShowAddForm={setShowAddForm}
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            content={content}
            setContent={setContent}
            addNote={addNote}
          />
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <CiSearch
                  size={24}
                  className="absolute z-50 top-4 left-4 text-gray-400"
                />
                <InputField
                  placeholder="Search notes.."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className=" pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 focus:outline-none font-medium shadow-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 focus:outline-none font-medium shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">By Title</option>
              <option value="updated">Recently Updated</option>
            </select>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 text-sm ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } transition-colors`}
              >
                <IoGrid size={21} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } transition-colors`}
              >
                <MdViewList size={24} />
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <span className="text-gray-600 ml-2">Loading your notes...</span>
            </div>
          </div>
        )}
        {!loading && (
          <>
            {filteredNotes.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredNotes.map((note) => (
                  <div
                    key={note._id}
                    className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${
                      note.isPinned ? "ring-2 ring-yellow-400" : ""
                    } ${
                      viewMode === "list" ? "flex items-start gap-4 p-4" : "p-6"
                    }`}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 two-btns">
                            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                              {note.title}
                            </h3>
                            {note.category && (
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {note.category}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => togglePin(note._id)}
                            className={`ml-2 p-1 rounded ${
                              note.isPinned
                                ? "text-yellow-500"
                                : "text-gray-400 hover:text-yellow-500"
                            } transition-colors`}
                          >
                            {note.isPinned ? (
                              <Pin className="w-6 h-6" />
                            ) : (
                              <PinOff className="w-6 h-6" />
                            )}
                          </button>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {note.content || "No content"}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>{formatDate(note.createdAt)}</span>
                          {note.updatedAt &&
                            note.updatedAt !== note.createdAt && (
                              <span>Updated {formatDate(note.updatedAt)}</span>
                            )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingNote(note)}
                            className="flex-1 text-gray-600 hover:text-gray-800 border border-gray-300 bg-white px-6 py-2 rounded-xl transition font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {note.title}
                            </h3>
                            {note.isPinned ? (
                              <Pin className="w-6 h-6 text-yellow-500" />
                            ) : (
                              <PinOff className="w-6 h-6 text-gray-400" />
                            )}
                            {note.category && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {note.category}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {note.content || "No content"}
                          </p>
                          <div className="text-xs text-gray-500">
                            {formatDate(note.createdAt)}
                            {note.updatedAt &&
                              note.updatedAt !== note.createdAt && (
                                <span className="ml-2">
                                  • Updated {formatDate(note.updatedAt)}
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => togglePin(note._id)}
                            className={`p-2 rounded ${
                              note.isPinned
                                ? "text-yellow-500"
                                : "text-gray-400 hover:text-yellow-500"
                            } transition-colors`}
                          ></button>
                          <button
                            onClick={() => setEditingNote(note)}
                            className="flex-1 text-gray-600 hover:text-gray-800 border border-gray-300 bg-white px-6 py-2 rounded-xl transition font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchTerm || selectedCategory !== "all"
                    ? "No matching notes found"
                    : "No notes yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first secure note to get started"}
                </p>
                {!searchTerm && selectedCategory === "all" && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Your First Note
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {editingNote && (
          <ShowSecureEditForm
            editingNote={editingNote}
            setEditingNote={setEditingNote}
            updateNote={updateNote}
          />
        )}
      </div>
    </div>
  );
}
