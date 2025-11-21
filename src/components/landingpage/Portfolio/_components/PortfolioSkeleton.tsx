import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioSkeletonProps {
  size?: "small" | "medium" | "large";
}

export const PortfolioSkeleton = ({
  size = "medium",
}: PortfolioSkeletonProps) => {
  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-1 md:row-span-2",
    large: "md:col-span-2 md:row-span-2",
  };

  return (
    <div
      className={`rounded-2xl bg-[hsl(var(--glass-bg))] backdrop-blur-glass border border-[hsl(var(--glass-border))] overflow-hidden ${sizeClasses[size]}`}
    >
      <Skeleton className="w-full h-full" />
    </div>
  );
};
