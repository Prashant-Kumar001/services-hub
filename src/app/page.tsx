import Link from "next/link";
import {
  Sparkles,
  Zap,
  BookOpen,
  Rocket,
  ArrowRight,
  Star,
  Users,
  Clock,
  ChevronRight,
  TrendingUp,
  Award,
  Heart,
} from "lucide-react";

import { topTools, techTopics } from "@/data/api";
import { ToolCardProps, TechCardProps } from "@/types/index";

function ToolCard({
  title,
  href,
  description,
  icon: Icon,
  color,
  bgColor,
  popular,
  hot,
  category,
  slug,
  new: isNew,
}: ToolCardProps) {
  return (
    <Link
      href={`/tools/${category}/${slug}`}
      className={`group block relative overflow-hidden rounded-3xl ${bgColor} border-2 border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm`}
    >
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {popular && (
          <div className="px-2 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        )}
        {hot && (
          <div className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Hot
          </div>
        )}
        {isNew && (
          <div className="px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <Zap className="w-3 h-3" />
            New
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300`}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${color} rounded-full opacity-20 transform transition-transform duration-500 group-hover:scale-150 group-hover:rotate-180`}
        />
        <div
          className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br ${color} rounded-full opacity-15 transform transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-90`}
        />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300" />
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Progress bar */}
        <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full bg-gradient-to-r ${color} transition-all duration-700 ease-out group-hover:w-full w-0`}
          />
        </div>
      </div>
    </Link>
  );
}



function TechCard({
  title,
  href,
  description,
  icon,
  difficulty,
  duration,
  students,
}: TechCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "from-green-500 to-emerald-400";
      case "Intermediate":
        return "from-yellow-500 to-orange-400";
      case "Advanced":
        return "from-red-500 to-pink-500";
      default:
        return "from-blue-500 to-cyan-400";
    }
  };

  return (
    <Link
      href={href}
      className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/40 dark:to-gray-900/40 border-2 border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl mb-2">{icon}</div>
          <div
            className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(
              difficulty
            )} text-white text-xs font-bold`}
          >
            {difficulty}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {students}
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out group-hover:w-full w-0" />
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-15 animate-pulse"
        />
      </div>

      <div className="relative px-4 py-16 max-w-7xl mx-auto">
        <section className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative p-4 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 shadow-2xl">
              <Sparkles className="w-8 h-8 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-full blur-xl opacity-50 -z-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to UtiliHub
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Your ultimate destination for
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {" "}
              developer utilities
            </span>
            ,
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {" "}
              productivity tools
            </span>
            , and
            <span className="font-semibold text-pink-600 dark:text-pink-400">
              {" "}
              tech learning resources
            </span>
            . Everything you need, beautifully crafted in one place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="px-6 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    15+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Tools
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-400 rounded-xl">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    50+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Tutorials
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-400 rounded-xl">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    100%
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Free
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tools"
              className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Explore Tools
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/tech-learn"
              className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              Start Learning
            </Link>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                🔧 Popular Tools
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Most loved utilities by our community
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topTools.map((tool, index) => (
              <div
                key={tool.title}
                className="transform transition-all duration-700"
              >
                <ToolCard {...tool} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                📚 Tech Learning
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Master modern technologies with our comprehensive guides
              </p>
            </div>
            <Link
              href="/tech-learn"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-400 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-violet-500 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techTopics.map((topic, index) => (
              <div
                key={topic.title}
                className="transform transition-all duration-700"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <TechCard {...topic} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/tech-learn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-400 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-violet-500 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="text-center">
          <div className="relative p-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-[2rem] shadow-2xl text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 blur-3xl opacity-50 -z-10" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Ready to Get Started?
                </h3>
              </div>

              <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers who've supercharged their workflow
                with UtiliHub. Start exploring our tools and learning resources
                today!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/tools"
                  className="group px-8 py-4 bg-white/20 backdrop-blur-sm rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Tools
                </Link>

                <Link
                  href="/tech-learn"
                  className="px-8 py-4 border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </Link>
              </div>
            </div>

            <div
              className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}
            />
            <div className="absolute top-1/2 left-8 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
            <div
              className="absolute bottom-8 right-12 w-3 h-3 bg-white/25 rounded-full animate-pulse"
              style={{ animationDelay: "3s" }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
