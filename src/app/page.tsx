import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { VideoSection } from "@/components/home/VideoSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { ScheduleMeeting } from "@/components/home/ScheduleMeeting";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <FeaturedProjects />
      <TestimonialSection />
      <VideoSection />
      <ScheduleMeeting />
    </div>
  );
}
