export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "frontend-dev",
    text: "La mentoría me ayudó a dejar de estudiar al azar. En pocas semanas tuve un roadmap claro, mejor estructura de código y más confianza para entrevistas.",
    author: "Developer Frontend",
    role: "Mentoreado",
    initials: "DF",
    color: "#DA2984",
  },
  {
    id: "fullstack-dev",
    text: "El feedback fue directo y accionable. No solo resolvimos bugs: aprendí a explicar decisiones técnicas y a pensar tradeoffs como equipo.",
    author: "Fullstack Developer",
    role: "Mentoreado",
    initials: "FD",
    color: "#A406E9",
  },
  {
    id: "founder-cto",
    text: "Llegamos con bloqueos serios en la integración de LLMs y la estructuración del backend. Rodrigo nos ayudó a rediseñar la arquitectura en un fin de semana y a definir un pipeline robusto. Clave para nuestro MVP.",
    author: "Founder & CTO",
    role: "AI Startup",
    initials: "FC",
    color: "#FA743F",
  },
];
