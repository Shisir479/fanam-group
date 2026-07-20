"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadSingleImage } from "@/services/upload.service";
import { Gallery } from "@/services/gallery.service";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Video as VideoIcon, UploadCloud } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditGalleryClient({ 
  initialData, 
  onSubmit 
}: { 
  initialData: Gallery, 
  onSubmit: (payload: any) => Promise<any> 
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    description: initialData.description || "",
    type: initialData.type || "image",
    videoUrl: initialData.videoUrl || "",
    status: initialData.status || "active",
    featured: initialData.featured || false,
    sortOrder: initialData.sortOrder || 0,
    metaTitle: initialData.metaTitle || "",
    metaDescription: initialData.metaDescription || "",
  });
  const [coverUrl, setCoverUrl] = useState(initialData.cover?.url || "");
  const [coverId, setCoverId] = useState(initialData.cover?._id || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData.thumbnail?.url || "");
  const [thumbnailId, setThumbnailId] = useState(initialData.thumbnail?._id || "");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumbnail: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isThumbnail) setIsUploadingThumbnail(true);
    else setIsUploadingCover(true);
    
    try {
      const res = await uploadSingleImage(file);
      if (res.success && res.data && res.data.length > 0) {
        if (isThumbnail) {
          setThumbnailUrl(res.data[0].url);
          setThumbnailId(res.data[0]._id || Date.now().toString());
        } else {
          setCoverUrl(res.data[0].url);
          setCoverId(res.data[0]._id || Date.now().toString());
        }
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during upload");
    } finally {
      if (isThumbnail) setIsUploadingThumbnail(false);
      else setIsUploadingCover(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.type === "image" && !coverUrl) {
        toast.error("Cover image is required for image galleries.");
        setIsSubmitting(false);
        return;
      }
      
      const payload = {
        ...formData,
        cover: coverUrl ? { _id: coverId || Date.now().toString(), url: coverUrl } : undefined,
        thumbnail: thumbnailUrl ? { _id: thumbnailId || Date.now().toString(), url: thumbnailUrl } : undefined,
      };

      const res = await onSubmit(payload);
      if (res.success) {
        toast.success("Gallery item updated successfully!");
        router.push("/admin/gallery");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update gallery item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/gallery"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Gallery Item</h2>
            <p className="text-sm text-gray-400 mt-1">
              Update existing gallery details.
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="glass-btn"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  disabled
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-500 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors min-h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Media Specific */}
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Media Content
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Type
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "image" })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                    formData.type === "image"
                      ? "bg-blue-600/20 border-blue-500 text-blue-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <ImageIcon size={18} />
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "video" })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                    formData.type === "video"
                      ? "bg-blue-600/20 border-blue-500 text-blue-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <VideoIcon size={18} />
                  Video
                </button>
              </div>
            </div>

            {formData.type === "image" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Cover Image *
                </label>
                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-white/20 px-6 py-10 hover:border-white/40 transition-colors bg-white/5">
                  <div className="text-center">
                    {coverUrl ? (
                      <div className="relative group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={coverUrl} alt="Cover" className="mx-auto max-h-[300px] rounded-xl object-contain" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                          <label className="cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-white backdrop-blur-sm transition-colors">
                            Change Image
                            <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileUpload(e, false)} />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center">
                        {isUploadingCover ? (
                          <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
                        ) : (
                          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="mt-4 flex text-sm leading-6 text-gray-400">
                          <span className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-300">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileUpload(e, false)} disabled={isUploadingCover} />
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            {formData.type === "video" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Video Thumbnail (Optional)
                  </label>
                  <div className="mt-2 flex justify-center rounded-xl border border-dashed border-white/20 px-6 py-6 hover:border-white/40 transition-colors bg-white/5">
                    <div className="text-center">
                      {thumbnailUrl ? (
                        <div className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={thumbnailUrl} alt="Thumbnail" className="mx-auto h-[150px] rounded-xl object-contain" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                            <label className="cursor-pointer bg-white/20 hover:bg-white/30 px-3 py-1.5 text-sm rounded-md text-white backdrop-blur-sm transition-colors">
                              Change
                              <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileUpload(e, true)} />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center">
                          {isUploadingThumbnail ? (
                            <Loader2 className="mx-auto h-8 w-8 text-gray-400 animate-spin" />
                          ) : (
                            <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                          )}
                          <div className="mt-2 flex text-sm text-gray-400">
                            <span className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-300">
                              <span>Upload thumbnail</span>
                              <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileUpload(e, true)} disabled={isUploadingThumbnail} />
                            </span>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Settings
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
              >
                <SelectTrigger className="w-full px-4 py-2 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-purple-500 transition-colors h-auto min-h-[42px] bg-white/5">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  side="bottom"
                  sideOffset={5}
                  className="bg-transparent backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                >
                  <SelectItem
                    value="active"
                    className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors"
                  >
                    Active
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

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div>
                <label className="font-medium text-white block">Featured</label>
                <span className="text-xs text-gray-500">Show in featured sections</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              SEO Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors min-h-[100px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
