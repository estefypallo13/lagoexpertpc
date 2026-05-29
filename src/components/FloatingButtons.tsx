/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PhoneCall, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingButtonsProps {
  whatsappNumber: string;
}

export default function FloatingButtons({ whatsappNumber }: FloatingButtonsProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const formattedPhone = whatsappNumber === "593988384767" 
    ? "+593 98 838 4767" 
    : whatsappNumber === "59399022100"
      ? "+593 99  022 100"
      : `+${whatsappNumber.slice(0, 3)} ${whatsappNumber.slice(3, 5)} ${whatsappNumber.slice(5, 8)} ${whatsappNumber.slice(8)}`;
  const rawPhone = whatsappNumber;

  // Prepares the quick message text
  const quickMessage = encodeURIComponent(
    "¡Hola LAGO EXPERT PC! Estoy viendo su página web y me gustaría cotizar servicios / tintas Epson."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Dynamic Tooltip Invitation - updated to fit the light pastel aesthetic */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto bg-white text-slate-800 rounded-2xl shadow-xl p-4.5 border border-[#FFE0D3] max-w-[280px] flex flex-col gap-2.5 shadow-orange-100/40 relative"
          >
            {/* Little bubble beak pointing down on right corner */}
            <div className="absolute right-6 -bottom-2 w-4 h-4 bg-white border-r border-b border-[#FFE0D3] rotate-45"></div>

            <div className="flex justify-between items-center">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FFF3EC] border border-[#FFD8BF] text-[#E65100] text-[9.5px] font-black uppercase rounded-full tracking-wider shadow-sm">
                <Sparkles className="w-2.5 h-2.5 animate-pulse text-[#E65100]" /> ¿Necesitas ayuda?
              </span>
              <button 
                onClick={() => setShowTooltip(false)}
                className="text-slate-400 hover:text-slate-600 transition p-1 hover:bg-slate-50 rounded-lg cursor-pointer"
                aria-label="Cerrar invitación"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Esríbenos por WhatsApp para cotizar tus tintas, servicios de cyber o programar un mantenimiento hoy mismo.
            </p>
            
            <div className="flex items-center gap-1.5 text-[#25D366] font-extrabold text-xs">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              <span>Luis Pallo · Online</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Floating Call Button */}
        <a
          href={`tel:${rawPhone}`}
          className="group flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-[#0D47A1] w-14 hover:w-48 h-14 rounded-full transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden cursor-pointer"
          title="Llamar directamente"
        >
          <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-slate-500 group-hover:text-[#0D47A1] transition-colors" />
          </div>
          <span className="font-extrabold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 whitespace-nowrap pr-5 transition-opacity duration-300">
            Llamar: {formattedPhone}
          </span>
        </a>

        {/* Floating WhatsApp Action Button - with official WhatsApp branding and glowing pulses */}
        <a
          href={`https://wa.me/${rawPhone}?text=${quickMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] hover:scale-105 active:scale-95 text-white w-14 hover:w-60 h-14 rounded-full transition-all duration-300 shadow-xl overflow-hidden cursor-pointer relative"
          title="Chatear por WhatsApp"
        >
          {/* Pulsating glowing halo */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10"></div>
          
          <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
            {/* High-fidelity official SVG logo of WhatsApp */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 0C5.39 0 .002 5.39.002 12.029c0 2.125.556 4.197 1.614 6.015L0 24l6.135-1.61c1.782 1.01 3.845 1.543 5.894 1.543 6.64 0 12.028-5.387 12.028-12.029C24.057 5.39 18.669 0 12.03 0zm6.915 16.927c-.28.784-1.217 1.417-1.921 1.512-.66.089-1.52.12-3.111-.532-2.032-.835-3.327-2.91-3.428-3.045-.1-.135-.807-1.071-.807-2.043 0-.972.508-1.45.69-1.637.18-.188.4-.234.532-.234.135 0 .27-.003.385.004.12.008.283-.047.443.344.164.4.562 1.374.611 1.472.05.1.082.215.016.344-.065.13-.1.21-.197.324-.1.115-.213.257-.3.348-.1.096-.2.2-.086.398.115.197.514.85 1.103 1.375.76.677 1.4 1 1.6-.013c.203-.1.513-.23.633.25.12.13.784 1.545.922 1.823.137.28.137.513.046.732s-.654.85-.922.923z" />
            </svg>
          </div>
          <div className="flex flex-col pr-5 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 text-left">
            <span className="font-extrabold text-xs uppercase tracking-wider leading-none">Chatear por WhatsApp</span>
            <span className="text-[10px] text-emerald-100 mt-1 font-bold font-mono">{formattedPhone}</span>
          </div>
        </a>
      </div>

    </div>
  );
}
