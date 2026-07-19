import { AboutHero } from "@/components/about/AboutHero";
import { CompanyProfile } from "@/components/about/CompanyProfile";
import { ChairmanMessage } from "@/components/about/ChairmanMessage";
import { LeadershipProfiles } from "@/components/about/LeadershipProfiles";
import { VisionMission } from "@/components/about/VisionMission";
import { CoreValues } from "@/components/about/CoreValues";
import { CompanyHistory } from "@/components/about/CompanyHistory";
import { OrganizationalOverview } from "@/components/about/OrganizationalOverview";

export default function AboutUsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <AboutHero />
      <CompanyProfile />
      <ChairmanMessage />
      <LeadershipProfiles />
      <VisionMission />
      <CoreValues />
      <CompanyHistory />
      <OrganizationalOverview />
    </main>
  );
}
