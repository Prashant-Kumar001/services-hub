import Link from "next/link";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiGraphql,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";

const techTopics = [
  {
    title: "React.js",
    slug: "react",
    description: "A JavaScript library for building user interfaces.",
    icon: FaReact,
  },
  {
    title: "Node.js",
    slug: "node",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    icon: FaNodeJs,
  },
  {
    title: "Next.js",
    slug: "next",
    description: "The React Framework for Production.",
    icon: SiNextdotjs,
  },
  {
    title: "Tailwind CSS",
    slug: "tailwind",
    description: "A utility-first CSS framework for rapid UI development.",
    icon: SiTailwindcss,
  },
  {
    title: "TypeScript",
    slug: "typescript",
    description:
      "A typed superset of JavaScript that compiles to plain JavaScript.",
    icon: SiTypescript,
  },
  {
    title: "GraphQL",
    slug: "graphql",
    description: "A query language for your API.",
    icon: SiGraphql,
  },
  {
    title: "PostgreSQL",
    slug: "postgresql",
    description: "A powerful, open source object-relational database system.",
    icon: SiPostgresql,
  },
  {
    title: "Docker",
    slug: "docker",
    description:
      "A platform for developers and sysadmins to develop, deploy, and run applications with containers.",
    icon: SiDocker,
  },
];

export default function TechLearnPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-400 dark:to-purple-500 mb-4 animate-fade-in-down">
            📘 Tech Learn Hub
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
            Dive into the world of modern web development. Each topic offers
            crystal-clear explanations, practical use cases, and actionable
            examples to kickstart your learning journey.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {techTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/tech-learn/${topic.slug}`}
              className="group relative block p-6 bg-white dark:bg-gray-850 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                <topic.icon className="text-4xl text-blue-500 mr-2" />
                {topic.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                {topic.description}
              </p>
              <span
                className="mt-4 inline-block text-blue-500 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                Start Learning &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
