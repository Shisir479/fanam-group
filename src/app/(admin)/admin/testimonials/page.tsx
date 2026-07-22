import { constructMetadata } from "@/lib/metadata";
import AdminTestimonialListClient from "@/components/admin/testimonials/AdminTestimonialListClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminTestimonialsPage() {
  return <AdminTestimonialListClient />;
}
