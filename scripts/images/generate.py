"""Generate site images with Codex CLI (built-in image_gen) and convert them to webp.

Usage:
  python3 scripts/images/generate.py style-anchor           # one asset
  python3 scripts/images/generate.py r01-singlet r03-shell  # several, run in parallel
  python3 scripts/images/generate.py --all                  # everything except style-anchor
  python3 scripts/images/generate.py --missing              # only assets without a webp in assets/img

Raw PNGs land in scripts/images/raw/ (git-ignored); webp goes to assets/img/.
Assets with "ref": true attach raw/style-anchor.png so every photo keeps one tone.
After generating, run scripts/images/neutralize.py <name> so the backdrop matches --photo (#F2F2F2) exactly.
"""
import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
RAW = HERE / "raw"
OUT = ROOT / "assets" / "img"
SPEC = json.loads((HERE / "prompts.json").read_text())


def generate(name: str) -> str:
    asset = SPEC["assets"][name]
    dest = RAW / f"{name}.png"
    prompt = (
        "Use your built-in image_gen tool to generate exactly one image. Do not write code or use any API key.\n"
        f"Size: {asset['size']}.\n"
        f"Image prompt: {asset['prompt']} {SPEC['style']}\n"
    )
    cmd = ["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", str(ROOT)]
    if asset.get("ref"):
        prompt += "The attached image is a STYLE REFERENCE only: match its background color, lighting, shadow and color grade, not its subject.\n"
        cmd += ["-i", str(RAW / "style-anchor.png")]
    prompt += f"When done, copy the generated PNG to {dest} (overwrite if it exists) and reply with that path only."
    # The prompt goes through stdin: `-i` takes several values and would swallow a positional prompt.
    run = subprocess.run(cmd, input=prompt, text=True, capture_output=True)
    if run.returncode != 0 or not dest.exists():
        return f"{name}: FAILED (exit {run.returncode}) {run.stderr.strip()[-400:]}"
    webp = OUT / f"{name}.webp"
    if name != "style-anchor":
        resize = ["-resize", "1200", "0"] if asset["size"].startswith("1536") else []
        subprocess.run(["cwebp", "-quiet", "-q", "82", *resize, str(dest), "-o", str(webp)], check=True)
    return f"{name}: ok {dest.stat().st_size // 1024}KB png" + (f", {webp.stat().st_size // 1024}KB webp" if webp.exists() else "")


if __name__ == "__main__":
    RAW.mkdir(exist_ok=True)
    rest = [n for n in SPEC["assets"] if n != "style-anchor"]
    if sys.argv[1:] == ["--all"]:
        names = rest
    elif sys.argv[1:] == ["--missing"]:
        names = [n for n in rest if not (OUT / f"{n}.webp").exists()]
    else:
        names = sys.argv[1:]
    with ThreadPoolExecutor(max_workers=4) as pool:
        for line in pool.map(generate, names):
            print(line, flush=True)
