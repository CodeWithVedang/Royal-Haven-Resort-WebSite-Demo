# Royal Haven Resort — Luxury Resort Website & Booking Engine

A complete, production-ready website for a fictional five-star heritage resort in
**Udaipur, Rajasthan** — built as a demonstration piece for hotel and resort clients in India.

Everything a real property needs is here: an editorial marketing site, a working
availability-and-rates booking flow with Indian GST, WhatsApp-first enquiry handling,
SEO, accessibility and a single configuration file to hand over.

> **This is a demo.** No PMS, payment gateway, mail service or CRM is connected. Every
> integration point is abstracted behind one module with a documented swap-in path, and the
> UI always tells the guest when something is simulated. No real phone number, email address
> or API key ships with the code.

Built by **[CodeWithVedang](https://github.com/CodeWithVedang)** with Next.js, React and Tailwind CSS.

---

## Contents

- [Quick start](#quick-start)
- [The brand](#the-brand)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Pages](#pages)
- [The booking engine](#the-booking-engine)
- [Forms and enquiries](#forms-and-enquiries)
- [Content and data layer](#content-and-data-layer)
- [Photography](#photography)
- [Configuration and integrations](#configuration-and-integrations)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Responsive behaviour](#responsive-behaviour)
- [Quality gates and testing](#quality-gates-and-testing)
- [Deployment](#deployment)
- [Handing this over to a real property](#handing-this-over-to-a-real-property)
- [Design decisions worth knowing](#design-decisions-worth-knowing)

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>. No environment variables are required — the site falls back to
safe demo defaults for every one of them.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server (Turbopack) on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`, flat config) |
| `npm run typecheck` | `tsc --noEmit` |

---

## The brand

| | |
| --- | --- |
| Name | **Royal Haven** — *Royal Haven Resort* |
| Sub-brand | Luxury Resort · Udaipur |
| Monogram | RHR |
| Positioning | *A timeless escape in the heart of Rajasthan.* |
| Support line | *Where heritage, tranquillity and thoughtful hospitality come together.* |
| Established | 2008 (18+ years) |
| Property | 42 keys, 4 room categories, 4 wedding venues, one restaurant, one spa |
| Location | Rajmahal Road, off Lake Pichola, Udaipur, Rajasthan 313001 |

The voice is that of a hotel that does not need to shout: plain, specific, warm, occasionally
dry. Rates, timings and policies are stated as facts rather than promises. Marketing
superlatives ("unparalleled luxury", "elevate your journey", "where luxury meets
sophistication") are deliberately absent throughout.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.3.3, App Router, Turbopack |
| UI | React 19.2.8 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 — CSS-first `@theme` tokens, no config file |
| Fonts | Cormorant Garamond (serif display) + Jost (sans UI), via `next/font` |
| Images | `next/image` with a remote-pattern allowlist |
| Linting | ESLint 9 flat config + `eslint-config-next` |
| Runtime deps | **three**: `next`, `react`, `react-dom` |

No UI kit, no animation library, no form library, no date library, no state manager, no icon
package. Icons are hand-drawn SVG components; dates are handled with a small ISO/local-time
helper module; animation is CSS keyframes plus one IntersectionObserver.

---

## Project structure

```
src/
├── app/                        # App Router — one folder per route
│   ├── layout.tsx              # Fonts, metadata, JSON-LD, header/footer shell
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design tokens, type scale, utilities, keyframes
│   ├── rooms/page.tsx          # Stay index
│   ├── rooms/[slug]/page.tsx   # Room detail (SSG for all 4 categories)
│   ├── experiences | dining | wellness | weddings | gallery | contact
│   ├── booking/page.tsx        # Booking engine host (dynamic)
│   ├── error.tsx               # Route error boundary
│   ├── loading.tsx             # Route loading skeleton
│   ├── not-found.tsx           # 404
│   ├── sitemap.ts              # Generated sitemap.xml
│   └── robots.ts               # Generated robots.txt
│
├── components/
│   ├── booking/                # 9 files — calendar, flow reducer, steps, confirmation
│   ├── brand/                  # Logo + monogram
│   ├── experiences/ gallery/ rooms/ location/ forms/
│   ├── home/                   # 13 homepage sections
│   ├── layout/                 # Header, MobileMenu, Footer, PageHero, WhatsAppButton
│   └── ui/                     # Button, Field, Figure, Modal, Reveal, Badge, Container…
│
├── data/                       # Typed content — the only place copy lives
│   ├── rooms.ts dining.ts experiences.ts wellness.ts weddings.ts
│   └── gallery.ts location.ts testimonials.ts faq.ts photos.ts
│
└── lib/
    ├── site.ts                 # Brand, contact, policy, integrations — single source of truth
    ├── booking/                # types, rates, pricing, availability, reservation, service
    ├── enquiry.ts              # Enquiry validation + simulated delivery
    ├── payments.ts             # Provider abstraction (demo adapter only)
    ├── format.ts               # ₹ currency, Indian phone, calendar-day date maths
    ├── images.ts               # Photo type, URL builder, blur placeholder
    └── utils.ts                # cn(), clamp(), seededRandom(), delay()
```

Content is separated from presentation everywhere: a component never hard-codes a rate, a
policy, a phone number or a photograph.

---

## Design system

All tokens live in `src/app/globals.css` under Tailwind v4's `@theme`, so they are available
as ordinary utilities (`bg-ivory`, `text-brass`, `border-line`).

**Palette** — warm paper grounds, charcoal inks, a single muted brass accent. No gradients,
no glassmorphism, no neon.

| Role | Tokens |
| --- | --- |
| Grounds | `ivory #f7f3ec` · `cream #fdfbf7` · `sand #ece3d5` · `clay #d9ccb8` · `line #e2d8c7` · `stone #a99a86` |
| Inks | `ink #17150f` · `charcoal #28241d` · `espresso #413a30` · `muted #6b6154` |
| Accent | `brass #8a6b2f` · `brass-soft #c3a366` (on dark) |
| Dark grounds | `olive #23271d` · `ink` |
| Semantic | `success #3f6b46` · `danger #9a3b2c` · `danger-soft #e0977f` (on dark) |

**Type** — Cormorant Garamond for display, Jost for UI. Every size is a fluid `clamp()`
utility class, so nothing needs breakpoint-by-breakpoint tuning:

`.t-display` `.t-h1` `.t-h2` `.t-h3` `.t-h4` `.t-quote` `.t-lead` `.t-body` `.t-small`
`.t-caption` `.t-eyebrow` `.t-nav` `.t-figure` `.t-price` — plus `.num` (tabular figures for
rates and dates) and `.on-dark` (optical weight compensation on dark grounds).

**Shape and motion** — 1–3px radii only (`radius-xs/sm/md`), hairline rules instead of
shadows, two shadows total (`shadow-lift`, `shadow-header`), one easing curve
(`--ease-luxe: cubic-bezier(0.22, 1, 0.36, 1)`), and six keyframes: `ken-burns`, `fade-up`,
`fade-in`, `line-in`, `shimmer`, `scroll-hint`.

**Reveal on scroll** — `<Reveal>` attaches a per-element IntersectionObserver and flips
`data-visible`; CSS does the rest. Every animation is wrapped in
`@media (prefers-reduced-motion: no-preference)`, so a guest with reduced motion enabled sees
the finished layout immediately with no transforms at all.

**Component library** (`src/components/ui`) — `Button` (5 variants × 3 sizes, arrow affordance,
external-link handling), `Field`/`Input`/`Select`/`Textarea` (label, hint, error, `aria-describedby`,
light and dark tones), `Figure` (aspect-ratio-locked `next/image` with blur-up), `Modal`
(`useFocusTrap` + refcounted `useScrollLock`), `Container`, `Section`, `SectionHeading`,
`Badge`, `Stepper`, `Reveal`, `Icons`.

---

## Pages

| Route | Rendering | What it does |
| --- | --- | --- |
| `/` | Static | 13 sections: hero, introduction + stats, rooms, experiences, dining, wellness, weddings, gallery, testimonials, location, booking CTA, contact band, footer |
| `/rooms` | Static | All four categories with rates, sizes, views and inclusions |
| `/rooms/[slug]` | SSG ×4 | Photo gallery + lightbox, inclusions, sticky reserve card with live "from" rate, full policy strip |
| `/experiences` | Static | Five signature experiences with duration, timing, price, best-for |
| `/dining` | Static | THE COURTYARD — menu by course with a scroll-spy section nav, chef's note, timings |
| `/wellness` | Static | THE HAVEN SPA — six treatments with durations and rates, facilities, rituals |
| `/weddings` | Static | Four venues with capacities, three packages, services, planning timeline, ten FAQs, enquiry form |
| `/gallery` | Static | 57 photographs across six categories, filterable, keyboard-driven lightbox |
| `/contact` | Static | Enquiry form, all channels, hours, directions, sticky FAQ column with `FAQPage` JSON-LD |
| `/booking` | Dynamic | The booking engine (below) |
| `/sitemap.xml`, `/robots.txt` | Static | Generated from `site.url` |
| 404 / error / loading | — | Written states, in the same editorial voice |

**Header** — logo + sub-brand, six-item nav, Contact link and *Book Your Stay* CTA;
transparent over the hero, solid `bg-cream/97` with a hairline once scrolled past 28px;
condensed at 1024–1279 and a full-screen drawer below 1024. The drawer traps focus, locks
body scroll, closes on Escape and on navigation (including browser Back).

**Footer** — navigation, contact block, address, awards, social, policy links, and the studio
credit *Built by CodeWithVedang* with the GitHub mark, linking to the profile.

A floating WhatsApp button is present on every page, above the fold on mobile.

---

## The booking engine

Seven steps, one reducer, no backend: **dates → guests & promo → availability → room →
review → guest details → confirmation.** The whole domain lives in `src/lib/booking/` and the
UI depends only on its return shapes.

### Rates (`rates.ts`)

Each room has a published floor rate, which *is* the monsoon rate — so every "from ₹" figure
on the site is honest. Season multipliers are applied to it, then a weekend uplift, then the
result is rounded to clean hundreds.

| Season | Window | Multiplier |
| --- | --- | --- |
| Monsoon | July – September | 1.00 |
| Summer | April – June | 1.06 |
| Peak season | October – March | 1.32 |
| Festive | 24 December – 2 January | 1.78 |

Friday and Saturday nights carry a further ×1.12. Published floor rates: Garden Verandah Room
₹12,500 · Royal Courtyard Room ₹18,500 · Lake View Suite ₹26,500 · Royal Haveli Suite ₹42,000.

### GST (`pricing.ts`)

Indian hotel GST is charged **per room-night on the value actually paid**: 12% up to ₹7,500 and
18% above. A promotion is therefore spread across the nights *before* the slab is decided
(`keepRatio = taxable / subtotal`) — which is how an Indian hotel invoice is actually built,
and why the effective rate shown on the summary is a blended figure.

### Promotions

| Code | Offer | Requirement |
| --- | --- | --- |
| `HAVEN10` | 10% off the stay | Two nights or more |
| `STAY4PAY3` | Cheapest night free | Four nights or more |
| `MONSOON20` | 20% off | Every night falls in the monsoon season |

Rejected codes explain themselves rather than failing silently. Applied promotions show the
paid average with the pre-promotion average struck through, plus the rupee amount saved.

### Availability (`availability.ts`)

Deterministic demo inventory: every figure is derived from a hash of the room slug and the
date (`seededRandom`), so the same search returns the same answer on the server, in the
browser, and after a refresh. Occupancy is modelled by season (monsoon 42% → festive 93%) with
extra weekend pressure, and selected peak-season weekends are held as whole-property buyouts —
shown in the calendar as blocked, with the reason stated.

The calendar renders two months at a time, disables past dates, marks today, prices each cell
in compact form (₹18.5K), shows scarcity, and carries a full `aria-label` per day.

### Reservation and payment

`reservation.ts` mints a code in the form **`RH-2026-XXXX`**. `payments.ts` is a provider
abstraction with a single `demo` adapter that simulates the gateway round-trip and returns
`captured: false`; the confirmation screen says so in plain words. Adding Razorpay, Stripe or
PayU means adding one adapter and setting one environment variable — no component changes.

Guests may also choose *Pay at the hotel*, which is the honest default for an Indian resort.

---

## Forms and enquiries

Three forms, one validation module (`src/lib/enquiry.ts`) and one shared `Field` component.

| Form | Fields | Reference |
| --- | --- | --- |
| Contact enquiry | Name, email, phone, preferred dates, guests, message | `RH-E-2026-XXXX` |
| Wedding enquiry | Name, email, phone, dates, guest band, event count, venue, budget, brief | `RH-W-2026-XXXX` |
| Booking guest details | First/last name, email, mobile, city, arrival window, occasion, requests | `RH-2026-XXXX` |

Behaviour in all three:

- Validation runs **on submit** — nobody wants to be corrected mid-word — and each field's
  error clears the moment the guest starts fixing it.
- Every invalid field gets `aria-invalid`, an `aria-describedby` message written in human
  language ("Enter a 10-digit mobile number, or include your country code"), and a form-level
  count ("4 fields need a moment. They are marked below their labels.") with `role="alert"`.
- Pending, success and failure states are all implemented. Success replaces the form with a
  reference, the reply window, a *Continue on WhatsApp* deep link carrying the reference, and a
  *Send another enquiry* reset.
- Indian mobile numbers are accepted as typed (10 digits, `+91…`, or a leading 0) and echoed
  back formatted the way they are written in India: `+91 98200 98200`.
- Each success panel states plainly that nothing was stored, and names the one function to
  replace to go live.

---

## Content and data layer

Every word of guest-facing copy is typed content in `src/data/`:

| File | Contents |
| --- | --- |
| `rooms.ts` | 4 categories — rate, size, bed, view, max guests, inclusions, photos; `TOTAL_KEYS`, `featuredRooms`, `lowestRate` |
| `experiences.ts` | 5 experiences — Sunrise at the Aravallis, Royal Heritage Walk, Private Poolside Evening, Village & Craft Trail, Private Dinner Under the Stars |
| `dining.ts` | THE COURTYARD — menu by course including Dal Baati Royale, Laal Maas, Ker Sangri, Saffron Kulfi, with vegetarian equivalents throughout |
| `wellness.ts` | THE HAVEN SPA — 6 treatments (45–120 min), facilities, 4 photographs |
| `weddings.ts` | 4 venues (up to 500 guests), 3 packages, 6 services, 5 planning steps, 10 FAQs |
| `gallery.ts` | 57 photographs across 6 categories + homepage preview set |
| `location.ts` | Distances (airport 35 min, City Palace 25, Lake Pichola 25, station 30), 6 nearby places, arrival notes, seasons |
| `testimonials.ts` | Ananya Mehta (Mumbai), Arjun Kapoor (Delhi), Rhea & Karan (Bengaluru) |
| `faq.ts` | Grouped FAQs, reused for both the page UI and `FAQPage` structured data |

Pricing is in ₹ with Indian digit grouping (`en-IN`, `formatINR`), and calendar dates are
handled as local-time ISO strings throughout to avoid the classic UTC off-by-one-day bug.

---

## Photography

Every image is a small `Photo` object — an id, alt text written for screen readers ("what is in
the frame", never "image of"), and an optional natural orientation used by the masonry gallery.
`photoUrl(photo, width)` turns it into a CDN URL at one of five source widths
(`hero 2400` · `band 1800` · `feature 1400` · `card 1000` · `thumb 560`).

Demo photography is licensed stock served from the Pexels CDN and passed through the Next.js
image optimiser. **To use the property's own shoot, change `IMAGE_HOST`/`buildUrl` in
`src/lib/images.ts` and the ids in `src/data/` — nothing else.**

`next.config.ts` restricts remote images to `images.pexels.com/photos/**`, emits AVIF and WebP,
sets device/image size ladders matched to this layout, allows four quality levels and caches
optimised output for 30 days. `poweredByHeader` is disabled.

Every `Figure` locks an aspect ratio, passes an explicit `sizes` string, and blurs up from an
inline placeholder, so nothing shifts as photographs load.

---

## Configuration and integrations

`src/lib/site.ts` is the single source of truth: brand strings, contact channels, address and
coordinates, opening hours, commercial policy (check-in/out, cancellation, children, pets,
smoking, extra bed, GST slabs, max nights/rooms/guests), social links, awards, integration
keys, and the studio credit.

Anything sensitive or environment-specific is read from `NEXT_PUBLIC_*` with a safe demo
fallback, **so the site never ships a real number or key.** Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://royalhaven.example
NEXT_PUBLIC_PHONE=919000000000
NEXT_PUBLIC_WHATSAPP_NUMBER=919000000000
NEXT_PUBLIC_EMAIL=reservations@royalhaven.example
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_PAYMENT_PROVIDER=demo
```

| Variable | Effect when empty |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` used for canonicals, sitemap, OpenGraph |
| `NEXT_PUBLIC_PHONE` / `..._WHATSAPP_NUMBER` | Falls back to the placeholder `+91 90000 00000` — never a real person's number |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Renders the built-in illustrated map panel with directions and distances; the Maps Embed API is used only when a real key is present. **No fake API keys anywhere.** |
| `NEXT_PUBLIC_PAYMENT_PROVIDER` | `demo` — the checkout is simulated and says so |

The three integration seams, each isolated to one module:

| Seam | Replace | Leaves untouched |
| --- | --- | --- |
| PMS / channel manager | `src/lib/booking/availability.ts` | Calendar, results, pricing, UI |
| Payment gateway | add an adapter in `src/lib/payments.ts` | The whole booking flow |
| Mail service / CRM | `deliver()` in `src/lib/enquiry.ts` | All three forms |

---

## SEO

- **Metadata** — `metadataBase`, a title template, per-page titles and descriptions, keyword
  set targeted at Indian search intent ("luxury resort Udaipur", "destination wedding Udaipur",
  "wedding venue Udaipur 500 guests"), authors/creator/publisher, `category`, and
  `formatDetection` for telephone, address and email.
- **Open Graph & Twitter** — `en_IN` locale, site name, a 1400×933 hero image with alt text,
  and `summary_large_image` cards.
- **Structured data (JSON-LD)** — a `Resort` entity in the root layout with star rating,
  aggregate rating, `PostalAddress`, `GeoCoordinates`, amenity
  `LocationFeatureSpecification` list, and a `ReserveAction` with an `EntryPoint` pointing at
  `/booking`; plus `FAQPage` on both `/contact` and `/weddings`, generated from the same data
  the visible accordions use — so the markup can never drift from the page.
- **Generated `sitemap.xml` and `robots.txt`** from `site.url`, including all four room pages.
- **Semantics** — one `<h1>` per page, ordered headings, `<nav aria-label>`, `<dl>` for
  specification tables, `<figure>`/`<figcaption>` for photography, descriptive link text.

## Accessibility

- Skip-to-content link, visible on focus.
- Full keyboard operation: nav, drawer, calendar, room selection, gallery filters, lightbox
  (`←`/`→` to move, `Esc` to close), accordions, forms.
- Focus is trapped inside the drawer and lightbox, and restored to the trigger on close;
  body scroll is locked with a refcount so nesting cannot leave the page stuck.
- Every icon-only control has an `aria-label`; decorative marks are `aria-hidden`.
- Calendar days announce date, price and availability in one label.
- Errors are announced (`role="alert"`), tied to inputs with `aria-describedby`, and never
  communicated by colour alone.
- Contrast: body and UI text meets WCAG AA on all six grounds — dark grounds use
  `brass-soft`/`danger-soft` where the light-ground equivalents would go muddy.
- `prefers-reduced-motion` removes every transform and transition, including the hero
  ken-burns and all reveals.

## Performance

- Static generation for every marketing page; the four room pages are prebuilt with
  `generateStaticParams`; only `/booking` is dynamic.
- Server Components by default — `"use client"` appears only where interaction requires it
  (header, booking flow, forms, lightbox, reveal observer).
- Three runtime dependencies, so the JavaScript payload is close to the framework floor.
- AVIF/WebP with a size ladder tuned to the actual layout, blur-up placeholders, explicit
  `sizes` on every image, and a 30-day optimiser cache.
- Fonts are self-hosted through `next/font` with `display: swap` and CSS variables — no
  layout shift, no third-party request.
- Fluid `clamp()` typography means no media-query cascade to download or evaluate.
- One IntersectionObserver per revealed element, disconnected after firing; the scroll
  listener is passive.

---

## Responsive behaviour

Built mobile-first and verified at 320, 375, 390, 414, 768, 1024, 1100, 1152, 1280, 1440 and
1920 px on all ten routes, with `document.scrollWidth` and `header.scrollWidth` measured at
each width. There is no horizontal overflow at any of them.

| Width | What changes |
| --- | --- |
| 320–639 | Single column. Long button labels wrap instead of forcing the page wide (`max-sm:whitespace-normal`, `min-h` + padding instead of a fixed height). |
| 640–767 | Two-column fact lists and badge rows; buttons return to one line. |
| 768–1023 | Card grids go two-up; hero meta becomes a row; the drawer is still the nav. |
| 1024–1279 | Desktop nav appears in a condensed band — tighter container padding and gaps, "Contact" folded into the drawer, a narrower Book CTA — because six labels, the logo and a CTA do not fit at full spacing until 1280. |
| 1280+ | Full spacing, "Contact" link returns, three-up grids, editorial asides fill the outer columns. |
| 1920 | Content is capped at `104rem` and centred; photography scales rather than stretching. |

Deliberate inner scrollers — the hero's ken-burns bleed inside `overflow-hidden`, and the
`min-w-max` strips on `/dining`, `/gallery` and the room thumbnail rail — are contained and do
not move the page.

## Quality gates and testing

Every gate below is green in the current tree.

```bash
npx tsc --noEmit
```

```bash
npx eslint .
```

```bash
npm run build
```

- **Types** — clean, `strict` mode, no `any`, no `@ts-expect-error`.
- **Lint** — clean, no disable comments.
- **Build** — 18/18 static pages, four SSG room routes, `/booking` dynamic, sitemap and
  robots emitted.
- **Console** — no errors or warnings on any route.
- **Interaction pass, driven in a real browser:** contact enquiry (validation, then a happy
  path returning a reference), wedding enquiry (five-field validation, then a reference), the
  full booking flow through to a `RH-2026-XXXX` confirmation, gallery lightbox (open, arrow
  navigation across all 58 items, `Esc`, scroll restored), all 12 FAQ accordions, the mobile
  drawer (open, scroll lock, every link, `Esc` close and unlock), and every `tel:`, `mailto:`
  and `wa.me` href.

---

## Deployment

The project is a standard Next.js App Router app with no custom server, so any Node host works.
Vercel is the shortest path:

```bash
npx vercel deploy
```

Before the first deploy, set the environment variables from
[Configuration and integrations](#configuration-and-integrations) — at minimum
`NEXT_PUBLIC_SITE_URL`, so canonicals, Open Graph URLs, the sitemap and the JSON-LD all point
at the real domain instead of the local default.

If the photography is swapped for a property's own library, add each new host to
`images.remotePatterns` in `next.config.ts`; the optimiser refuses unknown origins by design.

Self-hosting is `npm run build` then `npm run start` behind a reverse proxy. Nothing in the
app writes to disk or holds server state, so it scales horizontally as-is.

## Handing this over to a real property

This is a demo, and it is built so the fictional parts come out cleanly.

1. **Identity and contact** — everything lives in `src/lib/site.ts`: brand, phone, WhatsApp,
   email, address, coordinates, social links, primary nav.
2. **Rooms, rates, experiences, menus, packages, FAQs, testimonials, photos** — one file each
   under `src/data/`. Content shape is typed, so a missing field is a build error rather than
   an empty patch of page.
3. **Availability** — replace `src/lib/booking/availability.ts` with PMS or channel-manager
   calls. The calendar, results, pricing and every screen above it keep working.
4. **Payments** — add a real adapter in `src/lib/payments.ts`. The demo adapter is explicitly
   labelled as such in the UI; nothing pretends to charge a card.
5. **Enquiries** — point `deliver()` in `src/lib/enquiry.ts` at a mail service or CRM. All
   three forms flow through it.
6. **Map** — the location block is an elegant placeholder with a single configuration point;
   drop in a Maps key when the property has one. No fake keys ship here.
7. **Photography** — swap the URLs in `src/data/photos.ts`. Keep the `Photo` shape so alt
   text, aspect ratios and the size ladder stay correct.

---

## Design decisions worth knowing

**Photography carries the luxury, not effects.** No glassmorphism, no meaningless gradients,
no glow. The only decorative moves are a hairline rule, a brass hairline accent, and generous
space. Warmth comes from the palette; depth comes from the images.

**Editorial, not marketing.** Copy is written the way a good hotel's own writer would write:
specific, plain, occasionally dry. Rooms are described by what you notice at six in the
morning, not by adjectives. Superlative filler is banned by convention — nothing on this site
says "unparalleled", "elevate your journey" or "immerse yourself".

**Nothing is a dead end.** Every section ends in a next step — book, WhatsApp, call, or read
the thing that logically follows. The floating WhatsApp button exists because in the Indian
market a message beats a form, and the forms exist because some guests still prefer them.

**Prices are always visible.** Room rates, experience rates, wedding package ranges and the
full tax breakdown are shown before any commitment is asked for. Hidden pricing reads as risk,
and risk is what stops a booking.

**Weddings are treated as a primary business line**, not a page — venues with real capacities,
package tiers, catering and decor detail, a planning timeline, an FAQ set, and a dedicated
enquiry form that asks the five things a wedding planner actually needs.

**Density without noise.** The wide breakpoints fill their outer columns with photography and
editorial asides rather than empty margin, so no screen reads as unfinished at 1440 or 1920 —
but each aside carries information, never filler.

**Motion is a courtesy.** Reveals are short, single-direction and fire once; the hero drifts
almost imperceptibly. All of it disappears under `prefers-reduced-motion`.

**The seams are honest.** Availability is deterministic rather than random so a demo can be
walked through twice and behave the same way. Payment is a labelled demo adapter. The map is a
placeholder with a configuration point. Nothing claims to be live that is not.

---

Built by **CodeWithVedang**. Fictional property, real engineering.
