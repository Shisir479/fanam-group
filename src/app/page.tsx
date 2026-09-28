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
import {
  getBrandingSettingsPublic,
  getMainSettingsPublic,
  getHomeSettingsPublic,
} from "@/services/settings.service";

export default async function Home() {
  let cmsData: any = null;
  let blogsData: any[] = [];
  let brandingData: any = null;
  let mainSettingsData: any = null;
  let homeSettingsData: any = null;

  try {
    const [cmsRes, blogsRes, brandingRes, mainSettingsRes, homeSettingsRes] =
      await Promise.all([
        getHomepageCMSPublic(),
        getBlogsPublic({ status: "active", limit: 4 }),
        getBrandingSettingsPublic(),
        getMainSettingsPublic(),
        getHomeSettingsPublic(),
      ]);

    if (cmsRes?.success) {
      cmsData = cmsRes.data;
    }

    if (blogsRes?.success) {
      blogsData = blogsRes.data || [];
    }

    if (brandingRes?.success) {
      brandingData = brandingRes.data;
    }

    if (mainSettingsRes?.success) {
      mainSettingsData = mainSettingsRes.data;
    }

    if (homeSettingsRes?.success) {
      homeSettingsData = homeSettingsRes.data;
    }
  } catch (error) {
    // fallback
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        cmsData={cmsData}
        homeSettings={homeSettingsData}
        mainSettings={mainSettingsData}
        branding={brandingData}
      />
      {/* <MetricsBar 
        cmsData={cmsData} 
        mainSettings={mainSettingsData}
      /> */}
      <AboutSection cmsData={cmsData} mainSettings={mainSettingsData} />
      <ConcernsSection cmsData={cmsData} branding={brandingData} />
      <AchievementsSection cmsData={cmsData} mainSettings={mainSettingsData} />
      <PartnersSection cmsData={cmsData} />
      <TestimonialSection />
      <InquiryCTA mainSettings={mainSettingsData} branding={brandingData} />
      <LatestNews blogs={blogsData} />
    </div>
  );
}
