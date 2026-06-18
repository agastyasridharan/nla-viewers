# NLA Research Viewers

Two self-contained, client-side static viewers for natural-language-autoencoder (NLA) analysis. No build step, no backend — open the HTML and JavaScript data files render in the browser.

## Sites

| Path | What it is |
|------|------------|
| [`nla-mimics/`](nla-mimics/) | **NLA Corpus Viewer** — mimic-audit corpus: activation-reconstruction comparisons (real vs. mimic) and calibration views across Qwen-7B, Gemma-12B/27B, and Llama-70B. |
| [`nla-counterfactuals/`](nla-counterfactuals/) | **Counterfactual-Pair Catalog** — browsable catalog of the counterfactual-pair suite used to probe grounded vs. prior-substituted decoding. |

The root [`index.html`](index.html) is a landing page linking to both.

## Hosting

Deployed with **GitHub Pages** (deploy-from-branch, `main` / root). The `.nojekyll` file disables Jekyll so every file is served verbatim.

## Run locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Each site is also openable directly (`file://…/nla-mimics/index.html`); the data is embedded as `window.*` JavaScript globals, so no server is strictly required.

## Data

Each viewer's data lives beside its `index.html` as auto-generated `.js` files (e.g. `viewer_data.js`, `catalog.js`). These are static snapshots; regenerate them from the upstream NLA research repo's build scripts.
