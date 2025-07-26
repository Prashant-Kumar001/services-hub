"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-[calc(100vh-64px)]  flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-indigo-200">
        <div className="text-center mb-6">
          <img src="/logo.svg" alt="Logo" className="w-14 h-14 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-indigo-600">UtiliHub</h1>
          <p className="text-gray-500 mt-1">Your Dev Toolkit Hub</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-semibold"
          >
            <FaGithub />
            Sign in with GitHub
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all font-semibold"
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
