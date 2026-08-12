import { constructMetadata } from "@/lib/metadata";
import AdminNewsEventsClient from "@/components/admin/news-events/AdminNewsEventsClient";
import { getNewsByAdmin, News } from "@/services/news.service";
import { getEventsByAdmin, Event } from "@/services/event.service";

export const metadata = constructMetadata({
  title: "News & Events - Admin Dashboard",
  noIndex: true,
});

export default async function AdminNewsEventsPage() {
  let initialNews: News[] = [];
  let initialEvents: Event[] = [];

  try {
    const [newsRes, eventsRes] = await Promise.all([
      getNewsByAdmin({ limit: 0 }),
      getEventsByAdmin({ limit: 0 }),
    ]);

    if (newsRes?.success) initialNews = newsRes.data || [];
    if (eventsRes?.success) initialEvents = eventsRes.data || [];
  } catch (error) {
    console.error("Failed to fetch news/events in SSR", error);
  }

  return (
    <AdminNewsEventsClient
      initialNews={initialNews}
      initialEvents={initialEvents}
    />
  );
}
