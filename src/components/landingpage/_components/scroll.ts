export const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  sectionId: string
) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  const header = document.querySelector('header');
  // Obtenha a altura real do cabeçalho + algum preenchimento
  const offset = header ? header.getBoundingClientRect().height : 80;

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};