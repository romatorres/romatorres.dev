import { ProjectCard, ProjectProps } from "./ProjectCard";
import { ProjectSkeleton } from "./ProjectSkeleton";

interface ProjectGridProps {
  projects: ProjectProps[];
  isLoading: boolean;
}

export const ProjectGrid = ({ projects, isLoading }: ProjectGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-4">
      {isLoading ? (
        <>
          <ProjectSkeleton size="large" />
          <ProjectSkeleton size="medium" />
          <ProjectSkeleton size="small" />
          <ProjectSkeleton size="small" />
          <ProjectSkeleton size="medium" />
          <ProjectSkeleton size="small" />
        </>
      ) : (
        projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))
      )}
    </div>
  );
};
