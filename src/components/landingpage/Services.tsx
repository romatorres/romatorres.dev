"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/components/landingpage/_components/scroll";

const services = [
  {
    id: 1,
    title: "DESENVOLVIMENTO WEB",
    description:
      "Criação de sites modernos, responsivos e otimizados, com foco em performance, segurança e design atraente para qualquer dispositivo.",
    imageUrl: "/img/icon-web.png",
  },
  {
    id: 2,
    title: "APP MOBILE E DESKTOP",
    description:
      "Desenvolvimento de aplicativos intuitivos e responsivos para mobile e desktop, garantindo performance e experiência do usuário excepcionais em todas as plataformas.",
    imageUrl: "/img/icon-phone.png",
  },
  {
    id: 3,
    title: "UI UX DESIGN",
    description:
      "Design de interfaces centradas no usuário, combinando estética e funcionalidade para proporcionar experiências digitais memoráveis e eficientes.",
    imageUrl: "/img/icon-design.png",
  },
  {
    id: 4,
    title: "PROTOTIPAÇÃO E WIREFRAMES",
    description:
      "Desenvolvimento de protó tipos e wireframes interativos para validar ideias e estruturar projetos de forma clara e eficaz antes da implementação.",
    imageUrl: "/img/icon-tools.png",
  },
];

export default function Services() {
  const handleHireClick = (e: React.MouseEvent) => {
    scrollToSection(e as React.MouseEvent<HTMLButtonElement>, "contacts");
    window.open("https://wa.me/75991340520", "_blank");
  };

  return (
    <section id="services">
      <div className="container mx-auto px-4 md:px-12 py-12 lg:py-16">
        <div>
          <h2 className="font-primary text-secondary text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-center">
            SERVIÇOS
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

        <div className="grid grid-cols-1 lg:grid-cols-2 md:mt-16 mt-12 md:gap-8 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center  bg-linear-to-t from-[#181818] to-[#121212] rounded-xl shadow-lg overflow-hidden hover:shadow-xl duration-300 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="shrink-0 relative md:h-28 md:w-28 h-20 w-20 md:m-8 m-4">
                {service.imageUrl && (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                )}
              </div>
              {/* Textos */}
              <div className="md:my-8 my-4 md:mr-8 mr-4 ">
                <h3 className="text-secondary md:text-3xl text-xl font-primary uppercase md:font-bold font-semibold md:mb-2 mb-1">
                  {service.title}
                </h3>
                <p className="text-white font-secondary md:text-sm text-xs line-clamp-4">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center md:flex-row gap-4 mt-20">
          <Button
            onClick={handleHireClick}
            className="w-full md:w-auto px-12 rounded-xs"
          >
            CONTRATAR
          </Button>
          <Button
            onClick={(e) => scrollToSection(e, "projects")}
            variant="outline"
            className="w-full md:w-auto border-white rounded-xs px-8 text-white bg-background hover:bg-black-foreground"
          >
            MEUS TRABALHOS
          </Button>
        </div>
      </div>
    </section>
  );
}
