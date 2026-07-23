import { constructMetadata } from "@/lib/metadata";
import {
  getTestimonialsByAdmin,
  TestimonialType,
} from "@/services/testimonial.service";
import AdminTestimonialListClient from "@/components/admin/testimonials/AdminTestimonialListClient";

export const metadata = constructMetadata({
  title: "Testimonials Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";

  let testimonials: TestimonialType[] = [];
  let totalPages = 1;

  try {
    const res = await getTestimonialsByAdmin(page, 10, search);
    if (res.success) {
      testimonials = res.data;
      totalPages = res.count;
    }
  } catch (error) {
    console.error("Failed to fetch testimonials in SSR", error);
  }

  return (
    <AdminTestimonialListClient
      initialTestimonials={testimonials}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
    />
  );
}
