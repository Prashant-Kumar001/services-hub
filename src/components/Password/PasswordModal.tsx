import React, { useState, useEffect } from "react";
import { usePasswordStore } from "../../stores/passwordStore";
import {
  checkPasswordStrength,
  generatePassword,
  getStrengthBg,
  getStrengthColor,
  getStrengthProgress,
} from "../../utils/passwordUtils";
import {
  Save,
  X,
  Eye,
  EyeOff,
  Zap,
  Star,
  Globe,
  User,
  Mail,
  Lock,
  FileText,
  Tag,
} from "lucide-react";

import { PasswordEntry } from "@/types/index";

const PasswordModal: React.FC = () => {
  const {
    editingPassword,
    setShowAddModal,
    setEditingPassword,
    addOrUpdatePassword,
    passwordGenerator,
    categories,
  } = usePasswordStore();

  const [formData, setFormData] = useState<PasswordEntry>(() => {
    return {
      title: editingPassword?.title || "",
      email: editingPassword?.email || "",
      category: editingPassword?.category || "other",
      favorite: editingPassword?.favorite || false,
      website: editingPassword?.website || "",
      username: editingPassword?.username || "",
      password: editingPassword?.password || "",
      notes: editingPassword?.notes || "",
      strength: editingPassword?.strength || "weak",
      lastModified: editingPassword?.lastModified || new Date(),
    };
  });

 

  

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const strength = checkPasswordStrength(formData.password);
    setFormData((prev) => ({ ...prev, strength }));
  }, [formData.password]);

  const handleClose = () => {
    setShowAddModal(false);
    setEditingPassword(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newForm = { ...formData, lastModified: new Date() };

    addOrUpdatePassword(newForm);
    handleClose();
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(passwordGenerator);
    setFormData((prev) => ({ ...prev, password: newPassword }));
    setShowPassword(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative">
        <div className="relative flex justify-between items-center px-6 py-4 border-b border-gray-200 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingPassword ? "Edit Password" : "Add New Password"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {editingPassword
                ? "Update your saved password entry"
                : "Fill the details to store a new password"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative space-y-6 p-6 overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          <div className="space-y-2">
            <label
              htmlFor="website"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Globe size={16} className="text-gray-500" />
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              onFocus={() => setFocusedField("website")}
              onBlur={() => setFocusedField(null)}
              placeholder="https://example.com"
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                focusedField === "website"
                  ? "border-blue-300 bg-blue-50/50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FileText size={16} className="text-gray-500" />
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => setFocusedField("title")}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter a descriptive title"
              required
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                focusedField === "title"
                  ? "border-blue-300 bg-blue-50/50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Mail size={16} className="text-gray-500" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="user@example.com"
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  focusedField === "email"
                    ? "border-blue-300 bg-blue-50/50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <User size={16} className="text-gray-500" />
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter username"
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  focusedField === "username"
                    ? "border-blue-300 bg-blue-50/50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Lock size={16} className="text-gray-500" />
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter or generate password"
                required
                className={`w-full px-4 py-3 pr-24 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  focusedField === "password"
                    ? "border-blue-300 bg-blue-50/50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                autoComplete="new-password"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                  title="Generate Password"
                >
                  <Zap size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    Password Strength
                  </span>
                  <span
                    className={`text-xs font-medium ${getStrengthColor(
                      formData.strength
                    )}`}
                  >
                    {formData.strength.charAt(0).toUpperCase() +
                      formData.strength.slice(1)}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getStrengthBg(
                      formData.strength
                    )}`}
                    style={{ width: getStrengthProgress(formData.strength) }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Tag size={16} className="text-gray-500" />
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              onFocus={() => setFocusedField("category")}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                focusedField === "category"
                  ? "border-blue-300 bg-blue-50/50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <FileText size={16} className="text-gray-500" />
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              onFocus={() => setFocusedField("notes")}
              onBlur={() => setFocusedField(null)}
              placeholder="Add any additional notes..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                focusedField === "notes"
                  ? "border-blue-300 bg-blue-50/50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              checked={formData.favorite}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="favorite"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer"
            >
              <Star
                size={16}
                className={
                  formData.favorite
                    ? "text-yellow-500 fill-current"
                    : "text-gray-400"
                }
              />
              Mark as Favorite
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              <Save size={18} />
              {editingPassword ? "Update Password" : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
