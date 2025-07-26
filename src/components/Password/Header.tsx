import React from "react";
import { usePasswordStore } from "../../stores/passwordStore";
import { Shield, Settings, Plus, Lock } from "lucide-react";

interface HeaderProps {
  passwordsCount: number;
}

const Header: React.FC<HeaderProps> = ({ passwordsCount }) => {
  const { setIsUnlocked, setShowAddModal, setMasterPassword, lockVault } =
    usePasswordStore();

    const handlerChangeState = ()  => {
      setIsUnlocked(false);
      setMasterPassword('');
    }

  return (
    <header className=" backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300 ease-out">
                <Shield className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                SecureVault
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-slate-600 font-medium">
                    <span className="font-semibold text-indigo-600">
                      {passwordsCount}
                    </span>
                    <span className="hidden sm:inline">
                      {" "}
                      passwords stored securely
                    </span>
                    <span className="sm:hidden"> stored</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-out flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-medium"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline">Add Password</span>
              <span className="sm:hidden">Add</span>
            </button>

            <button
              onClick={lockVault}
              className="group relative bg-white text-slate-600 hover:text-slate-800 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 ease-out shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            >
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" />

              <div className="absolute -bottom-12 right-0 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
                Lock Vault
                <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-800 rotate-45"></div>
              </div>
            </button>

            <button
              className="sm:hidden group relative bg-white text-slate-600 hover:text-slate-800 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 ease-out shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
              title="Settings"
            >
              <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
        </div>

        <div className="mt-4 hidden sm:block">
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.min((passwordsCount / 50) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500">Vault Usage</span>
            <span className="text-xs text-slate-500">
              {passwordsCount}/50 passwords
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60"></div>
    </header>
  );
};

export default Header;
