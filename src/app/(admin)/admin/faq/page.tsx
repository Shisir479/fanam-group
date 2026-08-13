import { constructMetadata } from "@/lib/metadata";
import { faqService, FAQ } from "@/services/faq.service";
import AdminFaqListClient from "@/components/admin/faq/AdminFaqListClient";

export const metadata = constructMetadata({
  title: "FAQ Management - Admin Dashboard",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  let faqs: FAQ[] = [];

  try {
    const res = await faqService.getAll();
    if (res.success) {
      faqs = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch FAQs in SSR", error);
  }

  return <AdminFaqListClient initialFaqs={faqs} />;
}
