"use client";

import { Project } from "@/types/projects";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
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
