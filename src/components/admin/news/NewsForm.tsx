"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createNewsByAdmin, updateNewsByAdmin, News } from "@/services/news.service";
import { ArrowLeft, Save, Loader2, UploadCloud, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface NewsFormProps {
  initialData?: News;
}

export default function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { uploadSingle, isUploading } = useImageUpload();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    excerpt: initialData?.excerpt || "",
    status: initialData?.status || "draft",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    author: initialData?.author || "",
    publishDate: initialData?.publishDate ? new Date(initialData.publishDate).toISOString().split('T')[0] : "",
    isFeatured: initialData?.isFeatured || false,
  });

  const [cover, setCover] = useState<{ _id: string; url: string } | null>(initialData?.cover || null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(initialData?.cover?.url || null);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !initialData ? generateSlug(title) : prev.slug,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let currentCover = cover;

      if (coverFile) {
        const uploadRes = await uploadSingle(coverFile, true);
        if (uploadRes) {
          currentCover = {
            _id: uploadRes._id,
            url: uploadRes.url,
          };
        } else {
          toast.error("Failed to upload image");
          setIsLoading(false);
          return;
        }
      }

      if (!currentCover) {
        toast.error("Cover image is required");
        setIsLoading(false);
        return;
      }

      const payload = { ...formData, cover: currentCover };

      let res;
      if (initialData?._id) {
        res = await updateNewsByAdmin(initialData._id, payload);
      } else {
        res = await createNewsByAdmin(payload);
      }

      if (res.success !== false) {
        toast.success(`News ${initialData ? "updated" : "created"} successfully`);
        router.push("/admin/news-events");
        router.refresh();
      } else {
        toast.error(res.error || `Failed to ${initialData ? "update" : "create"} news`);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/news-events"
            className="w-10 h-10 flex items-center justify-center rounded-full glass-panel text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {initialData ? "Edit News" : "Create New News Article"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {initialData ? "Update existing news details" : "Add a new news article to the system"}
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading || isUploading}
          className="glass-btn"
        >
          {(isLoading || isUploading) ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isLoading || isUploading ? "Saving..." : "Save News"}
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
              <label className="text-sm font-medium text-gray-300">News Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter news title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Slug (URL) *</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                placeholder="news-slug"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Publish Date *</label>
                <Popover>
                  <PopoverTrigger className={`w-full h-10 flex justify-between items-center px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-purple-500 transition-colors ${!formData.publishDate ? "text-gray-400" : "text-white"}`}>
                    {formData.publishDate ? format(new Date(formData.publishDate), "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.publishDate ? new Date(formData.publishDate) : undefined}
                      onSelect={(date) => setFormData({ ...formData, publishDate: date ? format(date, "yyyy-MM-dd") : "" })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                  placeholder="e.g., Fanam Admin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Excerpt (Short Description)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Short summary for lists"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Main Content (HTML) *</label>
              <RichTextEditor
                className="mt-2"
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val })}
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => setFormData({ ...formData, status: val as "draft" | "published" })}
                >
                  <SelectTrigger className="w-full h-10 glass-panel border-white/10 outline-none focus:ring-purple-500 transition-colors">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft (Hidden)</SelectItem>
                    <SelectItem value="published">Published (Visible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Featured News</label>
                <Select
                  value={formData.isFeatured ? "yes" : "no"}
                  onValueChange={(val) => setFormData({ ...formData, isFeatured: val === "yes" })}
                >
                  <SelectTrigger className="w-full h-10 glass-panel border-white/10 outline-none focus:ring-purple-500 transition-colors">
                    <SelectValue placeholder="Select Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-sm font-medium text-gray-300 mb-2 block">Cover Image *</label>
              <label
                className={`w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-colors cursor-pointer bg-white/5 overflow-hidden relative group ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    <span className="text-sm text-gray-300">Uploading...</span>
                  </div>
                ) : coverPreview ? (
                  <>
                    <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="flex items-center gap-2 text-white">
                        <UploadCloud className="w-5 h-5" />
                        <span className="text-sm font-medium">Click to replace image</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2 opacity-50" />
                    <span className="text-xs">Click to upload image</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              SEO Settings
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Title *</label>
              <input
                type="text"
                name="metaTitle"
                required
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="SEO Title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Description *</label>
              <textarea
                name="metaDescription"
                required
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
                placeholder="SEO Description..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
