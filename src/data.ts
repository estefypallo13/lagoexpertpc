/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PrinterModel {
  name: string;
  series: string;
  popular: boolean;
}

export const PRINTER_MODELS: PrinterModel[] = [
  // Series 544
  { name: "Epson EcoTank L3110", series: "544", popular: true },
  { name: "Epson EcoTank L3150", series: "544", popular: true },
  { name: "Epson EcoTank L3210", series: "544", popular: true },
  { name: "Epson EcoTank L3250", series: "544", popular: true },
  { name: "Epson EcoTank L1110", series: "544", popular: false },
  { name: "Epson EcoTank L3160", series: "544", popular: false },
  { name: "Epson EcoTank L3251", series: "544", popular: false },
  { name: "Epson EcoTank L3260", series: "544", popular: false },
  { name: "Epson EcoTank L5190", series: "544", popular: false },
  { name: "Epson EcoTank L5290", series: "544", popular: false },

  // Series 664
  { name: "Epson EcoTank L120", series: "664", popular: true },
  { name: "Epson EcoTank L210", series: "664", popular: false },
  { name: "Epson EcoTank L220", series: "664", popular: false },
  { name: "Epson EcoTank L355", series: "664", popular: true },
  { name: "Epson EcoTank L380", series: "664", popular: false },
  { name: "Epson EcoTank L395", series: "664", popular: true },
  { name: "Epson EcoTank L455", series: "664", popular: false },
  { name: "Epson EcoTank L475", series: "664", popular: false },
  { name: "Epson EcoTank L495", series: "664", popular: false },
  { name: "Epson EcoTank L555", series: "664", popular: false },
  { name: "Epson EcoTank L575", series: "664", popular: false },
  { name: "Epson EcoTank L1300", series: "664", popular: false },

  // Series 504
  { name: "Epson EcoTank L4150", series: "504", popular: true },
  { name: "Epson EcoTank L4160", series: "504", popular: true },
  { name: "Epson EcoTank L4250", series: "504", popular: false },
  { name: "Epson EcoTank L4260", series: "504", popular: true },
  { name: "Epson EcoTank L6160", series: "504", popular: false },
  { name: "Epson EcoTank L6171", series: "504", popular: false },
  { name: "Epson EcoTank L6191", series: "504", popular: false },
  { name: "Epson EcoTank L6270", series: "504", popular: false },

  // Series 504 / 544 generic or others
  { name: "Epson EcoTank L121", series: "664", popular: false },
  { name: "Epson EcoTank L805", series: "673", popular: false },
  { name: "Epson EcoTank L1800", series: "673", popular: false }
];

export interface Review {
  stars: number;
  text: string;
  author: string;
  role: string;
  tag: "negocio" | "estudiante" | "familia" | "docente";
  avatar: string;
}

export const REVIEWS: Review[] = [
  {
    stars: 5,
    text: "Llevaba semanas postergando imprimir porque no encontraba las tintas a buen precio. El set llegó rápido, instalé en dos minutos y mi Epson quedó como nueva. Los colores de las fotos quedaron increíbles.",
    author: "María José Ruiz",
    role: "Quito · Mamá y emprendedora",
    tag: "familia",
    avatar: "MJ"
  },
  {
    stars: 5,
    text: "Tengo una pequeña papelería y necesito tintas confiables que no me fallen. Llevo ya tres sets comprados y cero problemas. El precio es justo y la calidad es real.",
    author: "Carlos Mendoza",
    role: "Guayaquil · Propietario de papelería",
    tag: "negocio",
    avatar: "CM"
  },
  {
    stars: 5,
    text: "Antes pagaba el doble en una tienda de tecnología. Ahora con LAGO EXPERT PC pago $15 por el set completo y la calidad es igual o mejor. Super recomendado.",
    author: "Daniela Torres",
    role: "Cuenca · Consultora independiente",
    tag: "negocio",
    avatar: "DT"
  },
  {
    stars: 5,
    text: "Dudé al principio porque no conocía la marca. Pero el precio y la garantía me convencieron. Las tintas funcionaron perfecto desde el primer momento. Ya hice mi segundo pedido.",
    author: "Roberto Alvarado",
    role: "Loja · Estudiante universitario",
    tag: "estudiante",
    avatar: "RA"
  },
  {
    stars: 5,
    text: "Uso tintas Epson para imprimir material didáctico. La calidad importa porque necesito colores que se vean bien y texto nítido. LAGO EXPERT PC cumple con todo a un precio que no afecta mi presupuesto.",
    author: "Patricia Villacís",
    role: "Ambato · Docente de primaria",
    tag: "docente",
    avatar: "PV"
  }
];

export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    question: "¿Con qué modelos Epson son compatibles estas tintas?",
    answer: "Son compatibles con las series más vendidas del mercado ecuatoriano (Ecotank Serie 544, Serie 664, Serie 504 y más). Al hacer tu pedido, Luis verifica de forma personalizada el modelo exacto de tu impresora para garantizar compatibilidad 100% segura antes de entregarte el set."
  },
  {
    question: "¿Estas tintas pueden dañar mi impresora?",
    answer: "No. Están formuladas con estándares de alta pureza específicos para los cabezales Epson. A diferencia de tintas de baratillo que tienen sedimentos que tapan los inyectores, nuestras tintas fluyen con total suavidad, garantizando la durabilidad del cabezal."
  },
  {
    question: "¿Qué pasa si al final no son compatibles con mi modelo?",
    answer: "Luis siempre hace una verificación de compatibilidad antes de concretar la entrega. Sin embargo, cuentas con nuestra garantía de 1 día: si tienes alguna dificultad inicial de instalación, te ofrecemos cambio inmediato o solución sin trabas."
  },
  {
    question: "¿Cómo recibo mi pedido en mi ciudad?",
    answer: "Coordinamos de manera directa y personalizada según tu ubicación. Ofrecemos retiro en nuestro punto físico en el Centro Comercial 11 de Marzo en Nueva Loja (Lago Agrio), entregas locales coordinadas, y envíos seguros a nivel nacional a través de Servientrega o cooperativas de transporte."
  },
  {
    question: "¿Qué tan difícil es recargar los tanques de tinta?",
    answer: "Es sumamente sencillo. Las botellas vienen con boquillas dosificadoras de precisión. Solo abres la tapa de tu tanque de color correspondiente, introduces la boca de la botella, y el tanque se llenará solo sin derrames ni manchas. De igual forma, te podemos guiar paso a paso por WhatsApp."
  },
  {
    question: "¿Por qué el set cuesta $15 si en las tiendas me cobran el doble?",
    answer: "Porque importamos de forma directa optimizando la cadena de distribución tradicional. Creemos en un precio justo que apoye al estudiante, al emprendedor y al hogar ecuatoriano, erradicando los márgenes abusivos de los centros comerciales."
  }
];
