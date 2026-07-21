import { Metadata } from "next";
import CreateServiceClient from "@/components/admin/services/CreateServiceClient";

export const metadata: Metadata = {
  title: "Create Service | Bonedi Admin",
  description: "Create a new service.",
};

export default function CreateServicePage() {
  return <CreateServiceClient />;
}
