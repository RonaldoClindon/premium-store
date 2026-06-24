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
          <Star key={i} className="h-4 w-4 fill-blue-500 text-blue-500" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalf key={i} className="h-4 w-4 fill-blue-500 text-blue-500" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-slate-200" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
        className="relative z-10 flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl md:h-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-slate-200 bg-white p-2 text-slate-400 transition-all hover:bg-slate-50 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            
            {/* Left Column: Image Area */}
            <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 md:col-span-5 h-[280px] md:h-[400px]">
              <img
                src={image}
                alt={title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Right Column: Info & Actions */}
            <div className="flex flex-col justify-center md:col-span-7">
              {/* Category */}
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {category}
              </span>

              {/* Title */}
              <h2 className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                {title}
              </h2>

              {/* Ratings */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">{renderStars(rating.rate)}</div>
                <span className="text-sm font-semibold text-slate-700">
                  {rating.rate}
                </span>
                <span className="text-sm text-slate-400">
                  • {rating.count} customer reviews
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 border-b border-t border-slate-100 py-4">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Price</span>
                <div className="font-serif text-3xl font-bold text-blue-600">
                  ${price.toFixed(2)}
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Description
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-650">
                  {description}
                </p>
              </div>

              {/* Actions Area */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Quantity Selector */}
                <div className="flex items-center self-start sm:self-auto rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  <span className="text-xs text-slate-400 mr-4 select-none font-mono">Qty</span>
                  <span className="text-sm font-semibold text-slate-800 w-6 text-center select-none">
                    {quantity}
                  </span>
                  <div className="flex flex-col ml-3">
                    <button
                      onClick={incrementQty}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={decrementQty}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 ${
                    isAdded
                      ? "bg-emerald-600 text-white font-bold"
                      : "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Buy Now (Dummy) */}
                <button
                  onClick={() => alert("Proceeding to dummy checkout...")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:from-blue-500 hover:to-blue-600"
                >
                  <CreditCard className="h-4 w-4" />
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
