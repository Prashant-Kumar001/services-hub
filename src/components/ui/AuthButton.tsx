"use client";

import { redirect } from 'next/navigation'
import { useSession, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
        <span className="text-gray-600">Loading...</span>
      </div>
    );
  }

  return session ? (
    <div className="flex items-center gap-4 p-2 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          />
        )}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900">Welcome back!</p>
          <p className="text-xs text-gray-600">
            {session.user?.name || session.user?.email}
          </p>
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Sign Out
      </button>
    </div>
  ) : (
    <button className="p-2 rounded-lg border border-gray-200 shadow-sm cursor-pointer" onClick={() => redirect("/api/auth/signin")}>
      login
    </button>
  );
}
