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
    <div
      className={`p-4 flex justify-center gap-2 items-center ${isDark ? "border-t border-white/10" : ""}`}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
          currentPage === 1
            ? isDark
              ? "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed backdrop-blur-md"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
            : isDark
              ? "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20 hover:border-white/20 hover:text-white backdrop-blur-md shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50 hover:text-brand-blue shadow-sm border border-gray-200"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentPage === i + 1
              ? isDark
                ? "bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-lg"
                : "bg-brand-blue text-white shadow-md"
              : isDark
                ? "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:border-white/10 hover:text-white backdrop-blur-md"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-brand-blue shadow-sm"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
          currentPage === totalPages
            ? isDark
              ? "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed backdrop-blur-md"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
            : isDark
              ? "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20 hover:border-white/20 hover:text-white backdrop-blur-md shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50 hover:text-brand-blue shadow-sm border border-gray-200"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
