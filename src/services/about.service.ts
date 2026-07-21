import { api } from "@/lib/api";

export const getAboutAdmin = async () => {
  try {
    return await api("/admin/about", { method: "GET" });
  } catch (error) {
    return { data: null };
  }
};

export const updateAboutAdmin = async (payload: any) => {
  try {
    return await api("/admin/about", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error: any) {
    if (error.status === 404) {
      return await api("/admin/about", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    throw error;
  }
};

export const getAboutPublic = async () => {
  try {
    return await api("/about", {
      method: "GET",
    });
  } catch (error) {
    return { data: null };
  }
};
