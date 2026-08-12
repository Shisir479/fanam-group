import { getNewsPublic } from "@/services/news.service";
import { getEventsPublic } from "@/services/event.service";
import { constructMetadata } from "@/lib/metadata";
import NewsEventsClient from "./NewsEventsClient";

export const metadata = constructMetadata({
  title: "News & Events - Fanam Group",
  description:
    "Stay updated with the latest news, announcements, and upcoming events from Fanam Group.",
});

export default async function NewsEventsPage() {
  let initialNews = [];
  let initialEvents = [];

  try {
    const [newsRes, eventsRes] = await Promise.all([
      getNewsPublic({ limit: 100 }),
      getEventsPublic({ limit: 100 }),
    ]);

    if (newsRes.success) initialNews = newsRes.data;
    if (eventsRes.success) initialEvents = eventsRes.data;
  } catch (error) {
    console.error("Failed to fetch news and events:", error);
  }

  return (
    <NewsEventsClient initialNews={initialNews} initialEvents={initialEvents} />
  );
}
