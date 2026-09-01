import { constructMetadata } from "@/lib/metadata";
import VisualSitemapClient from "@/components/sitemap/VisualSitemapClient";

import { getSitemapSettings } from "@/services/settings.service";

export const metadata = constructMetadata({
  title: "Visual Sitemap",
  description: "Explore the structure of Fanam Group's website.",
});

export default async function SitemapPage() {
  const res = await getSitemapSettings();
  const sitemapData = res.success ? res.data : [];

  return <VisualSitemapClient initialData={sitemapData} />;
}
