"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";

export default function About() {
  const handleHireClick = (e: React.MouseEvent) => {
    scrollToSection(e as React.MouseEvent<HTMLButtonElement>, "contacts");
    window.open("https://wa.me/75991340520", "_blank");
  };

  return (
    <section id="about">
      <div className="container mx-auto px-4 md:px-12 py-6 lg:py-16">
        <div>
          <h2 className="font-primary text-secondary text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-center">
            SOBRE
          </h2>
          <div className="relative mx-auto w-28 h-3 md:w-52">
            <Image
              src="/img/rectangle.svg"
              alt="Retangulo Titulo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex flex-col lg:flex-row items-center justify-between mt-16 gap-8">
          {/* Coluna da Imagem e Retângulos */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            {/* Contêiner da Imagem e Retângulos */}
            <div className="relative w-[300px] h-[400px] md:w-[418px] md:h-[530px]">
              {/* Imagem */}
              <Image
                src="/img/roma.jpg"
                alt="Foto Roma"
                fill // Usa fill para ocupar o espaço do contêiner relativo
                className="rounded-xl object-cover z-10"
              />

              {/* Retângulos Absolutos */}
              <div className="absolute h-16 w-16 md:h-24 md:w-24 border-4 border-primary rounded-md -right-5 md:-right-8 -bottom-5 md:-bottom-8 z-0" />
              <div className="absolute h-16 w-16 md:h-24 md:w-24 bg-primary rounded-md top-8 -left-6 md:top-14 md:-left-12 z-20" />
              <div className="absolute h-12 w-10 md:h-16 md:w-12 bg-primary rounded-md left-10 md:left-20 -bottom-6 md:-bottom-9 z-30" />
            </div>
          </div>

          {/* Coluna do Texto */}
          <div className="w-full lg:w-1/2 max-w-3xl mt-12 lg:mt-0">
            <h2 className="font-primary text-primary text-2xl md:text-3xl lg:text-[34px] font-semibold">
              ROMA TORRES
            </h2>
            <h3 className="font-primary text-secondary text-sm md:text-base font-semibold tracking-wider mt-2">
              WEB DEVELOPER & UX DESIGNER
            </h3>
            <p className="font-secondary text-white mt-6 text-sm md:text-base">
              Sou apaixonado por criar experiências digitais que unem
              funcionalidade, estética e usabilidade. Como desenvolvedor web,
              tenho expertise em construir sites responsivos, otimizados e com
              tecnologias modernas. Como UI/UX designer, foco em designs
              intuitivos e centrados no usuário, transformando ideias em
              interfaces que encantam e resolvem problemas. Meu trabalho é
              impulsionado pela busca constante por inovação e qualidade, sempre
              buscando entregar soluções que superem expectativas. Vamos criar
              algo incrível juntos?
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-12">
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
        </div>
      </div>
    </section>
  );
}
