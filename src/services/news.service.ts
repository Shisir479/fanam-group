import { api } from "@/lib/api";
import { revalidatePage } from "@/app/actions";

export interface News {
  _id: string;
  title: string;
  slug: string;
  cover: { _id: string; url: string };
  excerpt?: string;
  description: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  author?: string;
  publishDate?: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------- Admin API ---------------- //

export const getNewsByAdmin = async (params: { page?: number; limit?: number; search?: string } = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.search) query.append("search", params.search);

  return api(`/admin/news?${query.toString()}`);
};

export const getNewsByIdByAdmin = async (id: string) => {
  return api(`/admin/news/${id}`);
};

export const createNewsByAdmin = async (data: Partial<News>) => {
  const res = await api("/admin/news", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const updateNewsByAdmin = async (id: string, data: Partial<News>) => {
  const res = await api(`/admin/news/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const deleteNewsByAdmin = async (id: string) => {
  const res = await api(`/admin/news/${id}`, {
    method: "DELETE",
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

// ---------------- Public API ---------------- //

export const getNewsPublic = async (params: { page?: number; limit?: number; search?: string } = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.search) query.append("search", params.search);

  return api(`/news?${query.toString()}`);
};

export const getNewsBySlugPublic = async (slug: string) => {
  return api(`/news/${slug}`);
};
