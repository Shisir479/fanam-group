import { getConcernsPublic } from "@/services/concern.service";
import { getBannerByPageAdmin } from "@/services/banner.service";
import { PageBanner } from "@/components/ui/PageBanner";

import { constructMetadata } from "@/lib/metadata";
import ConcernsPortfolioClient from "@/components/admin/concerns/ConcernsPortfolioClient";

export const metadata = constructMetadata({
  title: "Our Ecosystem - Fanam Group Concerns",
  description: "Explore the diverse concerns of Fanam Group.",
});

export default async function ConcernsPortfolioPage() {
  let concerns = [];
  let banner = null;

  try {
    const res = await getConcernsPublic();
    if (res.success) {
      concerns = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch concerns:", error);
  }

  try {
    const res = await getBannerByPageAdmin("concern");
    if (res?.success) banner = res.data;
  } catch (error) {}

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <PageBanner
        title={banner?.title || "Our Ecosystem"}
        subtitle={banner?.eyebrowText || "Discover Our Companies"}
        bgImage={
          banner?.backgroundImage ||
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2070"
        }
        altText={banner?.title || "Our Ecosystem"}
      >
        {banner?.description && (
          <p className="text-white/90 text-sm md:text-lg max-w-2xl text-center font-medium leading-relaxed drop-shadow-md">
            {banner.description}
          </p>
        )}
      </PageBanner>
      <ConcernsPortfolioClient concerns={concerns} />
    </main>
  );
}
