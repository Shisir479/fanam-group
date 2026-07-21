import { api } from "@/lib/api";

export const getHomepageCMSAdmin = async () => {
  try {
    return await api("/admin/homepage-cms", { method: "GET" });
  } catch (error) {
    return { data: null };
  }
};

export const updateHomepageCMS = async (payload: any) => {
  try {
    return await api("/admin/homepage-cms", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error: any) {
    if (error.status === 404) {
      return await api("/admin/homepage-cms", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    throw error;
  }
};

export const getHomepageCMSPublic = async () => {
  try {
    return await api("/homepage-cms", {
      method: "GET",
    });
  } catch (error) {
    return { data: null };
  }
};
