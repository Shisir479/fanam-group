"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createProjectByAdmin, Project } from "@/services/project.service";

import { ArrowLeft, Upload, X, Plus, Trash2, Image as ImageIcon, MapPin, Building, Home, HelpCircle, FileText, Video } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { uploadSingleImage, uploadMultipleImages } from "@/services/upload.service";

const CATEGORIES = ["Residential", "Commercial", "Mixed Use"];
const PROPERTY_TYPES = ["Apartment", "Duplex", "Villa", "Office", "Shop", "Land"];
const STATUSES = ["upcoming", "ongoing", "completed"];

export default function CreateProjectClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const brochureInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "Residential",
    propertyType: "Apartment",
    status: "upcoming",
    featured: false,
    startingPrice: 0,
    endingPrice: 0,
    bookingMoney: 0,
    location: {
      address: "",
      area: "",
      city: "Dhaka",
      district: "",
      country: "Bangladesh",
      latitude: undefined,
      longitude: undefined,
      googleMap: "",
    },
    overview: "",
    features: [{ title: "" }],
    amenities: [{ title: "", icon: "" }],
    faqs: [{ question: "", answer: "" }],
    video: "",
    construction: {
      startedAt: "",
      completionDate: "",
      percentage: 0,
    },
    contactTitle: "Interested in this project?",
    contactDescription: "Get in touch with our property consultants to learn more about availability and pricing details.",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    priority: 0,
    publishStatus: "active",
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // Floor plans state
  const [floorPlans, setFloorPlans] = useState<{
    title: string;
    size: number;
    unit: string;
    bedrooms: number;
    bathrooms: number;
    file: File | null;
    preview: string | null;
  }[]>([]);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name, slug });
  };

  const handleLocationChange = (field: keyof Project["location"], value: any) => {
    setFormData({
      ...formData,
      location: { ...formData.location!, [field]: value }
    });
  };

  const handleConstructionChange = (field: keyof Project["construction"], value: any) => {
    setFormData({
      ...formData,
      construction: { ...formData.construction!, [field]: value }
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index].title = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...(formData.features || []), { title: "" }] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleAmenityChange = (index: number, field: "title" | "icon", value: string) => {
    const newAmenities = [...(formData.amenities || [])];
    newAmenities[index][field] = value;
    setFormData({ ...formData, amenities: newAmenities });
  };

  const addAmenity = () => {
    setFormData({ ...formData, amenities: [...(formData.amenities || []), { title: "", icon: "" }] });
  };

  const removeAmenity = (index: number) => {
    const newAmenities = [...(formData.amenities || [])];
    newAmenities.splice(index, 1);
    setFormData({ ...formData, amenities: newAmenities });
  };

  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs[index][field] = value;
    setFormData({ ...formData, faqs: newFaqs });
  };

  const addFaq = () => {
    setFormData({ ...formData, faqs: [...(formData.faqs || []), { question: "", answer: "" }] });
  };

  const removeFaq = (index: number) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs.splice(index, 1);
    setFormData({ ...formData, faqs: newFaqs });
  };

  const addFloorPlan = () => {
    setFloorPlans([...floorPlans, { title: "", size: 0, unit: "SFT", bedrooms: 0, bathrooms: 0, file: null, preview: null }]);
  };

  const removeFloorPlan = (index: number) => {
    const newPlans = [...floorPlans];
    newPlans.splice(index, 1);
    setFloorPlans(newPlans);
  };

  const handleFloorPlanChange = (index: number, field: string, value: any) => {
    const newPlans = [...floorPlans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setFloorPlans(newPlans);
  };

  const handleFloorPlanImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPlans = [...floorPlans];
      newPlans[index] = { 
        ...newPlans[index], 
        file: file, 
        preview: URL.createObjectURL(file) 
      };
      setFloorPlans(newPlans);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Cover image size should be less than 5MB");
        return;
      }
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Banner image size should be less than 5MB");
        return;
      }
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrochureFile(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024);
    if (validFiles.length < files.length) {
      toast.error("Some images exceeded 5MB and were skipped.");
    }

    setGalleryFiles(prev => [...prev, ...validFiles]);
    const newPreviews = validFiles.map(f => URL.createObjectURL(f));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeGalleryItem = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!coverFile) {
      toast.error("Cover image is required");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Uploading media...");

    try {
      // 1. Upload Cover
      const coverRes = await uploadSingleImage(coverFile);
      if (!coverRes.success) throw new Error("Failed to upload cover image");
      const coverData = {
        _id: coverRes.data[0]._id || coverRes.data[0].url,
        url: coverRes.data[0].url
      };

      // 2. Upload Banner (if exists)
      let bannerData = undefined;
      if (bannerFile) {
        toast.loading("Uploading banner image...", { id: loadingToast });
        const bannerRes = await uploadSingleImage(bannerFile);
        if (bannerRes.success) {
          bannerData = {
            _id: bannerRes.data[0]._id || bannerRes.data[0].url,
            url: bannerRes.data[0].url
          };
        }
      }

      // 3. Upload Brochure (if exists)
      let brochureData = undefined;
      if (brochureFile) {
        toast.loading("Uploading brochure...", { id: loadingToast });
        const broRes = await uploadSingleImage(brochureFile); // Assuming backend accepts PDFs via same endpoint
        if (broRes.success) {
          brochureData = {
            _id: broRes.data[0]._id || broRes.data[0].url,
            url: broRes.data[0].url
          };
        }
      }

      // 4. Upload Gallery
      let galleryData: any[] = [];
      if (galleryFiles.length > 0) {
        toast.loading("Uploading gallery images...", { id: loadingToast });
        const galRes = await uploadMultipleImages(galleryFiles);
        if (!galRes.success) throw new Error("Failed to upload gallery images");
        
        const uploadedArr = Array.isArray(galRes.data) ? galRes.data : [galRes.data];
        galleryData = uploadedArr.map((img: any) => ({
          _id: img._id || img.id || img.url,
          url: img.url
        }));
      }

      // 5. Upload Floor Plan Images
      const finalFloorPlans = [];
      for (let i = 0; i < floorPlans.length; i++) {
        const fp = floorPlans[i];
        if (!fp.title) continue; // skip empty
        let image = undefined;
        if (fp.file) {
            toast.loading(`Uploading floor plan ${i + 1}...`, { id: loadingToast });
            const fpRes = await uploadSingleImage(fp.file);
            if (fpRes.success) {
                image = {
                    _id: fpRes.data[0]._id || fpRes.data[0].url,
                    url: fpRes.data[0].url
                };
            }
        }
        finalFloorPlans.push({
            title: fp.title,
            size: fp.size,
            unit: fp.unit,
            bedrooms: fp.bedrooms,
            bathrooms: fp.bathrooms,
            image
        });
      }

      toast.loading("Saving project details...", { id: loadingToast });

      // Clean empty arrays
      const cleanedFeatures = formData.features?.filter(f => f.title.trim() !== "") || [];
      const cleanedAmenities = formData.amenities?.filter(a => a.title.trim() !== "") || [];
      const cleanedFaqs = formData.faqs?.filter(f => f.question.trim() !== "" && f.answer.trim() !== "") || [];

      // 6. Create Project
      const payload = {
        ...formData,
        cover: coverData,
        banner: bannerData,
        brochure: brochureData,
        gallery: galleryData,
        floorPlans: finalFloorPlans,
        features: cleanedFeatures,
        amenities: cleanedAmenities,
        faqs: cleanedFaqs,
        metaKeywords: formData.metaKeywords ? (typeof formData.metaKeywords === 'string' ? (formData.metaKeywords as string).split(',').map(s => s.trim()) : formData.metaKeywords) : []
      };

      const res = await createProjectByAdmin(payload);
      if (res.success) {
        toast.success("Project created successfully", { id: loadingToast });
        router.push("/admin/project");
      } else {
        throw new Error(res.message || "Failed to create project");
      }
    } catch (error: any) {
      console.error("Create error:", error);
      toast.error(error.message || "Something went wrong", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/project"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-2xl font-bold text-white">Create Project</h2>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="glass-btn disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            "Save Project"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-400" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Project Name *</label>
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
              <label className="text-sm font-medium text-gray-300">Short Description *</label>
              <textarea
                required
                maxLength={300}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-20 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Detailed Description *</label>
              <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden text-white editor-container">
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(value) => setFormData({ ...formData, description: value })}
                  className="h-[200px]"
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-12 pt-8">
              <label className="text-sm font-medium text-gray-300">Project Overview *</label>
              <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden text-white editor-container">
                <ReactQuill
                  theme="snow"
                  value={formData.overview}
                  onChange={(value) => setFormData({ ...formData, overview: value })}
                  className="h-[150px]"
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-12 pt-8">
              <label className="text-sm font-medium text-gray-300">Video Embed URL</label>
              <input
                type="text"
                placeholder="e.g. https://www.youtube.com/embed/..."
                value={formData.video}
                onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Location */}
          <div className="glass-panel p-6 space-y-6 mt-16">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              Location Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300">Full Address</label>
                <input
                  type="text"
                  value={formData.location?.address}
                  onChange={(e) => handleLocationChange("address", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Area *</label>
                <input
                  type="text"
                  required
                  value={formData.location?.area}
                  onChange={(e) => handleLocationChange("area", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">City</label>
                <input
                  type="text"
                  value={formData.location?.city}
                  onChange={(e) => handleLocationChange("city", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">District</label>
                <input
                  type="text"
                  value={formData.location?.district}
                  onChange={(e) => handleLocationChange("district", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Country</label>
                <input
                  type="text"
                  value={formData.location?.country}
                  onChange={(e) => handleLocationChange("country", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location?.latitude || ""}
                  onChange={(e) => handleLocationChange("latitude", parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location?.longitude || ""}
                  onChange={(e) => handleLocationChange("longitude", parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300">Google Map Embed/URL</label>
                <input
                  type="text"
                  value={formData.location?.googleMap}
                  onChange={(e) => handleLocationChange("googleMap", e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Floor Plans */}
          <div className="glass-panel p-6 space-y-4 mt-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Floor Plans</h3>
              <button type="button" onClick={addFloorPlan} className="p-1.5 bg-white/10 rounded text-gray-300 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-6">
              {floorPlans.map((fp, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-white">Plan {idx + 1}</h4>
                    <button type="button" onClick={() => removeFloorPlan(idx)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Title</label>
                        <input type="text" value={fp.title} onChange={(e) => handleFloorPlanChange(idx, "title", e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500" placeholder="e.g. Type A" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Size</label>
                        <input type="number" value={fp.size} onChange={(e) => handleFloorPlanChange(idx, "size", Number(e.target.value))} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500" placeholder="e.g. 1500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Unit</label>
                        <input type="text" value={fp.unit} onChange={(e) => handleFloorPlanChange(idx, "unit", e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Bedrooms</label>
                        <input type="number" value={fp.bedrooms} onChange={(e) => handleFloorPlanChange(idx, "bedrooms", Number(e.target.value))} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Bathrooms</label>
                        <input type="number" value={fp.bathrooms} onChange={(e) => handleFloorPlanChange(idx, "bathrooms", Number(e.target.value))} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Plan Image</label>
                        <input type="file" onChange={(e) => handleFloorPlanImage(idx, e)} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-400 hover:file:bg-purple-500/30" />
                        {fp.preview && <img src={fp.preview} alt="Plan Preview" className="h-16 mt-2 rounded" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">Features</h3>
                <button type="button" onClick={addFeature} className="p-1.5 bg-white/10 rounded text-gray-300 hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {formData.features?.map((feature, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="E.g., 24/7 Security"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 text-sm"
                    />
                    <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">Amenities</h3>
                <button type="button" onClick={addAmenity} className="p-1.5 bg-white/10 rounded text-gray-300 hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {formData.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Title (e.g. Pool)"
                      value={amenity.title}
                      onChange={(e) => handleAmenityChange(idx, "title", e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Icon name or URL"
                      value={amenity.icon}
                      onChange={(e) => handleAmenityChange(idx, "icon", e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 text-sm w-20"
                    />
                    <button type="button" onClick={() => removeAmenity(idx)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="glass-panel p-6 space-y-4 mt-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">FAQs</h3>
              <button type="button" onClick={addFaq} className="p-1.5 bg-white/10 rounded text-gray-300 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {formData.faqs?.map((faq, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative">
                  <button type="button" onClick={() => removeFaq(idx)} className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 text-sm pr-10"
                  />
                  <textarea
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 text-sm h-20 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Publishing
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Publish Status</label>
              <Select
                value={formData.publishStatus}
                onValueChange={(value) => setFormData({ ...formData, publishStatus: value as "active" | "inactive" })}
              >
                <SelectTrigger className="w-full px-4 py-2 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-purple-500 transition-colors h-auto min-h-[42px] bg-white/5">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="bg-transparent backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                >
                  <SelectItem value="active" className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors">Published</SelectItem>
                  <SelectItem value="inactive" className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Featured Project</label>
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

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Priority (Sort Order)</label>
                <input type="number" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Taxonomy
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category *</label>
              <Select
                value={formData.category || undefined}
                onValueChange={(value) => setFormData({ ...formData, category: value as string })}
              >
                <SelectTrigger className="w-full px-4 py-2 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-purple-500 transition-colors h-auto min-h-[42px] bg-white/5">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="bg-transparent backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                >
                  {CATEGORIES.map(c => (
                    <SelectItem key={c} value={c} className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Property Type *</label>
              <Select
                value={formData.propertyType || undefined}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value as string })}
              >
                <SelectTrigger className="w-full px-4 py-2 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-purple-500 transition-colors h-auto min-h-[42px] bg-white/5">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="bg-transparent backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                >
                  {PROPERTY_TYPES.map(p => (
                    <SelectItem key={p} value={p} className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Construction Status *</label>
              <Select
                value={formData.status || undefined}
                onValueChange={(value) => setFormData({ ...formData, status: value as string })}
              >
                <SelectTrigger className="w-full px-4 py-2 border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-purple-500 transition-colors h-auto min-h-[42px] bg-white/5">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  className="bg-transparent backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                >
                  {STATUSES.map(s => (
                    <SelectItem key={s} value={s} className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors capitalize">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Started At</label>
                <input type="date" value={formData.construction?.startedAt || ""} onChange={(e) => handleConstructionChange("startedAt", e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Completion Date</label>
                <input type="date" value={formData.construction?.completionDate || ""} onChange={(e) => handleConstructionChange("completionDate", e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Percentage (%)</label>
                <input type="number" min="0" max="100" value={formData.construction?.percentage || 0} onChange={(e) => handleConstructionChange("percentage", Number(e.target.value))} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>

          {/* Pricing */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Pricing Details
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Starting Price</label>
              <input
                type="number"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Ending Price</label>
              <input
                type="number"
                value={formData.endingPrice}
                onChange={(e) => setFormData({ ...formData, endingPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Booking Money</label>
              <input
                type="number"
                value={formData.bookingMoney}
                onChange={(e) => setFormData({ ...formData, bookingMoney: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                min="0"
              />
            </div>
          </div>

          {/* Cover Media */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Project Cover *
            </h3>
            
            <input
              type="file"
              ref={coverInputRef}
              onChange={handleCoverChange}
              accept="image/*"
              className="hidden"
            />
            
            {coverPreview ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setCoverFile(null);
                      setCoverPreview(null);
                    }}
                    className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="w-full aspect-video border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
              >
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                  <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-400" />
                </div>
                <div className="text-sm text-gray-400">Click to upload cover image</div>
              </button>
            )}
          </div>
          
          {/* Banner Media */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Banner Image
            </h3>
            <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />
            {bannerPreview ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                <Image src={bannerPreview} alt="Banner" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setBannerFile(null);
                      setBannerPreview(null);
                    }}
                    className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => bannerInputRef.current?.click()} className="w-full aspect-video border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                  <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-400" />
                </div>
                <div className="text-sm text-gray-400">Click to upload banner image</div>
              </button>
            )}
          </div>

          {/* Brochure Media */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Brochure (PDF)
            </h3>
            <input type="file" ref={brochureInputRef} onChange={handleBrochureChange} accept="application/pdf" className="hidden" />
            {brochureFile ? (
              <div className="relative w-full p-4 border border-white/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                    <FileText className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300 truncate">{brochureFile.name}</span>
                </div>
                <button type="button" onClick={() => setBrochureFile(null)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => brochureInputRef.current?.click()} className="w-full py-6 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                  <FileText className="w-6 h-6 text-gray-400 group-hover:text-purple-400" />
                </div>
                <div className="text-sm text-gray-400">Click to upload brochure PDF</div>
              </button>
            )}
          </div>

          {/* Gallery Media */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-white">Project Gallery</h3>
            </div>
            
            <input
              type="file"
              ref={galleryInputRef}
              onChange={handleGalleryChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            
            <div className="grid grid-cols-3 gap-3">
              {galleryPreviews.map((preview, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image src={preview} alt={`Gallery ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-gray-400 hover:text-purple-400"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Contact Details Override */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              Contact Override
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Contact Title</label>
              <input type="text" value={formData.contactTitle} onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Contact Description</label>
              <textarea value={formData.contactDescription} onChange={(e) => setFormData({ ...formData, contactDescription: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-24 resize-none" />
            </div>
          </div>

          {/* SEO Details */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">
              SEO Details
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Title *</label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Description *</label>
              <textarea
                required
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-24 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Keywords (Comma separated)</label>
              <input
                type="text"
                value={typeof formData.metaKeywords === 'string' ? formData.metaKeywords : formData.metaKeywords?.join(', ')}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value as any })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                placeholder="luxury, real estate, dhaka"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
