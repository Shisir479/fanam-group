import { constructMetadata } from "@/lib/metadata";
import CreatePageClient from "@/components/pages/CreatePageClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function CreatePagePage() {
  return <CreatePageClient />;
}
