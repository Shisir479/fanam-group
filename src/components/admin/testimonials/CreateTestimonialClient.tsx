"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createTestimonialByAdmin,
  TestimonialType,
} from "@/services/testimonial.service";
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
import { useImageUpload } from "@/hooks/useImageUpload";

export default function CreateTestimonialClient() {
  const router = useRouter();
  const { uploadSingle } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<TestimonialType>>({
    title: "",
    name: "",
    designation: "",
    company: "",
    review: "",
    rating: 5,
    featured: false,
    sortOrder: 0,
    status: "active",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.title || !formData.name || !formData.review) {
      toast.error("Please fill in all required fields (Title, Name, Review)");
      return;
    }

    if (!imageFile) {
      toast.error("Author image is required");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creating testimonial...");

    try {
      // Upload Image
      const uploadedImage = await uploadSingle(imageFile, true);
      if (!uploadedImage) {
        throw new Error("Failed to upload image");
      }

      // Submit Data
      const finalData = {
        ...formData,
        image: {
          _id: uploadedImage._id || uploadedImage.url,
          url: uploadedImage.url,
        },
      };

      const res = await createTestimonialByAdmin(finalData);

      if (res.success) {
        toast.success("Testimonial created successfully", { id: toastId });
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        throw new Error(res.message || "Failed to create testimonial");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/testimonials"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Create Testimonial
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Add a new client review.
            </p>
          </div>
        </div>
        <button
          type="submit"
          form="testimonial-form"
          disabled={isSubmitting}
          className="glass-btn flex items-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Testimonial
        </button>
      </div>

      <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-panel p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Review Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Title / Headline *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
                placeholder="e.g. Heartfelt Tales of Our Happy Homeowners"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Review Content *
              </label>
              <textarea
                required
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors resize-none"
                placeholder="The actual review text..."
              />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            Author Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
                placeholder="e.g. Michael Chen"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Designation
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
                placeholder="e.g. Apartment Owner"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
                placeholder="e.g. TechCorp"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-200 block mb-1">
                Rating
              </label>
              <Select
                value={formData.rating?.toString()}
                onValueChange={(val) =>
                  val && setFormData({ ...formData, rating: parseInt(val) })
                }
              >
                <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
                  <SelectValue placeholder="Select Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-200 block mb-2">
                Author Image *
              </label>
              <div className="flex items-start gap-6">
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className={`relative w-40 h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                    imagePreview
                      ? "border-transparent bg-white/5"
                      : "border-white/10 hover:border-[#CBA35E] hover:bg-white/5 bg-black/20"
                  }`}
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                        className="absolute -top-3 -right-3 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 gap-2">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-xs font-medium text-center px-4">
                        Click to upload
                        <br />
                        square image (1:1)
                      </span>
                    </div>
                  )}
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
