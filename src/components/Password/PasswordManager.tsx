"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePasswordStore } from "../../stores/passwordStore";
import MasterPasswordForm from "./MasterPasswordForm";
import MasterPasswordSetupForm from "./MasterPasswordSetupForm";
import Header from "./Header";
import SearchAndFilter from "./SearchAndFilter";
import PasswordList from "./PasswordList";
import PasswordModal from "./PasswordModal";
import Notification from "./Notification";
import { useSession } from "next-auth/react";
import { PasswordEntry } from '../../types/index';

const initialLoadPassword = async (
  currentUser: string,
  initializePasswords: (data: PasswordEntry[]) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    const response = await fetch(
      `/api/password?userEmail=${encodeURIComponent(currentUser)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch passwords");
    }

    const data: PasswordEntry[] = await response.json();

    initializePasswords(data);
  } catch (err) {
    console.error("Error loading passwords:", err);
  } finally {
    setLoading(false);
  }
};

const PasswordManager: React.FC = () => {
  const {
    isUnlocked,
    passwords,
    notification,
    showAddModal,
    initializePasswords,
  } = usePasswordStore();

  const { data: session, status } = useSession();
  const hasLoadedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [hasMasterPassword, setHasMasterPassword] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkMasterStatus = async () => {
      if (session?.user?.email) {
        const res = await fetch(
          `/api/master-password/has?email=${session.user.email}`
        );
        const data = await res.json();
        setHasMasterPassword(data.hasMasterPassword);
      }
    };
    checkMasterStatus();
  }, [session]);

  useEffect(() => {
    if (session?.user?.email && isUnlocked && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      initialLoadPassword(session.user.email, initializePasswords, setLoading);
    }
  }, [session, isUnlocked, initializePasswords]);

  useEffect(() => {
    if (!isUnlocked) {
      initializePasswords([]);
      hasLoadedRef.current = false;
    }
  }, [isUnlocked, initializePasswords]);

  if (status === "loading" || hasMasterPassword === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 text-lg">
            Loading your secure space...
          </span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Please log in to access your secure notes.
          </p>
        </div>
      </div>
    );
  }

  if (hasMasterPassword === false) {
    return <MasterPasswordSetupForm />;
  }

  if (!isUnlocked) {
    return <MasterPasswordForm />;
  }

  return (
    <>
      {notification && <Notification notification={notification} />}
      <Header passwordsCount={passwords.length} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilter />
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <PasswordList />
        )}
        {showAddModal && <PasswordModal />}
      </div>
    </>
  );
};

export default PasswordManager;
