import { api } from "@/lib/api";
import { revalidatePage } from "@/app/actions";

export interface SeoSettings {
  _id?: string;
  platform: string;
  verificationId: string;
  metaTagContent: string;
  description: string;
  exampleCode: string;
  helpText: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const seoService = {
  getAll: async (
    params: { page?: number; limit?: number; search?: string } = {},
  ) => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.search) query.append("search", params.search);

    return api(`/admin/seo-settings?${query.toString()}`);
  },

  getByPlatform: async (platform: string) => {
    return api(`/admin/seo-settings/${platform}`);
  },

  create: async (data: Partial<SeoSettings>) => {
    const res = await api("/admin/seo-settings", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res && res.success !== false) {
      await revalidatePage("/", "layout");
    }
    return res;
  },

  update: async (id: string, data: Partial<SeoSettings>) => {
    const res = await api(`/admin/seo-settings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (res && res.success !== false) {
      await revalidatePage("/", "layout");
    }
    return res;
  },

  updateByPlatform: async (platform: string, data: Partial<SeoSettings>) => {
    const res = await api(`/admin/seo-settings/platform/${platform}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (res && res.success !== false) {
      await revalidatePage("/", "layout");
    }
    return res;
  },

  toggle: async (id: string) => {
    const res = await api(`/admin/seo-settings/toggle/${id}`, {
      method: "PATCH",
    });
    if (res && res.success !== false) {
      await revalidatePage("/", "layout");
    }
    return res;
  },

  delete: async (id: string) => {
    const res = await api(`/admin/seo-settings/${id}`, {
      method: "DELETE",
    });
    if (res && res.success !== false) {
      await revalidatePage("/", "layout");
    }
    return res;
  },

  getActiveMetaTags: async () => {
    return api("/seo/meta-tags");
  },
};
