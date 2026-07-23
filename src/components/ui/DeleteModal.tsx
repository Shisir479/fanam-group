import { AlertTriangle, X, Loader2 } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-[#f7f8fa] shadow-[15px_15px_30px_rgba(180,185,195,0.4),-15px_-15px_30px_rgba(255,255,255,0.9)] transition-all animate-in zoom-in-95 duration-200 border border-white">
        <div className="absolute right-3 top-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-800 hover:bg-red-100 hover:text-red-600 transition-all disabled:opacity-50"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-6 pt-8 text-center sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full shadow-[4px_4px_10px_rgba(180,185,195,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] bg-[#f7f8fa] mb-6 border border-white">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>

          <h3 className="text-xl font-extrabold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-8 font-medium">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="glass-btn flex-1 px-4 py-2.5 rounded-xl font-bold text-gray-700 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[4px_4px_10px_rgba(239,68,68,0.3),-4px_-4px_10px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_5px_rgba(239,68,68,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
