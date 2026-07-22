import { revalidatePage } from "@/app/actions";
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
    const res = await api("/admin/about", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    await revalidatePage("/about", "layout");
    return res;
  } catch (error: any) {
    if (error.status === 404) {
      const res = await api("/admin/about", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await revalidatePage("/about", "layout");
      return res;
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
