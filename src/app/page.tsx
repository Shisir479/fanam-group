import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { CompanyOverview } from "@/components/home/CompanyOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OurAchievements } from "@/components/home/OurAchievements";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { LatestNews } from "@/components/home/LatestNews";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { ContactInfo } from "@/components/home/ContactInfo";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { getHomepageCMSPublic } from "@/services/homepage-cms.service";
import { getServicesPublic } from "@/services/service.service";

export default async function Home() {
  let cmsData: any = null;
  let servicesData: any[] = [];
  try {
    const res = await getHomepageCMSPublic();
    if (res?.success) {
      cmsData = res.data;
    }
    
    // Fetch dynamic services
    const servicesRes = await getServicesPublic({ status: "active", limit: 4 });
    if (servicesRes?.success) {
      servicesData = servicesRes.data || [];
    }
  } catch (error) {
    // fallback
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={cmsData} />
      <AboutSection />
      <FeaturedProjects />
      <CompanyOverview />
      <WhyChooseUs data={cmsData} />
      <OurAchievements data={cmsData} />
      <FeaturedServices services={servicesData} />
      <TestimonialSection />
      <GalleryPreview data={cmsData} />
      <LatestNews />
      <InquiryCTA />
      <ContactInfo />
    </div>
  );
}
