#!/usr/bin/env bash
#
# sync.sh — refresh the two NLA viewers from the research repo, then commit + push.
#
# One-command publish. Run from anywhere:
#     bash "/Users/agastyasridharan/ruhr research/nla-viewers/sync.sh"
#
# It copies each site's entry HTML (-> index.html) plus every local <script src>
# JS file it references, so regenerated/added data files are picked up
# automatically. GitHub Pages redeploys ~30-60s after the push.
#
# Override the source research repo if it ever moves:
#     NLA_RESEARCH_REPO=/path/to/repo bash sync.sh
#
set -euo pipefail

# This repo (wherever this script lives).
DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source research repo (default = current known location).
SRC="${NLA_RESEARCH_REPO:-/Users/agastyasridharan/ruhr research/natural_language_autoencoders_original}"

MIMICS_SRC="$SRC/analysis/mimic_audit/corpus"
CF_SRC="$SRC/nla_studio/experiments/counterfactual/browser"

[ -d "$MIMICS_SRC" ] || { echo "ERROR: mimics source not found: $MIMICS_SRC" >&2; exit 1; }
[ -d "$CF_SRC" ]     || { echo "ERROR: counterfactual source not found: $CF_SRC" >&2; exit 1; }

# sync_site <source-dir> <entry-html> <dest-subfolder>
sync_site() {
  local src_dir="$1" entry="$2" dest_sub="$3"
  local dest_dir="$DEST/$dest_sub"
  echo "== $dest_sub =="
  [ -f "$src_dir/$entry" ] || { echo "ERROR: entry not found: $src_dir/$entry" >&2; exit 1; }

  # Clean re-copy so removed dependencies don't linger.
  rm -rf "$dest_dir"
  mkdir -p "$dest_dir"
  cp "$src_dir/$entry" "$dest_dir/index.html"
  echo "  + index.html   (from $entry)"

  # Copy every LOCAL <script src="*.js"> the entry references.
  local refs
  refs=$(grep -oE 'src="[^"]+\.js"' "$src_dir/$entry" \
           | sed -E 's/^src="//; s/"$//' \
           | grep -vE '^https?://' \
           | sort -u || true)
  local f
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if [ -f "$src_dir/$f" ]; then
      cp "$src_dir/$f" "$dest_dir/$f"
      echo "  + $f"
    else
      echo "  ! skipped (referenced but missing in source): $f"
    fi
  done <<< "$refs"
}

sync_site "$MIMICS_SRC" "viewer.html"          "nla-mimics"
sync_site "$CF_SRC"     "catalog_browser.html" "nla-counterfactuals"

# Commit + push only if something actually changed.
cd "$DEST"
git add -A
if git diff --cached --quiet; then
  echo
  echo "No changes — site already matches the research repo. Nothing to push."
  exit 0
fi

ts="$(date '+%Y-%m-%d %H:%M')"
git commit -q -m "Sync viewers from research repo ($ts)"
git push -q
echo
echo "Pushed. GitHub Pages redeploys in ~30-60s:"
echo "  https://agastyasridharan.github.io/nla-viewers/"
