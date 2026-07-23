import { ProjectsView } from "@/components/projects/ProjectsView";
import { getProjectsPublic } from "@/services/project.service";
import { getBannerByPageAdmin } from "@/services/banner.service";

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    const res = await getProjectsPublic({ limit: 0 });
    if (res?.success && res.data) {
      projects = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  let banner = null;
  try {
    const bannerRes = await getBannerByPageAdmin("projects");
    if (bannerRes?.success) banner = bannerRes.data;
  } catch (err) {}

  return <ProjectsView initialProjects={projects} banner={banner} />;
}
