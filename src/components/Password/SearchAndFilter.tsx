import React, { useState } from "react";
import { usePasswordStore } from "../../stores/passwordStore";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Grid3X3,
  List,
  SortAsc,
} from "lucide-react";

const SearchAndFilter: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    passwords,
  } = usePasswordStore();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState("name");

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
  };

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all";

  return (
    <div className="mb-8">
      <div className=" backdrop-blur-sm rounded-2xl  border-slate-200/50 p-6  ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="relative flex-1 max-w-lg group">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search passwords, websites, or usernames..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 focus:outline-none font-medium shadow-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-80"></div>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1 hover:bg-slate-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {searchTerm && (
              <div className="absolute -bottom-6 left-0 text-xs text-slate-500">
                Press Enter to search
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 transition-colors duration-300" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-slate-700 hover:bg-white focus:ring-2 focus:outline-none focus:ring-indigo-500/20 focus:border-indigo-400 transition-all duration-300 cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60"></div>
            {/* <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-slate-700 hover:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:outline-none transition-all duration-300 cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date</option>
                <option value="category">Sort by Category</option>
                <option value="usage">Sort by Usage</option>
              </select>
              <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div> */}
            {/* <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div> */}
          </div>
        </div>
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <span className="text-sm font-medium text-slate-600">
                  Active filters:
                </span>

                {searchTerm && (
                  <span className="inline-flex items-center space-x-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                    <span>Search: "{searchTerm}"</span>
                    <button
                      onClick={clearSearch}
                      className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    <span>
                      Category:{" "}
                      {selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)}
                    </span>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="hover:bg-purple-200 rounded-full p-0.5 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <button
                onClick={clearFilters}
                className="text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors duration-200 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-slate-800">
                {passwords.length}
              </div>
              <div className="text-xs text-slate-500">Total Passwords</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {
                  passwords.filter((password) => password.strength === "strong")
                    .length
                }
              </div>
              <div className="text-xs text-slate-500">Strong</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-yellow-600">
                {
                  passwords.filter((password) => password.strength === "medium")
                    .length
                }
              </div>
              <div className="text-xs text-slate-500">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-red-600">
                {
                  passwords.filter((password) => password.strength === "weak")
                    .length
                }
              </div>
              <div className="text-xs text-slate-500">Weak</div>
            </div>
          </div>
        </div>
      </div>
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export const InputField = ({ placeholder, value, onChange }: any) => (
  <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all duration-300 placeholder-slate-400 text-slate-700 focus:outline-none font-medium shadow-sm"
      />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60"></div>
  </div>
); 

export default SearchAndFilter;
