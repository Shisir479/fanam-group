import { api } from "@/lib/api";
import { revalidatePage } from "@/app/actions";

export interface Event {
  _id: string;
  title: string;
  slug: string;
  cover: { _id: string; url: string };
  excerpt?: string;
  description: string;
  eventDate: string;
  eventLocation: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------- Admin API ---------------- //

export const getEventsByAdmin = async (params: { page?: number; limit?: number; search?: string } = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.search) query.append("search", params.search);

  return api(`/admin/events?${query.toString()}`);
};

export const getEventByIdByAdmin = async (id: string) => {
  return api(`/admin/events/${id}`);
};

export const createEventByAdmin = async (data: Partial<Event>) => {
  const res = await api("/admin/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const updateEventByAdmin = async (id: string, data: Partial<Event>) => {
  const res = await api(`/admin/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const deleteEventByAdmin = async (id: string) => {
  const res = await api(`/admin/events/${id}`, {
    method: "DELETE",
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

// ---------------- Public API ---------------- //

export const getEventsPublic = async (params: { page?: number; limit?: number; search?: string } = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.search) query.append("search", params.search);

  return api(`/events?${query.toString()}`);
};

export const getEventBySlugPublic = async (slug: string) => {
  return api(`/events/${slug}`);
};
