import { getNewsBySlugPublic } from "@/services/news.service";
import { constructMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import NewsDetailsClient from "./NewsDetailsClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const res = await getNewsBySlugPublic(slug);
    if (res.success && res.data) {
      return constructMetadata({
        title: `${res.data.metaTitle || res.data.title} - Fanam Group`,
        description: res.data.metaDescription || res.data.excerpt,
        image: res.data.cover?.url,
      });
    }
  } catch (e) {}
  
  return constructMetadata({ title: "News Details" });
}

export default async function NewsDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let news = null;

  try {
    const res = await getNewsBySlugPublic(slug);
    if (res.success) {
      news = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch news details:", error);
  }

  if (!news || news.status !== "published") {
    notFound();
  }

  return <NewsDetailsClient news={news} />;
}
