"use client";

import { ProjectGrid } from "./_components/ProjectGrid";
import { ProjectsHeader } from "./_components/ProjectsHeader";
import { useProjects } from "../../../hooks/useProjects";

const Portfolio = () => {
  const { projects, isLoading } = useProjects();

  return (
    <section className="relative  overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-12 py-6 lg:py-16">
        <ProjectsHeader />
        <ProjectGrid projects={projects} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Portfolio;
