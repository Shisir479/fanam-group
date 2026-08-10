import { getConcernBySlugPublic } from "@/services/concern.service";

import { constructMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import ConcernDetailsClient from "./ConcernDetailsClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const res = await getConcernBySlugPublic(slug);
    if (res.success && res.data) {
      return constructMetadata({
        title: `${res.data.name} - Fanam Group`,
        description: res.data.shortDescription,
        image: res.data.heroImage?.url,
      });
    }
  } catch (e) {}
  
  return constructMetadata({ title: "Concern Details" });
}

export default async function ConcernDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let concern = null;

  try {
    const res = await getConcernBySlugPublic(slug);
    if (res.success) {
      concern = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch concern details:", error);
  }

  if (!concern) {
    notFound();
  }

  return <ConcernDetailsClient concern={concern} />;
}
