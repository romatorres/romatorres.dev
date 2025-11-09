"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { scrollToSection } from "@/components/landingpage/_components/scroll";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    scrollToSection(e, sectionId);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed w-full backdrop-blur-sm z-50 transition-colors duration-300 ${
        isScrolled || isOpen
          ? "bg-background"
          : "lg:bg-background/20 bg-background"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <a
            href="#header"
            onClick={(e) => handleNavClick(e, "header")}
            className="relative w-24 h-8 md:w-32 md:h-11"
          >
            <Image
              src="/img/logo.png"
              alt="Logomarca RomaTorres"
              fill
              className="object-contain"
            />
          </a>

          <div className="hidden md:flex space-x-8 text-secondary font-secondary text-xs font-medium">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "header")}
              className="hover:text-primary duration-300"
            >
              HOME
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="hover:text-primary duration-300"
            >
              SOBRE
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
              className="hover:text-primary duration-300"
            >
              SERVIÇOS
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "projects")}
              className="hover:text-primary duration-300"
            >
              PROJETOS
            </a>
            <a
              href="#contacts"
              onClick={(e) => handleNavClick(e, "contacts")}
              className="hover:text-primary duration-300"
            >
              CONTATOS
            </a>
          </div>
          <button
            className="md:hidden w-6 h-6 text-secondary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden fixed top-16 md:top-[72px] right-0 w-full bg-background/95 backdrop-blur-sm p-5 md:p-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-5 flex flex-col items-center text-secondary text-sm font-medium">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "header")}
              className="block hover:text-primary duration-300"
            >
              HOME
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="block hover:text-primary duration-300"
            >
              SOBRE
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
              className="block hover:text-primary duration-300"
            >
              SERVIÇOS
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "projects")}
              className="block hover:text-primary duration-300"
            >
              PROJETOS
            </a>
            <a
              href="#contacts"
              onClick={(e) => handleNavClick(e, "contacts")}
              className="block hover:text-primary duration-300"
            >
              CONTATOS
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
