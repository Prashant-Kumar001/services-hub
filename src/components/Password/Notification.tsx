import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface NotificationProps {
  notification: { message: string; type: "success" | "error" };
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-100 px-4 py-2 rounded-lg text-white ${
        notification.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex items-center space-x-2">
        {notification.type === "success" ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;
