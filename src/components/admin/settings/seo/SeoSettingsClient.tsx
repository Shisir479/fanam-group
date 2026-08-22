"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Search as SearchIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { seoService, SeoSettings } from "@/services/seo.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import { Pagination } from "@/components/ui/Pagination";
import { AdminSearch } from "@/components/ui/AdminSearch";

interface AdminSeoSettingsListClientProps {
  initialData: SeoSettings[];
  totalPages?: number;
  currentPage?: number;
  currentSearch?: string;
}

export default function AdminSeoSettingsListClient({
  initialData,
  totalPages = 1,
  currentPage = 1,
  currentSearch = "",
}: AdminSeoSettingsListClientProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [editingData, setEditingData] = useState<SeoSettings | null>(null);

  // Form State
  const [platform, setPlatform] = useState("google");
  const [verificationId, setVerificationId] = useState("");
  const [metaTagContent, setMetaTagContent] = useState("");
  const [description, setDescription] = useState("");
  const [exampleCode, setExampleCode] = useState("");
  const [helpText, setHelpText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setPlatform("google");
    setVerificationId("");
    setMetaTagContent("");
    setDescription("");
    setExampleCode("");
    setHelpText("");
    setIsActive(true);
    setEditingData(null);
  };

  const handleOpenModal = (item?: SeoSettings) => {
    if (item) {
      setEditingData(item);
      setPlatform(item.platform || "google");
      setVerificationId(item.verificationId || "");
      setMetaTagContent(item.metaTagContent || "");
      setDescription(item.description || "");
      setExampleCode(item.exampleCode || "");
      setHelpText(item.helpText || "");
      setIsActive(item.isActive ?? true);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: SeoSettings = {
      platform,
      verificationId,
      metaTagContent,
      description,
      exampleCode,
      helpText,
      isActive,
    };

    try {
      if (editingData?._id) {
        const res = await seoService.update(editingData._id, payload);
        if (res?.success !== false) {
          toast.success("SEO settings updated");
          setIsModalOpen(false);
          router.refresh();
        } else {
          toast.error(res?.message || "Failed to update");
        }
      } else {
        const res = await seoService.create(payload);
        if (res?.success !== false) {
          toast.success("SEO settings created");
          setIsModalOpen(false);
          router.refresh();
        } else {
          toast.error(res?.message || "Failed to create");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setIsDeleting(true);
      const res = await seoService.delete(deleteId);
      if (res?.success !== false) {
        toast.success("Deleted successfully");
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await seoService.toggle(id);
      if (res?.success !== false) {
        toast.success("Status updated");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    params.set("page", page.toString());
    router.push(`/admin/settings/seo?${params.toString()}`);
  };

  const columns: ColumnDef<SeoSettings>[] = [
    {
      header: "Platform",
      render: (item) => (
        <div className="font-medium text-white flex items-center gap-2 capitalize">
          {item.platform}
        </div>
      ),
    },
    {
      header: "Verification ID",
      render: (item) => (
        <div className="text-sm text-gray-300">{item.verificationId}</div>
      ),
    },
    {
      header: "Status",
      className: "text-center",
      render: (item) => (
        <button
          onClick={() => handleToggle(item._id!)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors inline-flex items-center gap-1 ${
            item.isActive
              ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
              : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
          }`}
        >
          {item.isActive ? <Check size={12} /> : <X size={12} />}
          {item.isActive ? "Active" : "Inactive"}
        </button>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (item) => (
        <>
          <button
            onClick={() => handleOpenModal(item)}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => confirmDelete(item._id!)}
            className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">SEO Settings</h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage search engine verification tags and metadata.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleOpenModal()}
              className="glass-btn whitespace-nowrap flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add SEO Setting
            </button>
          </div>
        </div>

        {/* List */}
        <AdminTable
          columns={columns}
          data={initialData}
          isLoading={false}
          keyExtractor={(item) => item._id!}
          emptyMessage="No SEO verification tags found."
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="glass-panel rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0 bg-white/5">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {editingData
                  ? "Edit SEO Configuration"
                  : "Add SEO Configuration"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <form id="seo-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-200 block mb-1">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#f9c602]/50 transition-colors [&>option]:bg-gray-900 capitalize"
                    >
                      {[
                        "google",
                        "bing",
                        "facebook",
                        "twitter",
                        "linkedin",
                        "baidu",
                        "yandex",
                        "other",
                      ].map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-200 block mb-1">
                      Verification ID
                    </label>
                    <input
                      type="text"
                      required
                      value={verificationId}
                      onChange={(e) => setVerificationId(e.target.value)}
                      placeholder="e.g. 1a2b3c4d5e..."
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#f9c602]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Meta Tag Content
                  </label>
                  <input
                    type="text"
                    required
                    value={metaTagContent}
                    onChange={(e) => setMetaTagContent(e.target.value)}
                    placeholder="Enter meta tag content attribute"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#f9c602]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this tag"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#f9c602]/50 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-gray-200 block mb-1">
                      Example Code
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={exampleCode}
                      onChange={(e) => setExampleCode(e.target.value)}
                      placeholder="<meta name='google-site-verification' content='...' />"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#f9c602]/50 transition-colors font-mono text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-200 block mb-1">
                      Help Text
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={helpText}
                      onChange={(e) => setHelpText(e.target.value)}
                      placeholder="Instructions on where to find this ID"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#f9c602]/50 transition-colors text-sm resize-none"
                    />
                  </div>
                </div>

                <label className="flex items-center cursor-pointer gap-3 pt-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <div
                      className={`block w-12 h-6 rounded-full transition-colors ${isActive ? "bg-[#f9c602]" : "bg-gray-300 shadow-inner"}`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-md ${isActive ? "translate-x-6" : ""}`}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-200">
                    Active Status
                  </span>
                </label>
              </form>
            </div>

            <div className="p-6 border-t border-white/10 shrink-0 bg-white/5 flex justify-end gap-3 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-red-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="seo-form"
                disabled={isSubmitting}
                className="glass-btn flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                )}
                {editingData ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete SEO Configuration"
        description="Are you sure you want to delete this Search Engine Verification configuration? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}
