"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateConcernBySlugAdmin, ConcernType } from "@/services/concern.service";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Building } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";

interface EditConcernClientProps {
  initialData: ConcernType;
}

export default function EditConcernClient({ initialData }: EditConcernClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadSingle } = useImageUpload();

  const [formData, setFormData] = useState<Partial<ConcernType>>({
    name: initialData.name,
    slug: initialData.slug,
    shortDescription: initialData.shortDescription,
    longDescription: initialData.longDescription,
    websiteUrl: initialData.websiteUrl,
    features: initialData.features || [],
  });

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(initialData.heroImage?.url || null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name, slug });
  };

  const handleFeatureChange = (index: number, field: "title" | "description", value: string) => {
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

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Hero image size should be less than 5MB");
        return;
      }
      setHeroFile(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.slug || !formData.shortDescription || !formData.longDescription || !formData.websiteUrl) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Saving changes...");

    try {
      let heroData = initialData.heroImage;
      if (heroFile) {
        toast.loading("Uploading new hero image...", { id: loadingToast });
        const res = await uploadSingle(heroFile, true);
        if (res) heroData = res;
      }

      toast.loading("Updating concern...", { id: loadingToast });

      const cleanedFeatures = formData.features?.filter(
        (f) => f.title.trim() !== "" && f.description.trim() !== ""
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
          <Link
            href="/admin/concerns"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Concern</h2>
            <p className="text-sm text-gray-400 mt-1">Update existing concern information.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="glass-btn flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Update Concern
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
                <label className="text-sm font-medium text-gray-300">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Website URL *</label>
              <input
                type="text"
                required
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Short Description *</label>
              <textarea
                required
                maxLength={200}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-20 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Long Description *</label>
              <textarea
                required
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-32 resize-none"
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
                    onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    value={item.description}
                    placeholder="Feature Description"
                    onChange={(e) => handleFeatureChange(idx, "description", e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500"
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
              <label className="text-sm font-medium text-gray-300">Hero Image *</label>
              <div className="relative group rounded-xl overflow-hidden bg-white/5 border-2 border-dashed border-white/10 hover:border-purple-500/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="p-4 flex flex-col items-center justify-center text-center">
                  {heroPreview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <Image src={heroPreview} alt="Hero" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="py-8">
                      <p className="text-sm text-gray-400 mt-2">Click to upload hero image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
