export interface PasswordEntry {
  _id?: string;
  title: string;
  username: string;
  email: string;
  password: string;
  website: string;
  notes: string;
  category: string;
  favorite: boolean;
  lastModified: Date;
  strength: "weak" | "medium" | "strong";
}

export interface MasterPassword {
  hash: string;
  salt: string;
}

export interface PasswordGeneratorConfig {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface EnhancedTodo {
  _id: string;
  content: string;
  completed: boolean;
  favorite: boolean;
  status: "active" | "completed" | "archived";
  lastModified: Date;
  createdAt: Date;
  updatedAt: Date;
}

type TaskStatus = "pending" | "completed";

export interface Task {
  title: string;
  description?: string;
  id: string;
  status: TaskStatus;
  updatedAt?: Date;
}

export interface ToolCardProps {
  title: string;
  href: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  popular?: boolean;
  hot?: boolean;
  new?: boolean;
  category: string;
  slug: string;
}

export interface TechCardProps {
  title: string;
  href: string;
  description: string;
  icon: string;
  difficulty: string;
  duration: string;
  students: string;
}

export type Note = {
  _id: string;
  title: string;
  content: string;
  category?: string;
  isPinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
