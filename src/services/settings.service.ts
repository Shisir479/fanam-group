import { api } from "@/lib/api";
import { revalidatePage } from "@/app/actions";

export const getBrandingSettingsPublic = async () => {
  return api("/settings/branding");
};

export const getBrandingSettingsAdmin = async () => {
  return api("/admin/settings/branding");
};

export interface SitemapItem {
  name: string;
  href: string;
  icon: string;
}

export interface SitemapCategory {
  title: string;
  items: SitemapItem[];
}

export const updateSitemapSettingsAdmin = async (
  sitemap: SitemapCategory[],
) => {
  const res = await api("/admin/settings/sitemap", {
    method: "PUT",
    body: JSON.stringify({ sitemap }),
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const getSitemapSettings = async () => {
  return api("/settings/sitemap");
};

export const updateBrandingSettingsAdmin = async (id: string, data: any) => {
  const res = await api(`/admin/settings/branding/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const getMainSettingsPublic = async () => {
  return api("/settings/main");
};

export const getMainSettingsAdmin = async () => {
  return api("/admin/settings/main");
};

export const updateMainSettingsAdmin = async (id: string, data: any) => {
  const res = await api(`/admin/settings/main/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (res && res.success !== false) {
    await revalidatePage("/", "layout");
  }
  return res;
};

export const getHomeSettingsPublic = async () => {
  return api("/settings/home");
};

export const getHomeSettingsAdmin = async () => {
  return api("/admin/settings/home");
};
