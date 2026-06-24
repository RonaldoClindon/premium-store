"use client";

import React from "react";

// Individual Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="glass-panel flex flex-col overflow-hidden rounded-2xl">
      {/* Image Skeleton */}
      <div className="shimmer h-64 w-full" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating Stars Placeholder */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="shimmer h-3.5 w-3.5 rounded-full" />
            ))}
          </div>
          <div className="shimmer h-3 w-8 rounded" />
        </div>

        {/* Title Placeholder */}
        <div className="mt-4 space-y-2">
          <div className="shimmer h-4 w-5/6 rounded" />
          <div className="shimmer h-4 w-2/3 rounded" />
        </div>

        {/* Short Description Placeholder */}
        <div className="mt-3 space-y-1.5">
          <div className="shimmer h-3 w-full rounded" />
          <div className="shimmer h-3 w-11/12 rounded" />
        </div>

        {/* Footer Area Placeholder */}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <div className="space-y-1.5">
              <div className="shimmer h-2 w-10 rounded" />
              <div className="shimmer h-5 w-16 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="shimmer h-9 w-9 rounded-full" />
              <div className="shimmer h-9 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Category Pill Skeleton
export function CategoryPillSkeleton() {
  return <div className="shimmer h-8 w-24 rounded-full" />;
}

// Grid of Cards Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}

// Category filter container skeleton
export function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="shimmer h-7 w-48 rounded" />
        <div className="shimmer h-4 w-20 rounded" />
      </div>
      <div className="flex flex-wrap gap-2.5 pt-1">
        {Array.from({ length: 5 }).map((_, idx) => (
          <CategoryPillSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
