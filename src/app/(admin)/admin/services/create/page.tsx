import { constructMetadata } from "@/lib/metadata";
import CreateServiceClient from "@/components/admin/services/CreateServiceClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function CreateServicePage() {
  return <CreateServiceClient />;
}
