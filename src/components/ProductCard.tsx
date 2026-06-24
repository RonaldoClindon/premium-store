"use client";

import React from "react";
import { Star, StarHalf, ShoppingCart } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const { title, price, description, category, image, rating } = product;

  // Star Rating renderer (using blue theme for light mode accents)
  const renderStars = (rate: number) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.4;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalf key={i} className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 text-slate-200" />
        );
      }
    }
    return stars;
  };

  // Helper to format category
  const formatCategory = (cat: string) => {
    if (cat === "jewelery") return "Jewelry";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <article className="glass-panel glass-panel-hover flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200">
      {/* Product Image Section - Clickable with Premium Gradients & Drop Shadows */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative flex h-64 w-full cursor-pointer items-center justify-center bg-gradient-to-tr from-slate-50 via-white to-blue-50/20 p-8 transition-all duration-500 group border-b border-slate-100"
        title="Click to view details"
      >
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-blue-500/0 transition-colors duration-300 group-hover:bg-blue-500/[0.02] pointer-events-none" />
        
        {/* Image with high-quality drop-shadow */}
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_12px_20px_rgba(15,23,42,0.08)] group-hover:drop-shadow-[0_16px_28px_rgba(15,23,42,0.12)]"
          loading="lazy"
        />
        
        {/* Category Tag */}
        <span className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-slate-100 backdrop-blur-sm shadow-sm">
          {formatCategory(category)}
        </span>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col p-5 bg-white">
        {/* Ratings & Count */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">{renderStars(rating.rate)}</div>
          <span className="text-[11px] font-semibold text-slate-400">
            ({rating.count})
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-serif text-base font-bold leading-tight text-slate-900 line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
          {description}
        </p>

        {/* Spacer */}
        <div className="mt-auto pt-5">
          {/* Price & Action Buttons */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Price</span>
              <span className="font-serif text-lg font-bold text-blue-600">
                ${price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Add to Cart (Quick CTA) */}
              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/5 transition-all duration-300 hover:from-blue-500 hover:to-blue-650 hover:shadow-blue-500/10"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
