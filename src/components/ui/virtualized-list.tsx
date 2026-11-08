"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, type ReactNode } from "react";

type VirtualizedListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  estimateSize?: number;
  height?: number;
  ariaLabel: string;
};

export function VirtualizedList<T>({
  items,
  renderItem,
  estimateSize = 168,
  height = 480,
  ariaLabel,
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 4,
  });

  return (
    <section
      ref={parentRef}
      aria-label={ariaLabel}
      className="overflow-y-auto rounded-xl"
      style={{ height }}
    >
      <ul
        className="relative w-full"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <li
            key={virtualItem.key}
            className="absolute top-0 left-0 w-full px-0.5 pb-3"
            style={{
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </li>
        ))}
      </ul>
    </section>
  );
}
