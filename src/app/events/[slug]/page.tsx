import { getEventBySlugPublic } from "@/services/event.service";
import { constructMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import EventDetailsClient from "./EventDetailsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const res = await getEventBySlugPublic(slug);
    if (res.success && res.data) {
      return constructMetadata({
        title: `${res.data.metaTitle || res.data.title} - Fanam Group`,
        description: res.data.metaDescription || res.data.excerpt,
        image: res.data.cover?.url,
      });
    }
  } catch (e) {}

  return constructMetadata({ title: "Event Details" });
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let event = null;

  try {
    const res = await getEventBySlugPublic(slug);
    if (res.success) {
      event = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch event details:", error);
  }

  if (!event || event.status !== "published") {
    notFound();
  }

  return <EventDetailsClient event={event} />;
}
