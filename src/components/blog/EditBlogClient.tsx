"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadSingleImage } from "@/services/upload.service";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, UploadCloud } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditBlogClient({ initialData, slug, onSubmit }: { initialData: any, slug: string, onSubmit: (payload: any) => Promise<any> }) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    slug: initialData.slug || "",
    excerpt: initialData.excerpt || "",
    description: initialData.description || "",
    metaTitle: initialData.metaTitle || "",
    metaDescription: initialData.metaDescription || "",
    status: initialData.status || "draft",
    tags: initialData.tags?.join(", ") || "",
  });
  const [coverUrl, setCoverUrl] = useState(initialData.cover?.url || "");
  const [coverId, setCoverId] = useState(initialData.cover?._id || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      const payload = {
        ...formData,
        status: formData.status as "draft" | "active" | "inactive" | undefined,
        tags: tagsArray as any,
        cover: coverUrl ? { _id: coverId || Date.now().toString(), url: coverUrl } : undefined,
      };

      const res = await onSubmit(payload);
      if (res.success) {
        toast.success("Blog updated successfully!");
        router.push("/admin/blog");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Blog</h2>
            <p className="text-sm text-gray-400 mt-1">
              Update your existing blog post.
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
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Basic Information
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Blog Title
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Slug (URL)
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="my-blog-post"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Excerpt (Short Description)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="A brief summary of the blog post..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Main Content
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Write your blog content here..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors min-h-[300px] resize-y"
              />
            </div>
          </div>
        </div>

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
                  setFormData({ ...formData, status: value || "draft" })
                }
              >
                <SelectTrigger className="w-full px-4 py-2  border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-purple-500 transition-colors h-auto min-h-[42px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="bg-transparent backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                >
                  <SelectItem
                    value="draft"
                    className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors"
                  >
                    Draft
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors"
                  >
                    Active (Published)
                  </SelectItem>
                  <SelectItem
                    value="inactive"
                    className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors"
                  >
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="Real Estate, Tips, Market..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Cover Image
              </label>
              <label
                className={`w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-colors cursor-pointer bg-white/5 overflow-hidden relative group ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setIsUploading(true);
                    try {
                      const res = await uploadSingleImage(file);
                      if (res.success && res.data && res.data.length > 0) {
                        setCoverUrl(res.data[0].url);
                        setCoverId(res.data[0]._id);
                        toast.success("Image uploaded successfully");
                      }
                    } catch (error: any) {
                      toast.error(error.message || "Failed to upload image");
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                />
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
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
                        <span className="text-sm font-medium">Click to replace image</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Click to upload image</span>
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
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
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
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-24 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
