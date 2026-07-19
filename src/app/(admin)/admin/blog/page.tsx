"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getBlogsByAdmin,
  deleteBlogBySlugByAdmin,
  createBlogByAdmin,
  Blog,
} from "@/services/blog.service";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Calendar,
  Database,
} from "lucide-react";
import toast from "react-hot-toast";
import { blogPosts } from "@/lib/blogData";
import { DeleteModal } from "@/components/ui/DeleteModal";

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await getBlogsByAdmin({ page, search, limit: 10 });
      if (res.success) {
        setBlogs(res.data);
        setTotalPages(res.count);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteBlogBySlugByAdmin(deleteTarget);
      if (res.success || res.message) {
        toast.success("Blog deleted successfully");
        setDeleteTarget(null);
        fetchBlogs();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog & News</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your blog posts, news, and articles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/create"
            className="glass-btn whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Create New Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-200 text-sm border-b border-white/10">
                <th className="p-4 font-medium">Post Details</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Author</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    No blogs found. Create one to get started.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-white line-clamp-1">
                        {blog.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        /{blog.slug}
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          blog.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : blog.status === "inactive"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 capitalize">
                      {blog.author?.firstName
                        ? `${blog.author.firstName} ${blog.author.lastName || ""}`
                        : "Unknown"}
                    </td>
                    <td className="p-4 text-gray-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                        title="View Public"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blog/edit/${blog.slug}`}
                        className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(blog.slug)}
                        className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === idx + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Reusable Delete Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? It will be permanently removed from the database."
      />
    </div>
  );
}
