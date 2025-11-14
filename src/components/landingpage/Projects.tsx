"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProjectStore } from "@/stores/projectsStores";

export default function Projects() {
  const { fetchProjects, projects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section id="projects">
      <div className="container mx-auto px-4 md:px-12 py-12 lg:py-16">
        <div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:mt-16 mt-12 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
            >
              {project.link && (
                <Link href={project.link} target="_blank">
                  {project.imageUrl && (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}

                  {/* Overlay that appears on hover */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6">
                    <h3 className="font-primary uppercase text-xl font-bold text-secondary mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="font-secondary text-white line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                      {project.description}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
