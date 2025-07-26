import React from "react";
import { Note } from "@/types/index";
import { InputField } from "../Password/SearchAndFilter";

interface Props {
  editingNote: Note;
  setEditingNote: any;
  updateNote: any;
}

const ShowSecureEditForm = ({
  editingNote,
  setEditingNote,
  updateNote,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 animate-fade-in overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            🛠️ Edit Secure Note
          </h2>
          <button
            onClick={() => setEditingNote(null)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5 bg-white">
          <InputField
            placeholder="Title"
            value={editingNote.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditingNote({ ...editingNote, title: e.target.value })
            }
          />
          <InputField
            placeholder="Category"
            value={editingNote.category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditingNote({ ...editingNote, category: e.target.value })
            }
          />

          <textarea
            value={editingNote.content}
            onChange={(e) =>
              setEditingNote({ ...editingNote, content: e.target.value })
            }
            rows={6}
            placeholder="Enter secure note content..."
            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:bg-white transition-all placeholder-gray-400 font-medium resize-none"
          />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setEditingNote(null)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={() => updateNote(editingNote)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowSecureEditForm;
