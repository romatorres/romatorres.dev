"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/stores/projectsStores";
import { Project } from "@/types/projects";
import { MasonryGrid } from "@/components/landingpage/Projects/_components/MasonryGrid";
import Image from "next/image";

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
        className="relative bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        style={{ maxWidth: "min(90vw, 1200px)" }} // controla largura máxima
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
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

        {/* Imagem que define a largura base do modal */}
        {project.imageUrl && (
          <div className="relative w-full shrink-0 bg-black">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[70vh] object-contain"
              priority
            />
          </div>
        )}

        {/* Área de texto com rolagem independente */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {project.title}
          </h3>

          <div className="text-gray-200 prose prose-invert max-w-none">
            <p className="whitespace-pre-line text-base md:text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 transition-colors"
            >
              Acessar projeto
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
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
          renderItem={(project) => (
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          )}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
