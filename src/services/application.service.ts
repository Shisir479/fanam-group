import { api } from "@/lib/api";

export const getApplicationsAdmin = async () => {
  try {
    return await api("/admin/applications", { method: "GET" });
  } catch (error) {
    return { data: null };
  }
};

export const updateApplicationStatusAdmin = async (id: string, status: string) => {
  try {
    return await api(`/admin/applications/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteApplicationAdmin = async (id: string) => {
  try {
    return await api(`/admin/applications/${id}`, { method: "DELETE" });
  } catch (error) {
    throw error;
  }
};

export const submitApplicationPublic = async (payload: any) => {
  try {
    return await api("/applications", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw error;
  }
};
