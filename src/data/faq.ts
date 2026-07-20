export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "¿Para quién es la sesión gratuita de 20 minutos?",
    answer:
      "Es para developers que se sienten estancados en su aprendizaje o en su carrera actual, así como para fundadores de startups que tienen dudas sobre la dirección técnica de su producto y quieren obtener un diagnóstico rápido y sincero sin rodeos.",
  },
  {
    question: "¿Qué alcance tiene la consultoría de IA para empresas?",
    answer:
      "Cubre desde la conceptualización de cómo la IA puede optimizar tus flujos internos, hasta el diseño e implementación de agentes autónomos y la integración optimizada de APIs de LLMs con tus bases de datos de forma segura, reduciendo costes de tokens.",
  },
  {
    question: "¿Cómo sé si mi startup califica para la consultoría de código?",
    answer:
      "Calificas si estás experimentando cuellos de botella en el rendimiento de tu plataforma, si tu base de código en Angular o Node.js se ha vuelto inmanejable por falta de patrones de diseño, o si buscas estructurar un pipeline de entrega más sólido.",
  },
];
