import { ReactNode } from "react";
import { Project } from "@/types/projects";

interface MasonryGridProps {
  projects: Project[];
  renderItem: (project: Project) => ReactNode;
}

export function MasonryGrid({ projects, renderItem }: MasonryGridProps) {
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
              <div key={project.id}>{renderItem(project)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Tablet (lg: 3 colunas) */}
      <div className="hidden lg:flex xl:hidden gap-4">
        {columns.lg.map((col, colIndex) => (
          <div key={`lg-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((project) => (
              <div key={project.id}>{renderItem(project)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Mobile Large (md: 2 colunas) */}
      <div className="hidden md:flex lg:hidden gap-4">
        {columns.md.map((col, colIndex) => (
          <div key={`md-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((project) => (
              <div key={project.id}>{renderItem(project)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Mobile (sm: 1 coluna) */}
      <div className="flex md:hidden flex-col gap-4">
        {projects.map((project) => (
          <div key={project.id}>{renderItem(project)}</div>
        ))}
      </div>
    </>
  );
}
