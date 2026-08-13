import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  image,
  icons,
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    ...(title && { title }),
    ...(description && { description }),
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: "summary_large_image",
      ...(title && { title }),
      ...(description && { description }),
      ...(image && { images: [image] }),
    },
    ...(icons && { icons }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
