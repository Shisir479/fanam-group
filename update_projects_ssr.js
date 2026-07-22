const fs = require("fs");
const path = require("path");

const files = [
  { path: "src/app/projects/page.tsx", name: "ProjectsPage", status: "" },
  {
    path: "src/app/projects/ongoing/page.tsx",
    name: "OngoingProjectsPage",
    status: 'initialStatus="ongoing"',
  },
  {
    path: "src/app/projects/upcoming/page.tsx",
    name: "UpcomingProjectsPage",
    status: 'initialStatus="upcoming"',
  },
  {
    path: "src/app/projects/ready/page.tsx",
    name: "ReadyProjectsPage",
    status: 'initialStatus="completed"',
  },
  {
    path: "src/app/projects/handed-over/page.tsx",
    name: "HandedOverProjectsPage",
    status: 'initialStatus="completed"',
  },
];

files.forEach((f) => {
  const fullPath = path.join("e:/Al-Mamun/bonedi/bonedi_client", f.path);
  const content = `import { ProjectsView } from "@/components/projects/ProjectsView";
import { getProjectsPublic } from "@/services/project.service";

export default async function ${f.name}() {
  let projects: any[] = [];
  try {
    const res = await getProjectsPublic({ limit: 0 });
    if (res?.success && res.data) {
      projects = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return <ProjectsView ${f.status ? f.status + " " : ""}initialProjects={projects} />;
}
`;
  fs.writeFileSync(fullPath, content);
});
console.log("Updated all project pages to SSR.");
