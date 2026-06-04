# CLAUDE.md

## Project

`tokdidev-mentorias` is an Astro landing page for Tokidev technical mentorships. It is based on the visual language of the existing `tokidev-landing` project: dark background, glass cards, red/orange/purple gradients, subtle Motion animations, and Tailwind CSS v4 theme tokens.

## Stack

- Astro 6
- Tailwind CSS 4 via `@tailwindcss/vite`
- `lucide-astro` for icons
- `motion` for page animations and marquee motion
- TypeScript with Astro strict config

## Commands

- `npm run dev` starts the local Astro dev server.
- `npm run build` builds the static site into `dist/`.
- `npm run preview` previews the production build.
- `npm run astro` runs Astro CLI commands.

This project expects Node `>=22.12.0`, matching Astro 6 requirements.

## Structure

- `src/pages/index.astro` composes the landing page.
- `src/layouts/Layout.astro` owns HTML metadata, fonts, global CSS import, and global animation init.
- `src/styles/global.css` defines Tailwind 4 theme tokens and base styles.
- `src/scripts/animations.ts` owns global reveal, hover, navbar, and parallax behavior.
- `src/data/technologies.json` feeds the tech marquee.
- `src/components/` contains all page sections and reusable cards.

## Main Sections

- `Navbar.astro` fixed glass navigation with mobile overlay.
- `Hero.astro` primary mentorship value proposition and hero card.
- `TechMarquee.astro` animated stack/capabilities marquee.
- `Capabilities.astro` mentorship focus areas and stats.
- `FeaturedProgram.astro` + `ProgramCard.astro` highlighted mentorship program.
- `Community.astro` + `CommunityCard.astro` accompaniment and community blocks.
- `Testimonials.astro` mentorship outcomes.
- `Experience.astro` + `ExperienceCard.astro` background and credibility.
- `CTA.astro` final email CTA.
- `Footer.astro` brand/social footer.
- `BackgroundGlows.astro` absolute decorative glow layer.

## Style Rules

- Preserve the dark/glass visual system unless explicitly asked to redesign.
- Use existing Tailwind theme tokens from `global.css` before adding raw colors.
- Keep components mostly static Astro components; only add client scripts when interaction requires it.
- Prefer small, focused sections over large rewrites.
- Keep copy direct, specific, and mentorship-oriented.
- Maintain responsive layouts for mobile and desktop.

## Tailwind Notes

- This project uses Tailwind v4 with `@import "tailwindcss"` and `@theme` in CSS.
- There is no `tailwind.config.*` file by default.
- Custom tokens include `brand-orange`, `brand-yellow`, `brand-purple`, `brand-bg`, `brand-glass`, `brand-border`, and `brand-text`.

## Editing Content

- Hero headline and main CTA live in `src/components/Hero.astro`.
- Mentorship areas live in `src/components/Capabilities.astro`.
- Program details live in `src/components/FeaturedProgram.astro`.
- Testimonials live in `src/components/Testimonials.astro`.
- Contact email CTA lives in `src/components/CTA.astro`.
- Social links live in `Hero.astro` and `Footer.astro`.

## Verification

After changes, run `npm run build`. If the build fails with an engine error, switch to Node `>=22.12.0` and rerun.
