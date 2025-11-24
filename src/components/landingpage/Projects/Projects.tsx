"use client";

import { ProjectGrid } from "./_components/ProjectGrid";
import { ProjectsHeader } from "./_components/ProjectsHeader";
import { useProjects } from "../../../hooks/useProjects";

const Portfolio = () => {
  const { projects, isLoading } = useProjects();

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <ProjectsHeader />
        <ProjectGrid projects={projects} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Portfolio;
