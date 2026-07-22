import { constructMetadata } from "@/lib/metadata";
import CreateTestimonialClient from "@/components/admin/testimonials/CreateTestimonialClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function CreateTestimonialPage() {
  return <CreateTestimonialClient />;
}
