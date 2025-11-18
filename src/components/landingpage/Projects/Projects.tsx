"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectsStores";
import { Project } from "@/types/projects";
import { MasonryGrid } from "@/components/landingpage/Projects/_components/MasonryGrid";
import Image from "next/image";
import { ProjectSkeleton } from "./_components/ProjectSkeleton";
import { ProjectCard } from "./_components/ProjectCard";
import { ProjectModal } from "./_components/ProjectModal";

export default function Projects() {
  const { fetchProjects, projects } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      await fetchProjects();
      setIsLoading(false);
    };
    loadProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (projects.length > 0) {
      const shuffleArray = (array: Project[]) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
      };
      setShuffledProjects(shuffleArray(projects));
    }
  }, [projects]);

  return (
    <section id="projects">
      <div className="container mx-auto px-4 md:px-12 py-12 lg:py-16">
        <div className="py-12">
          <h2 className="font-primary text-secondary text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-center">
            PROJETOS
          </h2>
          <div className="relative mx-auto w-40 h-3 md:w-72">
            <Image
              src="/img/rectangle.svg"
              alt="Retangulo Titulo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {isLoading ? (
          <MasonryGrid
            items={Array.from({ length: 4 })}
            renderItem={() => <ProjectSkeleton />}
            getKey={(_, index) => index}
          />
        ) : (
          <MasonryGrid
            items={shuffledProjects}
            renderItem={(project) => (
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            )}
            getKey={(project) => project.id}
          />
        )}

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
