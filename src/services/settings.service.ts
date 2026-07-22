import { api } from "@/lib/api";

export const getBrandingSettingsPublic = async () => {
  return api("/settings/branding");
};

export const getBrandingSettingsAdmin = async () => {
  return api("/admin/settings/branding");
};

export const updateBrandingSettingsAdmin = async (id: string, data: any) => {
  return api(`/admin/settings/branding/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
