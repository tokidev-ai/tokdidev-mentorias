export interface Service {
  iconName: "Bot" | "Code" | "Users";
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const services: Service[] = [
  {
    iconName: "Bot",
    title: "Integración AI-First",
    description: "Diseño e implementación de agentes de IA y conexiones con LLMs optimizadas para tu producto y casos de uso reales.",
    color: "#ff6b35",
    bgColor: "rgba(255,107,53,0.12)",
    borderColor: "rgba(255,107,53,0.25)",
  },
  {
    iconName: "Code",
    title: "Arquitectura y Código",
    description: "Auditoría profunda de tus repositorios en Angular y Node.js para asegurar rendimiento, modularidad y escalabilidad a largo plazo.",
    color: "#a406e9",
    bgColor: "rgba(164,6,233,0.12)",
    borderColor: "rgba(164,6,233,0.25)",
  },
  {
    iconName: "Users",
    title: "Estrategia Técnica",
    description: "Mentoría y code reviews estratégicos para elevar el nivel técnico y la velocidad de entrega de tus desarrolladores.",
    color: "#da2984",
    bgColor: "rgba(218,41,132,0.12)",
    borderColor: "rgba(218,41,132,0.25)",
  },
];
