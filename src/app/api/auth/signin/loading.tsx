// app/auth/signin/loading.tsx
export default function SignInLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
        <div className="h-10 bg-gray-300 rounded w-full" />
      </div>
    </div>
  );
}
