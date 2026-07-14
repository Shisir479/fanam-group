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
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <FeaturedProjects />
      <CompanyOverview />
      <WhyChooseUs />
      <OurAchievements />
      <FeaturedServices />
      <TestimonialSection />
      <GalleryPreview />
      <LatestNews />
      <InquiryCTA />
      <ContactInfo />
    </div>
  );
}
