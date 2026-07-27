import { revalidatePage } from "@/app/actions";
import { api } from "@/lib/api";

export interface Project {
  _id?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  propertyType: string;
  status: string;
  featured: boolean;
  startingPrice: number;
  endingPrice: number;
  bookingMoney: number;
  location: {
    address: string;
    area: string;
    city: string;
    district: string;
    country: string;
    latitude?: number;
    longitude?: number;
    googleMap?: string;
  };
  overview: string;
  features: { title: string }[];
  amenities: { title: string; icon: string }[];

  highlights: {
    title: string;
  }[];

  flatInsights: {
    title: string;
  }[];

  utilities: {
    title: string;
  }[];

  pricingTerms: {
    title: string;
  }[];

  termsConditions: {
    title: string;
  }[];

  floorPlans: {
    title: string;
    size: number;
    unit: string;
    bedrooms: number;
    bathrooms: number;
    image?: { _id: string; url: string };
  }[];
  video: string;
  cover?: { _id: string; url: string };
  banner?: { _id: string; url: string };
  gallery?: { _id: string; url: string }[];
  brochure?: { _id: string; url: string };
  construction: {
    startedAt?: string;
    completionDate?: string;
    percentage: number;
  };
  contactTitle: string;
  contactDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  views?: number;
  priority: number;
  publishStatus: "active" | "inactive";
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  faqs?: { question: string; answer: string }[];
}

// ==========================================================
// ADMIN API SERVICES
// ==========================================================

export const createProjectByAdmin = async (payload: any) => {
  const res = await api("/admin/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  await revalidatePage("/", "layout");
  return res;
};

export const getProjectsByAdmin = async (params: any = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return await api(`/admin/projects?${queryString}`, { method: "GET" });
};

export const getProjectStats = async () => {
  return await api("/admin/projects/stats", { method: "GET" });
};

export const getAllProjectsByAdmin = async () => {
  return await api("/admin/projects/all", { method: "GET" });
};

export const getProjectBySlugAdmin = async (slug: string) => {
  return await api(`/admin/projects/${slug}`, { method: "GET" });
};

export const updateProjectBySlugAdmin = async (slug: string, payload: any) => {
  const res = await api(`/admin/projects/${slug}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  await revalidatePage("/projects", "layout");
  return res;
};

export const deleteProjectBySlugAdmin = async (slug: string) => {
  const res = await api(`/admin/projects/${slug}`, { method: "DELETE" });
  await revalidatePage("/", "layout");
  return res;
};

// ==========================================================
// PUBLIC API SERVICES
// ==========================================================

export const getProjectsPublic = async (params: any = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return await api(`/projects?${queryString}`, { method: "GET" });
};

export const getFeaturedProjects = async () => {
  return await api("/projects/featured", { method: "GET" });
};

export const getLatestProjects = async () => {
  return await api("/projects/latest", { method: "GET" });
};

export const getSimilarProjects = async (slug: string) => {
  return await api(`/projects/${slug}/similar`, { method: "GET" });
};

export const getProjectBySlugPublic = async (slug: string) => {
  return await api(`/projects/${slug}`, { method: "GET" });
};
