import CreateNewsEventsClient from "@/components/admin/news-events/CreateNewsEventsClient";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Create News/Event - Admin Dashboard",
  noIndex: true,
});

export default async function CreateNewsEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  return (
    <CreateNewsEventsClient
      initialType={resolvedParams.type === "events" ? "events" : "news"}
    />
  );
}
