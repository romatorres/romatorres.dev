import { ProjectCard } from "./ProjectCard";
import { ProjectSkeleton } from "./ProjectSkeleton";
import { Project } from "@/types/projects";

interface ProjectGridProps {
  projects: Project[];
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
        projects
          .filter(project => project.isActive && project.imageUrl)
          .map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project}
              imageUrl={project.imageUrl!}
              size={project.sizes?.toLowerCase() as "small" | "medium" | "large" || "medium"}
            />
          ))
      )}
    </div>
  );
};
