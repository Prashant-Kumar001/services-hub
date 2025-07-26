"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Plus, Star, Check, Filter, TrendingUp, Search } from "lucide-react";
import TodoItem from "@/components/ui/TodoItem";
import { EnhancedTodo } from "@/types/index";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse animation-delay-150"></div>
    </div>
  </div>
);

export default function HomePage() {
  const [todos, setTodos] = useState<EnhancedTodo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<
    "all" | "active" | "completed" | "favorites"
  >("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<EnhancedTodo[]>([]);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email!;

  useEffect(() => {
    const filtered = todos.filter((todo) => {
      const matchesFilter =
        filter === "active"
          ? !todo.completed && todo.status === "active"
          : filter === "completed"
          ? todo.completed || todo.status === "completed"
          : filter === "favorites"
          ? todo.favorite
          : todo.status !== "archived";

      const matchesQuery = todo.content
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });

    setFilteredTodos(filtered);
  }, [todos, filter, query]);

  const stats = useMemo(
    () => ({
      total: todos.filter((t) => t.status !== "archived").length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed && t.status === "active").length,
      favorites: todos.filter((t) => t.favorite).length,
    }),
    [todos]
  );

  const loadTodos = useCallback(async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/todos?userEmail=${encodeURIComponent(userEmail)}`
      );
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data: EnhancedTodo[] = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Error loading todos:", err);
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Task content cannot be empty.");
      return;
    }
    setAdding(true);
    try {
      const todoData = {
        content: text.trim(),
        favorite: false,
        completed: false,
        status: "active",
        userEmail,
      };

      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(todoData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const { error } = await res.json();
        return toast.error(error || "Failed to add todo");
      }

      setText("");
      await loadTodos();
      toast.success("Task added successfully! 🎉");
    } catch (error: any) {
      console.error("Add todo error:", error);
      toast.error(error.message || "Failed to add todo");
    } finally {
      setAdding(false);
    }
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
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              TaskFlow
            </h1>
          </div>
          <p className="text-gray-600 text-xl md:text-2xl font-light">
            Transform your productivity with elegant task management
          </p>

          {stats.total > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {[
                {
                  key: "total",
                  label: "Total Tasks",
                  value: stats.total,
                  color: "blue",
                  icon: Filter,
                },
                {
                  key: "active",
                  label: "In Progress",
                  value: stats.active,
                  color: "orange",
                  icon: TrendingUp,
                },
                {
                  key: "completed",
                  label: "Completed",
                  value: stats.completed,
                  color: "green",
                  icon: Check,
                },
                {
                  key: "favorites",
                  label: "Favorites",
                  value: stats.favorites,
                  color: "yellow",
                  icon: Star,
                },
              ].map((stat, index) => (
                <div
                  key={stat.key}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-${stat.color}-100`}>
                      <stat.icon
                        size={20}
                        className={`text-${stat.color}-600`}
                      />
                    </div>
                    <div className="text-left">
                      <div
                        className={`text-2xl font-bold text-${stat.color}-600`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </header>

        <main className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-100/50 overflow-hidden border border-white/50 transform transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be accomplished today?"
                    rows={3}
                    className="flex-1 px-6 py-4 rounded-2xl border-0 bg-white/95 backdrop-blur-sm focus:ring-4 focus:ring-white/30 focus:outline-none text-gray-800 placeholder-gray-500 shadow-lg resize-none transition-all duration-300"
                    disabled={adding}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      e.shiftKey === false &&
                      (e.preventDefault(), addTodo(e))
                    }
                  />
                  <button
                    onClick={addTodo}
                    disabled={adding || !text.trim()}
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg min-w-[140px] hover:shadow-xl active:scale-95 transform hover:-translate-y-1"
                  >
                    {adding ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Plus size={20} />
                        <span>Add Task</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto  bg-gray-50/50 backdrop-blur-sm border-b border-gray-200/50">
            {[
              {
                key: "all",
                label: "All Tasks",
                count: stats.total,
                color: "blue",
              },
              {
                key: "active",
                label: "Active",
                count: stats.active,
                color: "orange",
              },
              {
                key: "completed",
                label: "Completed",
                count: stats.completed,
                color: "green",
              },
              {
                key: "favorites",
                label: "Favorites",
                count: stats.favorites,
                color: "yellow",
              },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 relative ${
                  filter === filterOption.key
                    ? `text-${filterOption.color}-600 bg-white shadow-lg`
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {filterOption.label}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      filter === filterOption.key
                        ? `bg-${filterOption.color}-100 text-${filterOption.color}-700`
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {filterOption.count}
                  </span>
                </span>
                {filter === filterOption.key && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-${filterOption.color}-500 rounded-t-full`}
                  ></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 focus:outline-none font-medium shadow-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-80"></div>
            <Search className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600" />
          </div>

          <div className="min-h-[400px] relative max-h-[700px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader />
              </div>
            ) : filteredTodos && filteredTodos.length > 0 ? (
              <div className="divide-y divide-gray-100/50">
                {filteredTodos.map((todo, index) => (
                  <div
                    key={todo._id}
                    className="transform transition-all duration-500 animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TodoItem
                      email={userEmail}
                      id={todo._id}
                      content={todo.content}
                      completed={todo.completed}
                      favorite={todo.favorite}
                      refresh={loadTodos}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="relative mb-6">
                  <div className="text-8xl opacity-20">
                    {filter === "completed"
                      ? "🎉"
                      : filter === "favorites"
                      ? "⭐"
                      : "📝"}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/50 rounded-full blur-xl"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-700">
                  {filter === "completed"
                    ? "No completed tasks yet"
                    : filter === "favorites"
                    ? "No favorite tasks"
                    : filter === "active"
                    ? "No active tasks"
                    : "Your task list is empty"}
                </h3>
                <p className="text-lg text-center max-w-md leading-relaxed">
                  {filter === "all"
                    ? "Ready to boost your productivity? Add your first task above!"
                    : filter === "favorites"
                    ? "Star your important tasks to see them here!"
                    : "Switch filters or add new tasks to get started."}
                </p>
              </div>
            )}
          </div>
        </main>

        {stats.total > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 transform transition-all duration-500 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Progress Overview
                  </h3>
                  <p className="text-gray-600">Keep up the great work!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((stats.completed / stats.total) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <div className="flex justify-between mt-3 text-sm text-gray-600">
                <span>{stats.completed} completed</span>
                <span>{stats.active} remaining</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
