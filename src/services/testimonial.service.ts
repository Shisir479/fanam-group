import { revalidatePage } from "@/app/actions";
import { api } from "@/lib/api";

export interface TestimonialType {
  _id?: string;
  title: string;
  name: string;
  designation?: string;
  company?: string;
  review: string;
  rating: number;
  featured?: boolean;
  sortOrder?: number;
  status: "active" | "inactive";
  image?: {
    _id: string;
    url: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================================
// ADMIN API SERVICES
// ==========================================================

export const createTestimonialByAdmin = async (payload: any) => {
  const res = await api("/admin/testimonials", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  await revalidatePage("/", "layout");
  return res;
};

export const getTestimonialsByAdmin = async (
  page = 1,
  limit = 10,
  search = "",
) => {
  return await api(
    `/admin/testimonials?page=${page}&limit=${limit}&search=${search}`,
    { method: "GET" },
  );
};

export const getTestimonialByIdAdmin = async (id: string) => {
  return await api(`/admin/testimonials/${id}`, { method: "GET" });
};

export const updateTestimonialByIdAdmin = async (id: string, payload: any) => {
  const res = await api(`/admin/testimonials/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  await revalidatePage("/", "layout");
  return res;
};

export const deleteTestimonialByIdAdmin = async (id: string) => {
  const res = await api(`/admin/testimonials/${id}`, { method: "DELETE" });
  await revalidatePage("/", "layout");
  return res;
};

// ==========================================================
// PUBLIC API SERVICES
// ==========================================================

export const getTestimonialsPublic = async () => {
  return await api(`/testimonials`, { method: "GET" });
};
