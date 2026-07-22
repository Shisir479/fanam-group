import { constructMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyProfile } from "@/components/about/CompanyProfile";
import { ChairmanMessage } from "@/components/about/ChairmanMessage";
import { LeadershipProfiles } from "@/components/about/LeadershipProfiles";
import { VisionMission } from "@/components/about/VisionMission";
import { CoreValues } from "@/components/about/CoreValues";
import { CompanyHistory } from "@/components/about/CompanyHistory";
import { OrganizationalOverview } from "@/components/about/OrganizationalOverview";
import { getAboutPublic } from "@/services/about.service";
import { getBannerByPagePublic } from "@/services/banner.service";
export async function generateMetadata() {
  const res = await getAboutPublic();
  const about = res?.data;

  return constructMetadata({
    title: about?.heroTitle
      ? `${about.heroTitle.replace(/<[^>]*>?/gm, " ").trim()} - Bonedi Homes`
      : "About Us - Bonedi Homes",
    description:
      about?.companyDescription ||
      "Learn about Bonedi Homes, our history, and our values.",
  });
}

export default async function AboutUsPage() {
  const res = await getAboutPublic();
  const about = res?.data;
  const banner = await getBannerByPagePublic("about");
  console.log(banner)

  if (!about) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-500">
        <h1 className="text-2xl font-bold">About Page Content Not Available</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <AboutHero data={about} banner={banner?.data} />
      <CompanyProfile data={about} />
      <ChairmanMessage data={about} />
      <LeadershipProfiles data={about} />
      <VisionMission data={about} />
      <CoreValues data={about} />
      <CompanyHistory data={about} />
      <OrganizationalOverview data={about} />
    </main>
  );
}
