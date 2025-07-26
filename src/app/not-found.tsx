// app/not-found.tsx
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-4xl font-bold">404 – Page Not Found 🧐</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Looks like this page doesn’t exist.
      </p>
    </div>
  );
}
