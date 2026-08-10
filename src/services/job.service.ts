import { api } from "@/lib/api";

export const getJobsPublic = async (category?: string) => {
  try {
    const query = category && category !== "All Categories" ? `?category=${category}` : "";
    return await api(`/jobs${query}`, { method: "GET" });
  } catch (error) {
    return { data: null };
  }
};

export const getJobById = async (id: string) => {
  try {
    return await api(`/jobs/${id}`, { method: "GET" });
  } catch (error) {
    return { data: null };
  }
};

export const getJobsAdmin = async () => {
  try {
    return await api("/admin/jobs", { method: "GET" });
  } catch (error) {
    return { data: null };
  }
};

export const createJobAdmin = async (payload: any) => {
  try {
    return await api("/admin/jobs", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteJobAdmin = async (id: string) => {
  try {
    return await api(`/admin/jobs/${id}`, { method: "DELETE" });
  } catch (error) {
    throw error;
  }
};

export const updateJobAdmin = async (id: string, payload: any) => {
  try {
    return await api(`/admin/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw error;
  }
};

