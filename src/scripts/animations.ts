/**
 * animations.ts
 * Sistema central de animaciones interactivas utilizando Motion v12.
 * Desacopla la lógica de animación del maquetado HTML y se ejecuta de forma optimizada una sola vez desde Layout.astro.
 */
import { animate, inView, hover, scroll } from 'motion';

// ─── Curvas de Aceleración y Constantes Reutilizables ────────────────────────

// EASE_OUT proporciona una entrada enérgica pero con un frenado ultra-suave
const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];
// EASE_SOFT ofrece una curva sutil ideal para efectos de elevación al hacer hover
const EASE_SOFT = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Helper: Revelado Mixto (Fade + Slide) al entrar en Viewport ──────────────

function revealOnScroll(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  { y = 24, delay = 0, stagger = 0.08, duration = 0.8 } = {}
) {
  const els = Array.from(elements);
  if (!els.length) return;

  // Se prepara el estado inicial oculto antes de que el usuario haga scroll
  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
  });

  // Se activa la animación de tipo spring (física elástica) al entrar al Viewport
  els.forEach((el, i) => {
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, transform: 'translateY(0px)' },
          { 
            type: 'spring',
            stiffness: 65,  // Rigidez moderada para una entrada grácil
            damping: 16,    // Amortiguación que evita rebotes secos o bruscos
            mass: 1.1,      // Inercia física realista
            delay: delay + i * stagger
          }
        );
      },
      { amount: 0.1 }
    );
  });
}

// ─── Hero: Secuencia de Entrada Progresiva al Cargar ──────────────────────────

function initHero() {
  // Se seleccionan los elementos del Hero asegurando coherencia con los atributos de datos en el HTML
  const targets = [
    document.querySelector<HTMLElement>('[data-hero="badge"]'),
    document.querySelector<HTMLElement>('[data-hero="title"]'),
    document.querySelector<HTMLElement>('[data-hero="desc"]'),
    document.querySelector<HTMLElement>('[data-hero="actions"]'),
    document.querySelector<HTMLElement>('[data-hero="card"]'),
  ].filter(Boolean) as HTMLElement[];

  if (!targets.length) return;

  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
  });

  targets.forEach((el, i) => {
    const isCard = el.dataset.hero === 'card';
    animate(
      el,
      {
        opacity: 1,
        transform: isCard && window.innerWidth >= 1024
          ? ['translateX(40px) translateY(0px)', 'translateX(0px) translateY(0px)']
          : 'translateY(0px)',
      },
      { duration: 0.75, delay: 0.08 + i * 0.12, ease: EASE_OUT }
    );
  });
}

// ─── Navbar: Interpolación Continua Píxel a Píxel al Hacer Scroll ────────────

function initNavbar() {
  let ticking = false;

  function updateNavbar() {
    const nav = document.getElementById('main-navbar');
    const navPill = document.getElementById('nav-pill');
    if (!nav) return;

    // Se calcula el progreso continuo t (de 0 a 1) en un rango dinámico corto de 120px de scroll
    const scrollDistance = 120;
    const rawT = Math.min(1, Math.max(0, window.scrollY / scrollDistance));
    
    const t = rawT;
    // Atenuación cuadrática exponencial (Math.pow) para una desaparición mucho más suave y fluida
    const invT = Math.pow(Math.max(0, 1 - t * 1.6), 1.5);

    // 1. Interpolación para el contenedor principal del Navbar (#main-navbar)
    nav.style.backgroundColor = `rgba(26, 16, 41, ${(0.85 * t).toFixed(3)})`;
    nav.style.backdropFilter = `blur(${(20 * t).toFixed(1)}px) saturate(${(1 + 0.4 * t).toFixed(2)})`;
    nav.style.borderColor = `rgba(255, 255, 255, ${(0.12 * t).toFixed(3)})`;
    nav.style.boxShadow = `0 ${(16 * t).toFixed(1)}px ${(40 * t).toFixed(1)}px rgba(0, 0, 0, ${(0.4 * t).toFixed(3)})`;

    // 2. Interpolación inversa para la píldora central (#nav-pill)
    if (navPill) {
      navPill.style.backgroundColor = `rgba(255, 255, 255, ${(0.05 * invT).toFixed(3)})`;
      navPill.style.borderColor = `rgba(255, 255, 255, ${(0.08 * invT).toFixed(3)})`;
      navPill.style.backdropFilter = invT > 0.05 ? `blur(${(10 * invT).toFixed(1)}px)` : 'none';
      navPill.style.boxShadow = `0 ${(6 * invT).toFixed(1)}px ${(15 * invT).toFixed(1)}px rgba(0, 0, 0, ${(0.1 * invT).toFixed(3)})`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateNavbar(); // Estado inicial al montar
}

// ─── Revelado por Secciones ───────────────────────────────────────────────────

function initSectionReveals() {
  // 1. Workflow
  revealOnScroll(document.querySelectorAll<HTMLElement>('#workflow h2, #workflow > div:first-child > p'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#workflow .grid > div'), { y: 36, delay: 0.15, stagger: 0.12 });

  // 2. Capabilities
  revealOnScroll(document.querySelectorAll<HTMLElement>('#capabilities h2, #capabilities > div:first-child > p'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#capabilities .flex-col.lg\\:flex-row > div'), { y: 36, delay: 0.15, stagger: 0.1 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#capabilities .grid > div'), { y: 32, delay: 0.2, stagger: 0.08 });

  // 3. Particulares (PersonalSection)
  revealOnScroll(document.querySelectorAll<HTMLElement>('#personal h2, #personal > div:first-child > p'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#personal .grid > div'), { y: 36, delay: 0.15, stagger: 0.12 });

  // 4. Empresas & Startups (BusinessSection)
  revealOnScroll(document.querySelectorAll<HTMLElement>('#business h2, #business > div:first-child > p'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#business .grid > div'), { y: 36, delay: 0.15, stagger: 0.12 });

  // 5. Testimonios
  revealOnScroll(document.querySelectorAll<HTMLElement>('#testimonials h2, #testimonials > div:first-child > p'), { y: 20, duration: 0.6 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#testimonials .grid > div'), { y: 36, delay: 0.15, stagger: 0.12 });

  // 6. Experiencia
  revealOnScroll(document.querySelectorAll<HTMLElement>('#experience h2, #experience > div:first-child > p'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#experience .grid > div'), { y: 36, delay: 0.15, stagger: 0.12 });

  // 7. Sobre mi (About)
  revealOnScroll(document.querySelectorAll<HTMLElement>('#about h2, #about p'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#about img, #about .absolute'), { y: 30, delay: 0.15 });

  // 8. FAQ
  revealOnScroll(document.querySelectorAll<HTMLElement>('#faq h2, #faq > div:first-child > p'), { y: 20 });
  revealOnScroll(document.querySelectorAll<HTMLElement>('#faq details'), { y: 32, delay: 0.15, stagger: 0.08 });

  // 9. CTA Final (Contact)
  revealOnScroll(document.querySelectorAll<HTMLElement>('#contact h2, #contact p, #contact a'), { y: 30, stagger: 0.1, duration: 0.75 });
}

// ─── Efectos Hover en Tarjetas Interactivas ───────────────────────────────────

function initCardHovers() {
  // Elevación elástica suave para tarjetas del Blog
  document.querySelectorAll<HTMLElement>('.blog-card-element').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'translateY(-6px)' }, { duration: 0.35, ease: EASE_SOFT });
      return () => animate(card, { transform: 'translateY(0px)' }, { duration: 0.3, ease: EASE_SOFT });
    });
  });

  // Micro-escalado para Testimonios
  document.querySelectorAll<HTMLElement>('#testimonials .grid > div').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'scale(1.02)' }, { duration: 0.35, ease: EASE_SOFT });
      return () => animate(card, { transform: 'scale(1)' }, { duration: 0.28, ease: EASE_SOFT });
    });
  });

  // Elevación sutil para tarjetas de Comunidad
  document.querySelectorAll<HTMLElement>('#community .bg-white\\/\\[0\\.03\\]').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'scale(1.025) translateY(-4px)' }, { duration: 0.35, ease: EASE_SOFT });
      return () => animate(card, { transform: 'scale(1) translateY(0px)' }, { duration: 0.3, ease: EASE_SOFT });
    });
  });


  // Reacción dinámica en tracks de Mentorías
  document.querySelectorAll<HTMLElement>('#mentorship .grid > div').forEach((card) => {
    hover(card, () => {
      animate(card, { transform: 'translateY(-4px)' }, { duration: 0.3, ease: EASE_SOFT });
      return () => animate(card, { transform: 'translateY(0px)' }, { duration: 0.28, ease: EASE_SOFT });
    });
  });
}

// ─── Hover Elástico en Botones Primarios ───────────────────────────────────────

function initButtonHovers() {
  const skip = ['nav-link', 'filter-btn', 'mobile-nav-link', 'mobile-link'];

  document.querySelectorAll<HTMLElement>('a.rounded-full[href], button.rounded-full').forEach((btn) => {
    if (skip.some((cls) => btn.classList.contains(cls))) return;

    hover(btn, () => {
      animate(btn, { transform: 'scale(1.05)' }, { duration: 0.22, ease: EASE_SOFT });
      return () => animate(btn, { transform: 'scale(1)' }, { duration: 0.18, ease: EASE_SOFT });
    });
  });
}

// ─── Parallax Sutil en Orbs Atmosféricos del Fondo ─────────────────────────────

function initOrbParallax() {
  if (window.innerWidth < 768) return; // Se omite en móviles para preservar el rendimiento

  const orbs = document.querySelectorAll<HTMLElement>(
    '[class*="bg-brand-orange"][class*="blur-[120px]"], [class*="bg-brand-purple"][class*="blur-[120px]"]'
  );
  if (!orbs.length) return;

  scroll((progress: number) => {
    orbs.forEach((orb, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const offset = progress * 70 * dir;
      orb.style.transform = `translateY(${offset}px)`;
    });
  });
}

// ─── Punto de Entrada Principal ───────────────────────────────────────────────

function run() {
  initNavbar();
  initHero();
  initSectionReveals();
  initCardHovers();
  initButtonHovers();
  initOrbParallax();
}

export function initAnimations() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}
