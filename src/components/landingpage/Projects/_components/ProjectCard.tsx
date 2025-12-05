"use client";

import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { Project } from "@/types/projects";

export interface ProjectCardProps extends Omit<Project, "imageUrl" | "sizes"> {
  imageUrl: string;
  size?: "small" | "medium" | "large";
}

export const ProjectCard = ({
  title,
  description,
  imageUrl,
  link,
  size = "medium",
}: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-1 md:row-span-2",
    large: "md:col-span-2 md:row-span-2",
  };

  const imageSizes = {
    small: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1400, height: 1050 },
  };

  const { width, height } = imageSizes[size];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-neutral-800 hover:border-primary transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900 ${sizeClasses[size]} animate-scale-in`}
      >
        <DialogTrigger asChild>
          <div className="relative h-full overflow-hidden cursor-pointer">
            {/* ✅ Imagem principal sem blur */}
            <Image
              src={imageUrl}
              alt={title}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              quality={90}
            />

            {/* ✅ Conteúdo */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="space-y-1 transform translate-y-0 md:translate-y-20 md:group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-secondary md:flex hidden">
                  {title}
                </h3>

                <p className="text-sm text-gray-300 line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  {description}
                </p>
                <div className="flex gap-3 pt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/60 transition-all duration-300 text-sm font-medium text-background"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Projeto
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      {/* ✅ MODAL CENTRALIZADO PERFEITAMENTE NO MOBILE */}
      <DialogContent
        className="
          fixed 
          left-1/2 top-1/2 
          -translate-x-1/2 -translate-y-1/2
          w-[calc(100%-2rem)]
          max-w-5xl 
          p-0 
          bg-background/95 
          backdrop-blur-xl 
          border-border/50
        "
      >
        <div className="relative">
          <Image
            src={imageUrl}
            alt={title}
            width={1800}
            height={1300}
            sizes="90vw"
            className="w-full h-auto max-h-[85vh] object-contain"
            quality={95}
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-background via-background/80 to-transparent">
            <DialogTitle>{title}</DialogTitle>
            <p className="text-sm text-gray-300 mb-3">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
