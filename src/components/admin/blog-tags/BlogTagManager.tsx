"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createBlogTagByAdmin,
  deleteBlogTagBySlugByAdmin,
  updateBlogTagBySlugByAdmin,
  BlogTag,
} from "@/services/blog-tag.service";
import { Plus, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

interface Props {
  initialTags: BlogTag[];
  triggerCreate?: number;
}

export default function BlogTagManager({ initialTags, triggerCreate }: Props) {
  const router = useRouter();

  // Modal State
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTag, setEditingTag] = useState<BlogTag | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    if (triggerCreate && triggerCreate > 0) {
      startCreate();
    }
  }, [triggerCreate]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteBlogTagBySlugByAdmin(deleteTarget);
      if (!res || res.success !== false) {
        toast.success("Blog tag deleted successfully");
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete tag");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete tag");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingTag) {
        const res = await updateBlogTagBySlugByAdmin(editingTag.slug, formData);
        if (res?.success !== false) {
          toast.success("Tag updated");
          setShowForm(false);
          setEditingTag(null);
          router.refresh();
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await createBlogTagByAdmin(formData);
        if (res?.success !== false) {
          toast.success("Tag created");
          setShowForm(false);
          router.refresh();
        } else {
          toast.error(res.message);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save tag");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (tag: BlogTag) => {
    setEditingTag(tag);
    setFormData({ name: tag.name, slug: tag.slug, status: tag.status });
    setShowForm(true);
  };

  const startCreate = () => {
    setEditingTag(null);
    setFormData({ name: "", slug: "", status: "active" });
    setShowForm(true);
  };

  const columns: ColumnDef<BlogTag>[] = [
    {
      header: "Name",
      render: (tag) => (
        <div>
          <div className="font-semibold text-white">{tag.name}</div>
          <div className="text-xs text-gray-400">/{tag.slug}</div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (tag) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold w-fit bg-[#f7f8fa] border border-transparent shadow-[2px_2px_5px_rgba(180,185,195,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)] ${
            tag.status === "active" ? "text-green-600" : "text-red-500"
          }`}
        >
          {tag.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (tag) => (
        <>
          <button
            onClick={() => startEdit(tag)}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit Tag"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(tag.slug)}
            className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
            title="Delete Tag"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {showForm && (
        <div className="glass-panel p-6">
          <h4 className="text-white font-bold mb-4">
            {editingTag ? "Edit Tag" : "Create New Tag"}
          </h4>
          <form
            onSubmit={handleCreateOrUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Artificial Intelligence"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="e.g. artificial-intelligence"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "active" | "inactive",
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-brand-violet [&>option]:bg-gray-900"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-brand-violet hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Tag"}
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <AdminTable
          columns={columns}
          data={initialTags}
          isLoading={false}
          keyExtractor={(tag) => tag._id}
          emptyMessage="No tags found. Create one to get started."
        />
      )}

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Blog Tag"
        description="Are you sure you want to delete this tag? It will be permanently removed."
      />
    </div>
  );
}
