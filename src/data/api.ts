import {
  Code,
  Shield,
  Type,
  Briefcase,
  Gamepad2,
} from "lucide-react";

export const categories = [
  {
    title: "💼 Productivity Tools",
    slug: "productivity",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-400",
    bgColor:
      "bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/40 dark:to-cyan-950/40",
    borderColor: "border-blue-200/60 dark:border-blue-800/40",
    hoverColor: "hover:border-blue-400/80 dark:hover:border-blue-600/60",
    shadowColor: "hover:shadow-blue-500/25",
    tools: [
      {
        name: "To-Do List",
        href: "/tools/productivity/To-Do-List",
        slug: "to-do-List",
        description: "Organize your tasks with a simple to-do list",
        new: true,
      },
      {
        name: "Color Palette Generator",
        href: "/tools/productivity/color-palette",
        slug: "color-palette",
        description: "Generate beautiful color schemes for your projects",
        new: true,
      },
      {
        name: "Task Manager",
        slug: "task-manager",
        href: "/tools/productivity/task-manager",
        description: "Organize your workflow with smart task management",
      },
      {
        name: "Secure Notes",
        href: "/tools/productivity/secure-notes",
        slug: "secure-notes",
        description: "Keep your notes encrypted and safe",
        new: true,
      },
    ],
  },
  {
    title: "✍️ Text Tools",
    slug: "text",
    icon: Type,
    color: "from-pink-500 to-rose-400",
    bgColor:
      "bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-950/40 dark:to-rose-950/40",
    borderColor: "border-pink-200/60 dark:border-pink-800/40",
    hoverColor: "hover:border-pink-400/80 dark:hover:border-pink-600/60",
    shadowColor: "hover:shadow-pink-500/25",
    tools: [
      {
        name: "Text Case Converter",
        href: "/tools/text/text-case-converter",
        slug: "text-case-converter",
        description: "Transform text between cases with intelligent formatting",
        popular: true,
      },
      {
        name: "Word Counter",
        href: "/tools/text/word-counter",
        slug: "word-counter",
        description: "Advanced text analytics with reading time estimates",
      },
      {
        name: "Markdown Editor",
        href: "/tools/text/markdown-editor",
        slug: "markdown-editor",
        description: "Write and preview Markdown with live rendering",
        new: true,
      },
    ],
  },
  {
    title: "🛠️ Dev Tools",
    slug: "dev",
    icon: Code,
    color: "from-purple-500 to-violet-400",
    bgColor:
      "bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/40 dark:to-violet-950/40",
    borderColor: "border-purple-200/60 dark:border-purple-800/40",
    hoverColor: "hover:border-purple-400/80 dark:hover:border-purple-600/60",
    shadowColor: "hover:shadow-purple-500/25",
    tools: [
      {
        name: "UUID Generator",
        slug: "uuid-generator",
        href: "/tools/dev/uuid-generator",
        description: "Generate unique identifiers with multiple formats",
      },
      {
        name: "JSON Formatter",
        slug: "json-formatter",
        href: "/tools/dev/json-formatter",
        description:
          "Format, validate and minify JSON with syntax highlighting",
        popular: true,
      },
      {
        name: "Base64 Encoder",
        slug: "base64-encoder",
        href: "/tools/dev/base64-encoder",
        description: "Encode and decode Base64 strings instantly",
      },
    ],
  },
  {
    title: "🔐 Security Tools",
    slug: "security",
    icon: Shield,
    color: "from-red-500 to-orange-400",
    bgColor:
      "bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-950/40 dark:to-orange-950/40",
    borderColor: "border-red-200/60 dark:border-red-800/40",
    hoverColor: "hover:border-red-400/80 dark:hover:border-red-600/60",
    shadowColor: "hover:shadow-red-500/25",
    tools: [
      {
        name: "Password Generator",
        slug: "password-generator",
        href: "/tools/security/password-generator",
        description:
          "Generate ultra-secure passwords with customizable options",
        popular: true,
      },
      {
        name: "JWT Decoder",
        slug: "jwt-decoder",
        href: "/tools/security/jwt-decoder",
        description: "Decode and analyze JWT tokens with payload insights",
        popular: true,
      },
      {
        name: "Hash Generator",
        slug: "hash-generator",
        href: "/tools/security/hash-generator",
        description: "Generate secure hashes using multiple algorithms",
      },
      {
        name: "QR Code Generator",
        slug: "qr-code-generator",
        href: "/tools/security/qr-generator",
        description: "Create customizable QR codes for any data",
        new: true,
      },
      {
        name: "Password Manager",
        slug: "password-manager",
        href: "/tools/security/password-Manager",
        description: "Store and manage passwords with secure encryption",
        new: true,
      },
    ],
  },
  {
    title: "🎭 Entertainment Tools",
    slug: "entertainment",
    icon: Gamepad2,
    color: "from-yellow-500 to-amber-400",
    bgColor:
      "bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/40 dark:to-amber-950/40",
    borderColor: "border-yellow-200/60 dark:border-yellow-800/40",
    hoverColor: "hover:border-yellow-400/80 dark:hover:border-yellow-600/60",
    shadowColor: "hover:shadow-yellow-500/25",
    tools: [
      {
        name: "Random Jokes",
        slug: "random-jokes",
        href: "/tools/entertainment/random-jokes",
        description: "Get your daily dose of humor from curated collections",
      },
      {
        name: "Fun Facts",
        slug: "fun-facts",
        href: "/tools/entertainment/fun-facts",
        description: "Discover amazing facts from around the world",
        popular: true,
      },
      {
        name: "Random Pat's Images",
        slug: "random-pats-images",
        href: "/tools/entertainment/Random-pats-Images",
        description: "Generate random images of Pat the Cat",
        new: true,
      },
    ],
  },
];


export const topTools = [
  {
    title: "Password Generator",
    slug: "password-generator",
    category: "security",
    href: "/tools/security/password-generator",
    description: "Generate ultra-secure passwords instantly",
    icon: Shield,
    color: "from-blue-500 to-cyan-400",
    bgColor:
      "bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/40 dark:to-cyan-950/40",
    popular: true,
  },
  {
    title: "JSON Formatter",
    slug: "json-formatter",
    category: "dev",
    href: "/tools/dev/json-formatter",
    description: "Format and validate JSON with syntax highlighting",
    icon: Code,
    color: "from-purple-500 to-violet-400",
    bgColor:
      "bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/40 dark:to-violet-950/40",
    hot: true,
  },
  {
    title: "Text Case Converter",
    slug: "text-case-converter",
    category: "text",
    href: "/tools/text/text-case-converter",
    description: "Transform text between different cases",
    icon: Type,
    color: "from-pink-500 to-rose-400",
    bgColor:
      "bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-950/40 dark:to-rose-950/40",
    popular: true,
  },
  {
    title: "JWT Decoder",
    slug: "jwt-decoder",
    category: "security",
    href: "/tools/security/jwt-decoder",
    description: "Decode and analyze JWT tokens",
    icon: Shield,
    color: "from-red-500 to-orange-400",
    bgColor:
      "bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-950/40 dark:to-orange-950/40",
    new: true,
  },
  {
    title: "Random Jokes",
    slug: "random-jokes",
    category: "entertainment",
    href: "/tools/entertainment/random-jokes",
    description: "Get your daily dose of humor",
    icon: Gamepad2,
    color: "from-yellow-500 to-amber-400",
    bgColor:
      "bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/40 dark:to-amber-950/40",
  },
  {
    title: "Secure Notes",
    slug: "secure-notes",
    category: "productivity",
    href: "/tools/productivity/secure-notes",
    description: "Keep your notes encrypted and safe",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-400",
    bgColor:
      "bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40",
    new: true,
  },
];

export const techTopics = [
  {
    title: "React.js",
    slug: "react",
    category: "text",
    href: "/tech-learn/react",
    description: "Master modern React development",
    icon: "⚛️",
    difficulty: "Intermediate",
    duration: "2-3 weeks",
    students: "12.5k",
  },
  {
    title: "Node.js",
    slug: "node",
    category: "text",
    href: "/tech-learn/node",
    description: "Backend development with Node.js",
    icon: "🟢",
    difficulty: "Advanced",
    duration: "3-4 weeks",
    students: "8.2k",
  },
  {
    title: "Next.js",
    slug: "next",
    category: "text",
    href: "/tech-learn/next",
    description: "Full-stack React framework",
    icon: "▲",
    difficulty: "Advanced",
    duration: "2-3 weeks",
    students: "6.8k",
  },
];