import { PortfolioCard, ProjectProps } from "./PortfolioCard";
import { PortfolioSkeleton } from "../_components/PortfolioSkeleton";

interface PortfolioGridProps {
  projects: ProjectProps[];
  isLoading: boolean;
}

export const PortfolioGrid = ({ projects, isLoading }: PortfolioGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-4">
      {isLoading ? (
        <>
          <PortfolioSkeleton size="large" />
          <PortfolioSkeleton size="medium" />
          <PortfolioSkeleton size="small" />
          <PortfolioSkeleton size="small" />
          <PortfolioSkeleton size="medium" />
          <PortfolioSkeleton size="small" />
        </>
      ) : (
        projects.map((project, index) => (
          <PortfolioCard key={index} {...project} />
        ))
      )}
    </div>
  );
};
