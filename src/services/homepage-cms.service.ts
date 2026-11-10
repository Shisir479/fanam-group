import { revalidateGlobalCache, revalidatePage } from "@/app/actions";
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
    const res = await api("/admin/homepage-cms", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    await revalidateGlobalCache("homepage-cms");
    await revalidatePage("/", "layout");
    return res;
  } catch (error: any) {
    if (error.status === 404) {
      const res = await api("/admin/homepage-cms", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await revalidateGlobalCache("homepage-cms");
      await revalidatePage("/", "layout");
      return res;
    }
    throw error;
  }
};

export const getHomepageCMSPublic = async () => {
  try {
    return await api("/homepage-cms", {
      method: "GET",
      auth: false,
      next: { revalidate: 60, tags: ["homepage-cms"] },
    });
  } catch (error) {
    return { data: null };
  }
};
