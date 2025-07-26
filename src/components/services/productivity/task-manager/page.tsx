
"use client";
import { useState } from "react";
import TaskForm from "@/components/ui/TaskForm";
import TaskList from "@/components/ui/TaskList";
import { useSession } from "next-auth/react";


export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const { data: session, status } = useSession();

  const triggerRefresh = () => setRefresh((prev) => !prev);

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

      const userEmail = session?.user?.email as string;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Task Manager</h1>
      <TaskForm onAdd={triggerRefresh} userEmail={userEmail} />
      <TaskList refresh={refresh} userEmail={userEmail} />
    </main>
  );
}
