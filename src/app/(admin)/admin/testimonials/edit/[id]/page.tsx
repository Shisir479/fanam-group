import { constructMetadata } from "@/lib/metadata";
import EditTestimonialClient from "@/components/admin/testimonials/EditTestimonialClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function EditTestimonialPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  return <EditTestimonialClient id={params.id} />;
}
