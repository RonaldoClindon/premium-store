"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Star, StarHalf, ShoppingBag, CreditCard, ChevronUp, ChevronDown, Check } from "lucide-react";
import { Product } from "@/types";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const { title, price, description, category, image, rating } = product;

  // Star Rating renderer (blue stars matching main accent)
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
          <Star key={i} className="h-3.5 w-3.5 text-slate-200 dark:text-zinc-800" />
        );
      }
    }
    return stars;
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 dark:bg-zinc-950/60 backdrop-blur-sm"
      />

      {/* Modal Dialog Card - Compact size (max-w-3xl) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
        className="relative z-10 flex h-full max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-2xl md:h-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 text-slate-400 dark:text-zinc-550 transition-all hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-600 dark:hover:text-zinc-300"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            
            {/* Left Column: Image Area - Shrunk size */}
            <div className="flex items-center justify-center rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-white p-6 md:col-span-5 h-[220px] md:h-[280px] w-full self-center">
              <img
                src={image}
                alt={title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Right Column: Info & Actions */}
            <div className="flex flex-col justify-center md:col-span-7">
              {/* Category */}
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {category}
              </span>

              {/* Title - Shrunk size */}
              <h2 className="mt-1 font-serif text-lg md:text-xl font-bold leading-snug tracking-tight text-slate-950 dark:text-zinc-50">
                {title}
              </h2>

              {/* Ratings */}
              <div className="mt-2.5 flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">{renderStars(rating.rate)}</div>
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  {rating.rate}
                </span>
                <span className="text-xs text-slate-400 dark:text-zinc-500">
                  • {rating.count} reviews
                </span>
              </div>

              {/* Price - Compact spacing */}
              <div className="mt-4 border-b border-t border-slate-100 dark:border-zinc-800/50 py-3">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-mono">Price</span>
                <div className="font-serif text-xl font-bold text-blue-600 dark:text-blue-450">
                  ${price.toFixed(2)}
                </div>
              </div>

              {/* Description - Shrunk text */}
              <div className="mt-4">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-mono">
                  Description
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                  {description}
                </p>
              </div>

              {/* Actions Area */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Quantity Selector */}
                <div className="flex items-center self-start sm:self-auto rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60 px-3 py-1.5">
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 mr-3 select-none font-mono">Qty</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 w-5 text-center select-none">
                    {quantity}
                  </span>
                  <div className="flex flex-col ml-2">
                    <button
                      onClick={incrementQty}
                      className="text-slate-400 dark:text-zinc-555 hover:text-slate-600 dark:hover:text-zinc-300"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={decrementQty}
                      className="text-slate-400 dark:text-zinc-555 hover:text-slate-600 dark:hover:text-zinc-300"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition-all duration-350 ${
                    isAdded
                      ? "bg-emerald-600 text-white font-bold"
                      : "bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-250 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-750"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Buy Now (Dummy) */}
                <button
                  onClick={() => alert("Proceeding to dummy checkout...")}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/10 transition-all duration-305 hover:from-blue-500 hover:to-blue-600"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
