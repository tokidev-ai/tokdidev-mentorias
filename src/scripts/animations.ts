import { animate, hover, inView, scroll, spring } from "motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EASE_SOFT = [0.22, 1, 0.36, 1] as [number, number, number, number];

function revealOnScroll(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  { y = 20, delay = 0, stagger = 0.05, duration = 0.45 } = {},
) {
  const els = Array.from(elements);
  if (!els.length) return;

  els.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
  });

  els.forEach((el, i) => {
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, transform: "translateY(0px)" },
          { duration, delay: delay + i * stagger, easing: EASE_OUT },
        );
      },
      { amount: 0.12 },
    );
  });
}

function initHero() {
  const targets = [
    document.querySelector<HTMLElement>('[data-hero="badge"]'),
    document.querySelector<HTMLElement>('[data-hero="title"]'),
    document.querySelector<HTMLElement>('[data-hero="desc"]'),
    document.querySelector<HTMLElement>('[data-hero="actions"]'),
    document.querySelector<HTMLElement>('[data-hero="card"]'),
  ].filter(Boolean) as HTMLElement[];

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
  });

  targets.forEach((el, i) => {
    const isCard = el.dataset.hero === "card";
    animate(
      el,
      {
        opacity: 1,
        transform:
          isCard && window.innerWidth >= 1024
            ? ["translateX(40px) translateY(0px)", "translateX(0px) translateY(0px)"]
            : "translateY(0px)",
      },
      { duration: 0.5, delay: 0.05 + i * 0.08, easing: EASE_OUT },
    );
  });
}

function initNavbar() {
  const nav = document.querySelector<HTMLElement>("nav");
  if (!nav) return;

  scroll((progress) => {
    const scrolled = progress > 0.015;
    nav.style.backdropFilter = scrolled ? "blur(24px) saturate(1.5)" : "blur(12px)";
    nav.style.boxShadow = scrolled ? "0 8px 40px rgba(0,0,0,0.45)" : "none";
    nav.style.borderColor = scrolled ? "rgba(123, 94, 167, 0.25)" : "rgba(123, 94, 167, 0.15)";
  });
}

function initSectionReveals() {
  revealOnScroll(document.querySelectorAll<HTMLElement>("section [data-section-label], section h2"), { y: 16, duration: 0.4, stagger: 0.04 });
  revealOnScroll(document.querySelectorAll<HTMLElement>(".reveal-card"), { y: 20, delay: 0.05, stagger: 0.06, duration: 0.45 });
  revealOnScroll(document.querySelectorAll<HTMLElement>("#contact h2, #contact p, #contact a"), { y: 20, duration: 0.4, stagger: 0.05 });
}

function initCardHovers() {
  document.querySelectorAll<HTMLElement>(".interactive-card").forEach((card) => {
    hover(card, () => {
      animate(card, { y: -5, scale: 1.015 }, { duration: 0.32, easing: spring({ stiffness: 280, damping: 22 }) });
      return () => animate(card, { y: 0, scale: 1 }, { duration: 0.28, easing: EASE_SOFT });
    });
  });
}

function initButtonHovers() {
  document.querySelectorAll<HTMLElement>("a.rounded-full[href], button.rounded-full").forEach((btn) => {
    if (btn.classList.contains("nav-link") || btn.classList.contains("mobile-link")) return;

    hover(btn, () => {
      animate(btn, { scale: 1.05 }, { duration: 0.22, easing: spring({ stiffness: 450, damping: 22 }) });
      return () => animate(btn, { scale: 1 }, { duration: 0.18 });
    });
  });
}

function initOrbParallax() {
  if (window.innerWidth < 768) return;

  const orbs = document.querySelectorAll<HTMLElement>(
    '[class*="bg-brand-orange"][class*="blur-["], [class*="bg-brand-purple"][class*="blur-["], [class*="bg-brand-yellow"][class*="blur-["]',
  );

  scroll((progress) => {
    orbs.forEach((orb, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      orb.style.transform = `translateY(${progress * 70 * dir}px)`;
    });
  });
}

function run() {
  initNavbar();
  initHero();
  initSectionReveals();
  initCardHovers();
  initButtonHovers();
  initOrbParallax();
}

export function initAnimations() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}
