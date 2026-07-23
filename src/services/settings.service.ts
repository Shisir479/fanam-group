import { api } from "@/lib/api";
import { revalidatePage } from "@/app/actions";

export const getBrandingSettingsPublic = async () => {
  return api("/settings/branding");
};

export const getBrandingSettingsAdmin = async () => {
  return api("/admin/settings/branding");
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
