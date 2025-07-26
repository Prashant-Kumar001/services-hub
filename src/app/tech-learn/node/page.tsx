// app/tech-learn/node/page.tsx
export default function NodeLearnPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
        Node.js
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you
        run JS on the server and build scalable backend applications.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧠 Key Concepts</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Non-blocking I/O</li>
          <li>Event-driven architecture</li>
          <li>Single-threaded concurrency</li>
          <li>npm (Node Package Manager)</li>
          <li>Built-in modules (fs, http)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🚀 Why Use Node.js?</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Fast performance</li>
          <li>Ideal for APIs & microservices</li>
          <li>Large ecosystem with npm</li>
          <li>Same language on frontend/backend</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📦 Example Code</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
          <code>{`// Simple HTTP server
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from Node.js!');
});

server.listen(3000);`}</code>
        </pre>
      </section>
    </main>
  );
}
