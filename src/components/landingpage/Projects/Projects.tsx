"use client";

import React from "react";
import { ProjectProps } from "./_components/ProjectCard";
import { ProjectGrid } from "./_components/ProjectGrid";
import { useProjectStore } from "@/stores/projectsStores";
import Image from "next/image";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const Portfolio = () => {
  const { fetchProjects, projects } = useProjectStore();
  const [isLoading] = React.useState(false);

  const project: ProjectProps[] = [
    {
      title: "E-Commerce Platform",
      description:
        "Plataforma completa de e-commerce com carrinho, checkout e painel administrativo",
      image: project1,
      link: "#",
      size: "large",
    },
    {
      title: "Fitness Tracker App",
      description: "Aplicativo mobile de rastreamento de exercícios e nutrição",
      image: project2,
      link: "#",
      size: "medium",
    },
    {
      title: "Luxury Brand Identity",
      description: "Design completo de identidade visual para marca de luxo",
      image: project3,
      link: "#",
      size: "small",
    },
    {
      title: "Restaurant Website",
      description:
        "Website responsivo para restaurante com cardápio digital e reservas",
      image: project4,
      link: "#",
      size: "small",
    },
    {
      title: "Tech Startup Branding",
      description: "Branding completo para startup de tecnologia",
      image: project5,
      link: "#",
      size: "medium",
    },
    {
      title: "Creative Agency Portfolio",
      description: "Portfolio interativo para agência criativa",
      image: project6,
      link: "#",
      size: "small",
    },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
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

        {/* Portfolio Grid */}
        <ProjectGrid projects={project} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Portfolio;
