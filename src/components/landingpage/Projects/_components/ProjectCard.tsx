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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-neutral-800 hover:border-primary transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900 ${sizeClasses[size]} animate-scale-in`}
      >
        <DialogTrigger asChild>
          <div className="relative h-full overflow-hidden cursor-pointer">
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay 
            <div className="absolute inset-0 bg-linear-to-t from-background/30 via-background/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />*/}

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-secondary">{title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {description}
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/60 transition-all duration-300 text-sm font-medium text-background"
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

      <DialogContent className="max-w-5xl mx-4 p-0 bg-background/95 backdrop-blur-xl border-border/50">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={600}
            className="w-full h-auto max-h-[85vh] object-contain"
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
