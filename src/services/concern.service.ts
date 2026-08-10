import { revalidatePage } from "@/app/actions";
import { api } from "@/lib/api";

export interface ConcernFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface Project {
  slug: string;
  name: string;
  overview: string;
  masterPlanUrl?: string;
  locationMapUrl?: string;
  features: string[];
  galleryUrls: { _id: string; url: string }[];
  progress?: number;
}

export interface ConcernType {
  _id?: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  websiteUrl: string;
  heroImage: { _id: string; url: string };
  features: ConcernFeature[];
  projects?: Project[];
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================================
// ADMIN API SERVICES
// ==========================================================

export const createConcernByAdmin = async (payload: any) => {
  const res = await api("/admin/concerns", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  await revalidatePage("/", "layout");
  return res;
};

export const getConcernsByAdmin = async () => {
  return await api(`/admin/concerns`, { method: "GET" });
};

export const getConcernBySlugAdmin = async (slug: string) => {
  return await api(`/admin/concerns/${slug}`, { method: "GET" });
};

export const updateConcernBySlugAdmin = async (slug: string, payload: any) => {
  const res = await api(`/admin/concerns/${slug}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  await revalidatePage("/", "layout");
  return res;
};

export const deleteConcernBySlugAdmin = async (slug: string) => {
  const res = await api(`/admin/concerns/${slug}`, { method: "DELETE" });
  await revalidatePage("/", "layout");
  return res;
};

// ==========================================================
// PUBLIC API SERVICES
// ==========================================================

export const getConcernsPublic = async () => {
  return await api(`/concerns`, { method: "GET" });
};

export const getConcernBySlugPublic = async (slug: string) => {
  return await api(`/concerns/${slug}`, { method: "GET" });
};
