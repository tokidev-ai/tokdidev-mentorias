export interface SmallCapability {
  iconName: "Brain" | "Smartphone" | "Bot" | "GraduationCap";
  title: string;
  desc: string;
  bgColor: string;
  borderColor: string;
}

export interface Stat {
  value: string;
  label: string;
  special?: boolean;
}

export const smallCapabilities: SmallCapability[] = [
  { iconName: "Brain", title: "Criterio senior", desc: "Decisiones tecnicas con contexto", bgColor: "rgba(255,201,60,0.18)", borderColor: "rgba(255,201,60,0.3)" },
  { iconName: "Smartphone", title: "Frontend real", desc: "UI, performance y producto", bgColor: "rgba(196,168,255,0.18)", borderColor: "rgba(196,168,255,0.3)" },
  { iconName: "Bot", title: "AI workflows", desc: "Cursor, agentes y automatizacion", bgColor: "rgba(155,111,255,0.18)", borderColor: "rgba(155,111,255,0.3)" },
  { iconName: "GraduationCap", title: "Carrera", desc: "Roadmap, entrevistas y foco", bgColor: "rgba(255,138,92,0.18)", borderColor: "rgba(255,138,92,0.3)" },
];

export const stats: Stat[] = [
  { value: "1:1", label: "Mentoria personalizada" },
  { value: "4+", label: "Semanas de avance" },
  { value: "10+", label: "Anos construyendo software" },
  { value: "∞", label: "Feedback accionable", special: true },
];
