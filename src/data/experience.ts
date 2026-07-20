export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  color: string;
  isCurrent: boolean;
}

export const experiencesList: ExperienceItem[] = [
  {
    company: "Software real",
    role: "Senior Engineer",
    period: "10+ anos",
    description: "Experiencia construyendo productos, arquitecturas escalables y equipos que necesitan entregar con calidad.",
    color: "#ef6c4a",
    isCurrent: true,
  },
  {
    company: "Mentoria",
    role: "Technical Coach",
    period: "1:1",
    description: "Acompanamiento directo para developers que quieren mejorar codigo, criterio, comunicacion y confianza.",
    color: "#f5a623",
    isCurrent: false,
  },
  {
    company: "Comunidad",
    role: "Speaker & Lead",
    period: "LATAM",
    description: "Participacion en comunidades tech, charlas y espacios de aprendizaje para developers en crecimiento.",
    color: "#7b5ea7",
    isCurrent: false,
  },
];
