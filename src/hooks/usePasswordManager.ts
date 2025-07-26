import { useState, useEffect } from "react";
import {
  PasswordEntry,
  MasterPassword,
  PasswordGeneratorConfig,
} from "../types";
import {
  simpleHash,
  generateSalt,
  checkPasswordStrength,
  generatePassword,
} from "../utils/passwordUtils";

export const usePasswordManager = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [storedMasterPassword, setStoredMasterPassword] =
    useState<MasterPassword | null>(null);
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPassword, setEditingPassword] = useState<PasswordEntry | null>(
    null
  );
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [passwordGenerator, setPasswordGenerator] =
    useState<PasswordGeneratorConfig>({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    });

  const categories = [
    "all",
    "social",
    "work",
    "banking",
    "shopping",
    "entertainment",
    "other",
  ];

  useEffect(() => {
    const samplePasswords: PasswordEntry[] = [
      {
        id: "1",
        title: "Gmail",
        username: "john.doe",
        email: "john.doe@gmail.com",
        password: "SecurePass123!",
        website: "https://gmail.com",
        notes: "Personal email account",
        category: "social",
        favorite: true,
        createdAt: new Date("2024-01-15"),
        lastModified: new Date("2024-01-20"),
        strength: "strong",
      },
      // ... other sample passwords
    ];
    setPasswords(samplePasswords);
  }, []);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

 const handleMasterPasswordSetup = () => {
   if (masterPassword.length < 8) {
     showNotification(
       "Master password must be at least 8 characters long",
       "error"
     );
     return;
   }
   const salt = generateSalt();
   const hash = simpleHash(masterPassword, salt);
   setStoredMasterPassword({ hash, salt });
   setIsUnlocked(true);
   console.log("isUnlocked set to true");
   showNotification("Master password set successfully!", "success");
 };

  const handleMasterPasswordLogin = () => {
    if (!storedMasterPassword) return;
    const hash = simpleHash(masterPassword, storedMasterPassword.salt);
    if (hash === storedMasterPassword.hash) {
      setIsUnlocked(true);
      showNotification("Access granted!", "success");
    } else {
      showNotification("Invalid master password", "error");
    }

    console.log('storedMasterPassword',storedMasterPassword);
    console.log("storedMasterPassword", isUnlocked);
    console.log("storedMasterPassword", notification);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification("Copied to clipboard!", "success");
    } catch (err) {
      showNotification("Failed to copy", "error");
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addOrUpdatePassword = (
    passwordData: Omit<
      PasswordEntry,
      "id" | "createdAt" | "lastModified" | "strength"
    >
  ) => {
    const strength = checkPasswordStrength(passwordData.password);
    if (editingPassword) {
      setPasswords((prev) =>
        prev.map((p) =>
          p.id === editingPassword.id
            ? { ...p, ...passwordData, lastModified: new Date(), strength }
            : p
        )
      );
      showNotification("Password updated successfully!", "success");
    } else {
      const newPassword: PasswordEntry = {
        ...passwordData,
        id: Date.now().toString(),
        createdAt: new Date(),
        lastModified: new Date(),
        strength,
      };
      setPasswords((prev) => [...prev, newPassword]);
      showNotification("Password added successfully!", "success");
    }
    setShowAddModal(false);
    setEditingPassword(null);
  };

  const deletePassword = (id: string) => {
    setPasswords((prev) => prev.filter((p) => p.id !== id));
    showNotification("Password deleted successfully!", "success");
  };

  const toggleFavorite = (id: string) => {
    setPasswords((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  return {
    isUnlocked,
    setIsUnlocked,
    masterPassword,
    setMasterPassword,
    storedMasterPassword,
    passwords,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showAddModal,
    setShowAddModal,
    editingPassword,
    setEditingPassword,
    showPasswords,
    notification,
    passwordGenerator,
    categories,
    handleMasterPasswordSetup,
    handleMasterPasswordLogin,
    copyToClipboard,
    togglePasswordVisibility,
    addOrUpdatePassword,
    deletePassword,
    toggleFavorite,
    generatePassword,
    checkPasswordStrength,
  };
};
