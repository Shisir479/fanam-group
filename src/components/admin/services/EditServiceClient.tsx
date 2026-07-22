"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  updateServiceBySlugAdmin,
  getServiceBySlugAdmin,
  ServiceType,
} from "@/services/service.service";
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
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
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useImageUpload } from "@/hooks/useImageUpload";

const CATEGORIES = [
  "Residential Properties",
  "Commercial Spaces",
  "Interior Design",
  "Property Management",
  "Construction",
  "Architecture",
  "Other",
];

export default function EditServiceClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { uploadSingle } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<ServiceType>>({
    name: "",
    slug: "",
    heading: "",
    shortDescription: "",
    description: "",
    category: "Residential Properties",
    icon: "",
    sortOrder: 0,
    featured: false,
    status: "active",
    metaTitle: "",
    metaDescription: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await getServiceBySlugAdmin(slug);
        if (res.success && res.data) {
          setFormData(res.data);
          if (res.data.image?.url) {
            setImagePreview(res.data.image.url);
          }
        } else {
          toast.error("Service not found");
          router.push("/admin/services");
        }
      } catch (error) {
        toast.error("Failed to fetch service");
        router.push("/admin/services");
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchService();
  }, [slug, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const newSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name, slug: newSlug });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.slug ||
      !formData.heading ||
      !formData.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!imagePreview) {
      toast.error("Service image is required");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating service...");

    try {
      let finalImage = formData.image;

      // Upload new image if selected
      if (imageFile) {
        const uploadedImage = await uploadSingle(imageFile, true);
        if (!uploadedImage) {
          throw new Error("Failed to upload new image");
        }

        finalImage = {
          _id: uploadedImage._id || uploadedImage.url,
          url: uploadedImage.url,
        };
      }

      const finalData = {
        ...formData,
        image: finalImage,
      };

      const res = await updateServiceBySlugAdmin(slug, finalData);

      if (res.success) {
        toast.success("Service updated successfully", { id: toastId });
        router.push("/admin/services");
        router.refresh();
      } else {
        throw new Error(res.message || "Failed to update service");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Edit Service
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Update service information.
            </p>
          </div>
        </div>

        <button
          type="submit"
          form="edit-service-form"
          disabled={isSubmitting}
          className="glass-btn flex items-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Update Service
        </button>
      </div>

      <form
        id="edit-service-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Basic Info */}
        <div className="glass-panel p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Service Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-gray-400 focus:outline-none focus:border-[#CBA35E] transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Category *
              </label>
              <Select
                value={formData.category || undefined}
                onValueChange={(val) =>
                  setFormData({ ...formData, category: val || undefined })
                }
              >
                <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(val: any) =>
                  setFormData({ ...formData, status: val })
                }
              >
                <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass-panel p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Service Content
          </h2>

          <div>
            <label className="text-sm font-semibold text-gray-200 block mb-1">
              Heading *
            </label>
            <input
              type="text"
              required
              value={formData.heading}
              onChange={(e) =>
                setFormData({ ...formData, heading: e.target.value })
              }
              className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-200 block mb-1">
              Short Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.shortDescription}
              onChange={(e) =>
                setFormData({ ...formData, shortDescription: e.target.value })
              }
              className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-200 block mb-2">
              Detailed Description *
            </label>
            <RichTextEditor
              value={formData.description || ""}
              onChange={(content) =>
                setFormData({ ...formData, description: content })
              }
            />
          </div>
        </div>

        {/* Media */}
        <div className="glass-panel p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Media & Icon
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-2">
                Main Image *
              </label>
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {imagePreview ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className="aspect-video rounded-lg border-2 border-dashed border-white/10 hover:border-[#CBA35E]/50 hover:bg-[#CBA35E]/5 transition-all cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-[#CBA35E]"
                >
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-sm font-medium">
                    Click to upload image
                  </span>
                  <span className="text-xs opacity-70 mt-1">
                    1920x1080px recommended
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Icon (Optional)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="glass-panel p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            SEO Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Meta Title *
              </label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData({ ...formData, metaTitle: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Meta Description *
              </label>
              <textarea
                required
                rows={2}
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
