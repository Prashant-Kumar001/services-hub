import React, { useState } from "react";
import { Shield, Lock } from "lucide-react";

interface MasterPasswordScreenProps {
  hasMasterPassword: boolean;
  onSetup: (password: string) => void;
  onVerify: (password: string) => boolean;
  onError: (message: string) => void;
}

export const MasterPasswordScreen: React.FC<MasterPasswordScreenProps> = ({
  hasMasterPassword,
  onSetup,
  onVerify,
  onError,
}) => {
  const [masterPassword, setMasterPassword] = useState("");

  const handleSubmit = () => {
    if (!masterPassword) {
      onError("Please enter a password");
      return;
    }

    try {
      if (hasMasterPassword) {
        const isValid = onVerify(masterPassword);
        if (!isValid) {
          onError("Invalid master password");
        }
      } else {
        onSetup(masterPassword);
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SecureVault</h1>
          <p className="text-gray-600">
            {hasMasterPassword
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
              onChange={(e) => setMasterPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            {hasMasterPassword ? "Unlock Vault" : "Create Master Password"}
          </button>
        </div>
      </div>
    </div>
  );
};
