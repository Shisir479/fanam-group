import { api } from "@/lib/api";

export const getApplicationsAdmin = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    let query = "";
    if (params) {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.append("page", String(params.page));
      if (params.limit) searchParams.append("limit", String(params.limit));
      if (Array.from(searchParams.keys()).length > 0) {
        query = `?${searchParams.toString()}`;
      }
    }
    return await api(`/admin/applications${query}`, { method: "GET" });
  } catch (error) {
    return { data: null };
  }
};

export const updateApplicationStatusAdmin = async (
  id: string,
  status: string,
) => {
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
