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
  Sparkles,
  HeartHandshake,
  Scale,
  Zap,
  Leaf,
  CreditCard
} from "lucide-react";
import { motion } from "motion/react";
import LagoExpertLogo from "./LagoExpertLogo";

interface CyberServicesProps {
  whatsappNumber?: string;
}

export default function CyberServices({ whatsappNumber = "593988384767" }: CyberServicesProps) {
  interface RateItem {
    label: string;
    value: string;
  }

  interface ServiceItem {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    description: string;
    popular?: boolean;
    badge?: string;
    price?: string;
    priceLabel?: string;
    rates?: RateItem[];
  }

  const services: ServiceItem[] = [
    {
      icon: <Scale className="w-6 h-6 text-[#E65100]" />,
      iconBg: "bg-[#FFEBE0] border-[#FFCCBC]",
      title: "Trámites SRI (Declaraciones y RUC)",
      description: "Asesoría en inscripción de RIMPE, facturación electrónica para tu negocio, declaraciones mensuales/semestrales del IVA, consulta y obtención de clave del SRI sin demoras.",
      price: "$1.50",
      priceLabel: "Declaración en 0",
      popular: true,
      badge: "SRI Oficial"
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#0D47A1]" />,
      iconBg: "bg-[#B3E5FC] border-[#81D4FA]",
      title: "Trámites IESS (Certificados y Préstamos)",
      description: "Generación de mecanizado de aportaciones, claves de afiliado, consultas de fondos de reserva, solicitudes de préstamos quirografarios y trámites patronales en línea.",
      price: "$0.50",
      priceLabel: "Consulta de Mecanizado",
      popular: true,
      badge: "IESS Express"
    },
    {
      icon: <FileText className="w-6 h-6 text-[#E65100]" />,
      iconBg: "bg-[#FFEBE0] border-[#FFCCBC]",
      title: "Redacción de Solicitudes u Oficios",
      description: "Informes estructurados, correspondencia, oficios formales y solicitudes dirigidas a entidades escolares o públicas con redacción profesional.",
      price: "$1.00",
      priceLabel: "Elaboración de Oficio",
      popular: true,
      badge: "Recomendado"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#B71C1C]" />,
      iconBg: "bg-[#FFEBEE] border-[#FFCDD2]",
      title: "Consulta de Récord Policial",
      description: "Obtención inmediata del Certificado de Antecedentes Penales del Ministerio de Gobierno. Listo para imprimir en alta definición.",
      rates: [
        { label: "Blanco y Negro (B/N)", value: "$0.50" },
        { label: "Impresión a Color", value: "$1.00" }
      ],
      popular: false
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-800" />,
      iconBg: "bg-[#E8F5E9] border-[#C8E6C9]",
      title: "Recargas de Celular & Paquetes Directos",
      description: "Recargas estables de saldo al instante para todas las operadoras del Ecuador: Claro, Movistar, CNT y Tuenti. Activación directa de combos de megas y minutos.",
      popular: false
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-700" />,
      iconBg: "bg-emerald-50 border-emerald-250",
      title: "Guías de Ambiente y Movilización Forestal",
      description: "Asesoría completa para trámites de guías de movilización forestal en el sistema SAF del Ministerio del Ambiente (MAATE). Registro de predios y trámites ambientales locales para Lago Agrio.",
      popular: false
    },
    {
      icon: <CreditCard className="w-6 h-6 text-indigo-700" />,
      iconBg: "bg-[#E8EAF6] border-indigo-150",
      title: "Pago de Servicios Públicos y Planillas",
      description: "Realizamos el pago seguro de planillas de luz de CNEL, servicio de agua potable de Lago Agrio, tasas de la ANT, matrículas automotrices y multas estatales de manera directa.",
      popular: false
    },
    {
      icon: <FileText className="w-6 h-6 text-[#0D47A1]" />,
      iconBg: "bg-[#B3E5FC] border-[#81D4FA]",
      title: "Trabajos de Escuelas y Colegios",
      description: "Realizamos consultas académicas rápidas, resúmenes organizados, transcripciones, ensayos, diseño de diapositivas y tareas escolares a tiempo con presentación impecable.",
      price: "$1.00",
      priceLabel: "Tarifa Base",
      popular: true,
      badge: "Escolar"
    },
    {
      icon: <Layers className="w-6 h-6 text-[#E65100]" />,
      iconBg: "bg-[#FFEBE0] border-[#FFCCBC]",
      title: "Proyectos de Colegios (Grado y Monografías)",
      description: "Asesoría, formateo y estructuración de Proyectos de Grado, Estudios de Caso de Bachillerato y monografías escolares bajo normas APA profesionales.",
      price: "Asesoría de Calidad",
      priceLabel: "Estructuración",
      popular: true,
      badge: "Especialidad"
    },
    {
      icon: <Scale className="w-6 h-6 text-indigo-700" />,
      iconBg: "bg-indigo-50 border-indigo-200",
      title: "Trámites Contraloría del Estado",
      description: "Generación ágil del Certificado de No tener Impedimento para ejercer Cargo Público, así como consultas del estado patrimonial y deudores del Estado en línea.",
      price: "$1.00",
      priceLabel: "Certificado",
      popular: false
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-pink-700" />,
      iconBg: "bg-pink-50 border-pink-100",
      title: "Referencias & Certificados de Honorabilidad",
      description: "Redacción formal y profesional de Referencias Comerciales, Referencias Laborales y Certificaciones personales de Honorabilidad listas para tu carpeta de empleo.",
      price: "$1.00",
      priceLabel: "Por Certificado",
      popular: false
    },
    {
      icon: <Printer className="w-6 h-6 text-[#E65100]" />,
      iconBg: "bg-[#FFEBE0] border-[#FFCCBC]",
      title: "Copias, Impresiones & Escaneos",
      description: "Impresión de alta definición a color y blanco/negro en papel Bond de calidad. Digitalizaciones nítidas directo a tu correo, pendrive o WhatsApp.",
      popular: false
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#B71C1C]" />,
      iconBg: "bg-[#FFEBEE] border-[#FFCDD2]",
      title: "Mantenimiento de Sistemas de Tinta",
      description: "Expulsión de burbujas de aire, limpieza de cabezales Epson Ecotank obstruidos y purga del sistema continuo de tintas para mantener tus impresiones perfectas.",
      popular: true,
      badge: "Especialistas"
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#006064]" />,
      iconBg: "bg-[#E0F7FA] border-[#B2EBF2]",
      title: "Mantenimiento & Formateo de Laptops",
      description: "Limpieza interna profunda, formateabilidad de sistema operativo, instalación de paquetes de oficina estables, controladores y antivirus confiables.",
      popular: false
    },
    {
      icon: <Layers className="w-6 h-6 text-[#FF6F00]" />,
      iconBg: "bg-[#FFF8E1] border-[#FFE082]",
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
    }
  ];

  return (
    <section id="cyber-services" className="py-24 bg-gradient-to-b from-[#F7F9FC] to-[#FFF9F5] relative overflow-hidden border-t border-slate-200">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-pink-150/15 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header content with beautiful pastels */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#E8F5E9] border border-[#C8E6C9] text-emerald-800 text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-600" /> Servicios Especializados
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Servicios Profesionales de Cyber e Impresión <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#E65100] to-[#D81B60]">Soluciones de Alta Calidad y Confianza Total</span>
          </h2>
          <p className="text-slate-650 md:text-lg leading-relaxed font-light">
            En nuestro punto físico de Lago Agrio encuentras ayuda experta y herramientas profesionales para tus consultas académicas, trámites gubernamentales oficiales, reparaciones y consumibles.
          </p>
        </div>

        {/* Services Grid with Hover Interactivity and beautiful pastel circles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((svc, index) => (
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 25px 30px -5px rgb(230 81 0 / 0.06), 0 10px 15px -6px rgb(13 71 161 / 0.04)" }}
              transition={{ duration: 0.25 }}
              key={index}
              className={`border rounded-3xl p-6 md:p-8 flex flex-col justify-between relative transition-all ${
                svc.popular 
                  ? "border-[#FFB997] bg-gradient-to-b from-white to-[#FFF6F0] ring-2 ring-[#FFD8BF]/40 shadow-md shadow-[#E64A19]/5" 
                  : "border-slate-150 bg-white hover:border-slate-300 shadow-sm"
              }`}
            >
              <div>
                {/* Popular badges */}
                {svc.popular && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-[#E65100] to-orange-500 text-white font-extrabold text-[10px] uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow-sm">
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

                {/* Custom Rates / Pricing Info */}
                {svc.price && (
                  <div className="mt-4 p-2.5 bg-[#FFF9F5] border border-[#FFD8BF]/45 rounded-xl flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{svc.priceLabel || "Tarifa"}</span>
                    <span className="text-xs font-black text-[#E65100] bg-[#FFF3EC] border border-[#FFD8BF] px-2.5 py-1 rounded-lg">
                      {svc.price}
                    </span>
                  </div>
                )}

                {svc.rates && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[9px] text-[#0D47A1] font-bold uppercase tracking-wider block">Tarifas del servicio</span>
                    <div className="grid grid-cols-2 gap-2">
                      {svc.rates.map((rate, rIdx) => (
                        <div key={rIdx} className="p-2 bg-[#B3E5FC]/45 border border-blue-200 rounded-xl text-center">
                          <span className="block text-[8px] text-slate-400 font-extrabold uppercase leading-none mb-1">{rate.label}</span>
                          <span className="text-xs font-black text-[#0D47A1]">{rate.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
        <div className="mt-16 bg-gradient-to-r from-[#FFF5EE] via-[#E8F5E9] to-[#B3E5FC] text-slate-800 rounded-3xl p-8 md:p-10 border border-[#FFE0D3]/70 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <LagoExpertLogo variant="circle-only" className="w-8 h-8 shadow-sm border border-[#FFD8BF]/60" />
              <span className="text-xs bg-[#FFF3EC] border border-[#FFD8BF] text-[#E65100] px-3 py-1.5 rounded-full font-black uppercase tracking-wider inline-block">
                Cyber & Insumos Lago Expert PC
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
              <span className="text-[#2563EB] text-xl font-black block leading-none">Original</span>
              <span className="text-slate-500 font-bold text-xs uppercase tracking-wider mt-1 block">Garantizado</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
