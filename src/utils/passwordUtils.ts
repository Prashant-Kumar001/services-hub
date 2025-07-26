import { PasswordGeneratorConfig } from "../types";

export const simpleHash = (str: string, salt: string): string => {
  let hash = 0;
  const combined = str + salt;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString();
};

export const generateSalt = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const checkPasswordStrength = (
  password: string
): "weak" | "medium" | "strong" => {
  if (password.length < 8) return "weak";

  let score = 0;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score === 3) return "medium";
  return "strong";
};

export const generatePassword = (config: PasswordGeneratorConfig): string => {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  } = config;
  let charset = "";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeNumbers) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};


export  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "weak":
        return "text-red-600";
      case "medium":
        return "text-amber-600";
      case "strong":
        return "text-emerald-600";
      default:
        return "text-slate-500";
    }
  };

export  const getStrengthBg = (strength: string) => {
    switch (strength) {
      case "weak":
        return "bg-red-400 border-red-200";
      case "medium":
        return "bg-amber-400 border-amber-200";
      case "strong":
        return "bg-emerald-400 border-emerald-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

export  const getStrengthProgress = (strength: string) => {
    switch (strength) {
      case "weak":
        return "33%";
      case "medium":
        return "66%";
      case "strong":
        return "100%";
      default:
        return "0%";
    }
  };