"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  updateConcernBySlugAdmin,
  ConcernType,
} from "@/services/concern.service";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  Building,
  UploadCloud,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { BackButton } from "@/components/ui/BackButton";

interface EditConcernClientProps {
  initialData: ConcernType;
}

export default function EditConcernClient({
  initialData,
}: EditConcernClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isUploading, uploadSingle, removeImage } = useImageUpload();

  const [formData, setFormData] = useState<Partial<ConcernType>>({
    name: initialData.name,
    slug: initialData.slug,
    shortDescription: initialData.shortDescription,
    longDescription: initialData.longDescription,
    websiteUrl: initialData.websiteUrl,
    features: initialData.features || [],
    metaTitle: initialData.metaTitle || "",
    metaDescription: initialData.metaDescription || "",
  });

  const [heroData, setHeroData] = useState<{ _id: string; url: string } | null>(
    initialData.heroImage || null,
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name, slug });
  };

  const handleFeatureChange = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), { title: "", description: "" }],
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleHeroChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Hero image size should be less than 5MB");
      return;
    }

    const uploaded = await uploadSingle(file);
    if (uploaded) {
      if (heroData && heroData._id && heroData._id !== uploaded._id) {
        await removeImage(heroData._id, true);
      }
      setHeroData(uploaded);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (
      !formData.name ||
      !formData.slug ||
      !formData.shortDescription ||
      !formData.longDescription
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Saving changes...");

    try {
      if (!heroData) throw new Error("Hero image is required");

      toast.loading("Updating concern...", { id: loadingToast });

      const cleanedFeatures =
        formData.features?.filter(
          (f) => f.title.trim() !== "" && f.description.trim() !== "",
        ) || [];

      const payload = {
        ...formData,
        heroImage: heroData,
        features: cleanedFeatures,
      };

      const res = await updateConcernBySlugAdmin(initialData.slug, payload);
      if (res.success) {
        toast.success("Concern updated successfully", { id: loadingToast });
        router.push("/admin/concerns");
      } else {
        throw new Error(res.message || "Failed to update concern");
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Something went wrong", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href="/admin/concerns" />
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Concern</h2>
            <p className="text-sm text-gray-400 mt-1">
              Update existing concern information.
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || isUploading}
          className="glass-btn flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSubmitting ? "Updating..." : "Update Concern"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-400" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Enter concern name"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="enter-concern-slug"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Short Description *
              </label>
              <textarea
                required
                maxLength={200}
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                placeholder="Enter short description..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors h-32 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Long Description *
              </label>
              <RichTextEditor
                className="mt-2"
                value={formData.longDescription || ""}
                onChange={(val) =>
                  setFormData({ ...formData, longDescription: val })
                }
              />
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Features</h3>
              <button
                type="button"
                onClick={addFeature}
                className="p-1.5 bg-white/10 rounded text-gray-300 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {formData.features?.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    value={item.title}
                    placeholder="Feature Title"
                    onChange={(e) =>
                      handleFeatureChange(idx, "title", e.target.value)
                    }
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-brand-violet"
                  />
                  <input
                    type="text"
                    value={item.description}
                    placeholder="Feature Description"
                    onChange={(e) =>
                      handleFeatureChange(idx, "description", e.target.value)
                    }
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-brand-violet"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg h-fit self-start md:self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Media
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block mb-2">
                Hero Image *
              </label>
              <label
                className={`w-full h-48 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-brand-violet transition-colors cursor-pointer bg-white/5 overflow-hidden relative group ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleHeroChange}
                />
                {heroData ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={heroData.url}
                      alt="Hero"
                      fill
                      className="object-cover"
                    />
                    {isUploading ? (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-white" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <UploadCloud className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    ) : (
                      <UploadCloud className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-sm">Click to upload hero image</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              SEO Optimization
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData({ ...formData, metaTitle: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors"
                placeholder="SEO Title (optional)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Meta Description
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet transition-colors h-32 resize-none"
                placeholder="SEO Description (optional)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
