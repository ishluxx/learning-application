import { motion } from "framer-motion";
import { FiX, FiCheckCircle, FiAlertTriangle, FiAward } from "react-icons/fi";

type NotificationType = "message" | "deadline" | "achievement";

interface NotificationCardProps {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  isRead: boolean;
  onDismiss: (id: string) => void;
}

const icons = {
  message: <FiCheckCircle />,
  deadline: <FiAlertTriangle />,
  achievement: <FiAward />,
};

export default function NotificationCard({
  id,
  title,
  message,
  timestamp,
  type,
  isRead,
  onDismiss,
}: NotificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      layout
      className={`glass-card rounded-xl p-4 mb-3 relative overflow-hidden ${
        !isRead && "border-l-4 border-blue-500"
      }`}
    >
      {/* Dismiss button */}
      <button
        onClick={() => onDismiss(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        <FiX />
      </button>

      <div className="flex items-start gap-3">
        <div className="mt-1">{icons[type]}</div>
        <div className="flex-1">
          <h3 className={`font-semibold ${!isRead ? "text-white" : "text-gray-300"}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-300">{message}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">{timestamp}</span>
            {!isRead && (
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}