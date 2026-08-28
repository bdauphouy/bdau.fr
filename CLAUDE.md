# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is `bdau.fr`, Baptiste Dauphouy's personal portfolio site, built with SvelteKit (Svelte 4) and deployed on Vercel via `@sveltejs/adapter-vercel`. Page copy (projects, timeline, site settings) is authored in a companion Sanity Studio (`studio/`) and fetched at prerender time; UI chrome strings (labels, buttons) are translated via Paraglide.

## Commands

Package manager is pnpm (`pnpm-lock.yaml` + `.npmrc` with `engine-strict=true`); a `package-lock.json` also exists in the repo but pnpm is the one to use.

- `pnpm dev` — start the dev server (bound to `--host`, i.e. reachable on the LAN)
- `pnpm build` — production build
- `pnpm preview` — preview the production build
- `pnpm check` — sync SvelteKit types and type-check with `svelte-check`
- `pnpm check:watch` — same, in watch mode
- `pnpm lint` — check formatting (Prettier) and lint (ESLint); run this before considering a change done
- `pnpm format` — write Prettier formatting fixes

There is no test suite in this repo.

`studio/` is its own pnpm workspace (has its own `pnpm-workspace.yaml` so it doesn't get swallowed by the root one) with its own `package.json`, node_modules, and toolchain — always `cd studio` before running its scripts, and don't add its deps to the root `package.json`. Root `prettier`/`eslint` ignore `studio/` entirely; it has its own `@sanity/eslint-config-studio` setup. From `studio/`: `pnpm dev` (Studio dev server), `pnpm deploy` (rebuilds and redeploys the hosted Studio at `bdau-fr.sanity.studio` — this is a live, shared deploy, confirm with the user before running), `pnpm exec sanity exec migrate.ts --with-user-token` (re-runs the one-off JSON→Sanity migration; safe to re-run, it does `createOrReplace` keyed by deterministic `_id`s like `project-<id>`).

## Architecture

### Routing and i18n

The site supports three locales (`en`, `fr`, `es`, see `src/lib/paraglide/runtime.js`) via a `[locale=locale]` dynamic route segment (matcher at `src/params/locale.ts`), driven by Paraglide (`@inlang/paraglide-js`, config in `project.inlang/`, generated runtime in `src/lib/paraglide/` — do not hand-edit that directory):

- `src/hooks.server.ts` runs `paraglideMiddleware` on every request, which resolves the locale (cookie/header-based) and rewrites `%lang%`/`%dir%` placeholders in `src/app.html`.
- `src/routes/+layout.server.ts` handles requests with no `locale` param (i.e. `/`): 302-redirects to `/${getLocale()}`, Paraglide's resolved locale.
- `src/routes/[locale=locale]/+layout.server.ts` calls `setLocale(locale)` for the request, then loads page content — see Content model below — plus `lastUpdate` (Vercel API) and `location` (GitHub API) in parallel. `export const prerender = true` here means content is fetched and baked in at build time, not per-request.
- `src/routes/[locale=locale]/+layout.svelte` renders the shared `Header`/`Footer` chrome around the page `slot`, and registers the GSAP `MotionPathPlugin`/`ScrollTrigger` plugins used by the main page.
- UI strings (buttons, headings, meta fallbacks) come from `m.*` message functions in `src/lib/paraglide/messages/`, sourced from `messages/{en,fr,es}.json` — edit those source files, not the generated `paraglide/` output.
- Two pages exist per locale: `/[locale]` (the main portfolio page) and `/[locale]/archives` (older/archived projects).

### Content model

Page copy (projects, archived projects, timeline entries, site-wide settings like email/socials/theme/availability) lives in Sanity, project `bdau.fr` (id `jt60vu88`, dataset `production`), authored via the Studio in `studio/` (deployed at `bdau-fr.sanity.studio`). Localized fields use a `localeString`/`localeText` object shape (`{ en, fr, es }`) rather than per-locale documents — see `studio/schemaTypes/`.

- `src/lib/server/sanity/client.ts` — the `@sanity/client` instance, configured from the private `SANITY_PROJECT_ID`/`SANITY_DATASET` env vars (see `.env.example`), `useCdn: false` since fetches only happen at build time and should see fresh content on every deploy.
- `src/lib/server/sanity/queries.ts` — the GROQ queries (`projectsQuery`, `timelineItemsQuery`, `siteSettingsQuery`), each returning all three locales per field.
- `src/lib/server/sanity/transform.ts` — picks the right locale out of the raw Sanity response and maps it into the existing `PageContent`/`PageGlobals` shapes from `src/lib/types.d.ts`, so downstream components are unaware content comes from Sanity.
- `src/routes/[locale=locale]/+layout.server.ts` is the only caller of the Sanity client — it fetches and transforms, then passes `data.content` down.

When adding a new content field: add it to the relevant `studio/schemaTypes/` schema first, extend the matching raw type in `src/lib/server/sanity/types.d.ts` and the GROQ projection in `queries.ts`, then map it in `transform.ts` and add it to the `PageContent`/`PageGlobals` type in `src/lib/types.d.ts`. There's no content-side migration step needed beyond the schema change — existing documents just get the new field as `undefined` until edited in the Studio.

### Component structure

- `src/lib/components/sections/` — top-level page sections (`landing`, `projects`, `timeline`, `contact`, `archives`, `header`, `footer`), each corresponding to a slice of `PageContent`.
- `src/lib/components/projects/` and `src/lib/components/timeline/` — sub-components used by the `projects` and `timeline` sections respectively (e.g. the timeline drawer/path visualization).
- `src/lib/components/landing/` — landing-page-specific pieces (e.g. the resume spinner).
- `src/lib/components/meta.svelte` — renders all `<svelte:head>` SEO/OG/Twitter tags for a page; takes `title`/`description`/`keywords`/`globals` props and reads the current locale itself via `getLocale()`.
- `src/lib/components/badge.svelte`, `button.svelte` — small shared primitives.

### Scroll/animation stack

The main portfolio page (`src/routes/[locale=locale]/+page.svelte`) wires up Lenis (smooth scrolling) and GSAP with `ScrollTrigger`/`MotionPathPlugin` on mount, and tears down `ScrollTrigger` instances `onDestroy`. GSAP plugins are registered once in `src/routes/[locale=locale]/+layout.svelte`. Any new scroll-driven animation should register with this same Lenis/GSAP ticker rather than starting an independent RAF loop.

### External data fetches (server-side, at prerender time)

- `src/lib/utils/getLastUpdate.ts` — queries the Vercel deployments API for the last production deploy time. Requires `VERCEL_API_TOKEN` and `VERCEL_PROJET_ID` env vars (see `.env.example`); silently returns `new Date(0)` if unset.
- `src/lib/utils/getLocation.ts` — queries the GitHub public API (`api.github.com/users/bdauphouy`) for current location text shown on the landing section.

Both run inside `[locale=locale]/+layout.server.ts` at prerender time, alongside the Sanity content fetch, since `prerender = true` for that layout.

### Styling

Tailwind CSS, with a small custom theme in `tailwind.config.js` (colors `primary`/`secondary`/`tertiary`, `sans` font family set to `Outfit`), plus a custom `firefox` variant. Prettier is configured with tabs, single quotes, no trailing commas, 100-char width, and the `prettier-plugin-tailwindcss` class-sorting plugin — run `pnpm format` rather than hand-formatting class lists.
