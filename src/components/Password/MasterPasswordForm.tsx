import React, { useEffect } from "react";
import { usePasswordStore } from "../../stores/passwordStore";
import { Lock, Shield } from "lucide-react";
import { simpleHash } from "@/utils/passwordUtils";

const MasterPasswordForm: React.FC = () => {
  const {
    masterPassword,
    setMasterPassword,
    storedMasterPassword,
    handleMasterPasswordSetup,
    handleMasterPasswordLogin,
  } = usePasswordStore();

  const handleSubmit = () => {
    if (storedMasterPassword) {
      handleMasterPasswordLogin();
    } else {
      handleMasterPasswordSetup();
    }
  };

useEffect(() => {
  const masterKey = sessionStorage.getItem("masterKey");
  const hash = localStorage.getItem("vaultHash");
  const salt = localStorage.getItem("vaultSalt");

  if (masterKey && hash && salt) {
    const testHash = simpleHash(masterKey, salt);
    if (testHash === hash) {
      usePasswordStore.setState({
        storedMasterPassword: { hash, salt },
        isUnlocked: true,
      });
    }
  }
}, []);



  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SecureVault</h1>
          <p className="text-gray-600">
            {storedMasterPassword
              ? "Enter your master password"
              : "Set up your master password"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Master Password"
              value={masterPassword}
              onChange={(e) => {
                setMasterPassword(e.target.value);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            {storedMasterPassword ? "Unlock Vault" : "Create Master Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterPasswordForm;
