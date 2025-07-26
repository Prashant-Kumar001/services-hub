// app/tech-learn/react/page.tsx
export default function ReactLearnPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
        React.js
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        React is a JavaScript library for building user interfaces. It helps
        developers create fast, interactive UIs using a component-based
        approach.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          🧠 Key Concepts
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Components (functional and class)</li>
          <li>JSX (HTML in JavaScript)</li>
          <li>Props and State</li>
          <li>Hooks (like useState, useEffect)</li>
          <li>Virtual DOM</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          🚀 Why Use React?
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Reusable UI components</li>
          <li>Efficient updates with Virtual DOM</li>
          <li>Huge ecosystem & community</li>
          <li>Backed by Facebook</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          📦 Example Code
        </h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
          <code>{`import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}`}</code>
        </pre>
      </section>
    </main>
  );
}
