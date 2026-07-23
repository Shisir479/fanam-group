import { api } from "@/lib/api";
import { revalidatePage } from "@/app/actions";

export interface BannerStat {
  _id?: string;
  value: string;
  label: string;
}

export interface Banner {
  _id?: string;
  page: string;
  eyebrowText: string;
  title: string;
  description: string;
  backgroundImage: string;
  stats?: BannerStat[];
}

export const getBannerByPageAdmin = async (page: string) => {
  const res = await api(`/banner/${page}`, { method: "GET" });
  // The backend currently returns the document directly instead of wrapping in { success, data }.
  // Normalize it here so all public pages correctly resolve it using res?.data.
  if (res && res._id && res.success === undefined) {
    return { success: true, data: res };
  }
  return res;
};

export const getBannerByPagePublic = getBannerByPageAdmin;

export const updateBannerByPageAdmin = async (
  page: string,
  data: Partial<Banner>,
) => {
  const res = await api(`/banner/${page}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  // Revalidate the entire site cache since banners affect multiple pages
  if (res?.success || res?._id) {
    await revalidatePage("/", "layout");
  }

  return res;
};
