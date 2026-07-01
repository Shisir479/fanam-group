import { ManagementTeam } from "@/components/about/our-team/ManagementTeam";
import Banner from "@/components/about/our-team/banner";
import DreamTeam from "@/components/about/our-team/dream-team";

export default function OurTeamPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Banner />
      {/* Management Team Section */}
      <ManagementTeam />
      {/*dream team */}
      <DreamTeam />
    </div>
  );
}
