import { ProjectsView } from "@/components/projects/ProjectsView";
import { getProjectsPublic } from "@/services/project.service";

export default async function OngoingProjectsPage() {
  let projects: any[] = [];
  try {
    const res = await getProjectsPublic({ limit: 0 });
    if (res?.success && res.data) {
      projects = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return <ProjectsView initialStatus="ongoing" initialProjects={projects} />;
}
