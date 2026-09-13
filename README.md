# Moqtader Hashimi — Portfolio Site

A static portfolio site (plain HTML, CSS, and JavaScript — no build step, no
framework, no backend). It's designed as a dark, editing-studio-inspired
experience: a scroll "playhead" timeline, a pixel-grid logo, and a video
grid organized into short-form (9:16) and long-form (16:9) work.

## Quick start

There is no build step. To preview locally, serve the folder over HTTP
(opening `index.html` directly with `file://` will work for most of the
page, but browsers block `fetch`/module-style behavior on some setups, so a
local server is recommended):

```bash
# Python (built into most systems)
python3 -m http.server 8000

# or Node, if you have it
npx serve .
```

Then open `http://localhost:8000` in your browser.

There is nothing to install and no `package.json` — the site has zero
dependencies at runtime. The only external resource is the Google Fonts
stylesheet link in `index.html` (Familjen Grotesk, IBM Plex Sans, IBM Plex
Mono), which is free and requires no API key.

## Project structure

```
index.html                    Page skeleton (semantic HTML, no inline copy)
assets/
  css/styles.css               All styles, organized by section
  js/data.js                   ALL editable content lives here
  js/main.js                   Rendering + interactivity (reads data.js)
  logos/
    logo-wordmark.svg          Full logo: monogram + wordmark + descriptor
    logo-monogram.svg          Compact "M▶H" mark (used in the nav)
    favicon.svg                Simplified favicon version
  og/og-image.svg              Open Graph / social preview image (source SVG)
README.md
```

## Where to edit things

**Everything editable lives in `assets/js/data.js`.** You should not need to
touch `index.html`, `styles.css`, or `main.js` for routine updates. Open
`data.js` and look for these sections:

| To change...                          | Edit this section in `data.js` |
|----------------------------------------|---------------------------------|
| Name, role label, email, phone         | `person`                        |
| Nav links                              | `nav`                           |
| Headline / hero copy                   | `hero`                          |
| Resume link, GitHub, TikTok, Future Wave/Skylah URLs | `links` |
| Availability banner                    | `availability`                  |
| TikTok/follower numbers                | `metrics` (see below)           |
| Video projects                         | `projects`                      |
| Service descriptions                   | `services`                      |
| Bio, strengths, education, languages   | `about`                         |
| Skills lists                           | `skillGroups`                   |
| Process steps                          | `process`                       |
| The sample concept section             | `concept`                       |
| Contact heading/subtext                | `contact`                       |
| Footer note                            | `footer`                        |

### Updating the 5 vertical + 2 horizontal videos

Open `assets/js/data.js` and find the `projects` array. Each project looks
like this:

```js
{
  id: "sf-01",
  title: "Product Launch Teaser",
  description: "A 20-second teaser cut for a product drop.",
  orientation: "vertical",       // "vertical" (9:16) or "horizontal" (16:9)
  category: "Short-form",
  role: "Editor",
  tools: "Premiere Pro, CapCut",
  poster: "assets/videos/sf-01-poster.jpg",  // optional still image
  videoSrc: "assets/videos/sf-01.mp4",       // set to null for "coming soon"
  captionsSrc: null,             // optional .vtt caption file
  results: null,                 // optional short results note
}
```

The current portfolio includes these projects in display order:

1. `Moqtader_Video_Editor.mp4` - vertical
2. `Media_Key.mp4` - vertical
3. `Want_to_go_viral.mp4` - vertical
4. `Real_Footage_to_Engaging_Content.mp4` - vertical
5. `Interesting_Ads.mp4` - vertical
6. `Entrepernurship_Talking.mp4` - horizontal
7. `Life_Without Social_Media.mp4` - horizontal

To replace or add a video:

1. Put the video file somewhere under `assets/videos/`.
2. Set `videoSrc` to that path, e.g. `"assets/videos/sf-01.mp4"`.
3. Optionally add a `poster` image path (a still frame shown before playback).
4. Set `title`, `description`, `role`, and `tools` to the real details.

The project cards show muted, looping previews. Clicking a card opens the
full native video player with controls. Keep `videoSrc` set to `null` for a
project without media so it uses the designed placeholder instead. **Do not
point `videoSrc` at a file that doesn't exist.**

There are exactly 5 `orientation: "vertical"` entries and 2
`orientation: "horizontal"` entries, matching the current portfolio. You can
add more by copying the object pattern above; the layout grid adjusts
automatically.

### Publishing the metrics section (TikTok views / followers)

The metrics section is hidden by default because exact figures weren't
supplied. To publish it:

1. In `data.js`, find `metrics`.
2. Set `show: true`.
3. Fill in real `value` fields, e.g. `{ value: "1.2M", label: "TikTok views" }`.

Leave `show: false` until you have exact, verifiable numbers.

### Editable links that hide themselves

`links.resumeUrl`, `links.github`, `links.futureWave.url`, and
`links.skylah.url` are all optional. Leave any of them as an empty string
(`""`) and the corresponding link is automatically left out of the footer
— nothing renders as a dead `#` link.

## Deployment

### Vercel

1. Push this folder to a GitHub repository (or drag-and-drop the folder
   into the Vercel dashboard).
2. In Vercel, choose "Add New Project" → import the repo.
3. Framework preset: **Other** (this is a static site — no build command,
   no output directory override needed; Vercel will serve `index.html` as
   the root).
4. Deploy. No environment variables are required.

### GitHub Pages

1. Push this folder to a GitHub repository, e.g. `moqtader-portfolio`.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to `Deploy from a branch`,
   branch `main` (or `master`), folder `/ (root)`.
4. Your site will be published at:
   `https://<your-username>.github.io/moqtader-portfolio/`

**Base path note:** because this site uses relative asset paths
(`assets/css/styles.css`, not `/assets/css/styles.css`), it works correctly
under a GitHub Pages *project* subpath (e.g. `/moqtader-portfolio/`) with
no extra configuration. If you ever rename the repository, no path changes
are needed since nothing is hardcoded to a specific base path.

## What was implemented

- Semantic HTML5 page (`header`, `nav`, `main`, `section`s, `footer`) with a
  skip-to-content link and logical heading order (one `h1`, `h2` per
  section, `h3`/`h4` beneath).
- All copy, links, and project data centralized in `assets/js/data.js`;
  `main.js` renders it into the DOM on load.
- Original pixel-grid SVG logo system: full wordmark, compact monogram, and
  favicon, all built from an 8px grid with a distinct accent color on the
  play-icon glyph. The nav logo's play icon animates a few pixels on
  hover/keyboard focus and returns smoothly; this respects
  `prefers-reduced-motion`.
- A scroll-position "playhead" rail fixed to the top of the page — the
  site's recurring editing-timeline motif, reused for section labels
  (`00:00`, `01:00`, ...) and the process timeline.
- Hero section with a geometric editing-timeline SVG showing clips, caption
  and sound tracks, and an editing playhead.
- Selected Work section with two groups (Short-form x 5, 9:16; Long-form x
  2, 16:9), with muted video previews contained inside each card.
- An accessible video dialog: opens on project click, uses native
  `<video controls>`, supports Escape-to-close, traps focus inside the
  dialog while open and restores focus to the trigger on close, disables
  background scroll while open, stops playback on close, and shows a
  graceful fallback if a video fails to load. Only one dialog/video is
  ever active. Card previews use muted autoplay and `preload="metadata"`;
  the full player loads on project selection and uses native controls.
- Services, About, Skills, Process, and a clearly labeled sample concept
  section, all populated from `data.js`, following the honesty
  constraints in the brief (no invented testimonials, dates, or metrics).
- Metrics section wired up but hidden (`metrics.show = false`) until real
  numbers are supplied, per the brief.
- Contact section with working `mailto:`/`tel:` links and a copy-to-
  clipboard button with success/error feedback text (`aria-live="polite"`).
- Mobile menu (full-screen overlay) with Escape-to-close and focus
  management; desktop nav with an active-link underline treatment.
- Scroll reveal via `IntersectionObserver`, disabled entirely under
  `prefers-reduced-motion` (content is simply shown, not animated in).
- Responsive layout using CSS Grid/Flexbox and `clamp()`-based fluid type,
  checked structurally at 360px, tablet, laptop, and large-desktop
  breakpoints (see "Testing notes" below for how this was verified).

## Testing notes — what was verified and how

This environment does not have network/browser-automation access, so
testing was done through static verification rather than a live rendered
screenshot. Specifically verified:

- **JavaScript syntax**: both `data.js` and `main.js` pass `node --check`
  with no errors.
- **HTML/JS wiring**: every `document.getElementById(...)` call in
  `main.js` was cross-checked against `id="..."` attributes in
  `index.html` — no mismatches.
- **Markup balance**: opening/closing tag counts for `div`, `section`,
  `header`, `footer`, `nav`, `main`, `ul`, and `svg` all matched.
- **CSS validity**: brace count in `styles.css` is balanced (196 open /
  196 close).
- **Asset availability**: the linked styles, scripts, logos, OG image, and
  all seven local MP4 files are present in the project.
- **Logic review**: the video dialog's focus-trap, scroll-lock, Escape
  handling, and video-source branching were reviewed for all seven projects.

**Not verified** (would need a real browser): actual pixel-level rendering
at each breakpoint, real keyboard-navigation behavior in a live focus trap,
computed color-contrast ratios, and Lighthouse/performance scores. I'm not
reporting a performance score because none was measured. If you have
access to a browser, load the site locally and check the four widths
called out in the brief (360px, tablet, laptop, large desktop), tab through
the mobile menu and video dialog with a keyboard, and toggle your OS's
"reduce motion" setting to confirm animations fall back to static states.

## Adding a resume, real logo favicon `.ico`, or PNG Open Graph image

- **Resume**: drop a PDF anywhere under `assets/` (e.g.
  `assets/resume.pdf`) and set `links.resumeUrl` in `data.js` to that path.
- **Favicon**: `favicon.svg` works in all modern browsers. If you want a
  `.ico`/`.png` fallback for older browsers, export `assets/logos/favicon.svg`
  to PNG (e.g. via any image editor or an online SVG-to-PNG converter) and
  add a second `<link rel="icon" href="assets/logos/favicon.png">` in
  `index.html`.
- **Open Graph image**: `assets/og/og-image.svg` is the source. Most social
  platforms prefer a raster image for previews — export it to a 1200×630
  PNG with any image editor or SVG-to-PNG tool, save it as
  `assets/og/og-image.png`, and update the `og:image` meta tag in
  `index.html` to point to the PNG.

## Notes on content honesty

Per the brief, this site does not include any testimonials, client logos,
revenue figures, conversion numbers, awards, or certifications that
weren't supplied — because none exist yet. The "How I Think About Content"
section is clearly labeled as a proposed concept, not a client project.
The metrics section stays hidden until real, verifiable numbers are
added. Please don't fill in placeholder numbers for the metrics section —
leave it hidden until you have exact figures and supporting screenshots or
links, as specified in the brief.
