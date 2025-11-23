import Image from "next/image";

export const ProjectsHeader = () => {
  return (
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
  );
};