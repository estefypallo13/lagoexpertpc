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
  Keyboard,
  Mouse,
  Usb,
  Headphones,
  Plug,
  FileText
} from "lucide-react";
import { PRINTER_MODELS, REVIEWS, FAQS, PrinterModel } from "./data";
import FloatingButtons from "./components/FloatingButtons";
import CyberServices from "./components/CyberServices";
import LightboxModal from "./components/LightboxModal";
import LagoExpertLogo from "./components/LagoExpertLogo";

const GeniusMouseSvg = ({ className = "w-28 h-28" }: { className?: string }) => (
  <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="205" rx="55" ry="15" fill="black" fillOpacity="0.3" />
    
    {/* Ergonomic mouse base */}
    <path 
      d="M50,110 C50,60 70,40 100,40 C130,40 150,60 150,110 C150,160 142,200 100,200 C58,200 50,160 50,110 Z" 
      fill="#121212" 
      stroke="#1E293B" 
      strokeWidth="2" 
    />
    
    {/* Red curves on side - iconic match for Genius NX-7007 Red/Black */}
    <path 
      d="M50,110 C50,75 58,65 66,70 C62,85 61,125 68,150 C71,160 67,170 58,180 C52,170 50,145 50,110 Z" 
      fill="#DC2626" 
    />
    <path 
      d="M150,110 C150,75 142,65 134,70 C138,85 139,125 132,150 C129,160 133,170 142,180 C148,170 150,145 150,110 Z" 
      fill="#DC2626" 
    />

    {/* Center wheel line & wheel */}
    <line x1="100" y1="40" x2="100" y2="100" stroke="#222" strokeWidth="2.5" />
    <rect x="96" y="55" width="8" height="24" rx="4" fill="#DC2626" />
    <line x1="100" y1="59" x2="100" y2="75" stroke="#FCA5A5" strokeWidth="2" />
    
    {/* Palm resting panel highlights */}
    <path 
      d="M65,115 C65,80 78,75 100,75 C122,75 135,80 135,115 C135,150 126,188 100,188 C74,188 65,150 65,115 Z" 
      fill="url(#mouseBodyGrad)" 
      opacity="0.95"
    />
    <defs>
      <linearGradient id="mouseBodyGrad" x1="100" y1="75" x2="100" y2="188" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2D2D2D" />
        <stop offset="50%" stopColor="#1E1E1E" />
        <stop offset="100%" stopColor="#0B0B0B" />
      </linearGradient>
    </defs>

    {/* Genius logo eye representation */}
    <circle cx="100" cy="155" r="4.5" fill="#E65100" />
    <rect x="97" y="152.5" width="6" height="5" rx="1" fill="white" opacity="0.3" />
  </svg>
);

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
    facebook: "https://www.facebook.com/compuexpertpc/?locale=es_LA"
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
              <span className="block text-[8px] md:text-[9.5px] uppercase font-bold text-slate-500 tracking-tight mt-1 items-center gap-1">
                📍 C.C. 11 de Marzo · 2do Piso · Local 22
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

      {/* HERO SECTION - CORPORATE BANNER INSPIRED ULTRA-POLISHED MULTI-PANEL VIEW */}
      <section className="relative bg-white py-12 md:py-16 lg:py-24 overflow-hidden border-b border-slate-100">
        
        {/* Exact diagonal background splitter to represent the corporate banner */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
          {/* Left panel is white, right panel is dark navy */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-white"></div>
          
          {/* Diagonal Orange stripe divider */}
          <div 
            className="absolute inset-y-0 bg-[#E65100]" 
            style={{ left: '44.2%', width: '1.4%', transform: 'skewX(-16deg)' }}
          ></div>
          
          {/* Diagonal Blue stripe divider */}
          <div 
            className="absolute inset-y-0 bg-[#4FC3F7]" 
            style={{ left: '45.6%', width: '1.4%', transform: 'skewX(-16deg)' }}
          ></div>
          
          {/* Right Navy Panel background */}
          <div 
            className="absolute inset-y-0 right-0 bg-[#B3E5FC]"
            style={{ left: '46.7%', right: 0 }}
          ></div>
        </div>

        {/* Dynamic decorative backdrop for smaller touch displays */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none lg:hidden"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left column content - High readability over white background */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-center lg:items-start">
              {/* EPSON printer blue square badge from the top-left of the banner */}
              <div className="flex items-center gap-2 bg-[#2563EB] text-white px-3.5 py-1.5 rounded-xl shadow-sm border border-blue-600 scale-95 md:scale-100 transition-transform">
                <Printer className="w-4 h-4 text-white animate-pulse" />
                <span className="font-black text-[11px] tracking-wider uppercase font-mono">EPSON REFILLS</span>
              </div>
              
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-black tracking-wider uppercase text-[#E65100] bg-[#FFF3EC] border border-[#FFD8BF] rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-current text-[#E65100]" />
                ¡Distribuidor Autorizado Lago Agrio!
              </span>
            </div>
            
            {/* Massive Heading customized to match the brand identity */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6.5xl font-black tracking-tight leading-none text-slate-900">
              <span className="block text-lg md:text-xl font-extrabold text-[#2563EB] uppercase tracking-widest mb-1.5">
                Bienvenido a
              </span>
              <span className="block text-slate-950 font-black tracking-tight">
                LAGO EXPERT PC
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E65100] mt-1.5">
                4 Tintas Epson por ${basicPrice}
              </span>
            </h1>

            <p className="text-slate-600 font-medium text-sm md:text-md leading-relaxed max-w-lg">
              Carga tus tanques con absoluta confianza. Distribución autorizada de botellas de recarga de altísima pureza. Un <strong>set universal compatible para todo tipo de impresoras Epson</strong> (Serie 544, 664, 504 e inyectores térmicos). Colores vivos, protección y garantía física de Luis Pallo.
            </p>

            {/* Price badge block */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 p-4.5 bg-slate-50 border border-slate-150 rounded-2xl shadow-xs max-w-sm w-full">
              <div className="text-left">
                <span className="block text-[8px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Precio Normal</span>
                <span className="text-md text-slate-400 line-through font-bold leading-none">$30.00</span>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-left flex-1">
                <span className="block text-[10px] text-[#E65100] font-extrabold uppercase tracking-widest">Promoción Temporal</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-800">$15.00</span>
                  <span className="text-[10px] text-slate-500 font-bold">Set Completo 4 Colores</span>
                </div>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1">
              <a 
                href="#cotizar" 
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#E65100] hover:bg-orange-700 active:scale-95 text-white font-black rounded-xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 fill-white" />
                Quiero las 4 tintas
              </a>
              <a 
                href="#cyber-services" 
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-xs border border-slate-200 shadow-xs uppercase tracking-wider cursor-pointer"
              >
                <Laptop className="w-4 h-4 text-[#E65100]" />
                Servicios y Cyber
              </a>
            </div>

            {/* Support checkmarks */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">
              <div className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                <span>Epson Original Spec</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                <span>Garantía de Luis Pallo</span>
              </div>
            </div>

          </div>

          {/* Right column content - Dark navy block displaying actual banner composition dynamically */}
          <div className="lg:col-span-7 relative mt-6 lg:mt-0 flex flex-col items-center">
            
            {/* Animated zoom alert callout indicator on inks frame */}
            <span className="absolute -top-3.5 right-6 bg-[#E65100] text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md z-20 animate-bounce cursor-default select-none">
              ¡Haz clic para ampliar!
            </span>
            
            {/* Dynamic, responsive re-creation of the corporate banner's right side (Light Pastel with Inks, Mouse, Flash, Paper, Keyboard, and Wireless Mouse) */}
            <div className="relative w-full max-w-xl bg-gradient-to-b from-[#E0F2FE] via-[#B3E5FC] to-[#81D4FA] border-2 border-blue-200/60 rounded-3xl p-5 overflow-hidden shadow-xl flex flex-col justify-between h-auto min-h-[580px] lg:min-h-[510px] group transition-all duration-300 hover:border-blue-300/80">
              
              {/* Background circular glowing atmospheres */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-orange-400/15 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header inside simulated banner */}
              <div className="flex justify-between items-center relative z-10 pb-2 border-b border-blue-200/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#E65100] bg-[#FFF3EC] border border-[#FFD8BF] px-2 py-0.5 rounded">
                    LAGO EXPERT PC
                  </span>
                </div>
                
                {/* Official standard EPSON original certification header */}
                <div className="flex items-center gap-1 px-3 py-1 bg-[#0D47A1] rounded-lg border border-blue-600">
                  <span className="text-white font-black text-[10px] tracking-wider uppercase font-mono">PRODUCTOS ESTRELLA</span>
                </div>
              </div>

              {/* Product items display showcase - Responsive grid 2 columns on mobile, 3 columns on sm+ */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 items-center flex-1 relative z-10 my-3">
                
                {/* 1. Epson Ink Bottles set */}
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  className="flex flex-col items-center justify-center p-2 bg-white hover:bg-slate-50 border border-blue-100 rounded-2xl cursor-zoom-in transition-all duration-350 relative group/ink text-center shadow-md hover:shadow-lg h-[135px]"
                >
                  {/* Floating Price Badge */}
                  <span className="absolute top-1.5 right-1.5 bg-orange-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md shadow-md z-10 border border-orange-500 tracking-wider">
                    $15.00
                  </span>

                  <img 
                    src="/src/assets/images/epson_544_inks_set_1780017725073.png" 
                    alt="Colección de 4 Tintas Epson CMYK" 
                    className="h-16 object-contain drop-shadow-[0_4px_10px_rgba(13,71,161,0.2)] group-hover/ink:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="mt-1.5 text-[8.5px] font-black tracking-wider text-[#0D47A1] uppercase bg-[#B3E5FC] border border-[#81D4FA] px-1.5 py-0.5 rounded">
                    Tintas x4: $15.00
                  </span>
                </div>

                {/* 2. Red & Black Genius NX-7007 Mouse */}
                <a 
                  href="#accesorios"
                  className="flex flex-col items-center justify-center p-2 bg-white hover:bg-slate-50 border border-blue-100 rounded-2xl transition-all duration-350 relative group/mouse text-center shadow-md hover:shadow-lg h-[135px]"
                >
                  {/* Floating Price Badge */}
                  <span className="absolute top-1.5 right-1.5 bg-red-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md shadow-md z-10 border border-red-500 tracking-wider">
                    $5.00
                  </span>
                  
                  <img 
                    src="/src/assets/images/genius_mouse_nx7007_png_1780095087125.png" 
                    alt="Mouse Wireless Genius NX-7007 Rojo/Negro" 
                    className="h-16 object-contain drop-shadow-[0_4px_10px_rgba(220,38,38,0.2)] group-hover/mouse:scale-105 transition-transform duration-500 rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  
                  <span className="mt-1.5 text-[8.5px] font-black tracking-wider text-red-700 uppercase bg-red-50 border border-red-200 px-1.5 py-0.5 rounded flex items-center justify-center gap-1 hover:bg-red-100 transition-all">
                    Mouse Genius: $5.00
                  </span>
                </a>

                {/* 3. Mouse inalámbrico de $10.00 */}
                <a 
                  href="#accesorios"
                  className="flex flex-col items-center justify-center p-2 bg-white hover:bg-slate-50 border border-blue-100 rounded-2xl transition-all duration-350 relative group/wirelessmouse text-center shadow-md hover:shadow-lg h-[135px]"
                >
                  {/* Floating Price Badge */}
                  <span className="absolute top-1.5 right-1.5 bg-sky-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md shadow-md z-10 border border-sky-500 tracking-wider">
                    $10.00
                  </span>
                  
                  <img 
                    src="/src/assets/images/mouse_inalambrico_10_00_1780097360929.png" 
                    alt="Mouse Inalámbrico Premium Ergonómico" 
                    className="h-16 object-contain drop-shadow-[0_4px_10px_rgba(13,148,136,0.2)] group-hover/wirelessmouse:scale-105 transition-transform duration-500 rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  
                  <span className="mt-1.5 text-[8.5px] font-black tracking-wider text-sky-850 uppercase bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded flex items-center justify-center gap-1 hover:bg-sky-100 transition-all font-sans">
                    Mouse Inalám.: $10.00
                  </span>
                </a>

                {/* 4. Teclado Quasad de $10.00 */}
                <a 
                  href="#accesorios"
                  className="flex flex-col items-center justify-center p-2 bg-white hover:bg-slate-50 border border-blue-100 rounded-2xl transition-all duration-350 relative group/keyboard text-center shadow-md hover:shadow-lg h-[135px]"
                >
                  {/* Floating Price Badge */}
                  <span className="absolute top-1.5 right-1.5 bg-amber-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md shadow-md z-10 border border-amber-500 tracking-wider font-sans">
                    $10.00
                  </span>
                  
                  <img 
                    src="/src/assets/images/teclado_quasad_10_00_1780097377386.png" 
                    alt="Teclado Quasad Español" 
                    className="h-16 object-contain drop-shadow-[0_4px_10px_rgba(217,119,6,0.2)] group-hover/keyboard:scale-105 transition-transform duration-500 rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  
                  <span className="mt-1.5 text-[8.5px] font-black tracking-wider text-amber-800 uppercase bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded flex items-center justify-center gap-1 hover:bg-amber-100 transition-all">
                    Teclado Quasad: $10.00
                  </span>
                </a>

                {/* 5. Flash Memory 16GB */}
                <a 
                  href="#accesorios"
                  className="flex flex-col items-center justify-center p-2 bg-white hover:bg-slate-50 border border-blue-100 rounded-2xl transition-all duration-350 relative group/flash text-center shadow-md hover:shadow-lg h-[135px]"
                >
                  {/* Floating Price Badge */}
                  <span className="absolute top-1.5 right-1.5 bg-emerald-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md shadow-md z-10 border border-emerald-500 tracking-wider">
                    $10.00
                  </span>
                  
                  <img 
                    src="/src/assets/images/flash_memory_16gb_1780096972830.png" 
                    alt="Flash Memory Kingston 16GB CD-ROM" 
                    className="h-16 object-contain drop-shadow-[0_4px_10px_rgba(16,185,129,0.2)] group-hover/flash:scale-105 transition-transform duration-500 rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  
                  <span className="mt-1.5 text-[8.5px] font-black tracking-wider text-emerald-800 uppercase bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center justify-center gap-1 hover:bg-emerald-100 transition-all">
                    Flash 16GB: $10.00
                  </span>
                </a>

                {/* 6. Resmas de Papel */}
                <a 
                  href="#accesorios"
                  className="flex flex-col items-center justify-center p-2 bg-white hover:bg-slate-50 border border-blue-100 rounded-2xl transition-all duration-350 relative group/paper text-center shadow-md hover:shadow-lg h-[135px]"
                >
                  {/* Floating Price Badge */}
                  <span className="absolute top-1.5 right-1.5 bg-indigo-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded-md shadow-md z-10 border border-indigo-500 tracking-wider">
                    $3.50
                  </span>
                  
                  <img 
                    src="/src/assets/images/resma_papel_3_50_1780096987801.png" 
                    alt="Resma de Papel A4 Report Premium" 
                    className="h-16 object-contain drop-shadow-[0_4px_10px_rgba(99,102,241,0.2)] group-hover/paper:scale-105 transition-transform duration-500 rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  
                  <span className="mt-1.5 text-[8.5px] font-black tracking-wider text-indigo-700 uppercase bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded flex items-center justify-center gap-1 hover:bg-indigo-100 transition-all font-sans">
                    Resma Papel: $3.50
                  </span>
                </a>

              </div>

              {/* Bottom corporate banner strip with Epson brand and vision */}
              <div className="pt-2 border-t border-blue-200/50 flex items-center justify-between relative z-10">
                <div className="text-left">
                  <span className="block text-[8px] text-slate-500 font-extrabold uppercase tracking-widest leading-none">Canal de Ventas</span>
                  <span className="text-xs font-black text-slate-800 mt-1 block">Insumos y Cyber</span>
                </div>
                
                {/* Logo emblem */}
                <div className="bg-[#0D47A1] text-white px-3 py-1.5 rounded-md border border-sky-400/20 text-center flex flex-col justify-center select-none shadow">
                  <span className="font-black text-[10px] uppercase leading-none font-sans tracking-wide">EXPERT MULTY</span>
                  <span className="text-[5px] tracking-widest font-black uppercase mt-1 text-sky-200">EQUIPOS Y SERVICIOS</span>
                </div>
              </div>

            </div>

            {/* Interactive mini badges underneath describing what is modeled */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center text-[10px] w-full max-w-xl">
              <div className="bg-slate-50 border border-slate-250 p-2.5 rounded-xl">
                <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[8px]">Black K</span>
                <span className="block font-black text-slate-800 mt-0.5">Epson 544 K</span>
              </div>
              <div className="bg-[#B3E5FC] border border-[#81D4FA] p-2.5 rounded-xl">
                <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[8px]">Cyan C</span>
                <span className="block font-black text-[#0D47A1] mt-0.5">Epson 544 C</span>
              </div>
              <div className="bg-[#FCE4EC] border border-[#F8BBD0] p-2.5 rounded-xl">
                <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[8px]">Magenta M</span>
                <span className="block font-black text-[#880E4F] mt-0.5">Epson 544 M</span>
              </div>
              <div className="bg-[#FFF8E1] border border-[#FFE082] p-2.5 rounded-xl">
                <span className="block text-slate-500 font-extrabold uppercase tracking-wider text-[8px]">Yellow Y</span>
                <span className="block font-black text-[#FF6F00] mt-0.5">Epson 544 Y</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* COMPUTER ACCESSORIES CATALOG SECTION */}
      <section id="accesorios" className="py-20 bg-[#FFFBF8] border-t border-b border-[#FFE0D3]/40 relative overflow-hidden">
        {/* Glow dots */}
        <div className="absolute top-0 right-10 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-black tracking-widest uppercase text-[#0D47A1] bg-[#B3E5FC] border border-[#81D4FA] rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Súper Equipado
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Venta de Accesorios de Computadora e Insumos
            </h2>
            <p className="text-slate-600 md:text-base leading-relaxed font-light">
              ¡Mejora tu estación de trabajo o estudio! Tenemos una amplia selección de accesorios e implementos de computación para entrega inmediata en Lago Agrio. Todos con garantía física y probados antes de que los lleves.
            </p>
          </div>

          {/* Grid setup */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Mouse className="w-6 h-6 text-[#0D47A1]" />,
                iconBg: "bg-[#B3E5FC] border-[#81D4FA]",
                title: "Mouse Genius NX-7007",
                desc: "Original, ergonómico e inalámbrico de alta velocidad",
                priceText: "$5.00"
              },
              {
                icon: <Mouse className="w-6 h-6 text-emerald-700" />,
                iconBg: "bg-emerald-50 border-emerald-100",
                title: "Mouse Inalámbrico",
                desc: "Conexión estable USB de largo alcance para laptop o PC",
                priceText: "$10.00"
              },
              {
                icon: <Keyboard className="w-6 h-6 text-[#E65100]" />,
                iconBg: "bg-[#FFF3EC] border-[#FFD8BF]",
                title: "Teclado Quasad",
                desc: "Distribución en español con Ñ, multimedia USB de alta suavidad",
                priceText: "$10.00"
              },
              {
                icon: <FileText className="w-6 h-6 text-indigo-700" />,
                iconBg: "bg-indigo-50 border-indigo-150",
                title: "Resma de Papel A4",
                desc: "500 hojas de papel bond blanco ultra brillante de excelente gramaje",
                priceText: "$3.50"
              },
              {
                icon: <Usb className="w-6 h-6 text-teal-800" />,
                iconBg: "bg-teal-50 border-teal-100",
                title: "Flash de Memory 16GB",
                desc: "Pendrive Kingston o Adata de alta transferencia original",
                priceText: "$10.00"
              },
              {
                icon: <Headphones className="w-6 h-6 text-pink-700" />,
                iconBg: "bg-pink-50 border-pink-100",
                title: "Audífonos y Diademas",
                desc: "Sonido nítido para clases, videollamadas, oficina y música",
                priceText: "Desde $12.00"
              }
            ].map((acc, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all text-center relative overflow-hidden"
              >
                {/* Floating Price label block inside card */}
                <div className="absolute top-2 right-2 bg-slate-100 text-[#0D47A1] text-[9px] font-extrabold px-2 py-0.5 rounded-md border border-slate-200">
                  {acc.priceText}
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${acc.iconBg} mb-3 shadow-inner`}>
                    {acc.icon}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{acc.title}</h4>
                  <p className="text-slate-500 text-[11px] mt-1 leading-snug">{acc.desc}</p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hola Luis! Me interesa consultar disponibilidad o precio de accesorios de computadora, específicamente: *${encodeURIComponent(acc.title)}*`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#E65100] hover:text-orange-700 font-extrabold uppercase mt-1 inline-block bg-[#FFF3EC] border border-[#FFD8BF] px-2 py-1.5 rounded-lg w-full tracking-wider hover:bg-orange-50 active:scale-95 transition-all cursor-pointer"
                  >
                    Cotizar
                  </a>
                </div>
              </motion.div>
            ))}
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
                      K: { active: "bg-black text-white border-black ring-2 ring-slate-950/15", label: "Negro" },
                      C: { active: "bg-sky-500 text-white border-sky-500 ring-2 ring-sky-500/15", label: "Cian" },
                      M: { active: "bg-pink-600 text-white border-pink-600 ring-2 ring-pink-600/15", label: "Magenta" },
                      Y: { active: "bg-amber-400 text-slate-900 border-[#E5A900] ring-2 ring-amber-400/15", label: "Amarillo" },
                    };
                    return (
                      <button
                        key={col}
                        onClick={() => setActiveColorTab(col)}
                        className={`py-3 text-center font-black rounded-xl border text-[11px] md:text-xs transition cursor-pointer shadow-sm ${
                          activeColorTab === col ? styles[col].active : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {styles[col].label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab response dynamic content */}
                <div className="bg-white border border-slate-200 p-5 text-sm text-slate-700 min-h-[200px] flex flex-col justify-center rounded-2xl">
                  {activeColorTab === "K" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-950 text-sm flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-black shadow-inner ring-2 ring-black/15 animate-pulse"></span>
                          Negro Absoluto de Alta Definición (K)
                        </h4>
                        <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-black text-white rounded-md tracking-wider">Premium</span>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Formulado con resinas dispersas y microfibras de carbón de altísima pureza. Brinda un negro profundo de excelente legibilidad en textos pequeños, códigos de barras e impresiones de oficina. Posee aditivos de secado ultra-rápido para prevenir corridos de tinta en hojas bond estándar.
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                        <div><strong className="text-slate-800 font-bold block">Viscosidad:</strong> 2.4 - 2.8 cPs (Estable)</div>
                        <div><strong className="text-slate-800 font-bold block">Filtro de Pureza:</strong> Doble de 0.2 micras</div>
                        <div><strong className="text-slate-800 font-bold block">pH Balanceado:</strong> 7.5 - 8.2 (No corrosivo)</div>
                        <div><strong className="text-slate-800 font-bold block">Boquillas Seguras:</strong> 100% Antiobstrucción</div>
                      </div>
                    </div>
                  )}
                  {activeColorTab === "C" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sky-600 text-sm flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-sky-500 shadow-inner ring-2 ring-sky-500/15 animate-pulse"></span>
                          Cian Cristalino de Base Acuosa (C)
                        </h4>
                        <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-sky-500 text-white rounded-md tracking-wider">Filtro UV</span>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Fórmula hidro-solubilizada de alta pureza usando agua deionizada libre de sales minerales y sedimentos calcáreos. Al eliminar las sales que suelen cristalizar en los inyectores, salvaguarda la vida del cabezal térmico y genera degradados y cielos perfectos ideales para mapas escolares y fotos de paisajes.
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                        <div><strong className="text-slate-800 font-bold block">Viscosidad:</strong> 2.1 - 2.5 cPs (Fluido)</div>
                        <div><strong className="text-slate-800 font-bold block">Pureza Agua:</strong> Deionizada (&lt;5μS/cm)</div>
                        <div><strong className="text-slate-800 font-bold block">pH Balanceado:</strong> 7.2 - 7.9 (Estable)</div>
                        <div><strong className="text-slate-800 font-bold block">Fidelidad:</strong> Delta E &lt; 1.2 (Fotorrealista)</div>
                      </div>
                    </div>
                  )}
                  {activeColorTab === "M" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-pink-600 text-sm flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-pink-500 shadow-inner ring-2 ring-pink-500/15 animate-pulse"></span>
                          Magenta Orgánico Vibrante (M)
                        </h4>
                        <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-pink-600 text-white rounded-md tracking-wider">Antitapado</span>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Elaborado con polímeros termotolerantes específicos formulados para responder a los micro-impulsos del cabezal MicroPiezo de Epson. Brinda tonos rojos intensos, fucsias vibrantes y pieles con aspecto natural sin sobrecalentar el transductor piezoeléctrico de tu impresora.
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                        <div><strong className="text-slate-800 font-bold block">Viscosidad:</strong> 2.2 - 2.6 cPs (Estable)</div>
                        <div><strong className="text-slate-800 font-bold block">Tensión Superficial:</strong> 32-36 mN/m (Óptimo)</div>
                        <div><strong className="text-slate-800 font-bold block">pH Balanceado:</strong> 7.4 - 8.1 (Protección)</div>
                        <div><strong className="text-slate-800 font-bold block">Evaporación:</strong> Polímero anti-secado manguera</div>
                      </div>
                    </div>
                  )}
                  {activeColorTab === "Y" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-amber-600 text-sm flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-amber-400 shadow-inner ring-2 ring-amber-400/15 animate-pulse"></span>
                          Amarillo de Estabilidad Prolongada (Y)
                        </h4>
                        <span className="text-[9px] uppercase font-black px-2 py-0.5 bg-amber-500 text-slate-900 rounded-md tracking-wider">Larga Vida</span>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Dispersión ultra-fina complementada con bloqueadores solares de amplio espectro. Tus impresiones, hojas bond, tareas académicas y decoraciones expuestas a la luz ambiental en carteleras de Lago Agrio mantendrán su brillo, impidiendo el amarillentamiento o decoloración prematura del papel.
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                        <div><strong className="text-slate-800 font-bold block">Viscosidad:</strong> 2.1 - 2.4 cPs (Fluido)</div>
                        <div><strong className="text-slate-800 font-bold block">Aditivo Solar:</strong> Filtro Fotoprotector UV</div>
                        <div><strong className="text-slate-800 font-bold block">pH Balanceado:</strong> 7.2 - 7.8 (Neutro)</div>
                        <div><strong className="text-slate-800 font-bold block">Sedimentación:</strong> 0% (Fórmula homogeneizada)</div>
                      </div>
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
              <Facebook className="w-3.5 h-3.5" strokeWidth={3} /> Facebook
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
            Calidad certificada, accesorios tecnológicos, mouses, teclados, investigaciones escolares, trámites oficiales SRI e IESS, guías del Ministerio de Ambiente (MAATE), recargas de celulares, pago seguro de servicios básicos, copias e impresiones de alta nitidez por Luis Pallo.
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
