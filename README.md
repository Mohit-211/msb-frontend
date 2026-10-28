# MyStoryBank frontend

The web app for MyStoryBank 2.0: the public landing page, sign-in and password reset, the story library, the AI story generator and profiles. Built with Next.js 16 (App Router), React 19 and Redux Toolkit.

There is no sign-up or checkout here. An admin creates each account and marks it free or paid; people pay off the platform (the sign-in page links to the SendOwl checkout). The only one-time codes are for password reset. Old `/signup`, `/otp` and `/pay` links redirect (see `next.config.mjs`).

## Getting started

Requires Node.js 20.19 or later.

```bash
cp .env.example .env    # then set NEXT_PUBLIC_BASE_URL to the backend origin
npm install
npm run dev             # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core web vitals rules) |
| `npm run lint:tokens` | Fails on hard-coded colors, fonts, z-indexes or breakpoints, and on imports of retired UI libraries |

The backend is reached at `NEXT_PUBLIC_BASE_URL`; API routes live under `/api/v1` and images under `/images`.

## Project structure

```
src/
├── app/                  Routes. Each page.jsx sets the title and renders a feature component.
│   ├── layout.jsx        Root layout: header, Redux store, toasts, site metadata
│   ├── page.jsx          Landing page (/)
│   ├── not-found.jsx     404 page
│   ├── (auth)/           /signin, /forgotpassword
│   ├── (account)/        /profile
│   └── (stories)/        /story/[slug], /story-detail/[id], /story-read
├── components/
│   ├── ui/               Design system: Button, Field, Dialog, DropdownMenu, Tabs, toast, …
│   ├── layout/           SiteHeader
│   ├── landing/          Landing page
│   ├── auth/             Sign-in, password reset, RequireAuth
│   ├── stories/          Story list, cards, detail, comments
│   ├── story-generator/  AI story chat
│   └── profile/          Profile settings
├── hooks/                Shared React hooks
├── lib/                  API client (api.js; api.server.js for Server Components), config, helpers
├── store/                Redux store, provider and slices
├── styles/               globals.css (design tokens and base styles), _breakpoints.scss
└── assets/images/        Images imported by components
public/                   Files served by URL (landing videos and photos)
```

Folders in parentheses are route groups: they organize files without appearing in the URL.

## UI conventions

- **One UI system.** Use the components in `src/components/ui`. Radix provides behavior for dialogs, menus, tabs and toasts; every visual decision comes from SCSS modules. Icons come from `lucide-react`.
- **Design tokens.** Colors, type, spacing, radius, shadows, layers and motion are CSS custom properties in `src/styles/globals.css`. Primary is #E82121, secondary #1A5775. Don't hard-code a value that has a token; `npm run lint:tokens` checks.
- **Breakpoints.** `@use "breakpoints" as bp;` then `@include bp.up(md) { … }` or `bp.down(md)`.
- **Specificity.** Base styles in `globals.css` and in `components/ui` sit inside `:where()`, so any class passed in from a page wins.
- **Links.** Anything that navigates is a `next/link` `<Link>` (a plain `<a>` for other sites). Call `router.push` or `router.replace` only after an action, such as signing in.
- **Client components.** Components that use state, effects or browser APIs start with `"use client"`. Route files stay Server Components.
