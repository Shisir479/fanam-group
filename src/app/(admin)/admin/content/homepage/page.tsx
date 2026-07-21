"use client";

import { useState, useEffect } from "react";
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
  X
} from "lucide-react";
import Link from "next/link";
import { getHomepageCMSAdmin, updateHomepageCMS } from "@/services/homepage-cms.service";
import { uploadSingleImage } from "@/services/upload.service";

import RichTextEditor from "@/components/ui/RichTextEditor";

export default function HomepageManagement() {
  const [activeTab, setActiveTab] = useState("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    heroHeading: "",
    heroSlides: [],
    companyTitle: "",
    companyHeading: "",
    companyDescriptionOne: "",
    companyDescriptionTwo: "",
    companyImage: null,
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
    galleryImages: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getHomepageCMSAdmin();
      if (res?.success && res.data) {
        setFormData(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch Homepage CMS data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateHomepageCMS(formData);
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

  const handleSlideImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const toastId = toast.loading("Uploading image...");
      try {
        const uploadRes = await uploadSingleImage(file);
        if (uploadRes?.success && uploadRes.data) {
          handleSlideChange(index, "image", uploadRes.data);
          toast.success("Image uploaded successfully", { id: toastId });
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast.error("Failed to upload image", { id: toastId });
      }
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const toastId = toast.loading("Uploading image...");
      try {
        // Upload one image (you can enhance this for multi-upload)
        const file = e.target.files[0];
        const uploadRes = await uploadSingleImage(file);
        if (uploadRes?.success && uploadRes.data) {
          const currentImages = formData.galleryImages || [];
          setFormData({
            ...formData,
            galleryImages: [...currentImages, uploadRes.data]
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
      strengths: [...(formData.strengths || []), { title: "", description: "", icon: "" }],
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
      achievements: [...(formData.achievements || []), { number: "", title: "" }],
    });
  };

  const handleAchievementRemove = (index: number) => {
    const newAchievements = [...(formData.achievements || [])];
    newAchievements.splice(index, 1);
    setFormData({ ...formData, achievements: newAchievements });
  };

  const handleAchievementChange = (index: number, field: string, value: string) => {
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

  const handleCompanyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const toastId = toast.loading("Uploading company image...");
      try {
        const uploadRes = await uploadSingleImage(file);
        if (uploadRes?.success && uploadRes.data) {
          setFormData({ ...formData, companyImage: uploadRes.data });
          toast.success("Company image uploaded", { id: toastId });
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast.error("Failed to upload company image", { id: toastId });
      }
    }
  };

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: <Layout className="w-3.5 h-3.5" /> },
    { id: "overview", label: "Company Overview", icon: <Info className="w-3.5 h-3.5" /> },
    { id: "why-us", label: "Strengths", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: "achievements", label: "Achievements", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-3.5 h-3.5" /> },
  ];

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              Homepage CMS
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage your homepage content, images, and layout blocks.
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#CBA35E] hover:bg-[#b58e4e] text-black rounded-lg font-bold transition-all shadow-lg disabled:opacity-50"
        >
          {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      <div className="mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 min-w-max p-1 bg-black/20 rounded-xl border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                ? "bg-white/20 text-white shadow border border-white/10"
                : "text-gray-400 hover:text-white"
                }`}
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
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-200">Main Heading</label>
                <input
                  type="text"
                  value={formData.heroHeading || ""}
                  onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-gray-200">Hero Slides</label>
                  <button
                    type="button"
                    onClick={handleSlideAdd}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Slide
                  </button>
                </div>

                <div className="space-y-4">
                  {(formData.heroSlides || []).map((slide: any, index: number) => (
                    <div key={index} className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">Slide {index + 1}</h4>
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
                          <label className="text-sm text-gray-300 block mb-1">Slide Title</label>
                          <input
                            type="text"
                            value={slide.title || ""}
                            onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                            className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                            placeholder="Enter slide title"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-300 block mb-1">Slide Image</label>
                          {slide.image?.url ? (
                            <div className="relative h-20 w-full rounded border border-white/20 overflow-hidden group">
                              <img src={slide.image.url} alt="Slide" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs text-white">
                                  Change
                                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSlideImageUpload(index, e)} />
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className="h-20 w-full border border-dashed border-white/20 rounded flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                              <label className="cursor-pointer flex flex-col items-center">
                                <ImageIcon className="w-5 h-5 text-gray-400 mb-1" />
                                <span className="text-xs text-gray-400">Upload Image</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSlideImageUpload(index, e)} />
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!formData.heroSlides || formData.heroSlides.length === 0) && (
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
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Company Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200">Subtitle</label>
                <input
                  type="text"
                  value={formData.companyTitle || ""}
                  onChange={(e) => setFormData({ ...formData, companyTitle: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200">Main Heading</label>
                <input
                  type="text"
                  value={formData.companyHeading || ""}
                  onChange={(e) => setFormData({ ...formData, companyHeading: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-200">Description Paragraph 1</label>
                <textarea
                  value={formData.companyDescriptionOne || ""}
                  onChange={(e) => setFormData({ ...formData, companyDescriptionOne: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-200">Description Paragraph 2</label>
                <textarea
                  value={formData.companyDescriptionTwo || ""}
                  onChange={(e) => setFormData({ ...formData, companyDescriptionTwo: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-200 block mb-2">Company Image</label>
                {formData.companyImage?.url ? (
                  <div className="relative h-48 w-full md:w-1/2 rounded-lg border border-white/20 overflow-hidden group">
                    <img src={formData.companyImage.url} alt="Company Overview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-sm text-white">
                        Change Image
                        <input type="file" className="hidden" accept="image/*" onChange={handleCompanyImageUpload} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 w-full md:w-1/2 border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                    <label className="cursor-pointer flex flex-col items-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-400">Upload Company Image</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleCompanyImageUpload} />
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">Company Highlights</label>
                <button
                  type="button"
                  onClick={handleHighlightAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Highlight
                </button>
              </div>
              
              <div className="space-y-3">
                {(formData.companyHighlights || []).map((highlight: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10">
                    <input
                      type="text"
                      value={highlight.title || ""}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
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
                ))}
                {(!formData.companyHighlights || formData.companyHighlights.length === 0) && (
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
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Why Choose Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200">Subtitle</label>
                <input
                  type="text"
                  value={formData.strengthTitle || ""}
                  onChange={(e) => setFormData({ ...formData, strengthTitle: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200">Main Heading</label>
                <input
                  type="text"
                  value={formData.strengthHeading || ""}
                  onChange={(e) => setFormData({ ...formData, strengthHeading: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">Strength Items</label>
                <button
                  type="button"
                  onClick={handleStrengthAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
              
              <div className="space-y-4">
                {(formData.strengths || []).map((strength: any, index: number) => (
                  <div key={index} className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">Strength {index + 1}</h4>
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
                            <img src={strength.icon.url} alt="Icon" className="w-full h-full object-contain" />
                            <button
                              type="button"
                              onClick={() => handleStrengthChange(index, "icon", null)}
                              className="absolute top-0 right-0 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-bl"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <label className="text-sm text-gray-300 block mb-1">Icon Image</label>
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                <p className="text-xs text-gray-400">Click to upload icon</p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    const toastId = toast.loading("Uploading icon...");
                                    try {
                                      const uploadRes = await uploadSingleImage(file);
                                      if (uploadRes?.success && uploadRes.data) {
                                        handleStrengthChange(index, "icon", uploadRes.data);
                                        toast.success("Icon uploaded successfully", { id: toastId });
                                      } else {
                                        throw new Error("Upload failed");
                                      }
                                    } catch (error) {
                                      toast.error("Failed to upload icon", { id: toastId });
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Title</label>
                        <input
                          type="text"
                          value={strength.title || ""}
                          onChange={(e) => handleStrengthChange(index, "title", e.target.value)}
                          className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                          placeholder="Strength Title"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Description</label>
                        <textarea
                          value={strength.description || ""}
                          onChange={(e) => handleStrengthChange(index, "description", e.target.value)}
                          className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                          placeholder="Strength Description"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200">Subtitle</label>
                <input
                  type="text"
                  value={formData.achievementTitle || ""}
                  onChange={(e) => setFormData({ ...formData, achievementTitle: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200">Main Heading</label>
                <input
                  type="text"
                  value={formData.achievementHeading || ""}
                  onChange={(e) => setFormData({ ...formData, achievementHeading: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">Achievement Items</label>
                <button
                  type="button"
                  onClick={handleAchievementAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
              
              <div className="space-y-4">
                {(formData.achievements || []).map((achievement: any, index: number) => (
                  <div key={index} className="p-4 bg-black/20 border border-white/10 rounded-lg space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">Achievement {index + 1}</h4>
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
                        <label className="text-sm text-gray-300 block mb-1">Number / Value</label>
                        <input
                          type="text"
                          value={achievement.number || ""}
                          onChange={(e) => handleAchievementChange(index, "number", e.target.value)}
                          className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                          placeholder="E.g., 500+, 20M"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Title</label>
                        <input
                          type="text"
                          value={achievement.title || ""}
                          onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                          className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded text-white text-sm"
                          placeholder="E.g., Happy Clients"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {(!formData.achievements || formData.achievements.length === 0) && (
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
            <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-2">Gallery Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-200">Subtitle</label>
                <input
                  type="text"
                  value={formData.galleryTitle || ""}
                  onChange={(e) => setFormData({ ...formData, galleryTitle: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-200">Main Heading</label>
                <input
                  type="text"
                  value={formData.galleryHeading || ""}
                  onChange={(e) => setFormData({ ...formData, galleryHeading: e.target.value })}
                  className="w-full px-4 py-2 mt-1 bg-black/20 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-gray-200">Gallery Images</label>
                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" /> Add Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleGalleryImageUpload} />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {(formData.galleryImages || []).map((image: any, index: number) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-white/10 aspect-square">
                    <img src={image.url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
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
                ))}
                {(!formData.galleryImages || formData.galleryImages.length === 0) && (
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
