"use client";

import React, { useState, useEffect } from "react";
import { categories } from "@/data/api";
import {
  Sparkles,
  Code,
  Star,
  Zap,
  Users,
  ArrowUpRight,
  Rocket,
} from "lucide-react";
import Link from "next/link";

type ToolType = {
  name: string;
  description: string;
  popular?: boolean;
  new?: boolean;
  href?: string;
  slug?: string;
};

type CategoryType = {
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  shadowColor: string;
  slug: string;
  tools: ToolType[];
};

type ToolCardProps = {
  tool: ToolType;
  category: CategoryType;
  index: number;
};

const ToolCard = ({ tool, category, index }: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`tools/${category.slug}/${tool.slug}`}>
      <div
        className={`group relative overflow-hidden rounded-3xl ${category.bgColor} ${category.borderColor} border-2 transition-all duration-500 ${category.hoverColor} hover:shadow-2xl ${category.shadowColor} cursor-pointer transform hover:scale-[1.03] hover:-translate-y-2 backdrop-blur-sm`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {tool.popular && (
            <div className="px-2 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Popular
            </div>
          )}
          {tool.new && (
            <div className="px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3" />
              New
            </div>
          )}
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.08] transition-all duration-500`}
        />

        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br ${
              category.color
            } rounded-full opacity-20 transform transition-all duration-700 ${
              isHovered ? "scale-150 rotate-180" : "scale-100"
            }`}
          />
          <div
            className={`absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br ${
              category.color
            } rounded-full opacity-15 transform transition-all duration-500 ${
              isHovered ? "scale-125 -rotate-90" : "scale-100"
            }`}
          />
          <div
            className={`absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-br ${
              category.color
            } rounded-full opacity-30 transform transition-all duration-300 ${
              isHovered ? "scale-200 rotate-45" : "scale-100"
            }`}
          />
        </div>

        <div className="relative p-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors leading-tight">
              {tool.name}
            </h3>
            <div
              className={`p-2 rounded-2xl bg-gradient-to-br ${
                category.color
              } opacity-80 group-hover:opacity-100 transition-all duration-300 ${
                isHovered ? "rotate-12 scale-110" : ""
              }`}
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2">
            {tool.description}
          </p>

          <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${
                category.color
              } transition-all duration-700 ease-out ${
                isHovered ? "w-full" : "w-0"
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                category.color
              } blur-sm opacity-50 transition-all duration-700 ease-out ${
                isHovered ? "w-full" : "w-0"
              }`}
            />
          </div>

          <div
            className={`mt-4 text-xs font-medium bg-gradient-to-r ${
              category.color
            } bg-clip-text text-transparent transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Click to explore →
          </div>
        </div>
      </div>
    </Link>
  );
};

const CategorySection = ({
  category,
  index,
}: {
  category: CategoryType;
  index: number;
}) => {
  const Icon = category.icon;

  return (
    <section className={`mb-20 transform transition-all duration-1000 `}>
      <div className="flex items-center gap-6 mb-10">
        <div
          className={`relative p-4 rounded-3xl bg-gradient-to-br ${category.color} shadow-xl`}
        >
          <Icon className="w-8 h-8 text-white" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-3xl blur-lg opacity-30 -z-10`}
          />
        </div>
        <div className="flex-1">
          <h2
            className={`text-4xl font-black bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}
          >
            {category.title}
          </h2>
          <div
            className={`h-1.5 w-24 bg-gradient-to-r ${category.color} rounded-full shadow-lg`}
          />
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {category.tools.length} tools
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {category.tools.map((tool, toolIndex) => (
          <ToolCard
            key={tool.name}
            tool={tool}
            category={category}
            index={toolIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default function UtiliHubToolsPage() {
  const totalTools = categories?.reduce(
    (acc, cat) => acc + cat.tools.length,
    0
  );
  
  const newTools = categories.flatMap((cat) =>
    cat.tools.filter((tool) => tool.new)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-15 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`text-center mb-24 transform transition-all duration-1000 `}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative p-6 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-full blur-xl opacity-50 -z-10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              UtiliHub
            </h1>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            🧰 All-in-One Utility Powerhouse
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Supercharge your productivity with our comprehensive suite of
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {" "}
              developer tools
            </span>
            ,
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {" "}
              productivity enhancers
            </span>
            , and
            <span className="font-semibold text-pink-600 dark:text-pink-400">
              {" "}
              creative utilities
            </span>{" "}
            — all crafted with precision and passion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="group px-6 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {totalTools}+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Tools
                  </div>
                </div>
              </div>
            </div>

            <div className="group px-6 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-400 rounded-xl">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {categories.length}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Categories
                  </div>
                </div>
              </div>
            </div>

            <div className="group px-6 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
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
            <button className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Explore All Tools
            </button>
            <button className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              View Popular
            </button>
          </div>
        </div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <CategorySection
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>

        <div
          className={`text-center mt-32 transform transition-all duration-1000 delay-1000 `}
        >
          <div className="relative p-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-[2rem] shadow-2xl text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 blur-3xl opacity-50 -z-10" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold">
                  Ready to Transform Your Workflow?
                </h3>
              </div>

              <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers and creators who've supercharged
                their productivity with our comprehensive utility suite. Start
                exploring today!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="group px-8 py-4 bg-white/20 backdrop-blur-sm rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Get Started Free
                </button>
                <button className="px-8 py-4 border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  View Documentation
                </button>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-bounce" />
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full animate-bounce" />
            <div className="absolute top-1/2 left-8 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
