import { FaqClient } from "@/components/faq/FaqClient";
import { constructMetadata } from "@/lib/metadata";
import { faqService, FAQ } from "@/services/faq.service";

export async function generateMetadata() {
  return constructMetadata({
    title: "FAQ",
    description: "Frequently Asked Questions about our services and programs.",
  });
}

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  let faqs: FAQ[] = [];
  try {
    const res = await faqService.getAll();
    if (res.success && res.data) {
      // Only pass active FAQs to the public page
      faqs = res.data.filter((f: FAQ) => f.isActive);
    }
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
  }

  return <FaqClient initialFaqs={faqs} />;
}
