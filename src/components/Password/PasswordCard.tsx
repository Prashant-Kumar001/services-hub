import React from "react";
import { usePasswordStore } from "../../stores/passwordStore";
import { PasswordEntry } from "../../types";
import {
  Globe,
  User,
  Key,
  Star,
  Edit3,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Clock,
} from "lucide-react";
import { getStrengthBg, getStrengthColor } from "@/utils/passwordUtils";

interface PasswordCardProps {
  password: PasswordEntry;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ password }) => {
  const {
    showPasswords,
    togglePasswordVisibility,
    copyToClipboard,
    toggleFavorite,
    setEditingPassword,
    setShowAddModal,
    deletePassword,
  } = usePasswordStore();



  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{password.title}</h3>
            <p className="text-sm text-gray-500">{password.category}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => toggleFavorite(password._id ? password._id : "")}
            className={`p-1 rounded ${
              password.favorite ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <Star
              className="w-4 h-4"
              fill={password.favorite ? "currentColor" : "none"}
            />
          </button>

          <button
            onClick={() => {
              setEditingPassword(password);
              setShowAddModal(true);
            }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => deletePassword(password._id ? password._id : "")}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 flex-1">
            {password.username}
          </span>
          <button
            onClick={() => copyToClipboard(password.username)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Key className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 flex-1 font-mono">
            {showPasswords[password._id ? password._id : ""] ? password.password : "••••••••"}
          </span>
          <button
            onClick={() => togglePasswordVisibility(password._id ? password._id : "")}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPasswords[password._id ? password._id : ""] ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => copyToClipboard(password.password)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`px-2 py-1 rounded-full text-xs ${getStrengthBg(
              password.strength
            )}`}
          >
            <span className={getStrengthColor(password.strength)}>
              {password.strength.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center text-xs text-gray-500 space-x-1">
            <Clock className="w-3 h-3" />
            <span>Modified {new Date(password.lastModified).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
