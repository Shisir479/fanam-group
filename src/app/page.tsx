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
import { getConcernsPublic } from "@/services/concern.service";
import { getAboutPublic } from "@/services/about.service";

export default async function Home() {
  let cmsData: any = null;
  let blogsData: any[] = [];
  let brandingData: any = null;
  let mainSettingsData: any = null;
  let homeSettingsData: any = null;
  let apiConcerns: any[] = [];
  let aboutData: any = null;

  try {
    const [
      cmsRes,
      blogsRes,
      brandingRes,
      mainSettingsRes,
      homeSettingsRes,
      concernsRes,
      aboutRes,
    ] = await Promise.all([
      getHomepageCMSPublic(),
      getBlogsPublic({ status: "active", limit: 4 }),
      getBrandingSettingsPublic(),
      getMainSettingsPublic(),
      getHomeSettingsPublic(),
      getConcernsPublic(),
      getAboutPublic(),
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

    if (concernsRes?.success) {
      apiConcerns = concernsRes.data || [];
    }

    if (aboutRes?.success) {
      aboutData = aboutRes.data;
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
      <AboutSection
        cmsData={cmsData}
        mainSettings={mainSettingsData}
        aboutData={aboutData}
      />
      <ConcernsSection
        cmsData={cmsData}
        branding={brandingData}
        apiConcerns={apiConcerns}
      />
      <AchievementsSection cmsData={cmsData} />
      <TestimonialSection />
      <LatestNews blogs={blogsData} />
      <InquiryCTA mainSettings={mainSettingsData} branding={brandingData} />
      <PartnersSection cmsData={cmsData} />
    </div>
  );
}
