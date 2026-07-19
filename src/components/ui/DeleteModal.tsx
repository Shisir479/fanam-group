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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl glass-panel shadow-2xl transition-all animate-in zoom-in-95 duration-200 border border-white/10">
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 pt-8 text-center sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-6">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 mb-8">{description}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
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
