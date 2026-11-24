/* 스펙 설명의 움직이는 그림. 장면은 anim/<스펙 키>.js에 하나씩 있고 SCENES에 자신을 등록합니다.
   장면 함수 (svg, ctx) => { duration, frame(t) }
   - svg: viewBox 0 0 400 300인 빈 <svg>. 바탕(PHOTO)은 이미 깔려 있습니다.
   - ctx: { p: 지금 제품 또는 null, products: PRODUCTS, size: "M" }
   - duration: 한 바퀴 길이(초). frame(t)는 0 <= t < duration인 시각마다 불립니다.
   - 움직임 감소 설정이면 frame(duration * 0.999)를 한 번만 그려 정지 화면으로 씁니다. */

const SCENES = {};
const SVGNS = "http://www.w3.org/2000/svg";

/* 장면 색. 페이지와 같은 값을 쓰도록 장면을 그릴 때마다 CSS 토큰(styles.css :root)을 읽습니다.
   CSS가 없는 미리보기에서는 아래 기본값을 씁니다. MINE은 지금 보는 제품, FAINT는 다른 제품과 보조 도형입니다. */
let INK = "#111111", SUB = "#666666", FAINT = "#bdbdbd", PHOTO = "#f2f2f2", MINE = INK;
function syncSceneColors() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
  INK = v("--ink", INK); SUB = v("--sub", SUB); FAINT = v("--other", FAINT); PHOTO = v("--photo", PHOTO);
  MINE = INK;
}

/* SVG 요소 하나를 만들어 parent에 붙입니다. text 속성은 글자 내용입니다. */
function el(parent, tag, attrs = {}) {
  const node = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  parent.appendChild(node);
  return node;
}
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
const easeInOut = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const easeOut = (k) => 1 - Math.pow(1 - k, 3);
/* t가 [a, b] 구간에서 0에서 1로 가는 진행도 */
const seg = (t, a, b) => clamp01((t - a) / (b - a));
/* 그림 속 글자. 기본 14px Pretendard, 가운데 정렬은 anchor: "middle" */
function label(parent, x, y, text, { size = 14, weight = 500, fill = SUB, anchor = "start" } = {}) {
  return el(parent, "text", { x, y, text, fill, "font-size": size, "font-weight": weight, "text-anchor": anchor, "font-family": "Pretendard Variable, Pretendard, sans-serif" });
}
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* stage(div) 안에 장면을 그리고 돌립니다. 담는 곳(드로어, 기술 패널)마다 따로 부르고, 돌려받은 핸들로 멈춥니다.
   장면이 없으면 null을 돌려줍니다. 사용자가 멈춘 것(user)과 화면 밖이라 멈춘 것(hidden)을 따로 기억합니다. */
function playScene(stage, key, ctx, { paused = false } = {}) {
  stage.textContent = "";
  const make = SCENES[key];
  if (!make) return null;
  syncSceneColors();
  const svg = el(stage, "svg", { viewBox: "0 0 400 300", role: "img", "aria-label": `${METRICS[key].name} 설명 그림` });
  el(svg, "rect", { width: 400, height: 300, fill: PHOTO });
  const scene = make(svg, ctx);
  const still = reducedMotion();
  const hold = { user: paused }; // 이유별 멈춤: user, hidden, drawer, tab. 하나라도 켜지면 멈춥니다
  let raf = 0, start = 0, at = still || paused ? scene.duration * 0.999 : 0, alive = true;
  const running = () => alive && !still && !Object.values(hold).some(Boolean);
  const tick = (now) => {
    if (!running()) return;
    at = ((now - start) / 1000) % scene.duration;
    scene.frame(at);
    raf = requestAnimationFrame(tick);
  };
  const update = () => {
    cancelAnimationFrame(raf);
    if (!running()) return;
    start = performance.now() - at * 1000;
    raf = requestAnimationFrame(tick);
  };
  scene.frame(at);
  update();
  return {
    stop() { alive = false; cancelAnimationFrame(raf); },
    hold(reason, on) { hold[reason] = on; update(); },
  };
}
