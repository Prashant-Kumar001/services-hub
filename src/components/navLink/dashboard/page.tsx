'use client';

import {
  ChevronRight,
  Sparkles,
  Code,
  Shield,
  Type,
  Briefcase,
  Gamepad2,
  Star,
  Zap,
  Users,
  ArrowUpRight,
  Rocket,
} from "lucide-react";
import { useEffect, useState } from "react";

type ToolType = {
  name: string;
  href: string;
  description: string;
  popular?: boolean;
  new?: boolean;
};

type CategoryType = {
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  shadowColor: string;
  tools: ToolType[];
};
type ToolCardProps = {
  tool: ToolType;
  category: CategoryType;
  index: number;
};


const categories = [
  {
    title: "💼 Productivity Tools",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-400",
    bgColor:
      "bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/40 dark:to-cyan-950/40",
    borderColor: "border-blue-200/60 dark:border-blue-800/40",
    hoverColor: "hover:border-blue-400/80 dark:hover:border-blue-600/60",
    shadowColor: "hover:shadow-blue-500/25",
    tools: [
      {
        name: "Password Generator",
        href: "/tools/productivity/password-generator",
        description:
          "Generate ultra-secure passwords with customizable options",
        popular: true,
      },
      {
        name: "Secure Notes",
        href: "/tools/productivity/secure-notes",
        description: "Keep your notes safe with end-to-end encryption",
        new: true,
      },
      {
        name: "Task Manager",
        href: "/tools/productivity/task-manager",
        description: "Organize your workflow with smart task management",
      },
    ],
  },
  
];

const CategorySection = ({
  category,
  index,
}: {
  category: CategoryType;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = category.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 300);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section
      className={`mb-20 transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
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
const ToolCard = ({ tool, category, index }: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl ${category.bgColor} ${category.borderColor} border-2 transition-all duration-500 ${category.hoverColor} hover:shadow-2xl ${category.shadowColor} cursor-pointer transform hover:scale-[1.03] hover:-translate-y-2 backdrop-blur-sm`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
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
  );
};

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-16">
            {categories.map((category, index) => (
              <CategorySection
                key={category.title}
                category={category}
                index={index}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
