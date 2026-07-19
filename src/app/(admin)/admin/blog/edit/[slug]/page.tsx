"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getBlogBySlugByAdmin,
  updateBlogBySlugByAdmin,
} from "@/services/blog.service";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const slugParam = params.slug as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    excerpt: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
    tags: "",
  });
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogBySlugByAdmin(slugParam);
        if (res.success && res.data) {
          const blog = res.data;
          setFormData({
            name: blog.name || "",
            slug: blog.slug || "",
            excerpt: blog.excerpt || "",
            description: blog.description || "",
            metaTitle: blog.metaTitle || "",
            metaDescription: blog.metaDescription || "",
            status: blog.status || "draft",
            tags: blog.tags?.join(", ") || "",
          });
          if (blog.cover?.url) {
            setCoverUrl(blog.cover.url);
          }
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load blog");
        router.push("/admin/blog");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slugParam, router]);

  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const payload = {
        ...formData,
        status: formData.status as "draft" | "active" | "inactive" | undefined,
        tags: tagsArray as any,
      };

      const res = await updateBlogBySlugByAdmin(slugParam, payload);
      if (res.success) {
        toast.success("Blog updated successfully!");
        router.push("/admin/blog");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Blog</h2>
            <p className="text-sm text-gray-400 mt-1">
              Update your existing blog post.
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="glass-btn"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Basic Information
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Blog Title
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Slug (URL)
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="my-blog-post"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Excerpt (Short Description)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="A brief summary of the blog post..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Main Content
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Write your blog content here..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors min-h-[300px] resize-y"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              Publish Settings
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value || "draft" })
                }
              >
                <SelectTrigger className="w-full px-4 py-2  border border-white/10 rounded-xl text-white outline-none focus:ring-1 focus:ring-purple-500 transition-colors h-auto min-h-[42px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent
                  alignItemWithTrigger={false}
                  side="bottom"
                  sideOffset={5}
                  className="bg-transparent backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 text-white"
                >
                  <SelectItem
                    value="draft"
                    className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors"
                  >
                    Draft
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-3 rounded-lg m-1 transition-colors"
                  >
                    Active (Published)
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="Real Estate, Tips, Market..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Cover Image
              </label>
              <div className="w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-colors cursor-pointer bg-white/5 overflow-hidden relative">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Click to upload image</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
              SEO Settings
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Meta Title
              </label>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData({ ...formData, metaTitle: e.target.value })
                }
                placeholder="SEO Title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Meta Description
              </label>
              <textarea
                required
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                placeholder="SEO Description..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-24 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
