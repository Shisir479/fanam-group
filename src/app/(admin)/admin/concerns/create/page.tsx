import { constructMetadata } from "@/lib/metadata";
import CreateConcernClient from "@/components/admin/concerns/CreateConcernClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard - Create Concern",
  noIndex: true,
});

export default function CreateConcernPage() {
  return <CreateConcernClient />;
}
