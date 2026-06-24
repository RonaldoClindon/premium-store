"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  // Helper to format category names for display
  const formatCategoryName = (name: string) => {
    if (name === "all") return "All Products";
    if (name === "jewelery") return "Jewelry";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-full">
      {/* 1. Desktop Sidebar Version (Visible on lg and above) */}
      <div className="hidden lg:flex flex-col space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-4">
          <SlidersHorizontal className="h-4.5 w-4.5 text-blue-600" />
          <h2 className="font-serif text-lg font-bold text-slate-900">
            Categories
          </h2>
        </div>

        <nav className="flex flex-col space-y-1.5" aria-label="Sidebar Categories">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group flex w-full items-center text-xs font-semibold py-2.5 transition-all duration-250 select-none ${
                  isActive
                    ? "border-l-2 border-blue-600 bg-blue-50/40 pl-3.5 text-blue-600 font-bold"
                    : "border-l border-slate-200 pl-4 text-slate-500 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                <span className="truncate">{formatCategoryName(category)}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2. Mobile Horizontal Version (Visible on md and below) */}
      <div className="lg:hidden flex flex-col space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Filter Collection
          </span>
          <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {selectedCategory === "all" ? "All" : formatCategoryName(selectedCategory)}
          </span>
        </div>
        
        {/* Horizontal scroll wrapper */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none scroll-smooth">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide shrink-0 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10 font-bold"
                    : "bg-slate-100 text-slate-650 border border-slate-200 hover:bg-slate-200/60"
                }`}
              >
                {formatCategoryName(category)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
