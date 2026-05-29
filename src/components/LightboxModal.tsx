/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function LightboxModal({ isOpen, onClose, imageSrc, imageAlt }: LightboxModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          onClick={onClose}
        >
          {/* Controls Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-zinc-300 pointer-events-none">
            <span className="text-sm font-semibold tracking-wider font-mono">
              Vista Ampliada: {imageAlt}
            </span>
            <button
              onClick={onClose}
              className="pointer-events-auto p-2.5 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 text-white cursor-pointer transition shadow-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive enlarged image */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-4xl max-h-[80vh] rounded-3xl overflow-hidden border border-zinc-850 shadow-2xl bg-zinc-950 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-contain max-h-[80vh] mx-auto select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <span className="absolute bottom-6 text-zinc-500 font-medium text-xs tracking-wide">
            Haz clic en cualquier parte de la pantalla para cerrar la vista completa
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
