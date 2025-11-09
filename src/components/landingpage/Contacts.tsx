"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Contacts() {
  return (
    <section id="contact">
      <div className="container mx-auto px-4 md:px-12 py-12 lg:py-16">
        <div>
          <h2 className="font-primary text-secondary text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-center">
            CONTATOS
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

        <div className="flex lg:flex-row flex-col lg:justify-between justify-center items-center lg:mt-16 mt-12">
          <div className="flex flex-col lg:gap-8 gap-6 lg:mb-0 mb-14 lg:w-1/2">
            <div className="flex items-center lg:gap-6 gap-4">
              <div className="relative lg:h-20 lg:w-20 h-16 w-16">
                <Image
                  src="/img/localizacao.svg"
                  alt="Icone Localização"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="md:text-2xl text-xl text-secondary font-primary font-medium md:mb-2 mb-1">
                  LOCALIZAÇÃO
                </h3>
                <p className="md:text-xl text-lg text-white font-primary">
                  FEIRA DE SANTANA, BAHIA, BRASIL
                </p>
              </div>
            </div>
            <div className="flex items-center lg:gap-6 gap-4">
              <div className="relative lg:h-20 lg:w-20 h-16 w-16">
                <Image
                  src="/img/telefone.svg"
                  alt="Icone Telefone"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="md:text-2xl text-xl text-secondary font-primary font-medium md:mb-2 mb-1">
                  TELEFONE
                </h3>
                <p className="md:text-xl text-lg text-white font-primary">
                  75 99134-0520
                </p>
              </div>
            </div>
            <div className="flex items-center lg:gap-6 gap-4">
              <div className="relative lg:h-20 lg:w-20 h-16 w-16">
                <Image
                  src="/img/email.svg"
                  alt="Icone Email"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="md:text-2xl text-xl text-secondary font-primary font-medium md:mb-2 mb-1">
                  E-MAIL
                </h3>
                <p className="md:text-xl text-lg text-white font-primary">
                  ROMATORRES12@GMAIL.COM
                </p>
              </div>
            </div>
          </div>

          <form className="w-full lg:w-2/5 max-w-4xl">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="NOME"
                className="w-full px-4 py-2 border border-white rounded-sm text-xl text-white font-primary bg-background"
              />
              <input
                type="text"
                placeholder="E-MAIL"
                className="w-full px-4 py-2 border border-white rounded-sm text-xl text-white font-primary bg-background"
              />
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="TELEFONE"
                className="w-full px-4 py-2 border border-white rounded-sm text-xl text-white font-primary bg-background"
              />
              <input
                type="text"
                placeholder="ASSUNTO"
                className="w-full px-4 py-2 border border-white rounded-sm text-xl text-white font-primary bg-background"
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="MENSAGEM"
                rows={5}
                className="w-full px-4 py-2 border border-white rounded-sm text-xl text-white font-primary bg-background"
              />
            </div>
            <Button type="submit" className="w-full">
              ENVIAR
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
