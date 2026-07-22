import { constructMetadata } from "@/lib/metadata";
import CreateProjectClient from "@/components/project/CreateProjectClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function CreateProjectPage() {
  return <CreateProjectClient />;
}
