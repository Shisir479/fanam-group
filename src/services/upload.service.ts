import { api } from "@/lib/api";

export const uploadSingleImage = async (
  file: File
): Promise<{ success: boolean; data: Array<{ _id: string; url: string }> }> => {
  const formData = new FormData();
  formData.append("images", file);

  const res = await api("/admin/products/upload-images", {
    method: "POST",
    body: formData,
  });

  return res as any;
};

export const uploadMultipleImages = async (
  files: File[]
): Promise<{ success: boolean; data: Array<{ _id: string; url: string }> }> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api("/admin/products/upload-images", {
    method: "POST",
    body: formData,
  });

  return res as any;
};
