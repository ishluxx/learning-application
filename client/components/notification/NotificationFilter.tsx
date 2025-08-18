import { useState } from "react";

type FilterType = "all" | "unread" | "message" | "deadline" | "achievement";

export default function NotificationFilter({
  onFilterChange,
}: {
  onFilterChange: (filter: FilterType) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: FilterType[] = ["all", "unread", "message", "deadline", "achievement"];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => {
            setActiveFilter(filter);
            onFilterChange(filter);
          }}
          className={`px-3 py-1 rounded-full text-sm capitalize ${
            activeFilter === filter
              ? "bg-purple-600 text-white"
              : "glass-card text-gray-300 hover:bg-white/10"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}