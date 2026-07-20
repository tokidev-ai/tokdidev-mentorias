export interface WorkflowStep {
  stepNum: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconName: "CalendarRange" | "Video" | "Milestone";
}

export const workflowSteps: WorkflowStep[] = [
  {
    stepNum: "01",
    title: "Diagnóstico previo",
    description: "Eliges tu hora en Calendly y detallas tu stack o el bloqueador de tu startup en un formulario rápido.",
    color: "#ff6b35",
    bgColor: "rgba(255,107,53,0.12)",
    borderColor: "rgba(255,107,53,0.25)",
    iconName: "CalendarRange",
  },
  {
    stepNum: "02",
    title: "Sesión 1-a-1",
    description: "Nos conectamos a revisar arquitectura, refactorización o la estrategia de integración de IA sin rodeos.",
    color: "#a406e9",
    bgColor: "rgba(164,6,233,0.12)",
    borderColor: "rgba(164,6,233,0.25)",
    iconName: "Video",
  },
  {
    stepNum: "03",
    title: "Plan de Acción",
    description: "Te llevas una hoja de ruta clara, código limpio y los siguientes pasos listos para ejecutar.",
    color: "#da2984",
    bgColor: "rgba(218,41,132,0.12)",
    borderColor: "rgba(218,41,132,0.25)",
    iconName: "Milestone",
  },
];
