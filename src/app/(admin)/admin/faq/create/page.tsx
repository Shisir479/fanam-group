import { constructMetadata } from "@/lib/metadata";
import CreateFaqClient from "@/components/admin/faq/CreateFaqClient";

export const metadata = constructMetadata({
  title: "Add New FAQ - Admin Dashboard",
  noIndex: true,
});

export default function CreateFaqPage() {
  return <CreateFaqClient />;
}
