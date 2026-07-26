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
// import { getServicesPublic } from "@/services/service.service";
import { getBlogsPublic } from "@/services/blog.service";
import { getBrandingSettingsPublic } from "@/services/settings.service";
import { getProjectsPublic } from "@/services/project.service";

export default async function Home() {
  let cmsData: any = null;
  let servicesData: any[] = [];
  let blogsData: any[] = [];
  let brandingData: any = null;
  let projectsData: any[] = [];
  try {
    const res = await getHomepageCMSPublic();
    if (res?.success) {
      cmsData = res.data;
    }

    // // Fetch dynamic services
    // const servicesRes = await getServicesPublic({ status: "active", limit: 4 });
    // if (servicesRes?.success) {
    //   servicesData = servicesRes.data || [];
    // }

    // Fetch dynamic blogs
    const blogsRes = await getBlogsPublic({ status: "active", limit: 3 });
    if (blogsRes?.success) {
      blogsData = blogsRes.data || [];
    }

    // Fetch branding data
    const brandingRes = await getBrandingSettingsPublic();
    if (brandingRes?.success) {
      brandingData = brandingRes.data;
    }

    // Fetch projects
    const projectsRes = await getProjectsPublic({ limit: 0 });
    if (projectsRes?.success) {
      projectsData = projectsRes.data || [];
    }
  } catch (error) {
    // fallback
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={cmsData} />
      <AboutSection />
      <FeaturedProjects initialProjects={projectsData} />
      <CompanyOverview data={cmsData} />
      <WhyChooseUs data={cmsData} />
      <OurAchievements data={cmsData} />
      {/* <FeaturedServices services={servicesData} /> */}
      {/* <TestimonialSection /> */}
      <GalleryPreview data={cmsData} />
      <LatestNews blogs={blogsData} />
      <InquiryCTA />
      <ContactInfo data={brandingData?.contact} />
    </div>
  );
}
