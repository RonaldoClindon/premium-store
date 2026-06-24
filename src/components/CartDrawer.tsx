"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Compute Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 dark:bg-zinc-950/60 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Drawer Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="w-screen max-w-md bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-2xl flex flex-col h-full border-l border-slate-200/20 dark:border-zinc-800/80"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-zinc-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-serif font-bold text-slate-950 dark:text-zinc-50">
                Your Bag
              </h2>
              <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-650 dark:hover:text-zinc-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag className="h-16 w-16 text-slate-200 dark:text-zinc-800 stroke-[1.5]" />
                <h3 className="mt-4 font-serif text-lg font-bold text-slate-800 dark:text-zinc-200">
                  Your bag is empty
                </h3>
                <p className="mt-2 text-sm text-slate-400 dark:text-zinc-500 max-w-xs">
                  Browse our curated collections and add items to your shopping bag.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-xs font-bold transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-zinc-800/50 last:border-0 last:pb-0"
                >
                  {/* Image container */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-zinc-805 bg-white p-2 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 truncate">
                      {item.product.title}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-mono">
                      {item.product.category}
                    </span>
                    
                    <div className="mt-1 font-serif text-sm font-bold text-blue-600 dark:text-blue-400">
                      ${item.product.price.toFixed(2)}
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 dark:border-zinc-800 rounded-full bg-slate-50 dark:bg-zinc-900/60 px-2.5 py-1">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="text-slate-400 dark:text-zinc-500 hover:text-slate-650 dark:hover:text-zinc-300 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 w-8 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="text-slate-400 dark:text-zinc-500 hover:text-slate-650 dark:hover:text-zinc-300 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 dark:text-zinc-500 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="px-6 py-6 border-t border-slate-100 dark:border-zinc-800/60 bg-slate-50 dark:bg-zinc-950/20">
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900 dark:text-zinc-200 uppercase text-xs tracking-wider text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-slate-900 dark:text-zinc-100 border-t border-slate-200/60 dark:border-zinc-800/50 pt-3">
                  <span className="font-serif">Subtotal</span>
                  <span className="font-serif text-lg text-blue-600 dark:text-blue-400">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => alert("Proceeding to dummy checkout...")}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/20"
              >
                Checkout Now
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
