// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} UtiliHub. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            GitHub
          </a>
          <a href="/privacy" className="hover:text-blue-500">
            Privacy
          </a>
          <a href="/terms" className="hover:text-blue-500">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
