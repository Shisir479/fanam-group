import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme?: "dark" | "light";
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme = "dark",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const isDark = theme === "dark";

  return (
    <div className={`p-4 flex justify-center gap-2 items-center ${isDark ? 'border-t border-white/10' : ''}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
          currentPage === 1
            ? isDark ? "text-gray-600 cursor-not-allowed" : "text-gray-300 cursor-not-allowed"
            : isDark ? "text-gray-400 hover:bg-white/10 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-brand-blue"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
            currentPage === i + 1
              ? isDark
                ? "bg-purple-600 text-white"
                : "bg-brand-blue text-white"
              : isDark
              ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-brand-blue"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
          currentPage === totalPages
            ? isDark ? "text-gray-600 cursor-not-allowed" : "text-gray-300 cursor-not-allowed"
            : isDark ? "text-gray-400 hover:bg-white/10 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-brand-blue"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
