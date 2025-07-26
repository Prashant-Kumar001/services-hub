"use client";

import { Check, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  email: string | null;
  id?: string;
  title?: string;
  content: string;
  completed: boolean;
  favorite?: boolean;
  refresh: () => void;
};

const TodoItem = ({
  id,
  title,
  content,
  completed,
  favorite,
  refresh,
  email,
}: Props) => {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  const toggle = async () => {
    if (!id || isToggling) return;

    setIsToggling(true);
    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !completed, email }),
      });

      if (!res.ok) throw new Error("Failed to update todo");

      toast.success(
        completed ? "Task marked as active! 📝" : "Task completed! 🎉"
      );
      refresh();
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update task");
    } finally {
      setIsToggling(false);
    }
  };

  const toggleFavorite = async () => {
    if (!id || isFavoriting) return;

    setIsFavoriting(true);
    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, favorite: !favorite, email }),
      });

      if (!res.ok) throw new Error("Failed to update favorite");

      toast.success(
        favorite ? "Removed from favorites" : "Added to favorites! ⭐"
      );
      refresh();
    } catch (error) {
      console.error("Favorite error:", error);
      toast.error("Failed to update favorite");
    } finally {
      setIsFavoriting(false);
    }
  };

  const remove = async () => {
    if (!id || isDeleting) return;

    if (!confirm("Are you sure you want to delete this task?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete todo");

      toast.success("Task deleted successfully! 🗑️");
      refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`group relative transform transition-all duration-300 ${
        isDeleting ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="flex items-start gap-4 p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300">
        <button
          onClick={toggle}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
            completed
              ? "bg-gradient-to-r from-green-400 to-green-600 border-green-500 shadow-lg shadow-green-200"
              : "border-gray-300 hover:border-green-400 hover:shadow-md"
          }`}
        >
          {completed && <Check size={14} className="text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          {title && (
            <h3
              className={`font-semibold text-lg mb-1 transition-all duration-300 ${
                completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {title}
            </h3>
          )}
          <p
            className={`text-gray-600 transition-all duration-300 ${
              completed ? "line-through opacity-60" : ""
            }`}
          >
            {content}
          </p>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              favorite
                ? "bg-yellow-100 text-yellow-600 shadow-md"
                : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
            }`}
          >
            <Star size={16} fill={favorite ? "currentColor" : "none"} />
          </button>

          <button
            onClick={remove}
            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
