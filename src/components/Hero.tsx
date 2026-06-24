"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("product-grid-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-slate-100/50 to-transparent">
      {/* Background radial gradient overlay (light blue) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-serif">
          <span className="block text-slate-900">Elevate Your Lifestyle With</span>
          <span className="mt-2 block bg-gradient-to-r from-blue-600 via-blue-500 to-sky-600 bg-clip-text text-transparent drop-shadow-sm">
            Premium Curated Goods
          </span>
        </h1>

        {/* Hero Tagline */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-500 sm:text-lg">
          Discover a handpicked marketplace of world-class jewelry, apparel, and electronics. 
          Crafted for those who value authenticity, modern style, and absolute premium quality.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={scrollToProducts}
            className="group flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/20"
          >
            <span>Shop Now</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <a
            href="https://fakestoreapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-slate-350 hover:bg-slate-50 hover:text-slate-900"
          >
            API Provider
          </a>
        </div>
      </div>
    </section>
  );
}
