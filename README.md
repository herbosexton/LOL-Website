# Legacy on Lark Website

Premium Next.js website for **Legacy on Lark**  
260 Lark St, Albany, NY 12210

Stack: Next.js 16 (App Router) · React · TypeScript · Node.js · CSS Modules

Deployment path: **Cursor → GitHub → SiteGround Node.js Project**

Remote: https://github.com/herbosexton/LOL-Website.git

## Requirements

- Node.js 20.9+ (Node 24 LTS recommended)
- npm

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Scripts:

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — start production server (respects `PORT`)
- `npm run lint` — ESLint

## Environment variables

See [`.env.example`](.env.example). Never commit `.env` or `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (no trailing slash) |
| `NEXT_PUBLIC_MENU_URL` | External cannabis menu / ordering URL |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (optional) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console verification (optional) |
| `SMTP_*` / `CONTACT_*` | Contact form email (server-only) |

## Editing store information

Update centralized config:

[`src/config/site.ts`](src/config/site.ts)

Includes address, hours, phone, email, maps, social links, delivery areas, categories, terpenes, people, FAQs, and age-gate duration.

## Replacing images

Place files under:

- `public/images/` — general / hero / OG
- `public/images/products/` — category mosaic
- `public/images/kulture/`
- `public/images/about/`
- `public/images/delivery/`
- `public/images/blog/`
- `public/images/logo.svg` — brand logo

Keep filenames in sync with `src/config/site.ts` and page references, or update those paths when renaming.

Product category cards support:

- `mediaMode: "contain" | "cover"`
- `objectPosition` focal point

Use **contain** for isolated product shots; **cover** for lifestyle imagery.

## Replacing videos

Add:

- `public/video/hero.mp4`
- `public/video/hero.webm`

Poster images:

- `public/images/hero-poster.png`
- `public/images/hero-mobile.png`

The hero shows the poster immediately. Video autoplays only when motion is allowed. Missing video files simply keep the poster visible.

## Creating a news article

1. Add an MDX file under `content/news/`.
2. Include frontmatter:

```mdx
---
title: "Your Title"
slug: "your-slug"
date: "2026-03-01"
category: "Education"
excerpt: "Short summary"
featuredImage: "/images/blog/your-image.png"
featuredImageAlt: "Descriptive alt text"
author: "Legacy on Lark"
seoDescription: "SEO description"
---

Article body in Markdown/MDX…
```

3. Commit and push. `/news` and `/news/[slug]` update automatically (newest first).

Article UI components consume the `Article` type from `src/types/content.ts` via `src/lib/content/news.ts`, so a headless CMS can replace the filesystem loader later.

## Updating links

- Navigation / footer: `src/config/site.ts`
- Menu / Shop / Order buttons: `NEXT_PUBLIC_MENU_URL`
- Maps: `siteConfig.maps` in `src/config/site.ts`
- Social: `siteConfig.social` (leave empty until URLs are real)

## Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the exact SiteGround Node.js workflow.

**Important:** Do not delete the existing WordPress site until this Node.js project is approved on SiteGround’s temporary domain.

## Initial GitHub push

```bash
git init
git add .
git commit -m "Initial Legacy on Lark Next.js site"
git branch -M main
git remote add origin https://github.com/herbosexton/LOL-Website.git
git push -u origin main
```

If git is already initialized, add the remote (if needed) and push `main`.
