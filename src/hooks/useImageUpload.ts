import { useState } from "react";
import {
  uploadSingleImage,
  uploadMultipleImages,
} from "@/services/upload.service";
import toast from "react-hot-toast";

type ImageData = { _id: string; url: string };

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadSingle = async (
    file: File,
    hideToast = false,
  ): Promise<ImageData | null> => {
    setIsUploading(true);
    try {
      const res = await uploadSingleImage(file);
      if (res.success && res.data) {
        const imageData = Array.isArray(res.data)
          ? res.data[0]
          : (res.data as any);
        if (imageData) {
          if (!hideToast) toast.success("Image uploaded successfully");
          return imageData;
        }
      }
      throw new Error("Invalid response from server");
    } catch (error: any) {
      if (!hideToast) toast.error(error.message || "Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultiple = async (
    files: File[],
    hideToast = false,
  ): Promise<ImageData[] | null> => {
    setIsUploading(true);
    try {
      const res = await uploadMultipleImages(files);
      if (res.success && res.data) {
        if (!hideToast) toast.success("Images uploaded successfully");
        return Array.isArray(res.data) ? res.data : [res.data as any];
      }
      throw new Error("Invalid response from server");
    } catch (error: any) {
      if (!hideToast) toast.error(error.message || "Failed to upload images");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadSingle,
    uploadMultiple,
  };
}
