/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag, 
  MessageSquare, 
  PhoneCall, 
  Search, 
  Settings, 
  Sparkles, 
  Printer, 
  ShieldCheck, 
  Truck, 
  User, 
  Star, 
  X, 
  Plus, 
  Minus,
  HelpCircle,
  Clock,
  MapPin,
  ExternalLink,
  Laptop,
  Maximize2,
  Facebook,
  Instagram
} from "lucide-react";
import { PRINTER_MODELS, REVIEWS, FAQS, PrinterModel } from "./data";
import FloatingButtons from "./components/FloatingButtons";
import CyberServices from "./components/CyberServices";
import LightboxModal from "./components/LightboxModal";
import LagoExpertLogo from "./components/LagoExpertLogo";

export default function App() {
  // Configurable Shop Settings saved to localStorage - Default phone updated as requested
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    const saved = localStorage.getItem("lago_expert_whatsapp");
    return (saved && saved !== "59399022100") ? saved : "593988384767";
  });
  const [basicPrice, setBasicPrice] = useState(() => {
    return Number(localStorage.getItem("lago_expert_price") || "15");
  });
  const [showSettings, setShowSettings] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem("lago_expert_whatsapp", whatsappNumber);
    localStorage.setItem("lago_expert_price", basicPrice.toString());
  }, [whatsappNumber, basicPrice]);

  // Compatibility Checker State
  const [searchQuery, setSearchQuery] = useState("");
  const [checkerStatus, setCheckerStatus] = useState<"idle" | "compatible" | "not_found">("idle");
  const [foundModel, setFoundModel] = useState<PrinterModel | null>(null);

  // Package builder state
  const [selectedCombo, setSelectedCombo] = useState<"combo1" | "combo2" | "combo3">("combo1");
  const [extraBlack, setExtraBlack] = useState(0);
  const [extraColor, setExtraColor] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<"retiro" | "quito" | "nacional">("retiro");
  const [buyerName, setBuyerName] = useState("");
  const [buyerCity, setBuyerCity] = useState("Nueva Loja");
  const [printerSelection, setPrinterSelection] = useState("");

  // Review Filters
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<"todos" | "negocio" | "estudiante" | "familia" | "docente">("todos");

  // Accordion FAQs state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Active color info box
  const [activeColorTab, setActiveColorTab] = useState<"K" | "C" | "M" | "Y">("K");

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handler for Compatibility Checker
  const handleCheckCompatibility = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setCheckerStatus("idle");
      setFoundModel(null);
      return;
    }

    const cleanQuery = query.toLowerCase().replace(/\s+/g, "");
    const match = PRINTER_MODELS.find(model => 
      model.name.toLowerCase().replace(/\s+/g, "").includes(cleanQuery) ||
      cleanQuery.includes(model.name.toLowerCase().replace(/\s+/g, ""))
    );

    if (match) {
      setCheckerStatus("compatible");
      setFoundModel(match);
    } else {
      setCheckerStatus("not_found");
      setFoundModel(null);
    }
  };

  const selectQuickModel = (model: PrinterModel) => {
    setSearchQuery(model.name);
    setCheckerStatus("compatible");
    setFoundModel(model);
    setPrinterSelection(model.name);
  };

  // Helper values for pricing calculus
  const combosDetails = {
    combo1: { name: "1 Set Completo (4 Tintas)", price: basicPrice, quantity: 1, savings: 0 },
    combo2: { name: "2 Sets Completos (8 Tintas)", price: basicPrice * 2 - 2, quantity: 2, savings: 2 },
    combo3: { name: "3 Sets Completos (12 Tintas)", price: basicPrice * 3 - 5, quantity: 3, savings: 5 },
  };

  const deliveryPrices = {
    retiro: { name: "Retirar en Punto Físico", price: 0 },
    quito: { name: "Entrega coordinada en Lago Agrio", price: 2.5 },
    nacional: { name: "Envío Nacional Servientrega", price: 4.5 },
  };

  const extraBlackPrice = 4;
  const extraColorPrice = 4;

  const calculateSubtotal = () => {
    const comboPrice = combosDetails[selectedCombo].price;
    const extrasPrice = (extraBlack * extraBlackPrice) + (extraColor * extraColorPrice);
    return comboPrice + extrasPrice;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryPrices[deliveryMethod].price;
  };

  // WhatsApp link generator
  const getWhatsAppLink = (customText?: string) => {
    if (customText) {
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customText)}`;
    }

    const combo = combosDetails[selectedCombo];
    const delivery = deliveryPrices[deliveryMethod];
       let messageText = `¡Hola Luis! Me interesa hacer un pedido en LAGO EXPERT PC:\n\n`;
    messageText += `*📦 DETALLE DEL PEDIDO:*\n`;
    messageText += `• Opción: ${combo.name} ($${combo.price})\n`;
    
    if (extraBlack > 0) {
      messageText += `• Extras Negro: ${extraBlack} Botella(s) ($${extraBlack * extraBlackPrice})\n`;
    }
    if (extraColor > 0) {
      messageText += `• Extras Color: ${extraColor} Botella(s) (C/M/Y) ($${extraColor * extraColorPrice})\n`;
    }
    
    messageText += `• Entrega: ${delivery.name} ($${delivery.price})\n`;
    if (printerSelection.trim()) {
      messageText += `• Impresora: Epson ${printerSelection.trim()}\n`;
    }
    messageText += `• *Total Estimado: $${calculateTotal()}*\n\n`;
 
    messageText += `*👤 DATOS DE ENVÍO:*\n`;
    messageText += `• Nombre: ${buyerName.trim() || "[Escribe tu nombre]"}\n`;
    messageText += `• Ciudad/Ubicación: ${buyerCity.trim()}\n\n`;
    messageText += `¿Me ayudas confirmando disponibilidad para concretar mi compra? Gracias Luis.`;

    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${whatsappNumber}?text=${encodedText}`;
  };

  // Filtered reviews
  const filteredReviews = selectedReviewFilter === "todos" 
    ? REVIEWS 
    : REVIEWS.filter(r => r.tag === selectedReviewFilter);

  // Social handles definitions
  const socialLinks = {
    whatsapp: `https://wa.me/${whatsappNumber}`,
    facebook: "https://www.facebook.com/share/p/lagoexpertpc",
    instagram: "https://www.instagram.com/lagoexpertpc",
    tiktok: "https://www.tiktok.com/@lagoexpertpc"
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-950 selection:bg-orange-500 selection:text-white relative">
      
      {/* PERSISTENT FLOATING ACTIONS - DEFAULTED TO +593 98 838 4767 */}
      <FloatingButtons whatsappNumber={whatsappNumber} />

      {/* DEVELOPER SETTINGS BAR FOR JOHANNA */}
      <div className="bg-zinc-900 text-white text-xs border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-zinc-300">Modo Administrador · Personalizar Página</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded transition font-semibold text-zinc-200 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              {showSettings ? "Cerrar Configuración" : "Modificar WhatsApp / Tarifas"}
            </button>
          </div>
        </div>

        {/* Dynamic sliding drawer settings */}
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-zinc-800 bg-zinc-950 overflow-hidden"
            >
              <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">WhatsApp del Administrador (Actualmente +593 98 838 4767)</label>
                  <input 
                    type="text" 
                    value={whatsappNumber} 
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white font-mono focus:border-orange-550 focus:outline-none"
                    placeholder="Ej. 593988384767"
                  />
                  <p className="text-zinc-550 text-xs mt-1">Ingresa el teléfono sin el símbolo "+" ni espacios intermedios.</p>
                </div>
                <div>
                  <label className="block text-zinc-400 font-bold mb-1">Precio Base de Combo 1 Set ($ USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-zinc-500 font-bold">$</span>
                    <input 
                      type="number" 
                      value={basicPrice} 
                      onChange={(e) => setBasicPrice(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 pl-7 text-white font-mono focus:border-orange-550 focus:outline-none"
                    />
                  </div>
                  <p className="text-zinc-550 text-xs mt-1">El cotizador calculará los descuentos de forma enteramente automática.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TOP HEADER & SOCIAL NAV */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          
          {/* Logo brand representing the uploaded image banner */}
          <a href="#" className="flex items-center gap-3.5 group">
            {/* Real vector Lago Expert PC Logo - enlarged for maximum brand presence */}
            <LagoExpertLogo variant="full" className="w-16 h-16 md:w-22 md:h-22 flex-shrink-0 group-hover:scale-105 transition-all duration-300" />
            
            <div className="text-left">
              {/* Massive Bold Logo Letters */}
              <span className="block text-2xl md:text-3xl font-black tracking-tighter text-[#0D47A1] uppercase leading-none">
                LAGO EXPERT PC
              </span>
              <span className="block text-[9px] md:text-[11px] uppercase tracking-widest font-extrabold text-[#E65100] leading-none mt-1.5">
                Servicios Tecnológicos, Cyber e Insumos
              </span>
            </div>
          </a>

          {/* Social Network Icons on Top Header with combination of beautiful pastels */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            <span className="hidden lg:inline-block text-[10px] uppercase font-black text-slate-400 tracking-wider">Redes Oficiales:</span>
            
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-[#E8F0FE] border border-[#D2E3FC] text-[#1877F2] hover:bg-[#D2E3FC] rounded-full transition-all hover:scale-110 cursor-pointer shadow-sm"
              title="Síguenos en Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-[#FDF0F5] border border-[#FCE2EC] text-[#E1306C] hover:bg-[#FCE2EC] rounded-full transition-all hover:scale-110 cursor-pointer shadow-sm"
              title="Síguenos en Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a 
              href={socialLinks.tiktok} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-zinc-50 border border-zinc-200 text-zinc-850 hover:bg-zinc-200 rounded-full transition-all hover:scale-110 cursor-pointer shadow-sm"
              title="Síguenos en TikTok"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.41-.43-.61-.65-.01.01-.01.01-.02.02v6.64c.03 2.24-1.02 4.41-2.92 5.54-1.9 1.13-4.41 1.25-6.39.29-1.99-.97-3.23-3.15-3.08-5.38.14-2.11 1.57-4.04 3.63-4.57 1.19-.31 2.47-.13 3.53.47.01-1.13.01-6.57.01-7.7-.13.02-.27.03-.4.06-1.51.3-2.82 1.4-3.32 2.87-.5 1.47-.23 3.19.68 4.4 1 1.33 2.67 1.95 4.29 1.7V8.12c-.52.06-1.05-.04-1.5-.31-.56-.34-.91-.95-.91-1.61 0-.66.35-1.27.91-1.61.42-.25.92-.35 1.41-.31.14.01.29.04.43.08V.02z" />
              </svg>
            </a>

            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-[#E6F4EA] border border-[#CEEAD6] text-[#1E8E3E] hover:bg-[#CEEAD6] rounded-full transition-all hover:scale-110 cursor-pointer shadow-sm"
              title="Escríbenos por WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
            </a>

            {/* Quick Action Link to Main Cotizador */}
            <a 
              href="#cotizar" 
              className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#E65100] hover:bg-orange-700 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Hacer Pedido
            </a>
          </div>

        </div>
      </header>

      {/* HERO SECTION - REFINED ULTRA-DENSE WITH MASSIVE TYPOGRAPHY & LIGHTBOX IMAGE */}
      <section className="relative bg-gradient-to-br from-[#FFF5EE] via-[#EAF4FF] to-[#FAF8F5] py-16 md:py-24 lg:py-32 overflow-hidden text-slate-800 border-b border-light-100">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-[#0D47A1]/5 via-[#E65100]/5 to-transparent pointer-events-none blur-3xl"></div>
        <div className="absolute -left-20 top-1/4 w-[350px] h-[350px] bg-[#BBDEFB]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-20 bottom-1/4 w-[350px] h-[350px] bg-[#FFE0B2]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-black tracking-wider uppercase text-[#E65100] bg-[#FFF3EC] border border-[#FFD8BF] rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-current text-[#E65100] animate-pulse" />
              ¡Las Tintas Epson Oficiales que tu Equipo Reclama!
            </span>
            
            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
              <span className="block text-2xl md:text-3xl font-extrabold text-slate-500 tracking-normal mb-1">
                Bienvenido a
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0D47A1] via-[#1E88E5] to-[#E65100] hover:brightness-110 cursor-default transition-all duration-300">
                LAGO EXPERT PC
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E65100] tracking-tight mt-1.5">
                4 Tintas Epson por ${basicPrice}
              </span>
            </h1>

            <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed max-w-xl">
              Carga tus tanques con confianza. Distribución autorizada de botellas de recarga de altísima pureza para la serie Ecotank 544, 664, 504 y más. Colores vivos, protección absoluta de inyectores y garantía real.
            </p>

            {/* Price badge block */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-md max-w-md w-full">
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Precio Normal</span>
                <span className="text-lg text-slate-400 line-through font-bold leading-none">$30.00</span>
              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div className="text-left flex-1">
                <span className="block text-[10px] text-[#E65100] font-extrabold uppercase tracking-widest">Promoción Temporal</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-slate-800">$15.00</span>
                  <span className="text-[11px] text-slate-500 font-bold font-mono">Set Completo Original</span>
                </div>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto pt-2">
              <a 
                href="#cotizar" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4.5 bg-[#E65100] hover:bg-orange-700 active:scale-95 text-white font-black rounded-2xl shadow-md shadow-orange-200/40 transition-all text-base uppercase tracking-wider cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 fill-white" />
                Quiero las 4 tintas
              </a>
              <a 
                href="#cyber-services" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-base border border-slate-200 shadow-sm uppercase tracking-wider cursor-pointer"
              >
                <Laptop className="w-5 h-5 text-[#E65100]" />
                Ver Servicios Cyber
              </a>
            </div>

            {/* Minimal banner elements indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-xs font-bold text-slate-500 uppercase">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-605" strokeWidth={3} />
                <span>Epson Original Spec</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-605" strokeWidth={3} />
                <span>Garantía de Reposición</span>
              </div>
            </div>

          </div>

          {/* Hero Image Card */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0 flex flex-col items-center">
            {/* Animated attention-seeker */}
            <span className="absolute -top-3 right-6 bg-[#E65100] text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-20 animate-bounce">
              ¡Haz clic para ampliar!
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE0B2]/10 via-[#BBDEFB]/10 to-transparent rounded-3xl blur-2xl pointer-events-none"></div>
            
            {/* Giant interactive image showcase container */}
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55 }}
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full max-w-xl bg-white border border-slate-100 rounded-3xl p-5 overflow-hidden shadow-xl hover:border-slate-200 transition-all duration-300 cursor-zoom-in group"
            >
              {/* Product photo frame with zoom icon */}
              <div className="relative aspect-[4/3] rounded-2xl bg-slate-50 overflow-hidden">
                <img 
                  src="/src/assets/images/epson_544_inks_set_1780017725073.png"
                  alt="Official Epson Ecotank series 544 ink bottles (Black, Cyan, Magenta, Yellow)" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Brand Seal Overlapping bottom left corner certifying authenticity - enlarged for premium impact */}
                <div className="absolute top-4 left-4 z-10 w-24 h-24 pointer-events-none">
                  <LagoExpertLogo variant="circle-only" className="w-24 h-24 shadow-xl border-2 border-white scale-100 hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div>
                
                {/* Expand Hover UI Control */}
                <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-xl text-slate-800 opacity-80 group-hover:opacity-100 transition shadow-sm">
                  <Maximize2 className="w-4 h-4 text-[#E65100]" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-white tracking-wide drop-shadow-md">Set de Tintas CMYK Epson</h4>
                    <p className="text-xs text-[#FFEBE0] font-bold uppercase tracking-wider drop-shadow-sm">Distribución 100% Confiable</p>
                  </div>
                  <span className="px-3.5 py-1.5 bg-[#E65100] font-black text-xs text-white rounded-xl shadow-md border border-orange-500 flex-shrink-0">
                    70ml por botella
                  </span>
                </div>
              </div>

              {/* Specs pill badges below picture - updated with delightful combination of pastel colors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center text-xs">
                <div className="bg-[#ECEFF1] border border-[#CFD8DC] p-2.5 rounded-xl">
                  <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[9px]">Negro Black</span>
                  <span className="block font-black text-slate-800 mt-0.5">Epson K</span>
                </div>
                <div className="bg-[#E3F2FD] border border-[#BBDEFB] p-2.5 rounded-xl">
                  <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[9px]">Cian Cyan</span>
                  <span className="block font-black text-[#0D47A1] mt-0.5">Epson C</span>
                </div>
                <div className="bg-[#FCE4EC] border border-[#F8BBD0] p-2.5 rounded-xl">
                  <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[9px]">Mag Magenta</span>
                  <span className="block font-black text-[#880E4F] mt-0.5">Epson M</span>
                </div>
                <div className="bg-[#FFF8E1] border border-[#FFE082] p-2.5 rounded-xl">
                  <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[9px]">Yel Yellow</span>
                  <span className="block font-black text-[#FF6F00] mt-0.5">Epson Y</span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* COMPATIBILITY CHECKERS BLOCK */}
      <section id="compatibilidad" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 bg-blue-50 text-blue-800 text-xs font-black tracking-widest uppercase rounded-full">
              Soporte de Modelos
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 text-slate-900 leading-none">
              ¿Son estas las tintas correctas para tu impresora?
            </h2>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">
              Selecciona o busca el modelo de tu impresora. Luis verifica de forma 100% personalizada antes de despachar cada producto.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 max-w-3xl mx-auto shadow-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => handleCheckCompatibility(e.target.value)}
                placeholder="Busca ej: L3210, L3110, L120, L355, L4150..."
                className="w-full bg-white border border-slate-300 text-slate-950 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none text-base placeholder-slate-400 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => handleCheckCompatibility("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Compatibility Result Board */}
            <div className="mt-5">
              <AnimatePresence mode="wait">
                {checkerStatus === "compatible" && foundModel && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 bg-emerald-50 border border-emerald-250 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 font-black" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-emerald-950 text-base">¡Sí! Tu {foundModel.name} es compatible</h4>
                        <p className="text-emerald-800 text-sm mt-0.5">
                          Para este modelo requieres la <span className="font-bold">Epson Serie {foundModel.series}</span>. Tenemos inventario asegurado para entrega hoy mismo.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setPrinterSelection(foundModel.name);
                        const el = document.getElementById("cotizar");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex-shrink-0 shadow-sm"
                    >
                      Añadir al Cotizador
                    </button>
                  </motion.div>
                )}

                {checkerStatus === "not_found" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 text-amber-800 rounded-xl flex-shrink-0 mt-0.5">
                        <Printer className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-amber-950 text-base">¿No ves tu modelo exacto en el listado?</h4>
                        <p className="text-amber-800 text-sm mt-0.5">
                          ¡No te preocupes! Tenemos tintas compatibles para todas las impresoras Epson del Ecuador. Pregúntale a Luis para verificar stock de forma directa.
                        </p>
                      </div>
                    </div>
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=Hola Luis! Me gustaría consultar disponibilidad de botellas de tinta para mi modelo específico de impresora Epson: ${searchQuery}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex-shrink-0"
                    >
                      Consultar a Luis
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick selectors row */}
            <div className="mt-6 border-t border-slate-200 pt-5">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Modelos Populares:</span>
              <div className="flex flex-wrap gap-2">
                {PRINTER_MODELS.filter(m => m.popular).map((model, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectQuickModel(model)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      foundModel?.name === model.name 
                        ? "bg-slate-950 text-white border-slate-950 shadow-sm" 
                        : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CORE CYBERCAFÉ AND CELLULAR RELOADS SERVICES SECTION */}
      <CyberServices />

      {/* COMPOSITION & SCIENCE - HOW CMYK WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Color Visualizer selector card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-orange-600">
                  <Printer className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Estabilidad de Impresión</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">Garantía en la Composición de las Tintas</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Toca y selecciona cada color para descubrir el factor clave de su composición y rendimiento en el cabezal de tu equipo:
                </p>

                {/* Grid selectors */}
                <div className="grid grid-cols-4 gap-2">
                  {(["K", "C", "M", "Y"] as const).map((col) => {
                    const styles = {
                      K: { active: "bg-black text-white border-black", label: "Negro" },
                      C: { active: "bg-sky-500 text-white border-sky-500", label: "Cian" },
                      M: { active: "bg-pink-600 text-white border-pink-600", label: "Magen" },
                      Y: { active: "bg-amber-400 text-slate-900 border-amber-400", label: "Amar" },
                    };
                    return (
                      <button
                        key={col}
                        onClick={() => setActiveColorTab(col)}
                        className={`py-3.5 text-center font-black rounded-2xl border text-xs transition cursor-pointer shadow-sm ${
                          activeColorTab === col ? styles[col].active : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {styles[col].label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab response dynamic content */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 text-sm text-slate-700 min-h-[140px] flex flex-col justify-center">
                  {activeColorTab === "K" && (
                    <div className="space-y-1">
                      <h4 className="font-bold text-black flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                        Negro Absoluto de Alta Definición (K)
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Formulado con resinas dispersas y microfibras de carbón que proporcionan un negro profundo ideal para documentos de oficina y cyber café. Secado ultra-rápido en papel para evitar el corrido de tinta.
                      </p>
                    </div>
                  )}
                  {activeColorTab === "C" && (
                    <div className="space-y-1">
                      <h4 className="font-bold text-sky-500 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                        Cian Cristalino de Base Acuosa (C)
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Fórmula hidro-solubilizada de alta pureza. No contiene sedimentos calcáreos que obstruyan los inyectores de color cian, garantizando transiciones de azul impecables en paisajes académicos.
                      </p>
                    </div>
                  )}
                  {activeColorTab === "M" && (
                    <div className="space-y-1">
                      <h4 className="font-bold text-pink-600 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                        Magenta Orgánico Brillante (M)
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Elaborado con polímeros termotolerantes específicos para el transductor piezoeléctrico de Epson. Brinda rojos intensos, tonos de piel naturales y óptimo contraste fotográfico.
                      </p>
                    </div>
                  )}
                  {activeColorTab === "Y" && (
                    <div className="space-y-1">
                      <h4 className="font-bold text-amber-500 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        Amarillo de Estabilidad Prolongada (Y)
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Componentes resistentes a la radiación UV que frenan el desgaste físico del color bajo la luz solar normal. De esta forma, tus copias impresas e investigaciones conservarán su brillo por años.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scientific structural qualities text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3.5 py-1.5 bg-orange-100 text-orange-850 text-xs font-black tracking-widest uppercase rounded-full">
                Suministros Calificados
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Protección Superior Para Cabezales de Impresión
              </h2>
              <p className="text-slate-600 md:text-lg">
                La mayoría de tintas genéricas extra baratas tapan los inyectores porque tienen sedimentos que se solidifican cuando la impresora reposa.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Ultra Pureza Microfiltrada</h4>
                    <p className="text-slate-500 text-xs mt-1">
                      Filtrado doble de micrones que detiene metales y sales pesadas, evitando la obstrucción del cabezal.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Densidad de Fluido Regulada</h4>
                    <p className="text-slate-500 text-xs mt-1">
                      Viscosidad equilibrada según la temperatura, garantizando un flujo fluido sin goteos ni burbujas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Atención Personal Luis Pallo</h4>
                    <p className="text-slate-500 text-xs mt-1">
                      ¿Tienes reclamos o problemas? Luis te ayuda de forma humana para asistirte ante cualquier eventualidad.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Rendimiento Extendido</h4>
                    <p className="text-slate-500 text-xs mt-1">
                      Una botella de 70ml negro rinde hasta 4,500 páginas de texto plano. Saca cuentas de tu ahorro.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COTIZADOR COMPONENT AND CUSTOM PACK BUILDER */}
      <section id="cotizar" className="py-20 bg-amber-50/50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 bg-amber-100 text-amber-800 text-xs font-black tracking-widest uppercase rounded-full">
              Cotizador Inteligente / Sin Bots
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-slate-900 leading-none">
              Calcula Tu Pedido En Segundos
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Selecciona tu combo, agrega extras de tinta individual de necesitarlo, digita tu ubicación y despacha el pedido directamente a Luis con el botón verde.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Setup fields form (Col 7) */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              {/* Option 1: Combo Selector */}
              <div>
                <label className="block text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-3">1. Selecciona tu combo promocional:</label>
                <div className="grid grid-cols-1 gap-3">
                  
                  {/* Option Combo 1 */}
                  <label className={`block border rounded-2xl p-4.5 cursor-pointer transition ${
                    selectedCombo === "combo1" 
                    ? "border-orange-500 bg-orange-50/20 ring-1 ring-orange-500/20" 
                    : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="combo_select"
                          checked={selectedCombo === "combo1"}
                          onChange={() => setSelectedCombo("combo1")}
                          className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
                        />
                        <div>
                          <span className="font-extrabold text-slate-900 block text-sm sm:text-base">1 Set Completo (4 Colores CMYK)</span>
                          <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">El pack básico óptimo para casa, tareas escolares o cyber.</span>
                        </div>
                      </div>
                      <span className="text-lg font-black text-slate-900">${basicPrice}</span>
                    </div>
                  </label>

                  {/* Option Combo 2 */}
                  <label className={`block border rounded-2xl p-4.5 cursor-pointer transition ${
                    selectedCombo === "combo2" 
                    ? "border-orange-500 bg-orange-50/20 ring-1 ring-orange-500/20" 
                    : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="combo_select"
                          checked={selectedCombo === "combo2"}
                          onChange={() => setSelectedCombo("combo2")}
                          className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-sm sm:text-base">2 Sets Completos (8 Botellas total)</span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider rounded">Ahorra $2</span>
                          </div>
                          <span className="text-xs text-slate-500 leading-relaxed block mt-0.5 font-normal">Recomendado para oficinas o papelerías.</span>
                        </div>
                      </div>
                      <span className="text-lg font-black text-slate-900">${basicPrice * 2 - 2}</span>
                    </div>
                  </label>

                  {/* Option Combo 3 */}
                  <label className={`block border rounded-2xl p-4.5 cursor-pointer transition ${
                    selectedCombo === "combo3" 
                    ? "border-orange-500 bg-orange-50/20 ring-1 ring-orange-500/20" 
                    : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="combo_select"
                          checked={selectedCombo === "combo3"}
                          onChange={() => setSelectedCombo("combo3")}
                          className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-sm sm:text-base">3 Sets de Recarga (12 Botellas total)</span>
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-850 text-[9px] font-black uppercase tracking-wider rounded">Mejor costo - Ahorra $5</span>
                          </div>
                          <span className="text-xs text-slate-500 leading-relaxed block mt-0.5 font-normal font-sans">Mejor valor para cyber cafés e institucionales.</span>
                        </div>
                      </div>
                      <span className="text-lg font-black text-slate-900">${basicPrice * 3 - 5}</span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Option 2: Add-ons quantities */}
              <div>
                <label className="block text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-3">2. Agrega Botellas de Tinta Individuales Extras (Opcional):</label>
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  
                  {/* Black Bottles Addon */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-extrabold text-slate-950 text-sm block">1 Botella Tinta Negra Extra [K]</span>
                      <span className="text-xs text-slate-400 font-sans mt-0.5 block">($4.00 cada botella de repuesto)</span>
                    </div>
                    <div className="flex items-center gap-3.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1">
                      <button 
                        type="button"
                        onClick={() => setExtraBlack(Math.max(0, extraBlack - 1))}
                        className="text-slate-400 hover:text-slate-900 p-1 transition cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-black text-slate-950 font-mono w-5 text-center text-sm">{extraBlack}</span>
                      <button 
                        type="button"
                        onClick={() => setExtraBlack(extraBlack + 1)}
                        className="text-slate-400 hover:text-slate-900 p-1 transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Colors Bottles Addon */}
                  <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3">
                    <div>
                      <span className="font-extrabold text-slate-950 text-sm block">Botellas Color Extra (Cian/Magenta/Amarillo)</span>
                      <span className="text-xs text-slate-400 mt-0.5 block">($4.00 cada botella de repuesto)</span>
                    </div>
                    <div className="flex items-center gap-3.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1">
                      <button 
                        type="button"
                        onClick={() => setExtraColor(Math.max(0, extraColor - 1))}
                        className="text-slate-400 hover:text-slate-900 p-1 transition cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-black text-slate-950 font-mono w-5 text-center text-sm">{extraColor}</span>
                      <button 
                        type="button"
                        onClick={() => setExtraColor(extraColor + 1)}
                        className="text-slate-400 hover:text-slate-900 p-1 transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Option 3: Delivery Options */}
              <div>
                <label className="block text-slate-400 font-extrabold uppercase tracking-widest text-[10px] mb-3">3. Elige el método de entrega:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("retiro")}
                    className={`py-3 px-4.5 rounded-2xl border text-xs font-bold transition text-left flex flex-col justify-between h-20 cursor-pointer ${
                      deliveryMethod === "retiro" 
                        ? "border-orange-500 bg-orange-50/20 text-orange-950 ring-1 ring-orange-500/20" 
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-slate-400 uppercase text-[9px] tracking-wider">A convenir</span>
                    <span className="font-black text-sm">Punto físico (Gratis)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("quito")}
                    className={`py-3 px-4.5 rounded-2xl border text-xs font-bold transition text-left flex flex-col justify-between h-20 cursor-pointer ${
                      deliveryMethod === "quito" 
                        ? "border-orange-500 bg-orange-50/20 text-orange-950 ring-1 ring-orange-500/20" 
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-slate-400 uppercase text-[9px] tracking-wider font-sans">Domicilio</span>
                    <span className="font-black text-sm">Lago Agrio (+$2.50)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("nacional")}
                    className={`py-3 px-4.5 rounded-2xl border text-xs font-bold transition text-left flex flex-col justify-between h-20 cursor-pointer ${
                      deliveryMethod === "nacional" 
                        ? "border-orange-500 bg-orange-50/20 text-orange-950 ring-1 ring-orange-500/20" 
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-slate-400 uppercase text-[9px] tracking-wider">Provincia</span>
                    <span className="font-black text-sm">Nacional (+$4.50)</span>
                  </button>
                </div>
              </div>

              {/* Option 4: Buyer details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-slate-400 font-extrabold uppercase tracking-widest text-[9px] mb-1.5">Tu Nombre:</label>
                  <input 
                    type="text" 
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Escribe tu nombre"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-950 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-slate-400 font-extrabold uppercase tracking-widest text-[9px] mb-1.5">Ciudad o Sector:</label>
                  <input 
                    type="text" 
                    value={buyerCity}
                    onChange={(e) => setBuyerCity(e.target.value)}
                    placeholder="Ej. Barrio Central, Nueva Loja"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-950 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-slate-400 font-extrabold uppercase tracking-widest text-[9px] mb-1.5">Modelo Epson:</label>
                  <input 
                    type="text" 
                    value={printerSelection}
                    onChange={(e) => setPrinterSelection(e.target.value)}
                    placeholder="Ej. Ecotank L3110"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-950 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Live Pricing Breakdown & Checkout Form (Col 5) */}
            <div className="lg:col-span-5 bg-zinc-950 text-white rounded-3xl p-6 md:p-8 border border-zinc-850 shadow-xl space-y-6">
              
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 bg-emerald-900/50 rounded-lg text-emerald-450">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100 uppercase tracking-wider text-[11px]">Resumen de tu Cotización</h3>
              </div>

              {/* Dynamic Table line items */}
              <div className="border-b border-zinc-850 pb-5 space-y-3 text-xs md:text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Combo base ({combosDetails[selectedCombo].name}):</span>
                  <span className="font-bold text-white">${combosDetails[selectedCombo].price.toFixed(2)}</span>
                </div>

                {extraBlack > 0 && (
                  <div className="flex justify-between">
                    <span>{extraBlack} Botella(s) Negra(s) [K] Adicionales:</span>
                    <span className="font-bold text-white">${(extraBlack * extraBlackPrice).toFixed(2)}</span>
                  </div>
                )}

                {extraColor > 0 && (
                  <div className="flex justify-between">
                    <span>{extraColor} Botella(s) de Color [C/M/Y] Adicionales:</span>
                    <span className="font-bold text-white">${(extraColor * extraColorPrice).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Entrega ({deliveryPrices[deliveryMethod].name}):</span>
                  <span className="font-bold text-white">
                    {deliveryPrices[deliveryMethod].price === 0 ? "Gratis" : `$${deliveryPrices[deliveryMethod].price.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Calculated Total view */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-zinc-400 font-extrabold uppercase text-[10px] tracking-widest">Total a Pagar :</span>
                <span className="text-3xl md:text-4xl font-black text-orange-400 leading-none">${calculateTotal().toFixed(2)}</span>
              </div>

              {/* Message to cellular preview box */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4.5 text-[11px] space-y-2">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Mensaje Pre-Armado Para Luis:</span>
                <p className="text-zinc-400 font-mono leading-relaxed whitespace-pre-wrap">
                  {`Hola Luis! Me interesa hacer un pedido... \n- Opción: ${combosDetails[selectedCombo].name} \n- Entrega: ${deliveryPrices[deliveryMethod].name} \n- Total: $${calculateTotal().toFixed(2)}`}
                </p>
              </div>

              {/* Primary Dispatch Action Button */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold rounded-2xl transition shadow-xl text-sm uppercase tracking-wider text-center cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                Pedir por WhatsApp a Luis
              </a>

              <div className="space-y-1 pt-2">
                <div className="flex justify-center items-center gap-1 text-[10px] text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Respuesta rápida garantizada por Luis Pallo</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FILTERABLE CUSTOMER FEEDBACK & REVIEWS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="px-3.5 py-1.5 bg-orange-100 text-orange-850 text-xs font-black tracking-widest uppercase rounded-full">
              Sello de Confianza
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-4 text-slate-900">
              Familias y Negocios Satisfechos
            </h2>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">
              Descubre las historias cotidianas de estudiantes, mamás y docentes que ya no pagan de más en centros comerciales usando el set de tintas LAGO EXPERT PC.
            </p>
          </div>

          {/* Selector Switch Pills Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: "todos", label: "Todos los Clientes" },
              { id: "familia", label: "Mamás y Hogares" },
              { id: "negocio", label: "Cyber Cafés & Oficinas" },
              { id: "estudiante", label: "Estudiantes" },
              { id: "docente", label: "Docentes o Profesores" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedReviewFilter(btn.id as any)}
                className={`px-4.5 py-2.5 text-xs font-black tracking-wider uppercase rounded-full transition-all cursor-pointer ${
                  selectedReviewFilter === btn.id 
                    ? "bg-slate-950 text-white shadow-md shadow-slate-900/10" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Staggered grid container */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  key={rev.author}
                  className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Stars render */}
                    <div className="flex text-amber-400 gap-1">
                      {Array.from({ length: rev.stars }).map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-current text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed italic font-normal">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-slate-200 pt-5 mt-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold text-sm flex items-center justify-center shadow shadow-orange-200">
                      {rev.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-slate-950 text-sm leading-none">{rev.author}</h4>
                      <p className="text-slate-500 text-xs mt-1.5 font-medium">{rev.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* MEET JOHANNA PALLO */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-slate-250/80 rounded-3xl p-7 md:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="w-24 h-24 rounded-full bg-orange-600 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-orange-100 flex-shrink-0 cursor-default">
                LP
              </div>
              <div className="space-y-3.5">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[9px] font-black tracking-widest uppercase rounded-full inline-block">
                  Quién es tu distribuidor
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-none">Luis Pallo</h3>
                <p className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">Propietario & Gestor · LAGO EXPERT PC</p>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Luis fundó LAGO EXPERT PC bajo un precepto inalterable: los insumos de computación de calidad no deben ser un lujo inalcanzable.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  No estás comprando a un distribuidor multinacional frío y automático. Hablas directamente con Luis. Él prepara tus pedidos, valida la compatibilidad con tu modelo de impresora y se asegura de que recibas exactamente lo que necesitas para tu casa o local.
                </p>
                
                {/* Social links inside Bio */}
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                  <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 fill-emerald-50" />
                    WhatsApp Directo
                  </a>
                  <span className="text-slate-300">|</span>
                  <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 font-bold text-xs">
                    Facebook
                  </a>
                  <span className="text-slate-300">|</span>
                  <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="text-zinc-800 hover:text-black font-bold text-xs">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENT UNCONGESTED QUESTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black tracking-widest uppercase rounded-full">
              Soporte de Consultas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-slate-900 leading-none">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-600 mt-2 text-sm font-normal">
              Respondemos a las dudas más recurrentes acerca de los envíos de repuestos y soporte técnico.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-950 hover:bg-slate-100/50 focus:outline-none transition cursor-pointer"
                  >
                    <span className="text-sm md:text-base pr-4 font-extrabold text-slate-900">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* DENSE MOTIVATOR CTA WRAPPER */}
      <section className="bg-gradient-to-tr from-[#FAF8F5] via-[#FFF3EC] to-[#EAF4FF] py-24 text-slate-800 text-center relative overflow-hidden border-t border-slate-200">
        <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-sky-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="px-3.5 py-1.5 bg-[#FFF3EC] border border-[#FFD8BF] text-[#E65100] text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
            ¡Soporte Real · Compra Segura!
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none max-w-2xl mx-auto">
            Abastece tu Oficina o Cyber con Insumos Confiables
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium">
            No detengas tus impresiones o copias importantes. Lleva el set completo CMYK por solo ${basicPrice} coordinado en Ecuador con Luis Pallo.
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-5.5 bg-[#E65100] hover:bg-orange-700 active:scale-95 text-white font-black rounded-2xl shadow-lg shadow-orange-200/40 transition-all text-base uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              Solicitar Pedido de Tintas Epson
            </a>
            <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">Retiro físico en Lago Agrio (CC 11 de Marzo) o envíos a todo el país</span>
          </div>

          {/* Social Network Buttons on bottom CTA */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-10 text-slate-600 text-sm">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Nuestras Redes:</span>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#1877F2] font-extrabold rounded-full border border-[#D2E3FC] transition-all hover:scale-105 shadow-sm">
              <Facebook className="w-3.5 h-3.5" /> Facebook
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FDF0F5] hover:bg-[#FCE2EC] text-[#E1306C] font-extrabold rounded-full border border-[#FCE2EC] transition-all hover:scale-105 shadow-sm">
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-50 hover:bg-zinc-200 text-zinc-800 font-extrabold rounded-full border border-zinc-200 transition-all hover:scale-105 shadow-sm">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.41-.43-.61-.65-.01.01-.01.01-.02.02v6.64c.03 2.24-1.02 4.41-2.92 5.54-1.9 1.13-4.41 1.25-6.39.29-1.99-.97-3.23-3.15-3.08-5.38.14-2.11 1.57-4.04 3.63-4.57 1.19-.31 2.47-.13 3.53.47.01-1.13.01-6.57.01-7.7-.13.02-.27.03-.4.06-1.51.3-2.82 1.4-3.32 2.87-.5 1.47-.23 3.19.68 4.4 1 1.33 2.67 1.95 4.29 1.7V8.12c-.52.06-1.05-.04-1.5-.31-.56-.34-.91-.95-.91-1.61 0-.66.35-1.27.91-1.61.42-.25.92-.35 1.41-.31.14.01.29.04.43.08V.02z" />
              </svg> TikTok
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 text-center text-xs space-y-4">
        <div className="flex justify-center items-center gap-4">
          <LagoExpertLogo variant="circle-only" className="w-18 h-18 shadow-md border border-slate-800" />
          <div className="text-left">
            <span className="block font-black text-white uppercase tracking-tighter text-sm">LAGO EXPERT PC</span>
            <span className="block text-[8px] text-[#FFD8BF] uppercase tracking-widest font-extrabold leading-none mt-1">Insumos y Cyber</span>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-3">
          <p className="text-slate-400 leading-relaxed font-light">
            Calidad certificada, accesorios tecnológicos, mouses, teclados, cables, investigaciones escolares, recargas de celulares, copias e impresiones de alta nitidez por Luis Pallo.
          </p>
          <div className="flex flex-col items-center gap-1 bg-[#FFF3EC]/5 p-4 border border-[#FFD8BF]/20 rounded-2xl max-w-sm mx-auto shadow-md">
            <span className="text-[#E65100] font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1.5 justify-center">
              <MapPin className="w-3.5 h-3.5 text-[#E65100]" /> Dirección Física
            </span>
            <span className="text-white font-bold text-xs">Sucumbíos · Lago Agrio · Nueva Loja</span>
            <span className="text-slate-300 text-xs text-center font-medium">Centro Comercial 11 de Marzo, 2do Piso, Local 22</span>
          </div>
        </div>
        <div className="h-px bg-slate-800 max-w-sm mx-auto"></div>
        <p className="text-slate-500 tracking-wider">LAGO EXPERT PC &copy; {new Date().getFullYear()} · Todos los derechos reservados.</p>
      </footer>

      {/* LIGHTBOX MODAL FOR DYNAMIC HIGH-RESOLUTION PREVIEW */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc="/src/assets/images/epson_544_inks_set_1780017725073.png"
        imageAlt="Set de 4 Tintas Epson CMYK en LAGO EXPERT PC"
      />

    </div>
  );
}
