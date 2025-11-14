"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectsStores";
import { Project } from "@/types/projects";
import { MasonryGrid } from "@/components/landingpage/Projects/_components/MasonryGrid";
import Image from "next/image";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white dark:bg-neutral-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Fechar"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {project.imageUrl && (
          <div className="relative">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1200}
              height={1200}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        )}

        <div className="p-6">
          <p className="text-gray-50">{project.description}</p>
          <p className="text-gray-50">{project.link}</p>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { fetchProjects, projects } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Ordem estável baseada no ID
  const stableSortedProjects = [...projects]
    .sort((a, b) => a.id.localeCompare(b.id))
    .reverse();

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
        <MasonryGrid
          projects={stableSortedProjects}
          onProjectClick={setSelectedProject}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}