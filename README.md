# NSHA landing page

Static landing page for the **National Subsistence and Homesteading Association (NSHA)**, a nonprofit that promotes subsistence and homesteading lifestyles, connects members (called **Subsisters**) in a decentralized support network, and works to open pathways to land and funding.

The page is written to read like a polished, federal-grade public resource while stating clearly that **NSHA is a nonprofit and not a U.S. government agency**. That disclosure appears in the slim banner at the top of the page, in the footer, and in the legal line. Keep all three.

## What is in this repository

```
index.html              The whole page (one file, all sections)
assets/css/styles.css   All styles, plain CSS, no build step
assets/js/main.js       Mobile menu toggle and footer year (progressive enhancement only)
assets/img/             Official NSHA logo files and favicons (see "Brand assets")
assets/img/history/     Public-domain scans from USDA Farmers' Bulletin No. 1733 (see "Historical images")
README.md               This file
.gitignore
```

No frameworks, no bundler, no npm install. The page works with JavaScript disabled (the navigation renders inline and the header is not sticky on small screens), with web fonts blocked (system fallback stack), and in browsers without `backdrop-filter` (solid fallbacks). The `no-js` class on `<html>` is removed by `main.js` itself, not by an inline script, so if the script is blocked or fails to load the page stays in its working no-JS state.

## Preview locally

Either open `index.html` directly in a browser, or serve the folder with any static server, for example:

```
python3 -m http.server 8000        # then visit http://localhost:8000
npx serve .                        # if you have Node installed
```

## Deploy

The site is plain static files, so any static host works.

**GitHub Pages**

1. Push this repository to GitHub.
2. In the repository, open *Settings > Pages*.
3. Under *Build and deployment*, choose *Deploy from a branch*, pick your default branch and the `/ (root)` folder, and save.
4. The site appears at `https://<your-account>.github.io/<repository>/` within a few minutes.

**Netlify**

1. Create a new site and connect this repository (or drag the folder onto the Netlify dashboard).
2. Leave the build command empty and set the publish directory to `/` (the repository root).
3. Deploy. Netlify gives you a `*.netlify.app` URL; add a custom domain under *Domain settings* when ready.

Because the page uses relative paths (`assets/css/styles.css`), it works from a sub-path as well as a root domain.

## Design tokens

All tokens live at the top of `assets/css/styles.css` as CSS custom properties.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--c-white` | `#FFFFFF` | Page background |
| `--c-surface` | `#F6F8F4` | Off-white surfaces, footer, callouts |
| `--c-band` | `#EDF3EA` | Pale green section bands, opaque mobile menu |
| `--c-forest-900` | `#173324` | Headings, CTA band, logo circle |
| `--c-forest-800` | `#1F4A32` | Nav links, outline buttons |
| `--c-forest-700` | `#2B5E40` | Text links, eyebrow labels |
| `--c-moss-600` | `#3D6B4A` | Primary buttons, icons, focus ring |
| `--c-moss-700` | `#325A3D` | Primary hover |
| `--c-sage-400` | `#8FA98C` | Rules, dividers, topographic pattern |
| `--c-sage-300` | `#A9BFA6` | Illustration light hills, soft rules |
| `--c-sage-100` | `#DCE8D9` | Icon circles, disclosure banner, chips |
| `--c-ink-900` | `#1F2A24` | Body text |
| `--c-ink-700` | `#4B5750` | Muted text, captions |
| `--c-wheat-500` | `#C99A3E` | The single warm accent: eyebrow dash, sun, status dot |
| `--c-wheat-100` | `#F5EBD2` | Date chips, status pill |

Text colors meet WCAG AA against the surfaces they sit on. The illustrations also use an olive mid-tone, `#5C7A4A`, written directly in the SVGs; it is decorative only and is not a token.

### Type

| Token | Value |
| --- | --- |
| `--font-sans` | Public Sans, then the system sans stack |
| `--font-serif` | Source Serif 4, then Iowan Old Style / Palatino / Georgia |
| `--fs-h1` | `clamp(2.25rem, 1.55rem + 2.6vw, 3.5rem)` |
| `--fs-h2` | `clamp(1.75rem, 1.4rem + 1.2vw, 2.375rem)` |
| `--fs-h3` / `--fs-h4` | `1.375rem` / `1.125rem` |
| `--fs-lede` / `--fs-body` / `--fs-small` | `1.25rem` / `1.0625rem` / `0.875rem` |

Headings (h1, h2) and prices use the serif; everything else is sans. Spacing follows an 8px scale (`--s-1` through `--s-8`). Google Fonts are loaded with one `<link>` in `<head>`; if that request fails, the fallback stack keeps the layout intact.

### Glass

Three surfaces use `backdrop-filter`: the sticky header (on its `::before` layer), the hero "Start here" card, and the four "Why it matters" cards. Each has a solid-color fallback (`--glass-fallback`) in an `@supports not (backdrop-filter…)` block beside it. The mobile navigation panel is deliberately opaque (`--c-band`); the CSS comment above it explains why and should stay. When the panel is open, `main.js` caps its height to the space below the header so it scrolls on short landscape screens, sets `data-nav-open` on `<html>` to show a page scrim beneath the header, and closes the panel when focus or a click leaves the header.

## Brand assets

The official logo was supplied as a JPEG on an off-white background. It was cut into transparent PNGs so it sits cleanly on the page's white and off-white surfaces (it is not meant for dark backgrounds, where a faint light edge shows):

| File | Contents | Used where |
| --- | --- | --- |
| `assets/img/nsha-logo-lockup.png` | Mark, divider, and "NSHA" wordmark with the full name | Header from 640px wide |
| `assets/img/nsha-logo-mark.png` | The circular mark alone | Header below 640px |
| `assets/img/nsha-logo-full.png` | Lockup plus the rule and tagline | Footer |
| `assets/img/favicon.png`, `assets/img/apple-touch-icon.png` | The mark on a transparent square | Browser tab and home-screen icons |

If you have the logo as a vector file (SVG, AI, or PDF), export SVGs with the same names and swap the paths in `index.html`; they will stay crisp at every size. The header sizes the logo by height (`.brand__logo` in the CSS), so a replacement with a different aspect ratio needs no other change.

## Historical images

The "History and precedent" section uses four scans of USDA Farmers' Bulletin No. 1733, *Planning a Subsistence Homestead* (Walter W. Wilcox, 1934, revised 1940), from the National Agricultural Library's *Small Agriculture* exhibit: <https://www.nal.usda.gov/exhibits/ipd/small/exhibits/show/subsistence/item/29>. They are works of the United States government and in the public domain. The page credits the source beneath the plans; keep that credit line if you move the images. `fb1733-introduction.jpg` is saved in the folder but not placed on the page; the quotation in the section is transcribed from it.

The historical figures in that section (Homestead Act acreage and claim counts, the 1920 census, the 1933 Subsistence Homesteads appropriation, Victory Garden estimates) are stated in round terms with the agency source linked under each card. Verify them against the linked source before using them in print or grant material, and do not add precision the source does not give.

## Image slots

Every place a photograph belongs is a `<figure>` with a unique `id`, a `data-photo-brief` attribute describing the photo to source, an inline SVG placeholder illustration, and a `<figcaption>`. There are thirteen: twelve `photo-slot` figures with visible captions, plus the hero landscape (`figure.hero__art#photo-hero`), listed first below. The hero is a decorative full-bleed background that text and the Start here card sit on, so its caption is visually hidden (read by screen readers only) and its SVG is `aria-hidden`.

| Slot id | Section | Caption | Photo brief |
| --- | --- | --- | --- |
| `photo-hero` | Hero | Illustration of a homestead landscape: rolling hills, two trees, a house, and a barn above a furrowed field. (visually hidden) | Wide landscape of a working homestead at golden hour, house and barn mid-distance, rolling hills, no people, calm. 16:10, full-bleed; must tolerate being cropped at the sides and overlapped by text and the Start here card. |
| `photo-hands-seedling` | What is subsistence | Every Subsister starts with a single planting. | Close-up of weathered adult hands setting a seedling into dark soil, soft morning light, shallow depth of field, no faces visible. Mood: quiet, hopeful, unhurried. (The placeholder illustration shows the seedling in a soil mound with a hand trowel; the photo should include the hands.) |
| `photo-balcony-garden` | What is homesteading | Homesteading at apartment scale. | An ordinary city balcony with containers of herbs, tomatoes, and greens, apartment buildings softened in the background. Eye-level mid-shot in overcast daylight; it should look achievable, not styled. |
| `photo-raised-beds` | Who is a Subsister | A suburban yard converted to raised beds. | Wide shot of a typical suburban backyard where lawn has given way to several timber raised beds in full production, the house visible at the frame's edge. Mood: tidy, productive, ordinary. |
| `photo-root-cellar` | Why it matters now | A root cellar keeps a harvest through winter without electricity. | Interior of a small root cellar or cold room: wooden bins of potatoes, onions, and winter squash, a few jars on a shelf, stone or earth walls, one soft light source from a doorway. Mood: cool, quiet, provident. |
| `photo-pantry-shelves` | The Subsister pathway | A season of harvest, preserved for winter. | Rows of home-canned jars and stored winter squash on plain wooden shelves in a cool room, side lighting, warm but restrained tones. Focus on order and abundance rather than rustic styling. |
| `photo-hens-coop` | The Subsister pathway | Laying hens are often a first animal. | Three or four hens foraging near a simple, well-built backyard coop in late-afternoon light. Eye-level, calm, uncluttered. |
| `photo-library` | Learn to become a Subsister | Learning begins with a notebook and a packet of seed. | Overhead of an open field notebook, seed packets, and a hand trowel on a plain wooden table, warm daylight, orderly and uncluttered. Mood: studious, practical. |
| `photo-events` | Upcoming events | Subsisters gather for a regional chapter event. | A small group of adults of mixed ages standing or seated around a wooden table in a barn or community hall, one person demonstrating canning or seed sorting while others watch closely. Natural side light, muted greens and neutrals, documentary feel, no posed smiles at the camera. |
| `photo-community-table` | Membership | Subsisters share labor, tools, and knowledge. | A candid shot of adults of different ages and backgrounds at a long outdoor table or inside a barn, sorting produce or seeds together, natural light. Mood: working side by side, not posed. |
| `photo-network` | The network | Nodes in a region support one another directly. | Two or three people passing seed packets, hand tools, or crates of produce to one another across a truck bed or folding table outdoors, with a rural or edge-of-town backdrop. Overcast or golden-hour light, calm and cooperative mood, shot at eye level. |
| `photo-land` | Land and the model operation | Apprentices work raised beds at the planned model operation. | A wide shot of a working homestead in early morning, with orderly raised beds or rows in the foreground, a modest barn or outbuilding in the middle distance, and two or three people bent to the work. Deep greens, soft sky, sense of scale and order. |
| `photo-funding` | Funding and grants | A land and financing clinic walks through application paperwork. | A close, over-the-shoulder view of two people at a table reviewing printed forms and a laptop, one pointing to a line on the page. Clean, well-lit interior, focused and unhurried, no visible logos or agency names on the documents. |

All figure slots are 4:3 except `photo-community-table`, which is 16:9 (`photo-slot--wide`). The hero landscape is positioned with `preserveAspectRatio="xMidYMax slice"`; a replacement photo should replace the `<svg>` inside `figure.hero__art` with an `<img>` using `object-fit: cover; object-position: center bottom`, be at least 2400px wide, and keep the figure's `aria-hidden` SVG convention (give the `<img>` `alt=""` and keep the hidden caption, or give it a real `alt` and drop the caption). On phones the figure is a fixed 220px tall, so the subject should sit in the centre of the frame. Source photos at least 1600px wide for 4:3 slots and 1600 x 900 for the wide slot; the frame crops with `object-fit: cover`, so keep the subject away from the edges.

### Replacing an illustration with a real photograph

1. Save the photo in the repository, for example `assets/img/hands-seedling.jpg`. Export a web-sized JPEG (1600px wide is plenty) and, if you can, a WebP version too.
2. In `index.html`, find the figure by its id, for example `<figure class="photo-slot" id="photo-hands-seedling" …>`.
3. Inside its `<div class="photo-slot__frame">`, delete the entire `<svg …>…</svg>` block and put an `<img>` in its place:

   ```html
   <div class="photo-slot__frame">
     <img src="assets/img/hands-seedling.jpg"
          alt="Two hands press a young tomato seedling into dark garden soil."
          width="1600" height="1200" loading="lazy">
   </div>
   ```

4. Write the `alt` text as a plain sentence describing what is actually in the photo, not the mood and not the caption. If the photo is purely decorative and the caption already says everything, use `alt=""`. Never leave `alt` out.
5. Keep the `<figcaption>`. Edit it if the new photo needs a different caption.
6. Once a real photo is in, you may delete the `data-photo-brief` attribute or leave it as a record of what was asked for.
7. Only the first four slots on the page should skip `loading="lazy"`; everything further down can lazy-load.

The frame's CSS already styles `img` the same way it styles the SVG (`width: 100%; height: 100%; object-fit: cover`), so nothing else needs to change.

## Placeholders to fill in

Every value that is not yet known is shown as a visible placeholder rather than an invented figure. Search `index.html` for `TBD`, `[`, `to come`, and `placeholder-note` to find them all.

Calls to action whose destination does not exist yet are real links that carry a visible `(link to come)` marker (`<span class="pending">`) and point at a visible **placeholder note** at the end of their own section (`#library-note`, `#events-note`, `#membership-note`, `#network-note`, `#funding-note`). The seventeen guide links in the Library tracks carry no inline marker, to keep the lists readable, but they jump to `#library-note` and carry a `title`. When a real page exists: change the `href`, delete the `<span class="pending">…</span>` and the `title` attribute, and remove the section's placeholder note once every link in that section is live.

- [ ] **Event dates**: four `<span>Date TBD</span>` elements inside the date chips in the Events section. Replace each with a `<time>` element carrying a machine-readable `datetime`, for example `<time datetime="2027-05-15">May 15, 2027</time>`. (A `<time>` without `datetime` must contain a valid date string, which is why the placeholder is a `<span>`.)
- [ ] **Event locations**: `[City, State] · [Venue]` in three event cards.
- [ ] **Event registration links**: four card links and the calendar link point to `#events-note`.
- [ ] **Membership dues**: `Dues TBD` and `Sliding scale · details to come` in all three tiers.
- [ ] **Membership forms**: the three tier buttons point to `#membership-note`.
- [ ] **Library guide links**: every "Start here" link in the six learning tracks carries `title="[Link to guide TBD]"` and points to `#library-note`.
- [ ] **Node directory, starter guide, and request-a-call links** in the Network section point to `#network-note`.
- [ ] **Passthrough grants, program guides, and giving page links** in the Funding section point to `#funding-note`.
- [ ] **Land status**: the status pill reads "Property search and fundraising in progress. Location and timeline TBD."
- [ ] **Contact email**: `[email TBD]` appears in the footer contact block and in the accessibility statement.
- [ ] **Mailing address**: `[Mailing address TBD]`.
- [ ] **Nonprofit status**: `[pending / 501(c)(3) determination TBD]`. Once determined, state the status plainly and add the EIN if you choose to publish it.
- [ ] **Privacy policy**: `[Full privacy policy TBD]`; link to the real policy when it exists.
- [ ] **Copyright year**: filled by JavaScript; the no-JS fallback text is `[Year]` and can be hard-coded once you prefer.

Two things should not change: the "NSHA is not a U.S. government agency" disclosure (top banner, footer, legal line), and the funding note stating that NSHA does not administer federal programs and does not guarantee eligibility for any grant, loan, or program. The federal programs in "Programs to know" are described in general terms with links to agency root domains only; do not add figures, rates, or deadlines without a source.

## Accessibility and quality checks

The page has one `h1`, semantic landmarks (`header`, `nav`, `main`, `footer`), a skip link, visible focus styles, `aria-label`s on icon-only controls, `prefers-reduced-motion` support, link and menu hit areas of at least 44px, and no horizontal scrolling at 390px, 834px, or 1440px. It passes html-validate and axe-core's WCAG 2 A/AA rule set with zero violations. If you edit the page, re-run an accessibility checker such as the axe browser extension before publishing.
