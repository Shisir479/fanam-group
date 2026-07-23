"use client";

import { useState, useEffect } from "react";
import {
  getBannerByPageAdmin,
  updateBannerByPageAdmin,
  Banner,
  BannerStat,
} from "@/services/banner.service";
import { useImageUpload } from "@/hooks/useImageUpload";
import { ImagePlus, Loader2, Save, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGES = [
  { value: "about", label: "About Us" },
  { value: "blog", label: "Blog" },
  { value: "contact", label: "Contact Us" },
  { value: "inquiry", label: "Inquiry" },
  { value: "projects", label: "Projects (All)" },
  { value: "services", label: "Services (All)" },
  { value: "privacy-policy", label: "Privacy Policy" },
  { value: "terms-conditions", label: "Terms & Conditions" },
];

export function AdminBannerClient() {
  const [selectedPage, setSelectedPage] = useState<string>("about");
  const [banner, setBanner] = useState<Partial<Banner>>({
    eyebrowText: "",
    title: "",
    description: "",
    backgroundImage: "",
    stats: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { uploadSingle, isUploading } = useImageUpload();

  useEffect(() => {
    fetchBanner(selectedPage);
  }, [selectedPage]);

  const fetchBanner = async (page: string) => {
    setIsLoading(true);
    try {
      const res = await getBannerByPageAdmin(page);

      // Handle both { success: true, data: banner } and direct banner object response
      const bannerData = res?.data || (res?._id ? res : null);

      if (bannerData) {
        setBanner(bannerData);
      } else {
        // No banner found
        setBanner({
          eyebrowText: "",
          title: "",
          description: "",
          backgroundImage: "",
          stats: [],
        });
        toast.error(
          "Banner not found for this page. It cannot be edited until created by the backend.",
        );
      }
    } catch (error) {
      console.error(error);
      setBanner({
        eyebrowText: "",
        title: "",
        description: "",
        backgroundImage: "",
        stats: [],
      });
      toast.error("Failed to fetch banner data. It may not exist yet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imgRes = await uploadSingle(file, "banner" as any);
      if (imgRes?.url) {
        setBanner((prev) => ({ ...prev, backgroundImage: imgRes.url }));
        toast.success("Image uploaded");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSave = async () => {
    if (!banner.title || !banner.backgroundImage) {
      toast.error("Title and Background Image are required");
      return;
    }
    setIsSaving(true);
    try {
      const res = await updateBannerByPageAdmin(selectedPage, banner);
      // Handle both { success: true } and direct banner response which should have _id or page
      if (res?.success || res?._id || res?.page) {
        toast.success("Banner updated successfully");
      } else {
        toast.error(res?.message || "Failed to update banner");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const addStat = () => {
    setBanner((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { value: "", label: "" }],
    }));
  };

  const updateStat = (index: number, key: keyof BannerStat, value: string) => {
    const newStats = [...(banner.stats || [])];
    newStats[index] = { ...newStats[index], [key]: value };
    setBanner((prev) => ({ ...prev, stats: newStats }));
  };

  const removeStat = (index: number) => {
    const newStats = [...(banner.stats || [])];
    newStats.splice(index, 1);
    setBanner((prev) => ({ ...prev, stats: newStats }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Page Banners
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Select a page to manage its banner content.
          </p>
        </div>
        {banner._id && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="glass-btn disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Banner"}
          </button>
        )}
      </div>

      <div className="glass-panel p-6">
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-200 block mb-2">
            Select Page to Edit
          </label>
          <Select
            value={selectedPage}
            onValueChange={(val) => setSelectedPage(val || "")}
          >
            <SelectTrigger className="w-full md:w-1/3 bg-black/20 border-white/20 text-white outline-none focus:ring-0 focus:border-white/40">
              <SelectValue placeholder="Select Page to Edit" />
            </SelectTrigger>
            <SelectContent>
              {PAGES.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        ) : !banner._id ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <ImagePlus className="w-12 h-12 mb-4 opacity-50" />
            <p>Banner not found for this page.</p>
            <p className="text-sm">
              Please select a valid page to edit its banner.
            </p>
          </div>
        ) : (
          <div className="space-y-8 mt-8 border-t border-white/10 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200 block mb-2">
                  Eyebrow Text (Subtitle)
                </label>
                <input
                  type="text"
                  value={banner.eyebrowText || ""}
                  onChange={(e) =>
                    setBanner({ ...banner, eyebrowText: e.target.value })
                  }
                  placeholder="e.g. BUILDING LEGACIES"
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200 block mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={banner.title || ""}
                  onChange={(e) =>
                    setBanner({ ...banner, title: e.target.value })
                  }
                  placeholder="e.g. About Us"
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-200 block mb-2">
                  Description
                </label>
                <textarea
                  value={banner.description || ""}
                  onChange={(e) =>
                    setBanner({ ...banner, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 resize-none"
                  placeholder="Brief description..."
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-2">
                Background Image *
              </label>
              <div className="relative group rounded-lg overflow-hidden border border-white/10 aspect-video md:aspect-[3/1] bg-black/20">
                {banner.backgroundImage ? (
                  <>
                    <Image
                      src={banner.backgroundImage}
                      alt="Banner Preview"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer glass-btn">
                        <ImagePlus className="w-5 h-5" />
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <ImagePlus className="w-8 h-8" />
                      <span>Click to upload image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(banner.stats || []).map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-black/20 border border-white/10 p-4 rounded-lg relative group"
                  >
                    <button
                      type="button"
                      onClick={() => removeStat(idx)}
                      className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">
                          Value
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) =>
                            updateStat(idx, "value", e.target.value)
                          }
                          placeholder="e.g. 15+"
                          className="w-full px-3 py-1.5 mt-1 bg-black/30 border border-white/10 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) =>
                            updateStat(idx, "label", e.target.value)
                          }
                          placeholder="e.g. Years Experience"
                          className="w-full px-3 py-1.5 mt-1 bg-black/30 border border-white/10 rounded text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
