import { createCrudService } from "./crud.service";
import { revalidateGlobalCache } from "@/app/actions";

export interface Gallery {
  _id: string;
  type: "image" | "video";
  cover?: {
    _id: string;
    url: string;
  };
  title: string;
  slug: string;
  description?: string;
  videoUrl?: string;
  thumbnail?: {
    _id: string;
    url: string;
  };
  featured: boolean;
  sortOrder: number;
  status: "active" | "inactive";
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryResponse {
  success: boolean;
  data: Gallery[];
  total: number;
  count: number;
  currentPage: number;
}

export interface SingleGalleryResponse {
  success: boolean;
  data: Gallery;
}

// ----------------------
// Admin Methods
// ----------------------

const adminGalleryCrud = createCrudService<Gallery, Partial<Gallery>, Partial<Gallery>>(
  "/admin/gallery",
);

export const getGalleriesByAdmin = (
  params?: Record<string, any>,
): Promise<GalleryResponse> => adminGalleryCrud.getAll(params) as Promise<GalleryResponse>;

export const getGalleryBySlugByAdmin = (
  slug: string,
): Promise<SingleGalleryResponse> => adminGalleryCrud.getByIdOrSlug(slug) as Promise<SingleGalleryResponse>;

export const createGalleryByAdmin = async (
  data: Partial<Gallery>,
): Promise<{ success: boolean; message: string; data?: Gallery }> => {
  const res = await adminGalleryCrud.create(data);
  if (res && res.success !== false) {
    await revalidateGlobalCache("gallery");
  }
  return res as { success: boolean; message: string; data?: Gallery };
};

export const updateGalleryByAdmin = async (
  slug: string,
  data: Partial<Gallery>,
): Promise<{ success: boolean; message: string; data?: Gallery }> => {
  const res = await adminGalleryCrud.update(slug, data);
  if (res && res.success !== false) {
    await revalidateGlobalCache("gallery");
  }
  return res as { success: boolean; message: string; data?: Gallery };
};

export const deleteGalleryBySlugByAdmin = async (
  slug: string,
): Promise<{ success: boolean; message: string }> => {
  const res = await adminGalleryCrud.delete(slug);
  if (res && res.success !== false) {
    await revalidateGlobalCache("gallery");
  }
  return res as { success: boolean; message: string };
};

// ----------------------
// Public Methods
// ----------------------

const publicGalleryCrud = createCrudService<Gallery, Partial<Gallery>, Partial<Gallery>>(
  "/gallery",
);

export const getGalleriesPublic = (
  params?: Record<string, any>,
): Promise<GalleryResponse> => publicGalleryCrud.getAll(params) as Promise<GalleryResponse>;

export const getGalleryBySlugPublic = (
  slug: string,
): Promise<SingleGalleryResponse> => publicGalleryCrud.getByIdOrSlug(slug) as Promise<SingleGalleryResponse>;
