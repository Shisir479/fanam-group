import { api } from "@/lib/api";

export interface ServiceType {
  _id?: string;
  name: string;
  slug: string;
  heading: string;
  shortDescription: string;
  description: string;
  category: "Residential Properties" | "Commercial Spaces" | "Interior Design" | "Property Management" | "Construction" | "Architecture" | "Other" | string;
  icon?: string;
  sortOrder?: number;
  featured?: boolean;
  status: "active" | "inactive";
  metaTitle: string;
  metaDescription: string;
  image?: { _id: string; url: string };
  gallery?: { _id: string; url: string }[];
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================================
// ADMIN API SERVICES
// ==========================================================

export const createServiceByAdmin = async (payload: any) => {
  return await api("/admin/services", { method: "POST", body: JSON.stringify(payload) });
};

export const getServicesByAdmin = async (params: any = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return await api(`/admin/services?${queryString}`, { method: "GET" });
};

export const getServiceBySlugAdmin = async (slug: string) => {
  return await api(`/admin/services/${slug}`, { method: "GET" });
};

export const updateServiceBySlugAdmin = async (slug: string, payload: any) => {
  return await api(`/admin/services/${slug}`, { method: "PUT", body: JSON.stringify(payload) });
};

export const deleteServiceBySlugAdmin = async (slug: string) => {
  return await api(`/admin/services/${slug}`, { method: "DELETE" });
};

// ==========================================================
// PUBLIC API SERVICES
// ==========================================================

export const getServicesPublic = async (params: any = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return await api(`/services?${queryString}`, { method: "GET" });
};

export const getServiceBySlugPublic = async (slug: string) => {
  return await api(`/services/${slug}`, { method: "GET" });
};
