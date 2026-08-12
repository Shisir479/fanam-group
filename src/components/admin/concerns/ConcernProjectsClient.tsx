"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ConcernType,
  Project,
  updateConcernBySlugAdmin,
} from "@/services/concern.service";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit,
  X,
  UploadCloud,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import { DeleteModal } from "@/components/ui/DeleteModal";

interface ConcernProjectsClientProps {
  initialData: ConcernType;
}

export default function ConcernProjectsClient({
  initialData,
}: ConcernProjectsClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(
    initialData.projects || [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const { uploadMultiple } = useImageUpload();

  // Modal State
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    slug: "",
    overview: "",
    progress: 0,
    features: [],
    galleryUrls: [],
  });

  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const openAddModal = () => {
    setEditingIndex(null);
    setFormData({
      name: "",
      slug: "",
      overview: "",
      progress: 0,
      features: [""],
      galleryUrls: [],
    });
    setNewGalleryFiles([]);
    setNewGalleryPreviews([]);
    setIsModalOpen(true);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    const p = projects[index];
    setFormData({
      name: p.name,
      slug: p.slug,
      overview: p.overview,
      progress: p.progress,
      features: p.features?.length ? [...p.features] : [""],
      galleryUrls: p.galleryUrls ? [...p.galleryUrls] : [],
    });
    setNewGalleryFiles([]);
    setNewGalleryPreviews([]);
    setIsModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name, slug });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...(formData.features || []), ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles = files.filter((f) => f.size <= 5 * 1024 * 1024);
      if (validFiles.length < files.length) {
        toast.error("Some files exceed the 5MB limit");
      }
      setNewGalleryFiles((prev) => [...prev, ...validFiles]);

      const previews = validFiles.map((f) => URL.createObjectURL(f));
      setNewGalleryPreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeExistingGalleryImage = (index: number) => {
    const newGallery = [...(formData.galleryUrls || [])];
    newGallery.splice(index, 1);
    setFormData({ ...formData, galleryUrls: newGallery });
  };

  const removeNewGalleryImage = (index: number) => {
    const newFiles = [...newGalleryFiles];
    newFiles.splice(index, 1);
    setNewGalleryFiles(newFiles);

    const newPreviews = [...newGalleryPreviews];
    newPreviews.splice(index, 1);
    setNewGalleryPreviews(newPreviews);
  };

  const confirmDelete = (index: number) => {
    setDeleteTargetIndex(index);
  };

  const deleteProject = async () => {
    if (deleteTargetIndex === null) return;

    setIsDeleting(true);
    const newProjects = [...projects];
    newProjects.splice(deleteTargetIndex, 1);

    const loadingToast = toast.loading("Deleting project...");
    try {
      const res = await updateConcernBySlugAdmin(initialData.slug, {
        projects: newProjects,
      });
      if (res.success) {
        setProjects(newProjects);
        toast.success("Project deleted successfully", { id: loadingToast });
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete project", {
        id: loadingToast,
      });
    } finally {
      setIsDeleting(false);
      setDeleteTargetIndex(null);
    }
  };

  const saveProject = async () => {
    if (!formData.name || !formData.slug || !formData.overview) {
      toast.error("Please fill required fields (Name, Slug, Overview)");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Saving project...");

    try {
      let uploadedGallery = formData.galleryUrls || [];

      if (newGalleryFiles.length > 0) {
        toast.loading("Uploading gallery images...", { id: loadingToast });
        const res = await uploadMultiple(newGalleryFiles, true);
        if (res && res.length > 0) {
          uploadedGallery = [...uploadedGallery, ...res];
        }
      }

      const cleanedFeatures =
        formData.features?.filter((f) => f.trim() !== "") || [];

      const newProject: Project = {
        name: formData.name!,
        slug: formData.slug!,
        overview: formData.overview!,
        progress: formData.progress || 0,
        features: cleanedFeatures,
        galleryUrls: uploadedGallery,
      };

      const newProjectsList = [...projects];
      if (editingIndex !== null) {
        newProjectsList[editingIndex] = newProject;
      } else {
        newProjectsList.push(newProject);
      }

      toast.loading("Updating concern...", { id: loadingToast });
      const res = await updateConcernBySlugAdmin(initialData.slug, {
        projects: newProjectsList,
      });

      if (res.success) {
        setProjects(newProjectsList);
        setIsModalOpen(false);
        toast.success("Project saved successfully", { id: loadingToast });
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/concerns"
            className="p-2 glass-panel text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
            <p className="text-sm text-gray-400 mt-1">
              Concern:{" "}
              <span className="text-white font-medium">{initialData.name}</span>
            </p>
          </div>
        </div>
        <button
          onClick={openAddModal}
          className="glass-btn flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
          <ImageIcon className="w-12 h-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            No Projects Found
          </h3>
          <p className="text-gray-400 mb-6">
            This concern currently has no projects associated with it.
          </p>
          <button
            onClick={openAddModal}
            className="glass-btn flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="glass-panel p-6 flex flex-col group">
              <div className="flex justify-between items-start gap-3 mb-4">
                <h3 className="text-xl font-bold text-white leading-tight break-words">
                  {project.name}
                </h3>
                <span className="px-2 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded whitespace-nowrap shrink-0">
                  {project.progress}% Complete
                </span>
              </div>
              <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                {project.overview}
              </p>

              <div className="flex gap-2 text-xs text-gray-500 mb-6">
                <span className="px-2 py-1 bg-white/5 rounded">
                  {project.galleryUrls?.length || 0} Images
                </span>
                <span className="px-2 py-1 bg-white/5 rounded">
                  {project.features?.length || 0} Features
                </span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                <button
                  onClick={() => openEditModal(index)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 glass-btn text-blue-500 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => confirmDelete(index)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 glass-btn text-red-500 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
          <div className="glass-panel rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0 bg-white/5">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {editingIndex !== null ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Progress (%) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        progress: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Overview *
                </label>
                <textarea
                  required
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors h-24 resize-none"
                />
              </div>

              {/* Features Array */}
              <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Project Features (Text array)
                  </label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Feature
                  </button>
                </div>
                {formData.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      placeholder="E.g. 24/7 Security"
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <label className="text-sm font-medium text-gray-300 block">
                  Project Gallery Images
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Existing Images */}
                  {formData.galleryUrls?.map((img, idx) => (
                    <div
                      key={`exist-${idx}`}
                      className="relative aspect-video rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={img.url}
                        alt="Gallery"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => removeExistingGalleryImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* New Image Previews */}
                  {newGalleryPreviews.map((url, idx) => (
                    <div
                      key={`new-${idx}`}
                      className="relative aspect-video rounded-lg overflow-hidden group border-2 border-amber-500/50"
                    >
                      <Image
                        src={url}
                        alt="New Gallery"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-amber-500/80 text-white text-[10px] text-center py-0.5">
                        New
                      </span>
                      <button
                        onClick={() => removeNewGalleryImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Upload Button */}
                  <div className="relative aspect-video rounded-lg border-2 border-dashed border-white/20 hover:border-purple-500 transition-colors flex flex-col items-center justify-center text-gray-400 hover:text-white group">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <UploadCloud className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">Add Images</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-6 border-t border-white/10 shrink-0 bg-white/5">
              <div />
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-red-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  disabled={isSubmitting}
                  className="glass-btn flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteTargetIndex !== null}
        onClose={() => setDeleteTargetIndex(null)}
        onConfirm={deleteProject}
        isLoading={isDeleting}
        title="Delete Project"
        description="Are you sure you want to delete this project? This will remove all associated gallery images."
      />
    </div>
  );
}
