import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Email from "next-auth/providers/email";
import {
  PasswordEntry,
  MasterPassword,
  PasswordGeneratorConfig,
} from "../types";
import {
  simpleHash,
  generateSalt,
  checkPasswordStrength,
} from "../utils/passwordUtils";

interface PasswordState {
  isUnlocked: boolean;
  masterPassword: string;
  storedMasterPassword: MasterPassword | null;
  passwords: PasswordEntry[];
  originalPasswords: PasswordEntry[];
  searchTerm: string;
  selectedCategory: string;
  showAddModal: boolean;
  editingPassword: PasswordEntry | null;
  showPasswords: { [key: string]: boolean };
  notification: { message: string; type: "success" | "error" } | null;
  passwordGenerator: PasswordGeneratorConfig;
  categories: string[];

  // Actions
  setIsUnlocked: (value: boolean) => void;
  setMasterPassword: (value: string) => void;
  setStoredMasterPassword: (value: MasterPassword | null) => void;
  handleMasterPasswordSetup: () => void;
  handleMasterPasswordLogin: () => void;
  initializePasswords: (passwords: PasswordEntry[]) => void;
  setSearchTerm: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  setShowAddModal: (value: boolean) => void;
  setEditingPassword: (value: PasswordEntry | null) => void;
  togglePasswordVisibility: (id: string) => void;
  copyToClipboard: (text: string) => Promise<void>;
  addOrUpdatePassword: (passwordData: PasswordEntry) => void;
  deletePassword: (id: string) => void;
  toggleFavorite: (id: string) => void;
  lockVault: () => void;
}

export const usePasswordStore = create<PasswordState>()(
  devtools(
    (set, get) => ({
      isUnlocked: false,
      masterPassword: "",
      storedMasterPassword: null,
      passwords: [],
      originalPasswords: [],
      searchTerm: "",
      selectedCategory: "all",
      showAddModal: false,
      editingPassword: null,
      showPasswords: {},
      notification: null,
      passwordGenerator: {
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
      },
      categories: [
        "all",
        "social",
        "work",
        "banking",
        "shopping",
        "entertainment",
        "other",
      ],

      setIsUnlocked: (value) => {
        set({ isUnlocked: value });
      },
      setMasterPassword: (value) => set({ masterPassword: value }),
      setStoredMasterPassword: (value) => set({ storedMasterPassword: value }),
      initializePasswords: (passwords) =>
        set({
          passwords: passwords
            .map((p) => ({
              ...p,
              lastModified: new Date(p.lastModified),
            }))
            .sort((a, b) =>
              a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
            ),
          originalPasswords: [...passwords],
        }),
      setSearchTerm: (value) => set({ searchTerm: value }),
      setSelectedCategory: (value) => set({ selectedCategory: value }),
      setShowAddModal: (value) => set({ showAddModal: value }),
      setEditingPassword: (value) => set({ editingPassword: value }),
      lockVault: () => {
        sessionStorage.removeItem("masterKey");
        set({
          isUnlocked: false,
          masterPassword: "",
          notification: {
            message: "Vault locked successfully!",
            type: "success",
          },
        });

        setTimeout(() => set({ notification: null }), 3000);
      },
      handleMasterPasswordSetup: () => {
        const { masterPassword, setStoredMasterPassword, setIsUnlocked } =
          get();

        if (masterPassword.length < 8) {
          set({
            notification: {
              message: "Master password must be at least 8 characters long",
              type: "error",
            },
          });
          setTimeout(() => set({ notification: null }), 3000);
          return;
        }

        const salt = generateSalt();
        const hash = simpleHash(masterPassword, salt);

        setStoredMasterPassword({ hash, salt });

        localStorage.setItem("vaultHash", hash);
        localStorage.setItem("vaultSalt", salt);

        sessionStorage.setItem("masterKey", masterPassword);

        setIsUnlocked(true);

        set({
          notification: {
            message: "Master password set successfully!",
            type: "success",
          },
        });
        setTimeout(() => set({ notification: null }), 3000);
      },
      handleMasterPasswordLogin: () => {
        const { masterPassword, setIsUnlocked } = get();

        const hash = localStorage.getItem("vaultHash");
        const salt = localStorage.getItem("vaultSalt");

        if (!hash || !salt) {
          set({
            notification: {
              message: "No vault found. Please set a master password.",
              type: "error",
            },
          });
          return;
        }

        const testHash = simpleHash(masterPassword, salt);

        if (testHash === hash) {
          sessionStorage.setItem("masterKey", masterPassword);
          setIsUnlocked(true);
          set({
            notification: { message: "Access granted!", type: "success" },
          });
        } else {
          set({
            notification: { message: "Invalid master password", type: "error" },
          });
        }

        setTimeout(() => set({ notification: null }), 3000);
      },

      copyToClipboard: async (text: string) => {
        try {
          await navigator.clipboard.writeText(text);
          set({
            notification: { message: "Copied to clipboard!", type: "success" },
          });
          setTimeout(() => set({ notification: null }), 3000);
        } catch (err) {
          set({
            notification: { message: "Failed to copy", type: "error" },
          });
          setTimeout(() => set({ notification: null }), 3000);
        }
      },
      addOrUpdatePassword: async (passwordData: PasswordEntry) => {
        const { passwords, editingPassword } = get();
        let updatedPasswords = passwords;

        if (passwordData.password.length < 8 && !editingPassword) {
          set({
            notification: {
              message: "Password must be at least 8 characters long",
              type: "error",
            },
          });
          setTimeout(() => set({ notification: null }), 3000);
          return;
        }

        if (
          (passwordData.title.length < 3 || passwordData.website.length < 3) &&
          !editingPassword
        ) {
          set({
            notification: {
              message: `${passwordData.title.length < 3 ? "Title" : ""} ${
                passwordData.title.length < 3 && passwordData.website.length < 3
                  ? "and"
                  : ""
              } ${
                passwordData.website.length < 3 ? "Website" : ""
              } must be at least 3 characters long`,
              type: "error",
            },
          });
          setTimeout(() => set({ notification: null }), 3000);
          return;
        }

        try {
          if (editingPassword) {
            const response = await fetch(
              `/api/passwords/${editingPassword._id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordData),
              }
            );
            if (!response.ok) throw new Error("Failed to update password");
            const updated = await response.json();
            updatedPasswords = passwords.map((p) =>
              p._id === editingPassword._id ? updated : p
            );

            set({ editingPassword: null });
            set({
              notification: { message: "Password updated", type: "success" },
            });
          } else {
            const response = await fetch(`/api/password`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(passwordData),
            });

            if (!response.ok) throw new Error("Failed to add password");

            const created = await response.json();
            updatedPasswords = [
              ...passwords,
              { ...passwordData, _id: created._id },
            ];

            set({
              notification: { message: "Password added", type: "success" },
            });
          }

          set({ passwords: updatedPasswords });
        } catch (error) {
          console.error("Error saving password:", error);
          set({
            notification: { message: "Failed to save password", type: "error" },
          });
        } finally {
          setTimeout(() => set({ notification: null }), 3000);
        }
      },

      togglePasswordVisibility: (id: string) => {
        set(() => ({
          showPasswords: {
            ...get().showPasswords,
            [id]: !get().showPasswords[id],
          },
        }));
      },
      toggleFavorite: (id: string) => {
        set((state) => {
          const updatedPasswords = state.passwords.map((password) =>
            password._id === id
              ? { ...password, favorite: !password.favorite }
              : password
          );

          const hasFavorites = updatedPasswords.some((p) => p.favorite);
          let finalPasswords;

          if (hasFavorites) {
            finalPasswords = [...updatedPasswords].sort((a, b) => {
              if (a.favorite === b.favorite) return 0;
              return a.favorite ? -1 : 1;
            });
          } else {
            finalPasswords = state.originalPasswords.map((original) => {
              const updated = updatedPasswords.find(
                (p) => p._id === original._id
              );
              return updated ?? original;
            });
          }

          return { passwords: finalPasswords };
        });
        try {
          fetch(`/api/password`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "togglePin", id }),
          });
        } catch (error) {
          console.error("Error toggling favorite:", error);
        }
      },
      deletePassword: (id: string) => {
        set((state) => ({
          passwords: state.passwords.filter((password) => password._id !== id),
          originalPasswords: state.originalPasswords.filter(
            (password) => password._id !== id
          )
        }));
        try {
          fetch(`/api/password`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
        } catch (error) {
          console.error("Error deleting password:", error);
        }
      }
    }),
    {
      name: "PasswordStore",
    }
  )
);
