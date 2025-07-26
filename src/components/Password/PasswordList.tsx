import React from "react";
import { usePasswordStore } from "../../stores/passwordStore";
import PasswordCard from "./PasswordCard";
import { Key } from "lucide-react";

const PasswordList: React.FC = () => {
  const { passwords, searchTerm, selectedCategory } = usePasswordStore();

  const filteredPasswords = passwords.filter((password) => {
    const matchesSearch =
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.website.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || password.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPasswords.map((password, index: number) => (
          <PasswordCard key={index} password={password} />
        ))}
      </div>

      {filteredPasswords.length === 0 && (
        <div className="text-center py-12">
          <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No passwords found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or add a new password.
          </p>
        </div>
      )}
    </>
  );
};

export default PasswordList;
