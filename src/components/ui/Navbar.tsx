"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import AuthButton from "./AuthButton";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tech Learn", href: "/tech-learn" },
  { name: "Tools", href: "/tools" },
  // { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`sticky bg_blur  top-0 left-0 right-0 z-100 transition-all  duration-300 `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UtiliHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
            <AuthButton />
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-200 ${
                  mobileOpen ? "opacity-0 rotate-45" : "opacity-100 rotate-0"
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-200 ${
                  mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 transform hover:translate-x-1 ${
                  mobileOpen ? "animate-in slide-in-from-left" : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20  md:hidden"
          style={{ top: "64px" }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}
