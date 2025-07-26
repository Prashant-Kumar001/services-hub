// app/tech-learn/next/page.tsx
export default function NextLearnPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
        Next.js
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Next.js is a React framework that enables server-side rendering, static
        site generation, and built-in routing — making it ideal for full-stack
        apps.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧠 Key Concepts</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>App Router & File-based Routing</li>
          <li>Server Components & Client Components</li>
          <li>API Routes</li>
          <li>Static Generation (SSG) & Server-side Rendering (SSR)</li>
          <li>Built-in SEO, Image Optimization</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🚀 Why Use Next.js?</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Faster performance and routing</li>
          <li>Built-in features like SSR & SSG</li>
          <li>Great for SEO</li>
          <li>Full-stack capabilities</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📦 Example Code</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
          <code>{`// app/page.tsx
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}`}</code>
        </pre>
      </section>
    </main>
  );
}
