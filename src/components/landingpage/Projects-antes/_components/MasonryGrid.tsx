import { ReactNode } from "react";

interface MasonryGridProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T, index: number) => string | number;
  columnsConfig?: {
    xl?: number;
    lg?: number;
    md?: number;
  };
}

export function MasonryGrid<T>({
  items,
  renderItem,
  getKey,
  columnsConfig = { xl: 4, lg: 3, md: 2 },
}: MasonryGridProps<T>) {
  const distributeItems = (items: T[], columns: number) => {
    const cols: T[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, index) => {
      cols[index % columns].push(item);
    });
    return cols;
  };

  const columns = {
    xl: distributeItems(items, columnsConfig.xl!),
    lg: distributeItems(items, columnsConfig.lg!),
    md: distributeItems(items, columnsConfig.md!),
  };

  return (
    <>
      {/* Grid Masonry - Desktop (xl: 4 colunas) */}
      <div className="hidden xl:flex gap-4">
        {columns.xl.map((col, colIndex) => (
          <div key={`xl-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((item, index) => (
              <div key={getKey(item, index)}>{renderItem(item)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Tablet (lg: 3 colunas) */}
      <div className="hidden lg:flex xl:hidden gap-4">
        {columns.lg.map((col, colIndex) => (
          <div key={`lg-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((item, index) => (
              <div key={getKey(item, index)}>{renderItem(item)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Mobile Large (md: 2 colunas) */}
      <div className="hidden md:flex lg:hidden gap-4">
        {columns.md.map((col, colIndex) => (
          <div key={`md-${colIndex}`} className="flex-1 flex flex-col gap-4">
            {col.map((item, index) => (
              <div key={getKey(item, index)}>{renderItem(item)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Grid Masonry - Mobile (sm: 1 coluna) */}
      <div className="flex md:hidden flex-col gap-4">
        {items.map((item, index) => (
          <div key={getKey(item, index)}>{renderItem(item)}</div>
        ))}
      </div>
    </>
  );
}
