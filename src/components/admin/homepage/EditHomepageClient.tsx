"use client";

import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  Save,
  Image as ImageIcon,
  Type,
  Layout,
  Info,
  Award,
  CheckCircle2,
  Trash2,
  Plus,
  ArrowLeft,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { updateHomepageCMS } from "@/services/homepage-cms.service";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/ui/RichTextEditor";

export default function EditHomepageClient({
  initialData,
}: {
  initialData?: any;
}) {
  const router = useRouter();
  const { uploadSingle } = useImageUpload();
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollContainerRef.current) {
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const [formData, setFormData] = useState<any>(() => {
    if (initialData) {
      const data = { ...initialData };
      if (data.galleryItems && data.galleryItems.length > 0) {
        data.galleryImages = data.galleryItems.map((item: any) => ({
          _id: item.image?._id,
          url: item.image?.url,
          title: item.title || "",
          description: item.description || "",
        }));
      } else {
        data.galleryImages = [];
      }
      return data;
    }
    return {
      heroHeading: "",
      heroSlides: [],
      companyTitle: "",
      companyHeading: "",
      companyDescriptionOne: "",
      companyDescriptionTwo: "",
      companyImages: [],
      companyHighlights: [],
      strengthTitle: "",
      strengthHeading: "",
      strengths: [],
      achievementTitle: "",
      achievementHeading: "",
      achievements: [],
      galleryTitle: "",
      galleryHeading: "",
      galleryDescription: "",
      galleryImages: [],
    };
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { ...formData };
      payload.galleryItems = (payload.galleryImages || []).map((img: any) => ({
        image: { _id: img._id || img.url || "fallback_id", url: img.url },
        title: img.title || "",
        description: img.description || "",
      }));
      delete payload.galleryImages;

      const res = await updateHomepageCMS(payload);
      if (res?.success) {
        toast.success("Homepage CMS updated successfully!");
      } else {
        toast.error("Failed to update Homepage CMS.");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSlideAdd = () => {
    setFormData({
      ...formData,
      heroSlides: [...(formData.heroSlides || []), { title: "", image: null }],
    });
  };

  const handleSlideRemove = (index: number) => {
    const newSlides = [...(formData.heroSlides || [])];
    newSlides.splice(index, 1);
    setFormData({ ...formData, heroSlides: newSlides });
  };

  const handleSlideChange = (index: number, field: string, value: any) => {
    const newSlides = [...(formData.heroSlides || [])];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setFormData({ ...formData, heroSlides: newSlides });
  };

  const handleSlideImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const toastId = toast.loading("Uploading image...");
      try {
        const uploadedImage = await uploadSingle(file, true);
        if (uploadedImage) {
          handleSlideChange(index, "image", uploadedImage);
          toast.success("Image uploaded successfully", { id: toastId });
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast.error("Failed to upload image", { id: toastId });
      }
    }
  };

  const handleGalleryImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const toastId = toast.loading("Uploading image...");
      try {
        // Upload one image (you can enhance this for multi-upload)
        const file = e.target.files[0];
        const uploadedImage = await uploadSingle(file, true);
        if (uploadedImage) {
          const currentImages = formData.galleryImages || [];
          setFormData({
            ...formData,
            galleryImages: [...currentImages, uploadedImage],
          });
          toast.success("Image added to gallery", { id: toastId });
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast.error("Failed to upload image", { id: toastId });
      }
    }
  };

  const handleGalleryImageRemove = (index: number) => {
    const currentImages = [...(formData.galleryImages || [])];
    currentImages.splice(index, 1);
    setFormData({ ...formData, galleryImages: currentImages });
  };

  const handleStrengthAdd = () => {
    setFormData({
      ...formData,
      strengths: [
        ...(formData.strengths || []),
        { title: "", description: "", icon: "" },
      ],
    });
  };

  const handleStrengthRemove = (index: number) => {
    const newStrengths = [...(formData.strengths || [])];
    newStrengths.splice(index, 1);
    setFormData({ ...formData, strengths: newStrengths });
  };

  const handleStrengthChange = (index: number, field: string, value: any) => {
    const newStrengths = [...(formData.strengths || [])];
    newStrengths[index] = { ...newStrengths[index], [field]: value };
    setFormData({ ...formData, strengths: newStrengths });
  };

  const handleAchievementAdd = () => {
    setFormData({
      ...formData,
      achievements: [
        ...(formData.achievements || []),
        { number: "", title: "" },
      ],
    });
  };

  const handleAchievementRemove = (index: number) => {
    const newAchievements = [...(formData.achievements || [])];
    newAchievements.splice(index, 1);
    setFormData({ ...formData, achievements: newAchievements });
  };

  const handleAchievementChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newAchievements = [...(formData.achievements || [])];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setFormData({ ...formData, achievements: newAchievements });
  };

  const handleHighlightAdd = () => {
    setFormData({
      ...formData,
      companyHighlights: [...(formData.companyHighlights || []), { title: "" }],
    });
  };

  const handleHighlightRemove = (index: number) => {
    const newHighlights = [...(formData.companyHighlights || [])];
    newHighlights.splice(index, 1);
    setFormData({ ...formData, companyHighlights: newHighlights });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...(formData.companyHighlights || [])];
    newHighlights[index] = { title: value };
    setFormData({ ...formData, companyHighlights: newHighlights });
  };

  const handleCompanyImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const toastId = toast.loading("Uploading company image...");
      try {
        const uploadedImage = await uploadSingle(file, true);
        if (uploadedImage) {
          const currentImages = formData.companyImages || [];
          setFormData({
            ...formData,
            companyImages: [...currentImages, uploadedImage],
          });
          toast.success("Company image uploaded", { id: toastId });
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast.error("Failed to upload company image", { id: toastId });
      }
    }
  };

  const handleCompanyImageRemove = (index: number) => {
    const currentImages = [...(formData.companyImages || [])];
    currentImages.splice(index, 1);
    setFormData({ ...formData, companyImages: currentImages });
  };

  const tabs = [
    {
      id: "hero",
      label: "Hero Banner",
      icon: <Layout className="w-3.5 h-3.5" />,
    },
    {
      id: "overview",
      label: "Company Overview",
      icon: <Info className="w-3.5 h-3.5" />,
    },
    {
      id: "why-us",
      label: "Strengths",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Award className="w-3.5 h-3.5" />,
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: <ImageIcon className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24 text-white">
      <div className="flex flex-col gap-2 mb-2">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Homepage CMS
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your homepage content, images, and layout blocks.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="glass-btn disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="w-full glass-panel overflow-hidden relative">
        <div
          className="flex overflow-x-auto gap-2 p-2 cursor-grab active:cursor-grabbing hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={handleMouseMove}
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
            }
          `}</style>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              draggable={false}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`whitespace-nowrap select-none flex-shrink-0 transition-all flex items-center gap-1.5 ${activeTab === tab.id ? "glass-btn" : "px-[1rem] py-[0.46rem] text-[0.825rem] border border-transparent rounded-full font-medium hover:bg-white/10 text-gray-400"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSave}>
        {/* HERO TAB */}
        {activeTab === "hero" && (
          <section className="glass-panel p-6 space-y-6">
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">
              Hero Section
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-200">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.heroHeading || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, heroHeading: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-gray-200">
                    Hero Slides
                  </label>
                  <button
                    type="button"
                    onClick={handleSlideAdd}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Slide
                  </button>
                </div>

                <div className="space-y-4">
                  {(formData.heroSlides || []).map(
                    (slide: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">
                            Slide {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleSlideRemove(index)}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-300 block mb-1">
                              Slide Title
                            </label>
                            <input
                              type="text"
                              value={slide.title || ""}
                              onChange={(e) =>
                                handleSlideChange(
                                  index,
                                  "title",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                              placeholder="Enter slide title"
                            />
                          </div>

                          <div>
                            <label className="text-sm text-gray-300 block mb-1">
                              Slide Image
                            </label>
                            {slide.image?.url ? (
                              <div className="relative h-20 w-full rounded border border-white/20 overflow-hidden group">
                                <img
                                  src={slide.image.url}
                                  alt="Slide"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <label className="cursor-pointer px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs text-white">
                                    Change
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleSlideImageUpload(index, e)
                                      }
                                    />
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <div className="h-20 w-full border border-dashed border-white/20 rounded flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                                <label className="cursor-pointer flex flex-col items-center">
                                  <ImageIcon className="w-5 h-5 text-gray-400 mb-1" />
                                  <span className="text-xs text-gray-400">
                                    Upload Image
                                  </span>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleSlideImageUpload(index, e)
                                    }
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                  {(!formData.heroSlides ||
                    formData.heroSlides.length === 0) && (
                    <div className="text-center p-6 border border-dashed border-white/10 rounded-lg text-gray-400 text-sm">
                      No slides added yet. Click "Add Slide" to begin.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* COMPANY OVERVIEW TAB */}
        {activeTab === "overview" && (
          <section className="glass-panel p-6 space-y-6">
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">
              Company Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.companyTitle || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, companyTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.companyHeading || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, companyHeading: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-200">
                  Description Paragraph 1
                </label>
                <textarea
                  value={formData.companyDescriptionOne || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyDescriptionOne: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-200">
                  Description Paragraph 2
                </label>
                <textarea
                  value={formData.companyDescriptionTwo || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyDescriptionTwo: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-gray-200">
                    Company Images (Up to 3)
                  </label>
                  <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" /> Add Image
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCompanyImageUpload}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(formData.companyImages || []).map(
                    (image: any, index: number) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden border border-white/10 aspect-video"
                      >
                        <img
                          src={image.url}
                          alt={`Company Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleCompanyImageRemove(index)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ),
                  )}
                  {(!formData.companyImages ||
                    formData.companyImages.length === 0) && (
                    <div className="col-span-full text-center p-6 border border-dashed border-white/10 rounded-lg text-gray-400 text-sm">
                      No company images added yet. Click "Add Image" to upload
                      up to 3 images.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">
                  Company Highlights
                </label>
                <button
                  type="button"
                  onClick={handleHighlightAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Highlight
                </button>
              </div>

              <div className="space-y-3">
                {(formData.companyHighlights || []).map(
                  (highlight: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10"
                    >
                      <input
                        type="text"
                        value={highlight.title || ""}
                        onChange={(e) =>
                          handleHighlightChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                        placeholder="e.g., 20+ Years of Excellence"
                      />
                      <button
                        type="button"
                        onClick={() => handleHighlightRemove(index)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ),
                )}
                {(!formData.companyHighlights ||
                  formData.companyHighlights.length === 0) && (
                  <div className="text-center p-4 border border-dashed border-white/10 rounded-lg text-gray-400 text-sm">
                    No highlights added yet. Click "Add Highlight" to begin.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* STRENGTHS TAB */}
        {activeTab === "why-us" && (
          <section className="glass-panel p-6 space-y-6">
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">
              Why Choose Us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.strengthTitle || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, strengthTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.strengthHeading || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      strengthHeading: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">
                  Strength Items
                </label>
                <button
                  type="button"
                  onClick={handleStrengthAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>

              <div className="space-y-4">
                {(formData.strengths || []).map(
                  (strength: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">
                          Strength {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleStrengthRemove(index)}
                          className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {/* Icon Upload or Preview */}
                        <div className="flex items-start gap-4">
                          {strength.icon?.url ? (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black/50 p-2">
                              <img
                                src={strength.icon.url}
                                alt="Icon"
                                className="w-full h-full object-contain"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleStrengthChange(index, "icon", null)
                                }
                                className="absolute top-0 right-0 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-bl"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <label className="text-sm text-gray-300 block mb-1">
                                Icon Image
                              </label>
                              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                  <p className="text-xs text-gray-400">
                                    Click to upload icon
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const file = e.target.files[0];
                                      const toastId =
                                        toast.loading("Uploading icon...");
                                      try {
                                        const uploadedIcon = await uploadSingle(
                                          file,
                                          true,
                                        );
                                        if (uploadedIcon) {
                                          handleStrengthChange(
                                            index,
                                            "icon",
                                            uploadedIcon,
                                          );
                                          toast.success(
                                            "Icon uploaded successfully",
                                            { id: toastId },
                                          );
                                        } else {
                                          throw new Error("Upload failed");
                                        }
                                      } catch (error) {
                                        toast.error("Failed to upload icon", {
                                          id: toastId,
                                        });
                                      }
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="text-sm text-gray-300 block mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={strength.title || ""}
                            onChange={(e) =>
                              handleStrengthChange(
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                            placeholder="Strength Title"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-300 block mb-1">
                            Description
                          </label>
                          <textarea
                            value={strength.description || ""}
                            onChange={(e) =>
                              handleStrengthChange(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                            placeholder="Strength Description"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
                {(!formData.strengths || formData.strengths.length === 0) && (
                  <div className="text-center p-6 border border-dashed border-white/10 rounded-lg text-gray-400 text-sm">
                    No strengths added yet. Click "Add Item" to begin.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && (
          <section className="glass-panel p-6 space-y-6">
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.achievementTitle || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      achievementTitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.achievementHeading || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      achievementHeading: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">
                  Achievement Items
                </label>
                <button
                  type="button"
                  onClick={handleAchievementAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>

              <div className="space-y-4">
                {(formData.achievements || []).map(
                  (achievement: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">
                          Achievement {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleAchievementRemove(index)}
                          className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-300 block mb-1">
                            Number / Value
                          </label>
                          <input
                            type="text"
                            value={achievement.number || ""}
                            onChange={(e) =>
                              handleAchievementChange(
                                index,
                                "number",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                            placeholder="E.g., 500+, 20M"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-300 block mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={achievement.title || ""}
                            onChange={(e) =>
                              handleAchievementChange(
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                            placeholder="E.g., Happy Clients"
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
                {(!formData.achievements ||
                  formData.achievements.length === 0) && (
                  <div className="text-center p-6 border border-dashed border-white/10 rounded-lg text-gray-400 text-sm">
                    No achievements added yet. Click "Add Item" to begin.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* GALLERY TAB */}
        {activeTab === "gallery" && (
          <section className="glass-panel p-6 space-y-6">
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">
              Gallery Section
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-200">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.galleryHeading || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, galleryHeading: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">
                  Gallery Images
                </label>
                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" /> Add Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleGalleryImageUpload}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {(formData.galleryImages || []).map(
                  (image: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-2 bg-black/20 rounded-lg border border-white/10"
                    >
                      <div className="relative group rounded-lg overflow-hidden border border-white/10 aspect-square w-full">
                        <img
                          src={image.url}
                          alt={`Gallery ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleGalleryImageRemove(index)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Image Title"
                        value={image.title || ""}
                        onChange={(e) => {
                          const newImages = [...(formData.galleryImages || [])];
                          newImages[index] = {
                            ...newImages[index],
                            title: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            galleryImages: newImages,
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-black/30 border border-white/10 rounded text-white text-sm"
                      />
                    </div>
                  ),
                )}
                {(!formData.galleryImages ||
                  formData.galleryImages.length === 0) && (
                  <div className="col-span-full text-center p-6 border border-dashed border-white/10 rounded-lg text-gray-400 text-sm">
                    No images in the gallery yet. Click "Add Image" to begin.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
