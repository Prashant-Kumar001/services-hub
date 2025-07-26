// app/tech-learn/tailwind/page.tsx
export default function TailwindLearnPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-sky-600 mb-6">
        Tailwind CSS
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Tailwind CSS is a utility-first CSS framework for rapidly building
        custom user interfaces with low-level class names.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧠 Key Concepts</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Utility Classes</li>
          <li>Responsive Design</li>
          <li>Dark Mode Support</li>
          <li>Customization with tailwind.config.js</li>
          <li>JIT Compiler</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🚀 Why Use Tailwind?</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          <li>Rapid prototyping</li>
          <li>Highly customizable</li>
          <li>No need to write custom CSS</li>
          <li>Responsive by default</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📦 Example Code</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200">
          <code>{`<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click Me
</button>`}</code>
        </pre>
      </section>
    </main>
  );
}
