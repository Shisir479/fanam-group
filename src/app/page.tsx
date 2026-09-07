import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ConcernsSection } from "@/components/home/ConcernsSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { LatestNews } from "@/components/home/LatestNews";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { MetricsBar } from "@/components/home/MetricsBar";
import { getHomepageCMSPublic } from "@/services/homepage-cms.service";
import { getBlogsPublic } from "@/services/blog.service";
import { getBrandingSettingsPublic } from "@/services/settings.service";

export default async function Home() {
  let cmsData: any = null;
  let blogsData: any[] = [];
  let brandingData: any = null;

  try {
    const res = await getHomepageCMSPublic();
    if (res?.success) {
      cmsData = res.data;
    }

    const blogsRes = await getBlogsPublic({ status: "active", limit: 4 });
    if (blogsRes?.success) {
      blogsData = blogsRes.data || [];
    }

    const brandingRes = await getBrandingSettingsPublic();
    if (brandingRes?.success) {
      brandingData = brandingRes.data;
    }
  } catch (error) {
    // fallback
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={cmsData} />
      <MetricsBar />
      <AboutSection />
      <ConcernsSection />
      <AchievementsSection />
      <PartnersSection />
      <TestimonialSection />
      <InquiryCTA />
      <LatestNews blogs={blogsData} />
    </div>
  );
}
