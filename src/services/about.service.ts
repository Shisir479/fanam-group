import { revalidateGlobalCache, revalidatePage } from "@/app/actions";
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
    await revalidateGlobalCache("about");
    await revalidatePage("/about", "layout");
    await revalidatePage("/", "page");
    return res;
  } catch (error: any) {
    if (error.status === 404) {
      const res = await api("/admin/about", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await revalidateGlobalCache("about");
      await revalidatePage("/about", "layout");
      await revalidatePage("/", "page");
      return res;
    }
    throw error;
  }
};

export const getAboutPublic = async () => {
  try {
    return await api("/about", {
      method: "GET",
      auth: false,
      next: { revalidate: 60, tags: ["about"] },
    });
  } catch (error) {
    return { data: null };
  }
};
