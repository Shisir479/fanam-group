import { revalidateGlobalCache, revalidatePage } from "@/app/actions";
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
  websiteUrl?: string;
  features: string[];
  galleryUrls: { _id: string; url: string }[];
  progress?: "upcoming" | "ongoing" | "complete";
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
  metaTitle?: string;
  metaDescription?: string;
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
  await revalidateGlobalCache("concerns");
  await revalidatePage("/", "layout");
  return res;
};

export const getConcernsByAdmin = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  let query = "";
  if (params) {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", String(params.page));
    if (params.limit) searchParams.append("limit", String(params.limit));
    if (params.search) searchParams.append("search", params.search);
    if (Array.from(searchParams.keys()).length > 0) {
      query = `?${searchParams.toString()}`;
    }
  }
  return await api(`/admin/concerns${query}`, { method: "GET" });
};

export const getConcernBySlugAdmin = async (slug: string) => {
  return await api(`/admin/concerns/${slug}`, { method: "GET" });
};

export const updateConcernBySlugAdmin = async (slug: string, payload: any) => {
  const res = await api(`/admin/concerns/${slug}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  await revalidateGlobalCache("concerns");
  await revalidatePage("/", "layout");
  return res;
};

export const deleteConcernBySlugAdmin = async (slug: string) => {
  const res = await api(`/admin/concerns/${slug}`, { method: "DELETE" });
  await revalidateGlobalCache("concerns");
  await revalidatePage("/", "layout");
  return res;
};

// ==========================================================
// PUBLIC API SERVICES
// ==========================================================

export const getConcernsPublic = async () => {
  return await api(`/concerns`, {
    method: "GET",
    auth: false,
    next: { revalidate: 60, tags: ["concerns"] },
  });
};

export const getConcernBySlugPublic = async (slug: string) => {
  return await api(`/concerns/${slug}`, {
    method: "GET",
    auth: false,
    next: { revalidate: 60, tags: ["concerns"] },
  });
};
