import { constructMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyProfile } from "@/components/about/CompanyProfile";
import { ChairmanMessage } from "@/components/about/ChairmanMessage";
import { ManagingDirectors } from "@/components/about/ManagingDirectors";
import { VisionMission } from "@/components/about/VisionMission";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { KeyMilestones } from "@/components/about/KeyMilestones";
import { CompanyHistory } from "@/components/about/CompanyHistory";
import { AwardsRecognition } from "@/components/about/AwardsRecognition";
import { CoreValues } from "@/components/about/CoreValues";
import { OurGovernance } from "@/components/about/OurGovernance";
import { LeadershipProfiles } from "@/components/about/LeadershipProfiles";
import { OrganizationalOverview } from "@/components/about/OrganizationalOverview";

// Corporate specific additions
// Corporate Social Responsibility

import { getAboutPublic } from "@/services/about.service";
import { getBannerByPageAdmin } from "@/services/banner.service";
import { ConcernsSection } from "@/components/home/ConcernsSection";
import { OurAchievements } from "../../../temp_achievements";
import { ContactView } from "@/components/contact/ContactView";
import { ContactInfo } from "@/components/home/ContactInfo";

export async function generateMetadata() {
  const res = await getAboutPublic();
  const about = res?.data;

  return constructMetadata({
    title: about?.heroTitle
      ? `${about.heroTitle.replace(/<[^>]*>?/gm, " ").trim()} - Fanam Group`
      : "About Us - Fanam Group",
    description:
      about?.companyDescription ||
      "Learn about Fanam Group, our history, and our corporate values.",
  });
}

export default async function AboutUsPage() {
  const res = await getAboutPublic();
  const about = res?.data;
  const banner = await getBannerByPageAdmin("about");

  if (!about) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-500">
        <h1 className="text-2xl font-bold">About Page Content Not Available</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* 1. Page Banner (Unchanged as requested) */}
      <AboutHero data={about} banner={banner?.data || banner} />

      {/* 2. Group Profile (Who we are globally) */}
      <CompanyProfile data={about} />

      {/* 3. Chairman's Message (Tone from the top) */}
      <ChairmanMessage data={about} />

      {/* 3.5 Managing Directors (Below Chairman) */}
      <ManagingDirectors />

      {/* 4. Strategic Direction (Vision & Mission) */}
      <VisionMission data={about} />

      {/* 4.5 Why Choose Us (New Section) */}
      <WhyChooseUs />

      {/* 4.6 Key Milestones (New Section) */}
      <KeyMilestones />

      {/* 4.7 Corporate History & Philosophy */}
      <CompanyHistory data={about} />

      {/* 5. Core Principles (Values) */}
      <CoreValues data={about} />

      {/* 8. Awards & Recognition */}
      <AwardsRecognition />

      {/* 8.5 Our Governance */}
      <OurGovernance />

      {/* 9. Board of Directors / Leadership Team */}
      {/* <LeadershipProfiles data={about} /> */}
       <ContactInfo/>
      {/* 10. Organizational Structure */}
      {/* <OrganizationalOverview data={about} /> */}
    </main>
  );
}
