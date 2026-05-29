/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  FileText, 
  Printer, 
  Smartphone, 
  Globe2, 
  Laptop, 
  ShieldCheck, 
  Check, 
  MousePointer, 
  Layers,
  Camera,
  Wrench,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import LagoExpertLogo from "./LagoExpertLogo";

interface CyberServicesProps {
  whatsappNumber?: string;
}

export default function CyberServices({ whatsappNumber = "593988384767" }: CyberServicesProps) {
  const services = [
    {
      icon: <FileText className="w-6 h-6 text-[#0D47A1]" />,
      iconBg: "bg-[#E3F2FD] border-[#BBDEFB]",
      title: "Trabajos Escolares e Investigaciones",
      description: "Realizamos consultas académicas, resúmenes organizados, diapositivas, proyectos, ensayos y tareas escolares a tiempo y con formato formal impecable.",
      popular: true,
      badge: "El más solicitado"
    },
    {
      icon: <Printer className="w-6 h-6 text-[#E65100]" />,
      iconBg: "bg-[#FFEBE0] border-[#FFCCBC]",
      title: "Copias, Impresiones & Escaneos",
      description: "Impresión de alta definición a color y blanco/negro en papel Bond de calidad. Digitalizaciones nítidas directo a tu correo, pendrive o WhatsApp.",
      popular: false
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#1B5E20]" />,
      iconBg: "bg-[#E8F5E9] border-[#C8E6C9]",
      title: "Recargas de Celular & Paquetes",
      description: "Recargas estables e instantáneas para todas las compañías: Claro, Movistar, CNT, Tuenti. ¡Activa tus paquetes de datos hoy mismo!",
      popular: true,
      badge: "Todas las marcas"
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#4A148C]" />,
      iconBg: "bg-[#F3E5F5] border-[#E1BEE7]",
      title: "Trámites Públicos en Línea (SRI/IESS/AMT)",
      description: "Consultas de multas de tránsito, turnos de matriculación, facturación electrónica básica, certificados penales e historial de aportaciones.",
      popular: false
    },
    {
      icon: <Layers className="w-6 h-6 text-[#FF6F00]" />,
      iconBg: "bg-[#FFF8E1] border-[#FFE082]",
      title: "Venta de Accesorios Tecnológicos",
      description: "Mouses ergonómicos ópticos, cables USB reforzados, cargadores rápidos, teclados en español, pendrives, audífonos y repuestos básicos.",
      popular: false
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#006064]" />,
      iconBg: "bg-[#E0F7FA] border-[#B2EBF2]",
      title: "Mantenimiento & Formateo de Laptops",
      description: "Limpieza interna profunda, formateabilidad de sistema operativo, instalación de paquetes de oficina estables, controladores y antivirus confiables.",
      popular: false
    },
    {
      icon: <Check className="w-6 h-6 text-[#1A237E]" />,
      iconBg: "bg-[#E8EAF6] border-[#C5CAE9]",
      title: "Anillados & Plastificados de Documentos",
      description: "Encuadernación de tesis y tareas con tapas plásticas de alta resistencia. Plastificación rígida protectora para cédulas, licencias y matrículas.",
      popular: false
    },
    {
      icon: <Camera className="w-6 h-6 text-[#880E4F]" />,
      iconBg: "bg-[#FCE4EC] border-[#F8BBD0]",
      title: "Fotos Tamaño Carnet al Instante",
      description: "Captura y edición fotográfica inmediata para tus trámites, matrículas estudiantiles, solicitudes de empleo, impresas en papel brillante de alta gama.",
      popular: false
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#B71C1C]" />,
      iconBg: "bg-[#FFEBEE] border-[#FFCDD2]",
      title: "Mantenimiento de Sistemas de Tinta",
      description: "Expulsión de burbujas de aire, limpieza de cabezales Epson Ecotank obstruidos y purga del sistema continuo de tintas para mantener tus impresiones perfectas.",
      popular: true,
      badge: "Especialidad"
    },
    {
      icon: <Laptop className="w-6 h-6 text-[#37474F]" />,
      iconBg: "bg-[#ECEFF1] border-[#CFD8DC]",
      title: "Consultas y Descargas Generales",
      description: "Búsqueda web guiada en portales públicos, descargas seguras de formularios escolares, impresión de comprobantes de pago y facturas.",
      popular: false
    }
  ];

  return (
    <section id="cyber-services" className="py-24 bg-gradient-to-b from-[#F7F9FC] to-[#FFF9F5] relative overflow-hidden border-t border-slate-200">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-pink-150/15 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header content with beautiful pastels */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#FFF3EC] border border-[#FFD8BF] text-[#E65100] text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Soluciones del Día a Día
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            ¡Mucho más que un Cyber! <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E65100] via-[#D81B60] to-[#0D47A1]">Todo lo que Hacemos y Resolvemos por Ti</span>
          </h2>
          <p className="text-slate-600 md:text-lg leading-relaxed font-light">
            En nuestro punto físico de Lago Agrio encuentras ayuda experta para tus consultas académicas, trámites gubernamentales, consumibles informáticos y reparaciones con la calidez de siempre.
          </p>
        </div>

        {/* Services Grid with Hover Interactivity and beautiful pastel circles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((svc, index) => (
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.03), 0 8px 10px -6px rgb(0 0 0 / 0.02)" }}
              transition={{ duration: 0.2 }}
              key={index}
              className={`bg-white border rounded-3xl p-6 md:p-8 flex flex-col justify-between relative transition-all ${
                svc.popular 
                  ? "border-[#FFCCBC]/70 ring-1 ring-[#FFCCBC]/20 shadow-md shadow-[#FFEBE0]/50" 
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <div>
                {/* Popular badges */}
                {svc.popular && (
                  <span className="absolute top-4 right-4 bg-[#FFEBE0] text-[#E65100] border border-[#FFCCBC] font-extrabold text-[9px] uppercase px-2.5 py-1 rounded-full tracking-wider">
                    {svc.badge}
                  </span>
                )}

                <div className={`w-12 h-12 rounded-2xl ${svc.iconBg} border flex items-center justify-center mb-6 shadow-sm`}>
                  {svc.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-800 leading-snug mb-3 min-h-[50px] flex items-center">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {svc.description}
                </p>
              </div>

              {/* Fast Direct Action */}
              <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Atención Directa</span>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hola Luis! Me interesa consultarte acerca del servicio: *${encodeURIComponent(svc.title)}*`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#E65100] hover:text-orange-700 font-extrabold bg-[#FFF3EC] hover:bg-[#FFE0B2] border border-[#FFD8BF] px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  Solicitar aquí
                  <MousePointer className="w-3.5 h-3.5 text-[#E65100]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Pastel Callout instead of dark block */}
        <div className="mt-16 bg-gradient-to-r from-[#FFF5EE] via-[#E8F5E9] to-[#E3F2FD] text-slate-800 rounded-3xl p-8 md:p-10 border border-[#FFE0D3]/70 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <LagoExpertLogo variant="circle-only" className="w-8 h-8 shadow-sm border border-[#FFD8BF]/60" />
              <span className="text-xs bg-[#FFF3EC] border border-[#FFD8BF] text-[#E65100] px-3 py-1.5 rounded-full font-black uppercase tracking-wider inline-block">
                Cyber & Insumos Lago Expert
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold leading-none tracking-tight text-slate-900 mt-2">
              ¿Por qué somos la mejor opción de Lago Agrio?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Garantizamos soluciones rápidas en investigaciones estudiantiles de alta calificación, impresiones vivas en color, y consumibles Epson garantizados con acompañamiento de por vida para el funcionamiento de tu impresora.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto flex-shrink-0">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center">
              <span className="text-[#E65100] text-xl font-black block leading-none">100%</span>
              <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mt-1 block">Rápido</span>
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center">
              <span className="text-[#0D47A1] text-xl font-black block leading-none">Original</span>
              <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mt-1 block">Garantizado</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
