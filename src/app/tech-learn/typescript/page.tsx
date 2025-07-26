// app/tech-learn/typescript/page.tsx
export default function TypeScriptLearnPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
        TypeScript
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        TypeScript is a strongly typed superset of JavaScript that compiles to
        plain JS. It improves code quality and developer experience by catching
        errors early.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧠 Key Concepts</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Static Typing</li>
          <li>Interfaces & Types</li>
          <li>Type Inference</li>
          <li>Generics</li>
          <li>Enums, Unions, and Tuples</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🚀 Why Use TypeScript?</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Fewer runtime errors</li>
          <li>Better tooling and autocompletion</li>
          <li>Improved collaboration in teams</li>
          <li>Great for large codebases</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📦 Example Code</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
          <code>{`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`}</code>
        </pre>
      </section>
    </main>
  );
}
