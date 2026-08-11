import { constructMetadata } from "@/lib/metadata";
import EventForm from "@/components/admin/events/EventForm";
import { getEventByIdByAdmin } from "@/services/event.service";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({ title: "Edit Event - Admin Dashboard", noIndex: true });

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let eventData = null;

  try {
    const res = await getEventByIdByAdmin(resolvedParams.id);
    if (res.success && res.data) {
      eventData = res.data;
    } else {
      redirect("/admin/news-events");
    }
  } catch (error) {
    redirect("/admin/news-events");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <EventForm initialData={eventData} />
    </div>
  );
}
