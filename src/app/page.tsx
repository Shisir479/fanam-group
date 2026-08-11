import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { LatestNews } from "@/components/home/LatestNews";
import { ContactInfo } from "@/components/home/ContactInfo";
import { getHomepageCMSPublic } from "@/services/homepage-cms.service";
// import { getServicesPublic } from "@/services/service.service";
import { getBlogsPublic } from "@/services/blog.service";
import { getBrandingSettingsPublic } from "@/services/settings.service";
import { getProjectsPublic } from "@/services/project.service";

export default async function Home() {
  let cmsData: any = null;
  let blogsData: any[] = [];
  let brandingData: any = null;
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
  } catch (error) {
    // fallback
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={cmsData} />
      <AboutSection />
      {/* <TestimonialSection /> */}
      <LatestNews blogs={blogsData} />
      <ContactInfo data={brandingData?.contact} />
    </div>
  );
}
