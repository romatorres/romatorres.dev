"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/components/landingpage/_components/scroll";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const words = ["CRIATIVIDADE", "INOVAÇÃO", "DESIGN", "TECNOLOGIA"];
    const handleType = () => {
      const currentWord = words[loopNum % words.length]; // Seleciona a palavra atual
      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1) // Apaga uma letra
          : currentWord.substring(0, text.length + 1) // Digita uma letra
      );

      setTypingSpeed(isDeleting ? 50 : 150); // Ajusta a velocidade

      // Quando a palavra estiver completa, espera um pouco e começa a apagar
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1); // Passa para a próxima palavra
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  });

  const handleHireClick = (e: React.MouseEvent) => {
    scrollToSection(e as React.MouseEvent<HTMLButtonElement>, "contacts");
    window.open("https://wa.me/75991340520", "_blank");
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center bg-hero bg-center bg-cover bg-no-repeat"
    >
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
        {/* Bloco "ROLAR SCROLL" na vertical - moved outside container */}
        <div className="hidden lg:flex flex-col items-start mb-8 lg:mb-0 order-3 lg:order-1">
          <p className="writing-mode-vertical-lr rotate-180 text-xs font-secondary text-secondary animate-tremor cursor-pointer">
            <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
              ROLAR SCROLL &#x2192;
            </a>
          </p>
        </div>

        {/* Texto central */}
        <div className="text-center text-secondary mt-20 lg:mt-0 mb-8 lg:mb-0 order-1 lg:order-2">
          <h3 className="text-sm font-medium font-primary mb-4 tracking-widest text-oswa">
            WEB DEVELOPER & UX DESIGNER
          </h3>
          <h1 className="text-4xl lg:text-7xl font-semibold font-primary mb-4">
            {text}
            <span className="cursor text-primary">l</span>
          </h1>
          <p className="font-secondary max-w-96 mx-auto mt-8">
            Sou dedicado a criar interfaces que combinam arte e funcionalidade,
            e sou especialista em linguagens de programação modernas e atuais.
          </p>
        </div>

        {/* Ícones na vertical */}
        <div className="flex flex-row lg:flex-col items-center gap-4 px-10 order-2 lg:order-3">
          <Image
            src="/img/git.svg"
            alt="Icone Github"
            height={32}
            width={32}
            className="hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
          <Image
            src="/img/insta.svg"
            alt="Icone Instagram"
            height={32}
            width={32}
            className="hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
          <Image
            src="/img/x.svg"
            alt="Icone X"
            height={32}
            width={32}
            className="hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
          <Image
            src="/img/be.svg"
            alt="Icone Be"
            height={32}
            width={32}
            className="hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
          <Image
            src="/img/pinterest.svg"
            alt="Icone Pinterest"
            height={32}
            width={32}
            className="hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 mt-20">
        <div className="flex gap-4">
          <Button onClick={handleHireClick}>CONTRATAR</Button>

          <Button
            variant="outline"
            onClick={(e) => scrollToSection(e, "projects")}
          >
            MEUS TRABALHOS
          </Button>
        </div>
        {/* Mobile version of Rolar Scroll */}
        <div className="flex lg:hidden mt-16 mb-14">
          <p className="writing-mode-vertical-lr rotate-180 text-xs font-secondary text-secondary animate-tremor cursor-pointer">
            <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
              ROLAR SCROLL &#x2192;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
