import type { ImageLoaderProps } from "next/image";

const CLOUDINARY_UPLOAD_PATH = "/image/upload/";

export const isCloudinaryImage = (src: string) =>
  src.startsWith("https://res.cloudinary.com/") &&
  src.includes(CLOUDINARY_UPLOAD_PATH);

export const cloudinaryImageLoader = ({
  src,
  width,
}: ImageLoaderProps) =>
  src.replace(
    CLOUDINARY_UPLOAD_PATH,
    `${CLOUDINARY_UPLOAD_PATH}f_auto,q_auto,w_${width},c_limit/`,
  );
