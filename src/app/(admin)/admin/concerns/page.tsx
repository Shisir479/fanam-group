import { constructMetadata } from "@/lib/metadata";
import { getConcernsByAdmin, ConcernType } from "@/services/concern.service";
import AdminConcernsListClient from "@/components/admin/concerns/AdminConcernsListClient";

export const metadata = constructMetadata({
  title: "Concerns Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminConcernsPage() {
  let concerns: ConcernType[] = [];

  try {
    const res = await getConcernsByAdmin();
    if (res.success) {
      concerns = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch concerns in SSR", error);
  }

  return (
    <AdminConcernsListClient
      initialConcerns={concerns}
    />
  );
}
