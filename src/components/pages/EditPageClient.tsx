"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/hooks/useImageUpload";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getPageBySlugByAdmin,
  updatePageBySlugByAdmin,
} from "@/services/page.service";
import RichTextEditor from "../ui/RichTextEditor";

export default function EditPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    link: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    status: "active",
  });
  const [coverUrl, setCoverUrl] = useState("");
  const [coverId, setCoverId] = useState("");
  const { isUploading, uploadSingle } = useImageUpload();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await getPageBySlugByAdmin(slug);
        if (res.success && res.data) {
          const pageData = res.data;
          setFormData({
            name: pageData.name || "",
            slug: pageData.slug || "",
            link: pageData.link || "",
            description: pageData.description || "",
            metaTitle: pageData.metaTitle || "",
            metaDescription: pageData.metaDescription || "",
            status: pageData.status || "active",
          });
          if (pageData.cover) {
            setCoverUrl(pageData.cover.url || "");
            setCoverId(pageData.cover._id || "");
          }
        } else {
          toast.error("Failed to load page details.");
          router.push("/admin/content/pages");
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load page details.");
        router.push("/admin/content/pages");
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchPage();
  }, [slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!coverUrl) {
        toast.error("Cover image is required.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        ...formData,
        status: formData.status as "active" | "inactive",
        cover: { _id: coverId || Date.now().toString(), url: coverUrl },
      };

      const res = await updatePageBySlugByAdmin(slug, payload);
      if (res.success !== false) {
        toast.success("Page updated successfully!");
        router.push("/admin/content/pages");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update page");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-violet" />
          <p className="text-gray-400">Loading page details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content/pages"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Page Page</h2>
            <p className="text-sm text-gray-400 mt-1">
              Update existing dynamic page content.
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="glass-btn"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Basic Information
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Page Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Privacy Policy"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => {
                  const newSlug = e.target.value;
                  setFormData({ ...formData, slug: newSlug });
                }}
                placeholder="privacy-policy"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Public Link Path
              </label>
              <input
                type="text"
                required
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="/privacy-policy"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Content
              </label>
              <RichTextEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Publish Settings
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value || "active" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectItem value="active">Active (Published)</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Cover Image
              </label>
              <label
                className={`w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-brand-violet transition-colors cursor-pointer bg-white/5 overflow-hidden relative group ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const imageData = await uploadSingle(file);
                    if (imageData) {
                      setCoverUrl(imageData.url);
                      setCoverId(imageData._id);
                    }
                  }}
                />
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-brand-violet" />
                    <span className="text-sm text-gray-300">Uploading...</span>
                  </div>
                ) : coverUrl ? (
                  <>
                    <img
                      src={coverUrl}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="flex items-center gap-2 text-white">
                        <UploadCloud className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          Click to replace
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Click to upload</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              SEO Settings
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Meta Title
              </label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData({ ...formData, metaTitle: e.target.value })
                }
                placeholder="SEO Title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Meta Description
              </label>
              <textarea
                required
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                placeholder="SEO Description..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors h-24 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
