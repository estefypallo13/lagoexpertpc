/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LagoExpertLogoProps {
  className?: string;
  variant?: "full" | "circle-only" | "icon-only";
}

export default function LagoExpertLogo({ className = "w-16 h-16", variant = "full" }: LagoExpertLogoProps) {
  // SVG drawing representing the custom logo from the uploaded attachment.
  // The split background, white circle, monitors, crossed tools, orbit ring, and brand name.
  
  if (variant === "icon-only") {
    return (
      <svg
        viewBox="0 0 320 240"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Computer outline / chassis in dark zinc */}
        <path
          d="M80 150 L80 80 L240 80 L240 150"
          stroke="#1E293B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Stylized Orbit Ring (swooshes) wrapping around */}
        <path
          d="M50 135 C 50 195, 270 195, 270 135"
          stroke="#3B82F6"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M270 135 C 270 75, 50 75, 50 135"
          stroke="#1E3A8A"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.25"
          strokeDasharray="4 4"
        />

        {/* Crossed Tools: Wrench (grey) and Screwdriver (orange) */}
        {/* Wrench from bottom-left to top-right */}
        <g transform="translate(160,115) rotate(-45) translate(-160,-115)">
          {/* Handle */}
          <rect x="153" y="80" width="14" height="70" rx="3" fill="#64748B" />
          {/* Inner metallic line */}
          <rect x="157" y="90" width="6" height="50" rx="1" fill="#475569" />
          {/* Bottom head */}
          <circle cx="160" cy="148" r="12" fill="#64748B" />
          <circle cx="160" cy="148" r="5" fill="#FFFFFF" />
          {/* Top jaw */}
          <path
            d="M148 76 C148 64, 172 64, 172 76 L168 86 L152 86 Z"
            fill="#64748B"
          />
          {/* Jaw cutout */}
          <polygon points="154,64 166,64 160,78" fill="#FFFFFF" />
        </g>

        {/* Screwdriver from top-left to bottom-right */}
        <g transform="translate(160,115) rotate(45) translate(-160,-115)">
          {/* Metal shafts */}
          <rect x="156" y="60" width="8" height="60" fill="#94A3B8" />
          <rect x="154" y="118" width="12" height="4" fill="#475569" />
          {/* Tip */}
          <rect x="157" y="54" width="6" height="6" fill="#475569" />
          {/* Handle - Orange with black/white stripes */}
          <rect x="146" y="122" width="28" height="42" rx="6" fill="#EA580C" />
          {/* Handle black grip strips */}
          <rect x="151" y="126" width="4" height="34" rx="1" fill="#1E293B" />
          <rect x="158" y="126" width="4" height="34" rx="1" fill="#1E293B" />
          <rect x="165" y="126" width="4" height="34" rx="1" fill="#1E293B" />
        </g>
      </svg>
    );
  }

  if (variant === "circle-only") {
    return (
      <div className={`relative flex items-center justify-center bg-white rounded-full ${className} shadow-md border border-slate-100`}>
        {/* Core elements inside the white circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          {/* Custom SVG Icon */}
          <div className="w-[60%] h-[50%] mt-2">
            <svg
              viewBox="0 0 320 240"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Computer outline / chassis in dark slate */}
              <path
                d="M80 150 L80 80 L240 80 L240 150"
                stroke="#1E293B"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Stylized Orbit Ring (swooshes) wrapping around */}
              <path
                d="M45 135 C 45 200, 275 200, 275 135"
                stroke="#2563EB"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M275 135 C 275 70, 45 70, 45 135"
                stroke="#1E3A8A"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.25"
                strokeDasharray="4 4"
              />

              {/* Crossed Tools: Wrench (grey) and Screwdriver (orange) */}
              {/* Wrench from bottom-left to top-right */}
              <g transform="translate(160,115) rotate(-45) translate(-160,-115)">
                <rect x="153" y="75" width="14" height="75" rx="3" fill="#64748B" />
                <rect x="157" y="85" width="6" height="55" rx="1" fill="#475569" />
                <circle cx="160" cy="146" r="13" fill="#64748B" />
                <circle cx="160" cy="146" r="5" fill="#FFFFFF" />
                <path
                  d="M146 72 C146 60, 174 60, 174 72 L169 82 L151 82 Z"
                  fill="#64748B"
                />
                <polygon points="154,60 166,60 160,74" fill="#FFFFFF" />
              </g>

              {/* Screwdriver from top-left to bottom-right */}
              <g transform="translate(160,115) rotate(45) translate(-160,-115)">
                <rect x="156" y="55" width="8" height="65" fill="#94A3B8" />
                <rect x="154" y="118" width="12" height="4" fill="#475569" />
                <rect x="157" y="49" width="6" height="6" fill="#475569" />
                <rect x="146" y="122" width="28" height="44" rx="6" fill="#EA580C" />
                <rect x="151" y="126" width="4" height="36" rx="1" fill="#1E293B" />
                <rect x="158" y="126" width="4" height="36" rx="1" fill="#1E293B" />
                <rect x="165" y="126" width="4" height="36" rx="1" fill="#1E293B" />
              </g>
            </svg>
          </div>

          <div className="text-center mt-1 flex flex-col justify-center items-center w-full">
            <span className="block text-[11%] font-black tracking-tight text-[#0D47A1] uppercase whitespace-nowrap leading-none">
              LAGO EXPERT PC
            </span>
            <span className="block text-[6.5%] font-extrabold text-[#E65100] tracking-widest uppercase leading-none mt-1">
              SERVICIOS TECNOLÓGICOS
            </span>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: FULL VARIANT - Split blue/orange background containing white circle with tools & branding
  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className} rounded-3xl shadow-lg border border-slate-200/20 group`}>
      {/* Background diagonally split from top-left to bottom-right */}
      <div className="absolute inset-0 bg-[#0D47A1]"></div> {/* Left-bottom half */}
      <div 
        className="absolute inset-0 bg-[#E65100]" 
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      ></div> {/* Right-top half */}
      
      {/* Central White Circle */}
      <div className="relative w-[84%] h-[84%] bg-white rounded-full flex flex-col items-center justify-center p-2 shadow-inner group-hover:scale-102 transition-transform duration-300">
        
        {/* Core elements inside the white circle */}
        <div className="w-[60%] h-[50%] mt-2">
          <svg
            viewBox="0 0 320 240"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Computer outline / chassis */}
            <path
              d="M80 150 L80 80 L240 80 L240 150"
              stroke="#0D47A1"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Orbit ring */}
            <path
              d="M45 135 C 45 200, 275 200, 275 135"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M275 135 C 275 70, 45 70, 45 135"
              stroke="#1E3A8A"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.25"
              strokeDasharray="4 4"
            />

            {/* Wrench from bottom-left to top-right */}
            <g transform="translate(160,115) rotate(-45) translate(-160,-115)">
              <rect x="153" y="75" width="14" height="75" rx="3" fill="#64748B" />
              <rect x="157" y="85" width="6" height="55" rx="1" fill="#475569" />
              <circle cx="160" cy="146" r="13" fill="#64748B" />
              <circle cx="160" cy="146" r="5" fill="#FFFFFF" />
              <path
                d="M146 72 C146 60, 174 60, 174 72 L169 82 L151 82 Z"
                fill="#64748B"
              />
              <polygon points="154,60 166,60 160,74" fill="#FFFFFF" />
            </g>

            {/* Screwdriver from top-left to bottom-right */}
            <g transform="translate(160,115) rotate(45) translate(-160,-115)">
              <rect x="156" y="55" width="8" height="65" fill="#94A3B8" />
              <rect x="154" y="118" width="12" height="4" fill="#475569" />
              <rect x="157" y="49" width="6" height="6" fill="#475569" />
              <rect x="146" y="122" width="28" height="44" rx="6" fill="#E65100" />
              <rect x="151" y="126" width="4" height="36" rx="1" fill="#1E293B" />
              <rect x="158" y="126" width="4" height="36" rx="1" fill="#1E293B" />
              <rect x="165" y="126" width="4" height="36" rx="1" fill="#1E293B" />
            </g>
          </svg>
        </div>

        <div className="text-center mt-1 w-full px-2">
          <span className="block text-[11%] font-black tracking-tight text-[#0D47A1] uppercase whitespace-nowrap leading-none">
            LAGO EXPERT PC
          </span>
          <span className="block text-[6.5%] font-extrabold text-[#E65100] tracking-widest uppercase leading-none mt-1">
            SERVICIOS TECNOLÓGICOS
          </span>
        </div>

      </div>
    </div>
  );
}
