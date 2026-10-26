# Unearthed — portfolio site

Static site, no build step. Upload this `site/` folder as-is to any static host
(GitHub Pages, Netlify, Vercel, Cargo custom code, etc.).

- `index.html` — the page (gallery, viewer, statement, process)
- `data.js` — all text: your name, course line, rock descriptions, statement, ticker
- `models/` — web-optimised copies of `../Items/*.glb` (originals untouched)
- `thumbs/` — gallery stills, `<id>-out.webp` (shell) and `<id>-in.webp` (turned over)
- `media/` — the two screen recordings, re-encoded as mp4

## Preview locally

    node ../tools/serve.mjs

then open http://localhost:8137/site/

## If you change a model

1. `cd tools && npm install`, then `node tools/optimize.mjs Items/<id>.glb site/models/<id>.glb`. It welds vertices, drops flat normals (the viewer re-derives flat
   shading), meshopt-compresses geometry, WebP textures ≤ 4096px.
2. Re-render its stills at http://localhost:8137/tools/thumbs.html?only=<id>
