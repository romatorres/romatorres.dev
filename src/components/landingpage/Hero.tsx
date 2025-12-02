"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import Image from "next/image";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showScrollHint, setShowScrollHint] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.67; // 30% da altura da janela
      setShowScrollHint(window.scrollY < scrollThreshold);
    };
    // Checa no carregamento inicial
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center bg-hero bg-center bg-cover bg-no-repeat"
    >
      {/* Versão Desktop - "ROLAR SCROLL" vertical */}
      <div
        className={`hidden lg:flex flex-col items-start mb-8 lg:mb-0 order-3 lg:order-1 fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-500 ${
          showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="writing-mode-vertical-lr rotate--180 text-xs font-secondary text-secondary animate-tremor cursor-pointer">
          <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
            ROLAR SCROLL &#x2192;
          </a>
        </p>
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center px-4">
        {/* Texto central */}
        <div className="text-center text-secondary mt-24 lg:mt-0 mb-8 lg:mb-0 order-1 lg:order-2">
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
      </div>

      {/* Ícones mobile */}
      <div className="lg:hidden flex gap-6">
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

      <div className="flex flex-col items-center gap-4 lg:mt-20 mt-14 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center sm:mx-0 px-4">
          <Button
            variant="default"
            onClick={handleHireClick}
            className="group relative overflow-hidden px-16 rounded-xs sm:w-auto w-full"
          >
            CONTRATAR
            <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>

          <Button
            variant="outline"
            onClick={(e) => scrollToSection(e, "projects")}
            className="group relative overflow-hidden border-white rounded-xs px-14 text-white bg-background sm:w-auto w-full"
          >
            MEUS TRABALHOS
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </div>
        {/* Versão Mabile - "ROLAR SCROLL" vertical */}
        <div
          className={`flex lg:hidden mt-16 mb-14 transition-opacity duration-500 ${
            showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <p className="writing-mode-vertical-lr rotate--90 text-xs font-secondary text-secondary animate-tremor cursor-pointer">
            <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
              ROLAR SCROLL &#x2192;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
