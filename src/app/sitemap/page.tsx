import { constructMetadata } from "@/lib/metadata";
import VisualSitemapClient from "@/components/sitemap/VisualSitemapClient";

export const metadata = constructMetadata({
  title: "Visual Sitemap",
  description: "Explore the structure of Fanam Group's website.",
});

export default function SitemapPage() {
  return <VisualSitemapClient />;
}
