import Image from "next/image";
import { Project } from "@/types/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg shadow-sm border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    >
      {project.imageUrl && (
        <div className="relative overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={500}
            height={500}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-lg">
              Ver detalhes
            </span>
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-50 line-clamp-2">
          {project.title}
        </h3>
      </div>
    </div>
  );
}

interface MasonryGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function MasonryGrid({ projects, onProjectClick }: MasonryGridProps) {
  // Distribui os projetos em colunas baseado no índice
  const distributeProjects = (items: Project[], columns: number) => {
    const cols: Project[][] = Array.from({ length: columns }, () => []);

    items.forEach((item, index) => {
      cols[index % columns].push(item);
    });

    return cols;
  };

  // Colunas responsivas para diferentes tamanhos
  const columns = {
    xl: distributeProjects(projects, 4),
    lg: distributeProjects(projects, 3),
    md: distributeProjects(projects, 2),
  };

  return (
    <>
      {/* Grid Masonry - Desktop (xl: 4 colunas) */}
      <div className="hidden xl:flex gap-4">
        {columns.xl.map((col, colIndex) => (
          <div key={`xl-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Tablet (lg: 3 colunas) */}
      <div className="hidden lg:flex xl:hidden gap-4">
        {columns.lg.map((col, colIndex) => (
          <div key={`lg-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Mobile Large (md: 2 colunas) */}
      <div className="hidden md:flex lg:hidden gap-4">
        {columns.md.map((col, colIndex) => (
          <div key={`md-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Mobile (sm: 1 coluna) */}
      <div className="flex md:hidden flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </>
  );
}