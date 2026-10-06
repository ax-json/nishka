# Project Nishka — frontend

A frontend rebuild of the Project Nishka site (originally built on Emergent), recreated from a screen
recording. Next.js 16 (App Router) + Tailwind CSS v4. Every page is static; there is no backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, stats, signal ticker, the idea, why women, six-step tabs, notes, call to action |
| `/about` | Why Nishka exists, scope (is / is not), founder |
| `/the-problem` | Five numbered chapters, dot grid, ratio bars, sources |
| `/research` | Six-stage method accordion, dataset counters, signal explorer |
| `/impact` | What we're building, milestone dashboard, enterprise showcase |
| `/blog` | Topic filters + search over an (empty) archive |
| `/resources` | Four audience shelves, "coming soon" |
| `/contact` | Work-with-us form (frontend only — nothing is sent) |

## Photos

The recording was too low-resolution to reuse its photos, so every image slot shows a soft tonal
placeholder. Drop the original files into `public/images/` with these names and they appear
automatically (in black and white) on the next build:

| File | Where |
| --- | --- |
| `hero-vendor.jpg` | Home hero (4:5) |
| `garland-maker.jpg` | Home, "Why women" (16:10) |
| `ledger-pen.jpg` | About, "Start where the record stops" (4:3) |
| `portrait-akshara.jpg` | About, founder portrait (4:5) — also remove the "A.D." overlay in `src/app/about/page.tsx` |
| `ledger-book.jpg` | The Problem, chapter 03 (4:3) |
| `showcase-weaving.jpg`, `showcase-tailor.jpg`, `showcase-shoes.jpg`, `showcase-garland.jpg` | Impact showcase (4:5) |

## What was not visible in the recording

These parts were written to match the site's voice and should be checked against the original:

- Research stages 2, 4 and 6 descriptions (`src/components/research/interactive.tsx`)
- Research signal chips for Employment, Digital, Payment and Borrower characteristics (same file)
- The "Credit-to-deposit ratio" caption on The Problem page
- The whole `/contact` page (the original's "Work with us" page never appears in the video)

The "Frontend Preview Only — wake servers" pill from the recording is Emergent's hosting overlay, not
part of the site, so it is not included.

## Where things live

- `src/app/globals.css` — colour tokens (sampled from the recording), type scale, buttons, motion
- `src/app/layout.tsx` — fonts (Newsreader, DM Sans, IBM Plex Mono, Caveat), nav and footer
- `src/content/site.ts` — navigation and footer links
- `src/components/ui/` — shared pieces: page hero, photo slot, stat band, reveal and count-up motion
- `src/components/<page>/` — interactive parts for a single page
