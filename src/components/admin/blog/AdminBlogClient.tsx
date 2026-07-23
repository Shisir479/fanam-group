"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteBlogBySlugByAdmin, Blog } from "@/services/blog.service";
import { Plus, Edit, Trash2, Eye, Calendar, FileText } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

interface Props {
  initialBlogs: Blog[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
}

export default function AdminBlogClient({
  initialBlogs,
  totalPages,
  currentPage,
  currentSearch,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteBlogBySlugByAdmin(deleteTarget);
      if (!res || res.success !== false) {
        toast.success("Blog deleted successfully");
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete blog");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    const params = new URLSearchParams();
    if (val) params.set("search", val);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };
  initialBlogs;
  const columns: ColumnDef<Blog>[] = [
    {
      header: "Blog",
      render: (blog) => (
        <div className="flex items-center gap-4 group">
          {blog.cover?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={blog.cover.url}
                alt={blog.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors line-clamp-1">
              {blog.name}
            </div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              /{blog.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      render: (blog) => (
        <span className="text-sm text-gray-300">
          {typeof blog.blogCategory === "object" && blog.blogCategory !== null
            ? blog.blogCategory.name
            : blog.blogCategory || "Uncategorized"}
        </span>
      ),
    },
    {
      header: "Status",
      render: (blog) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold w-fit bg-[#f7f8fa] border border-transparent shadow-[2px_2px_5px_rgba(180,185,195,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)] ${
            blog.status === "active"
              ? "text-green-600"
              : blog.status === "draft"
                ? "text-amber-600"
                : "text-red-500"
          }`}
        >
          {blog.status
            ? blog.status.charAt(0).toUpperCase() + blog.status.slice(1)
            : "Draft"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (blog) => (
        <>
          <Link
            href={`/blog/${blog.slug}`}
            target="_blank"
            className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
            title="View Public Page"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/blog/edit/${blog.slug}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit Blog"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setDeleteTarget(blog.slug)}
            className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
            title="Delete Blog"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
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

      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <AdminTable
        columns={columns}
        data={initialBlogs}
        isLoading={false}
        keyExtractor={(blog) => blog._id || blog.slug}
        emptyMessage="No blogs found. Create one to get started."
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === idx + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

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
