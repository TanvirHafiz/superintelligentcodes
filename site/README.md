# Catalogue Nº 01: the portfolio site

Pure static site: HTML, CSS, vanilla JS. No build step, no backend, no server code, so it runs comfortably on Cloudflare's free tier.

- Animation: GSAP + ScrollTrigger + Flip, Lenis smooth scroll (all vendored in `js/vendor/`, nothing fetched from a CDN at runtime except Google Fonts).
- Content lives in `js/data.js`. Add or edit a project there and drop a matching `img/<name>.webp` next to it.
- Images are 960px WebP (about 1.2 MB total).

## Deploy

**Cloudflare Pages** (simplest): Workers & Pages → Create → Pages → upload the `site/` folder (or connect the repo, build command empty, output directory `site`).

**Cloudflare Workers (static assets)**: from the repo root, run `npx wrangler deploy` (see `wrangler.toml`).

`_headers` adds caching and basic security headers on both.

## Local preview

```bash
cd site && python -m http.server 5199
```
