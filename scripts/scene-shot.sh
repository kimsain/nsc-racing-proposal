#!/bin/sh
# Render one spec scene's preview sheet to PNG with headless Chrome.
# Usage: sh scripts/scene-shot.sh cfm [out.png]
# Needs the preview server: python3 scripts/serve.py (port 4173).
KEY="$1"
OUT="${2:-scripts/images/raw/scene-$KEY.png}"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1600,1500 --virtual-time-budget=4000 --screenshot="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")" \
  "http://localhost:4173/scripts/scene-preview.html?key=$KEY" >/dev/null 2>&1
echo "$OUT"
