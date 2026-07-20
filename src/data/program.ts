export interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: string;
}

export const program: Program = {
  id: "01",
  title: "Mentoria 4 semanas",
  subtitle: "de junior/mid a developer con criterio",
  description: "Un proceso intensivo para ordenar tu aprendizaje, revisar tu codigo, resolver bloqueos reales y construir una estrategia tecnica que puedas sostener despues de la mentoria.",
  tech: ["CODE REVIEW", "ROADMAP", "ARCHITECTURE", "CAREER"],
  color: "#ef6c4a",
};
