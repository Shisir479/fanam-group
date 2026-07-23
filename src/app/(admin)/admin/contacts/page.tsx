import { constructMetadata } from "@/lib/metadata";
import { getContactsByAdmin, Contact } from "@/services/contact.service";
import AdminContactsClient from "@/components/admin/contacts/AdminContactsClient";

export const metadata = constructMetadata({
  title: "Contacts Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";

  let contacts: Contact[] = [];
  let totalPages = 1;

  try {
    const res = await getContactsByAdmin({ page, search, limit: 10 });
    if (res.success) {
      contacts = res.data;
      totalPages = res.count;
    }
  } catch (error) {
    console.error("Failed to fetch contacts in SSR", error);
  }

  return (
    <AdminContactsClient
      initialContacts={contacts}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
    />
  );
}
