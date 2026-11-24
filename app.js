/* 표현과 연결. 상태는 state 하나에 두고 setState로만 바꿉니다.
   숫자와 문구는 data.js, 판단은 logic.js, 움직이는 그림은 anim.js와 anim/*.js에 있습니다. */

document.documentElement.classList.add("js");
const $ = (id) => document.getElementById(id);
const PAGE = document.body.dataset.page; // "collection" | "product"
const params = new URLSearchParams(location.search);
const PRODUCT = PAGE === "product" ? byId(params.get("id")) : null;
if (PAGE === "product" && !PRODUCT) location.replace("index.html");

const state = {
  size: "M", compareId: PRODUCT ? PRODUCT.compareWith : null, pairTemp: TEMP_PRESETS[1].t,
  cat: CATEGORIES.some((c) => c.id === params.get("cat")) ? params.get("cat") : "all", temp: null, sort: "default",
  techGroup: TECH_GROUPS[0].id, techItem: 0, techPaused: false,
  spec: null, paused: false, cart: [], cartOpen: false, guide: false,
};

/* 바뀐 값에 걸린 부분만 다시 그립니다. 전체를 다시 그리면 포커스와 스크린리더 안내가 흐트러집니다. */
function setState(patch) {
  const changed = Object.keys(patch).filter((k) => state[k] !== patch[k]);
  Object.assign(state, patch);
  new Set(changed.flatMap((k) => RENDERS[k] || [])).forEach((fn) => fn());
}

/* 상자 안을 다시 그려도 키보드 포커스가 같은 순서의 조작 요소에 남게 합니다.
   다음 스펙, 빼기처럼 누른 버튼 자체가 새로 그려질 때 포커스가 body로 빠지지 않게 하려는 것입니다. */
function fill(box, html) {
  const controls = () => [...box.querySelectorAll("button, a[href], select, input")];
  const at = controls().indexOf(document.activeElement);
  box.innerHTML = html;
  if (at < 0) return;
  const list = controls();
  if (list.length) list[Math.min(at, list.length - 1)].focus({ preventScroll: true });
}

/* ---------- 작은 부품 ---------- */

const img = (name) => `assets/img/${name}.webp`;
const unitSpan = (u) => (u ? `<span class="u">${u}</span>` : "");
const productUrl = (p, spec) => `product.html?id=${p.id}${spec ? `#spec=${spec}` : ""}`;
const metricTitle = (key) => { const m = METRICS[key]; return m.abbr ? `${m.name} ${m.abbr}` : m.name; };
const levelOf = (p, key) => indexLevel(key, p.nums[INDEX[key].metric]);

/* 0~5 지수 막대. 1px 선을 여섯 칸으로 나누고 지금 칸만 굵은 막대로 칠합니다. */
const ixBar = (level) => `<span class="ix-bar" aria-hidden="true">${[0, 1, 2, 3, 4, 5].map((n) => `<i${n === level ? ' class="on"' : ""}></i>`).join("")}</span>`;

/* 지수 한 줄: 이름, 막대, 단계 숫자, 실측값. jump면 누를 때 기술 패널의 그 묶음으로 갑니다. */
function indexRow(p, key, { jump = false } = {}) {
  const ix = INDEX[key];
  const level = levelOf(p, key);
  const { value, unit } = metricParts(p, ix.metric);
  const inner = `<span class="ix-name">${ix.name}</span>${ixBar(level)}<span class="ix-lv">${level}</span><span class="ix-val">${value} ${unit}</span>`;
  const label = `${ix.name} 지수 0~5 중 ${level}, ${ix.levels[level]}, ${value} ${unit}`;
  return jump ? `<button type="button" class="ix" data-tech-group="${key}" data-jump aria-label="${label}, 기술 설명으로 이동">${inner}</button>`
    : `<div class="ix" role="img" aria-label="${label}">${inner}</div>`;
}

/* 전 제품 공통 기온 눈금 위에 구간 막대. focus 제품은 진하게, 나머지는 옅게 그립니다. */
const axisPos = (t) => ((t - TEMP_AXIS[0]) / (TEMP_AXIS[1] - TEMP_AXIS[0])) * 100;
function tempBars(focus) {
  const ticks = [];
  for (let t = TEMP_AXIS[0]; t <= TEMP_AXIS[1]; t += 5) ticks.push(t);
  const bar = (p) => {
    const ext = p.layerMin !== undefined ? `<i class="ext" style="left:${axisPos(p.layerMin)}%;width:${axisPos(p.temp[0]) - axisPos(p.layerMin)}%"></i>` : "";
    return `<div class="tb-row${p === focus ? " focus" : ""}"><span class="tb-name">${p.code}</span><span class="tb-track">${ext}<i style="left:${axisPos(p.temp[0])}%;width:${axisPos(p.temp[1]) - axisPos(p.temp[0])}%"></i></span><span class="tb-range">${rangeText(p.temp)}°C</span></div>`;
  };
  const rows = focus ? [focus, ...PRODUCTS.filter((p) => p !== focus)] : PRODUCTS;
  return `<div class="tb">${rows.map(bar).join("")}<div class="tb-axis" aria-hidden="true"><span class="tb-name"></span><span class="tb-track">${ticks.map((t) => `<b style="left:${axisPos(t)}%">${minus(t)}</b>`).join("")}</span><span class="tb-range"></span></div></div>`;
}

const FLAT = {
  sleeve: "M95 20L80 28L40 45L18 150L36 154L62 72L66 200H214L218 72L244 154L262 150L240 45L200 28L185 20Q140 40 95 20Z",
  singlet: "M100 18L86 22Q80 60 66 72V200H214V72Q200 60 194 22L180 18Q140 52 100 18Z",
  shorts: "M60 20H220L222 40L236 190L150 196L140 110L130 196L44 190L58 40L60 20ZM58 40H222",
};
const MEASURE_LINES = {
  "가슴 단면": { d: "M68 82H212", lx: 140, ly: 76, a: "middle" },
  "총장": { d: "M104 26V200", lx: 110, ly: 150, a: "start" },
  "소매": { d: "M222 40L252 150", lx: 250, ly: 100, a: "start" },
  "허리": { d: "M60 30H220", lx: 140, ly: 14, a: "middle" },
  "인심": { d: "M139 114L131 192", lx: 126, ly: 170, a: "end" },
  "허벅지 단면": { d: "M51 122H137", lx: 94, ly: 140, a: "middle" },
};
function measureDiagram(p) {
  const shape = p.kind === "bottom" ? "shorts" : p.measure.some(([n]) => n === "소매") ? "sleeve" : "singlet";
  const lines = p.measure.map(([n]) => { const name = n.split(" (")[0]; const l = MEASURE_LINES[name]; return l ? `<path d="${l.d}" class="ml"/><text x="${l.lx}" y="${l.ly}" text-anchor="${l.a}">${name}</text>` : ""; }).join("");
  return `<svg class="flat" viewBox="0 0 290 220" role="img" aria-label="${p.code} 실측 위치 그림"><path d="${FLAT[shape]}" class="fo"/>${lines}</svg>`;
}
function measureTable(p) {
  const on = (s) => (s === state.size ? ' class="on"' : "");
  return `<caption class="visually-hidden">사이즈별 실측</caption><thead><tr><th scope="col">cm</th>${SIZES.map((s) => `<th scope="col"${on(s)}>${s}</th>`).join("")}</tr></thead>
    <tbody>${p.measure.map(([name, vals]) => `<tr><th scope="row">${name}</th>${vals.map((v, i) => `<td${on(SIZES[i])}>${v}</td>`).join("")}</tr>`).join("")}
    <tr><th scope="row">제품 무게 (g)</th>${SIZES.map((s) => `<td${on(s)}>${p.sizes[s]}</td>`).join("")}</tr></tbody>`;
}

const careIcon = {
  wash30: `<path d="M3 8l2 11h14l2-11"/><path d="M3 8c3 2 6-2 9 0s6 2 9 0"/><text x="12" y="17" text-anchor="middle" font-size="7" font-weight="700">30</text>`,
  nobleach: `<path d="M12 4L21 20H3z"/><path d="M5 5l14 14M19 5L5 19"/>`,
  nodry: `<rect x="3" y="3" width="18" height="18"/><circle cx="12" cy="12" r="6"/><path d="M4 4l16 16M20 4L4 20"/>`,
  lowdry: `<rect x="3" y="3" width="18" height="18"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="1.2" class="pf"/>`,
  noiron: `<path d="M4 18h16l-2-8H8c-3 0-4 4-4 8z"/><path d="M5 5l14 14M19 5L5 19"/>`,
};

/* ---------- 공통: 공지, 헤더, 푸터 ---------- */

function renderChrome() {
  $("notice").textContent = SITE.notice;
  const navCat = PAGE === "collection" ? state.cat : PRODUCT.kind;
  $("hdr").innerHTML = `<div class="wrap hdr-in">
    <a class="logo" href="index.html" aria-label="NESCL R 컬렉션">NESCL <b>R</b></a>
    <nav class="nav" aria-label="카테고리">${CATEGORIES.map((c) => `<a href="index.html${c.id === "all" ? "" : `?cat=${c.id}`}"${c.id === navCat ? ' aria-current="page"' : ""}>${c.id === "all" ? "NESCL R 전체" : c.name}</a>`).join("")}<span class="nav-off" aria-disabled="true">NESCL 스타일 라인</span></nav>
    <button type="button" class="cart-btn" data-cart-open>장바구니 <span id="cartCount">0</span></button></div>`;
  $("foot").innerHTML = `<div class="wrap foot-in">
    <p class="logo">NESCL <b>R</b></p>
    <p>${SITE.notice} 사진은 Codex로 생성한 이미지입니다.</p></div>`;
}

function renderCartCount() {
  $("cartCount").textContent = state.cart.length;
}

/* ---------- 컬렉션 ---------- */

const COMPARE_ROWS = ["gsm", "weight", "cfm", "mvtr", "ret", "clo", "dry", "stretch", "compression", "repel"];

function renderCollectionStatic() {
  $("intro").textContent = SITE.intro;
  $("catTabs").innerHTML = CATEGORIES.map((c) => `<button type="button" role="tab" data-cat="${c.id}">${c.name}</button>`).join("");
  $("sort").innerHTML = SORTS.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");
  $("tempRange").min = TEMP_AXIS[0];
  $("tempRange").max = TEMP_AXIS[1];
  $("bandCap").textContent = `네 제품의 원단 시험편. 왼쪽부터 ${PRODUCTS.map((p) => `${p.code} ${p.fabric.name}`).join(", ")}.`;
  renderCompareTable();
}

function card({ p, role }) {
  return `<li class="card"><a href="${productUrl(p)}">
    <span class="card-img"><img src="${img(p.gallery[0][0])}" alt="${p.gallery[0][1]}" width="1024" height="1280" loading="lazy"><img class="alt" src="${img(p.gallery[p.gallery.length - 1][0])}" alt="" width="1024" height="1280" loading="lazy" data-optional></span>
    <span class="card-row"><span class="card-name">${p.name}</span><span class="card-price">${won(p.price)}</span></span>
    <span class="card-meta">${p.code} · ${p.cat} · ${rangeText(p.temp)}°C</span>
    <span class="card-spec">${p.card.map((k) => shortSpec(p, k)).join(" · ")}</span>
    ${role ? `<span class="card-role">${minus(state.temp)}°C에서 ${role}</span>` : ""}
  </a></li>`;
}

function renderCollection() {
  const list = collection({ cat: state.cat, temp: state.temp, sort: state.sort });
  document.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.cat === state.cat)));
  $("sort").value = state.sort;
  $("tempRange").value = state.temp ?? 10;
  $("tempRange").setAttribute("aria-valuetext", state.temp === null ? "기온 상관없음" : `${minus(state.temp)}°C`);
  $("tempOut").textContent = state.temp === null ? "상관없음" : `${minus(state.temp)}°C`;
  $("tempClear").hidden = state.temp === null;
  $("count").textContent = `${list.length}개 제품`;
  $("grid").innerHTML = list.length ? list.map(card).join("")
    : `<li class="empty"><p>이 조건에 맞는 R 제품이 없습니다.</p><button type="button" class="btn-line" data-reset>조건 지우기</button></li>`;
}

function renderCompareTable() {
  const row = (head, cell) => `<tr><th scope="row">${head}</th>${PRODUCTS.map((p) => `<td>${cell(p)}</td>`).join("")}</tr>`;
  const specHead = (k) => `<button type="button" class="th-btn" data-spec="${k}">${metricTitle(k)}</button>`;
  $("cmpTable").innerHTML = `
    <thead><tr><th scope="col"><span class="visually-hidden">항목</span></th>${PRODUCTS.map((p) => `<th scope="col"><a href="${productUrl(p)}"><img src="${img(p.gallery[0][0])}" alt="" width="1024" height="1280" loading="lazy"><span>${p.code}</span>${p.name}</a></th>`).join("")}</tr></thead>
    <tbody>
      ${Object.keys(INDEX).map((k) => row(`<button type="button" class="th-btn" data-spec="${INDEX[k].metric}">${INDEX[k].name} 지수</button>`, (p) => {
        const lv = levelOf(p, k);
        return `<span class="cmp-ix">${ixBar(lv)}<span class="ix-lv">${lv}</span></span>`;
      })).join("")}
      ${COMPARE_ROWS.map((k) => row(specHead(k), (p) => {
        if (!p.specKeys.includes(k)) return `<span class="na">해당 없음</span>`;
        const v = metricParts(p, k);
        return `${v.value} <span class="u">${v.unit}</span>`;
      })).join("")}
      ${row(specHead("temp"), (p) => `<span class="mini-tb">${p.layerMin !== undefined ? `<i class="ext" style="left:${axisPos(p.layerMin)}%;width:${axisPos(p.temp[0]) - axisPos(p.layerMin)}%"></i>` : ""}<i style="left:${axisPos(p.temp[0])}%;width:${axisPos(p.temp[1]) - axisPos(p.temp[0])}%"></i></span>${rangeText(p.temp)}°C${p.layerMin !== undefined ? `<small>겹치면 ${minus(p.layerMin)}°C</small>` : ""}`)}
      ${row("가격", (p) => won(p.price))}
    </tbody>`;
}

/* ---------- 제품 상세 ---------- */

function specRow({ m, label, value, unit, note }) {
  const inner = `<span class="sr-label">${label}</span><span class="sr-val">${value}${unitSpan(unit)}${note ? `<small>${note}</small>` : ""}</span>`;
  return m ? `<button type="button" class="sr" data-spec="${m}">${inner}</button>` : `<div class="sr">${inner}</div>`;
}

function specGroups(p) {
  const metricRow = (k) => { const v = metricParts(p, k, state.size); return { m: k, label: metricTitle(k), value: v.value, unit: v.unit, note: v.note || METRICS[k].std }; };
  const extra = (g) => p.extraRows.filter((r) => r.group === g);
  const groups = [
    ["원단", [
      { m: "gsm", label: `${p.fabric.part} 원단`, value: p.fabric.name, note: `${p.fabric.structure} · ${p.nums.gsm} g/m²` },
      metricRow("gsm"),
      { label: "혼용률", value: p.fabric.mix },
      { label: "생산", value: p.fabric.origin },
      ...extra("원단"),
    ]],
    ["성능", [...["cfm", "mvtr", "ret", "clo", "dry", "stretch", "compression", "repel"].filter((k) => p.specKeys.includes(k)).map(metricRow), ...extra("성능")]],
    ["수납", extra("수납")],
    ["핏", [{ label: "핏", value: p.fit.name, note: p.fit.def }, metricRow("weight"), metricRow("temp"), ...extra("핏")]],
    ["관리", [...p.care.map(([k, t]) => ({ label: `<svg class="care-i" viewBox="0 0 24 24" aria-hidden="true">${careIcon[k]}</svg>`, value: t })), { label: "참고", value: p.careNote }]],
  ];
  return groups.filter(([, rows]) => rows.length);
}

function renderProductStatic() {
  const p = PRODUCT;
  document.title = `${p.code} ${p.name} · NESCL R (콘셉트 목업)`;
  $("crumb").innerHTML = `<a href="index.html">NESCL R</a><span aria-hidden="true">/</span><a href="index.html?cat=${p.kind}">${CATEGORIES.find((c) => c.id === p.kind).name}</a><span aria-hidden="true">/</span><span aria-current="page">${p.code} ${p.name}</span>`;
  $("gallery").innerHTML = p.gallery.map(([name, alt], i) => `<figure><img src="${img(name)}" alt="${alt}" width="1024" height="1280"${i ? ' loading="lazy" data-optional' : ""}></figure>`).join("");
  $("buyHead").innerHTML = `<p class="buy-cat">${p.code} · ${p.cat}</p><h1>${p.name}</h1><p class="buy-price">${won(p.price)}</p><p class="buy-hook">${p.hook}</p>`;
  $("indexRows").innerHTML = Object.keys(INDEX).map((k) => indexRow(p, k, { jump: true })).join("");
  $("color").innerHTML = `<p class="opt-h"><span>색상</span><b>${p.color}</b></p><span class="swatch" aria-hidden="true"></span>`;
  $("sizes").innerHTML = SIZES.map((s) => `<button type="button" data-size="${s}">${s}</button>`).join("");
  $("buyMeta").innerHTML = `<li>${p.fabric.part} ${p.fabric.name} · ${p.fabric.mix}</li><li>${p.fabric.origin}</li>`;
  $("tempSec").innerHTML = `<p class="sec-lead">템포런 강도로 ${rangeText(p.temp)}°C에서 ${p.kind === "outer" ? "상의 위에 덧입습니다" : "한 벌로 입습니다"}.${p.layerMin !== undefined ? ` Hood Sleeve 185 위에 겹치면 ${minus(p.layerMin)}°C까지 입습니다(점선).` : ""} <button type="button" class="link" data-spec="temp">권장 기온을 정하는 방법</button></p>${tempBars(p)}`;
  $("fitHead").innerHTML = `<p class="fit-name">${p.fit.name}</p><p>${p.fit.def}</p>${measureDiagram(p)}`;
  $("compareSelect").innerHTML = PRODUCTS.filter((q) => q !== p).map((q) => `<option value="${q.id}">${q.code} ${q.name}</option>`).join("");
  $("pairChips").innerHTML = TEMP_PRESETS.map((t) => `<button type="button" class="chip" data-pair="${t.t}">${t.label} ${minus(t.t)}°C</button>`).join("");
  $("barThumb").innerHTML = `<img src="${img(p.gallery[0][0])}" alt="" width="1024" height="1280"><span>${p.code} ${p.name}</span>`;
}

/* 사이즈에 따라 바뀌는 곳: 사이즈 버튼, 핵심 수치의 무게, 스펙 표의 무게, 실측표 강조, 하단 구매 바 */
function renderSize() {
  const p = PRODUCT;
  document.querySelectorAll("[data-size]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.size === state.size)));
  fill($("keyTags"), p.keyTags.map((k) => {
    const v = metricParts(p, k, state.size);
    return `<button type="button" class="kv" data-spec="${k}"><span class="kv-label">${metricTitle(k)}${k === "weight" ? ` (${state.size})` : ""}</span><span class="kv-val">${v.value}${unitSpan(v.unit)}</span></button>`;
  }).join(""));
  fill($("specTable"), specGroups(p).map(([g, rows]) => `<div class="sg"><h3>${g}</h3>${rows.map(specRow).join("")}</div>`).join(""));
  $("measure").innerHTML = measureTable(p);
  $("barSize").textContent = `${state.size} · ${won(p.price)}`;
}

/* ---------- 기술 패널 ---------- */

const SCENE = { panel: null, drawer: null }; // 담는 곳마다 하나씩 도는 장면 핸들

function techBody(p, item) {
  if (item.kind === "metric") {
    const k = item.key;
    const m = METRICS[k];
    const v = metricParts(p, k, state.size);
    return {
      text: `<p class="tech-code">${[m.abbr, m.std].filter(Boolean).join(" · ")}</p>
        <h3 id="techItemH">${m.name}</h3>
        <p class="tech-val">${v.value}${unitSpan(v.unit)}</p>${v.note ? `<p class="tech-note">${v.note}</p>` : ""}
        <p>${m.def}</p><p>${m.why}</p>
        <p class="tech-links"><button type="button" class="link" data-spec="${k}">측정 방법과 네 제품 비교</button><button type="button" class="link" data-tech-pause aria-pressed="${state.techPaused}">${state.techPaused ? "그림 재생" : "그림 일시정지"}</button></p>`,
      media: `<div class="tech-stage" id="techStage"></div>`,
      scene: k,
    };
  }
  const pt = p.parts[item.i];
  return {
    text: `<p class="tech-code">부위 ${item.i + 1} / ${p.parts.length}</p><h3 id="techItemH">${pt.title}</h3><p>${pt.body}</p>`,
    media: pt.img ? `<img src="${img(pt.img)}" alt="${pt.title}" width="1024" height="1280" loading="lazy">`
      : `<div class="spot-shot"><img src="${img(p.gallery[0][0])}" alt="${p.gallery[0][1]}, ${pt.title} 위치 표시" width="1024" height="1280" loading="lazy"><i class="spot" style="left:${pt.x}%;top:${pt.y}%"></i></div>`,
  };
}

function itemName(p, item) {
  return item.kind === "metric" ? metricTitle(item.key) : p.parts[item.i].title;
}

function renderTech() {
  const p = PRODUCT;
  const g = TECH_GROUPS.find((x) => x.id === state.techGroup);
  const items = techItems(p, g.id);
  const item = items[Math.min(state.techItem, items.length - 1)];
  const body = techBody(p, item);
  const ix = g.index ? INDEX[g.index] : null;
  const level = ix ? levelOf(p, g.index) : null;
  if (SCENE.panel) SCENE.panel.stop();
  SCENE.panel = null;
  fill($("techPanel"), `
    <div class="tech-groups" role="tablist" aria-label="기술 묶음">${TECH_GROUPS.map((x) => `<button type="button" role="tab" data-tech-group="${x.id}" aria-selected="${x === g}" tabindex="${x === g ? 0 : -1}"><span>${x.name}</span>${x.index ? `<b>${levelOf(p, x.index)}</b>` : ""}</button>`).join("")}</div>
    ${ix ? `<div class="tech-index">
      <ol class="tix" aria-label="${ix.name} 지수 0~5">${[0, 1, 2, 3, 4, 5].map((n) => `<li${n === level ? ' class="on" aria-current="true"' : ""}><b>${n}</b><span>${ix.levels[n]}</span></li>`).join("")}</ol>
      <p class="tix-text"><b>${ix.name} ${level} · ${ix.levels[level]}</b> ${ix.dir}</p></div>` : ""}
    <div class="tech-items" role="tablist" aria-label="${g.name} 항목">${items.map((it, i) => `<button type="button" role="tab" data-tech-item="${i}" aria-selected="${it === item}" tabindex="${it === item ? 0 : -1}">${itemName(p, it)}</button>`).join("")}</div>
    <div class="tech-body" role="tabpanel" aria-labelledby="techItemH">
      <div class="tech-text">${body.text}</div>
      <div class="tech-media">${body.media}</div>
    </div>`);
  if (body.scene) SCENE.panel = playScene($("techStage"), body.scene, { p, products: PRODUCTS, size: state.size }, { paused: state.techPaused });
  if (SCENE.panel) { SCENE.panel.hold("drawer", Boolean(state.spec)); SCENE.panel.hold("hidden", !techVisible); SCENE.panel.hold("tab", document.hidden); }
}

function renderTechPaused() {
  const b = document.querySelector("[data-tech-pause]");
  if (!b || !SCENE.panel) return;
  b.setAttribute("aria-pressed", String(state.techPaused));
  b.textContent = state.techPaused ? "그림 재생" : "그림 일시정지";
  SCENE.panel.hold("user", state.techPaused);
}

let techVisible = false;

/* ---------- 비교, 함께 입기 ---------- */

function renderCompare() {
  const a = PRODUCT;
  const b = byId(state.compareId);
  $("compareSelect").value = b.id;
  const col = (p) => `<div class="cmp-col${p === a ? " this" : ""}">
    <a href="${productUrl(p)}" class="cmp-img"><img src="${img(p.gallery[0][0])}" alt="" width="1024" height="1280" loading="lazy"></a>
    <p class="cmp-name">${p.code} ${p.name}</p><p class="cmp-price">${won(p.price)}${p === a ? " · 지금 보는 제품" : ""}</p>
    <div class="ixs">${Object.keys(INDEX).map((k) => indexRow(p, k)).join("")}</div>
    <dl>${["gsm", "weight", "temp"].map((k) => { const v = metricParts(p, k); return `<div><dt>${metricTitle(k)}</dt><dd>${v.value} ${v.unit}</dd></div>`; }).join("")}</dl>
    ${p === a ? "" : `<a class="btn-line" href="${productUrl(p)}">제품 보기</a>`}</div>`;
  $("compareCols").innerHTML = col(a) + col(b);
}

function renderPair() {
  document.querySelectorAll("[data-pair]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.pair) === state.pairTemp)));
  const combo = recommend(state.pairTemp);
  $("pairList").innerHTML = combo.map(({ item, role }) => item.id
    ? `<li class="${item === PRODUCT ? "this" : ""}"><a href="${productUrl(item)}"><img src="${img(item.gallery[0][0])}" alt="" width="1024" height="1280" loading="lazy"><span class="pl-role">${role}</span><span class="pl-name">${item.code} ${item.name}</span><span class="pl-price">${won(item.price)}</span></a></li>`
    : `<li class="nescl"><span class="pl-role">${role}</span><span class="pl-name">${item.name}</span><span class="pl-line">NESCL 스타일 라인</span></li>`).join("");
  $("pairAdd").hidden = !combo.some((r) => r.item.id);
}

/* ---------- 스펙 설명 드로어 ---------- */

function bandStrip(key, v) {
  const m = METRICS[key];
  if (!m.scale) return "";
  const pos = (x) => scalePos(key, x) * 100;
  return `<div class="strip">${stripBands(key).map(([a, b, l]) => `<i style="left:${pos(a)}%;width:${pos(b) - pos(a)}%"><span>${l}</span></i>`).join("")}${v !== undefined ? `<b style="left:${pos(v)}%"></b>` : ""}</div>
    <p class="strip-cap"><span>${fmt(m.scale[0])}</span>${m.index ? "<span>칸 안의 숫자는 0~5 지수 단계</span>" : ""}<span>${fmt(m.scale[1])} ${m.unit}</span></p>`;
}

function indexLegend(key, v) {
  const ixKey = METRICS[key].index;
  if (!ixKey) return "";
  const ix = INDEX[ixKey];
  const level = v === undefined ? -1 : indexLevel(ixKey, v);
  const c = ix.cuts;
  const u = METRICS[key].unit;
  const range = (n) => {
    if (n === 0) return `${fmt(c[0])} ${u} ${ix.low ? "이상" : "미만"}`;
    if (n === c.length) return `${fmt(c[n - 1])} ${u} ${ix.low ? "미만" : "이상"}`;
    return ix.low ? `${fmt(c[n])}~${fmt(c[n - 1])} ${u}` : `${fmt(c[n - 1])}~${fmt(c[n])} ${u}`;
  };
  return `<table class="legend"><caption>${ix.name} 지수 단계</caption><tbody>${ix.levels.map((l, n) => `<tr${n === level ? ' class="on"' : ""}><th scope="row">${n}</th><td>${range(n)}</td><td>${l}</td></tr>`).join("")}</tbody></table>`;
}

function compareBars(key) {
  if (key === "temp") return tempBars(PRODUCT);
  const val = (p) => (key === "stretch" ? (p.nums.stretch || [])[0] : p.nums[key]);
  const list = PRODUCTS.filter((p) => typeof val(p) === "number");
  if (list.length < 2) return "";
  const max = Math.max(...list.map(val));
  return `<ul class="cbars">${list.map((p) => {
    const v = metricParts(p, key);
    const inner = `<span class="cb-name">${p.code} ${p.name}</span><span class="cb-track"><i style="width:${(val(p) / max) * 100}%"></i></span><span class="cb-val">${key === "stretch" ? p.nums.stretch[0] : v.value} ${v.unit}</span>`;
    return `<li class="${p === PRODUCT ? "this" : ""}">${p === PRODUCT ? `<span class="cb">${inner}</span>` : `<a class="cb" href="${productUrl(p, key)}">${inner}</a>`}</li>`;
  }).join("")}</ul>${key === "stretch" ? '<p class="note">가로 신장률 기준입니다.</p>' : ""}${key === "weight" ? '<p class="note">M 사이즈 기준입니다.</p>' : ""}`;
}

function specKeysNow() {
  return PRODUCT ? PRODUCT.specKeys : Object.keys(METRICS);
}

function renderSpec() {
  const d = $("specDrawer");
  if (SCENE.panel) SCENE.panel.hold("drawer", Boolean(state.spec)); // 드로어가 열린 동안 패널 장면은 쉽니다
  if (!state.spec) {
    if (SCENE.drawer) SCENE.drawer.stop();
    SCENE.drawer = null;
    return closeDialog(d);
  }
  const key = state.spec;
  const m = METRICS[key];
  const p = PRODUCT && PRODUCT.specKeys.includes(key) ? PRODUCT : null;
  const v = p ? metricParts(p, key, state.size) : null;
  const raw = p ? (key === "weight" ? p.sizes[state.size] : p.nums[key]) : undefined;
  const keys = specKeysNow();
  const i = Math.max(0, keys.indexOf(key));
  const cmp = compareBars(key);
  fill($("specBody"), `
    <div class="dr-bar"><p>스펙 설명</p><button type="button" class="dr-x" data-close>닫기</button></div>
    <div class="dr-chips" role="tablist" aria-label="스펙">${keys.map((k) => `<button type="button" role="tab" data-spec="${k}" aria-selected="${k === key}" tabindex="${k === key ? 0 : -1}">${metricTitle(k)}</button>`).join("")}</div>
    <div class="dr-main">
      <p class="dr-abbr">${[m.abbr, m.std].filter(Boolean).join(" · ")}</p>
      <h2 id="specTitle">${m.name}</h2>
      ${v ? `<p class="dr-val">${v.value}${unitSpan(v.unit)}</p><p class="dr-for">${p.code} ${p.name}${v.note ? ` · ${v.note}` : ""}</p>` : ""}
      <div class="dr-stage"><div id="stage"></div><button type="button" class="dr-pause" data-pause aria-pressed="${state.paused}">${state.paused ? "재생" : "일시정지"}</button></div>
      <h3>무엇인가요</h3><p>${m.def}</p>
      <h3>왜 중요한가요</h3><p>${m.why}</p>
      <h3>어떻게 재나요</h3><p>${m.how}</p>
      ${m.photo ? `<img class="dr-photo" src="${m.photo}" alt="통기도 시험 장면" width="1200" height="800" loading="lazy">` : ""}
      ${m.scale || m.index ? `<h3>${p ? "이 제품 값의 위치" : "값의 기준"}</h3>${bandStrip(key, typeof raw === "number" ? raw : undefined)}${indexLegend(key, typeof raw === "number" ? raw : undefined)}` : ""}
      ${cmp ? `<h3>NESCL R 제품 비교</h3>${cmp}` : ""}
      <p class="dr-limit">${m.limit}</p>
    </div>
    <div class="dr-nav">
      <button type="button" class="btn-line" data-spec="${keys[(i - 1 + keys.length) % keys.length]}">이전 스펙</button>
      <button type="button" class="btn-line" data-spec="${keys[(i + 1) % keys.length]}">다음 스펙</button>
    </div>`);
  openDialog(d);
  $("specBody").scrollTop = 0;
  const chip = $("specBody").querySelector(".dr-chips [aria-selected=true]");
  if (chip) chip.parentElement.scrollLeft = chip.offsetLeft - chip.parentElement.offsetLeft - 24;
  if (SCENE.drawer) SCENE.drawer.stop();
  SCENE.drawer = playScene($("stage"), key, { p, products: PRODUCTS, size: state.size }, { paused: state.paused });
  if (SCENE.drawer) SCENE.drawer.hold("tab", document.hidden);
  $("stage").closest(".dr-stage").hidden = !SCENE.drawer;
}

function renderPaused() {
  const b = document.querySelector("[data-pause]");
  if (!b || !SCENE.drawer) return;
  b.setAttribute("aria-pressed", String(state.paused));
  b.textContent = state.paused ? "재생" : "일시정지";
  SCENE.drawer.hold("user", state.paused);
}

/* ---------- 장바구니 ---------- */

function renderCart() {
  renderCartCount();
  const d = $("cartDrawer");
  if (!state.cartOpen) return closeDialog(d);
  const total = state.cart.reduce((s, l) => s + byId(l.id).price, 0);
  fill($("cartBody"), `
    <div class="dr-bar"><p id="cartTitle">장바구니 ${state.cart.length}</p><button type="button" class="dr-x" data-close>닫기</button></div>
    <div class="dr-main">
      <p class="cart-note">${SITE.cartNote}</p>
      ${state.cart.length ? `<ul class="cart-list">${state.cart.map((l, i) => { const p = byId(l.id); return `<li><img src="${img(p.gallery[0][0])}" alt="" width="1024" height="1280"><span><b>${p.code} ${p.name}</b><small>${p.color} · ${l.size}</small></span><span>${won(p.price)}</span><button type="button" class="link" data-remove="${i}">빼기</button></li>`; }).join("")}</ul>
        <p class="cart-total"><span>합계</span><b>${won(total)}</b></p>` : `<p class="cart-empty">담은 제품이 없습니다.</p>`}
      <button type="button" class="btn" disabled>주문하기 (목업)</button>
    </div>`);
  openDialog(d);
}

/* ---------- 사이즈 가이드 ---------- */

function renderGuide() {
  const d = $("guideDrawer");
  if (!d) return;
  if (!state.guide) return closeDialog(d);
  const p = PRODUCT;
  fill($("guideBody"), `
    <div class="dr-bar"><p id="guideTitle">사이즈 가이드</p><button type="button" class="dr-x" data-close>닫기</button></div>
    <div class="dr-main">
      <p class="dr-abbr">${p.code} ${p.name}</p>
      <h2>${p.fit.name}</h2>
      <p>${p.fit.def}</p>
      ${measureDiagram(p)}
      <div class="sizes guide-sizes" role="group" aria-label="사이즈">${SIZES.map((s) => `<button type="button" data-size="${s}" aria-pressed="${s === state.size}">${s}</button>`).join("")}</div>
      <table class="measure">${measureTable(p)}</table>
      <p class="note">옷을 평평하게 놓고 잰 값(cm)입니다. 단면은 한쪽 폭이라 둘레는 두 배입니다.</p>
    </div>`);
  openDialog(d);
}

/* ---------- 다시 그리기 연결표 ---------- */

const RENDERS = {
  cat: [renderCollection], temp: [renderCollection], sort: [renderCollection],
  size: PRODUCT ? [renderSize, renderGuide, renderTech] : [], guide: [renderGuide], compareId: [renderCompare], pairTemp: [renderPair],
  techGroup: [renderTech], techItem: [renderTech], techPaused: [renderTechPaused],
  spec: [renderSpec], paused: [renderPaused],
  cart: [renderCart], cartOpen: [renderCart],
};

/* ---------- 연결: 다이얼로그 ---------- */

/* 닫힘 애니메이션이 끝난 뒤 close()합니다. 그 사이에 다시 열면 예약을 취소합니다. */
const closeTimers = new Map();
function openDialog(d) {
  clearTimeout(closeTimers.get(d));
  d.classList.remove("closing");
  if (!d.open) d.showModal();
}
function closeDialog(d) {
  if (!d.open || d.classList.contains("closing")) return;
  d.classList.add("closing");
  const done = () => { d.classList.remove("closing"); d.close(); };
  if (reducedMotion()) done();
  else closeTimers.set(d, setTimeout(done, 240));
}
for (const [id, key, empty] of [["specDrawer", "spec", null], ["cartDrawer", "cartOpen", false], ["guideDrawer", "guide", false]]) {
  const d = $(id);
  if (!d) continue;
  d.addEventListener("close", () => { clearTimeout(closeTimers.get(d)); d.classList.remove("closing"); if (state[key] !== empty) setState({ [key]: empty }); });
  d.addEventListener("cancel", (e) => { e.preventDefault(); setState({ [key]: empty }); });
  d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) setState({ [key]: empty }); });
}

/* ---------- 연결: 클릭과 입력 ---------- */

function addToCart(ids) {
  setState({ guide: false, cart: [...state.cart, ...ids.map((id) => ({ id, size: state.size }))], cartOpen: true });
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-spec],[data-size],[data-tech-group],[data-tech-item],[data-tech-pause],[data-pair],[data-cat],[data-cart-open],[data-add],[data-pair-add],[data-remove],[data-reset],[data-pause],[data-temp-clear],[data-guide]");
  if (!t) return;
  const d = t.dataset;
  if (d.spec) setState({ spec: d.spec });
  else if (d.size) setState({ size: d.size });
  else if (d.techGroup) {
    setState({ techGroup: d.techGroup, techItem: 0 });
    if (d.jump !== undefined) $("tech").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  } else if (d.techItem !== undefined) setState({ techItem: Number(d.techItem) });
  else if (d.techPause !== undefined) setState({ techPaused: !state.techPaused });
  else if (d.pair) setState({ pairTemp: Number(d.pair) });
  else if (d.cat) setState({ cat: d.cat });
  else if (d.cartOpen !== undefined) setState({ cartOpen: true });
  else if (d.add !== undefined) addToCart([PRODUCT.id]);
  else if (d.pairAdd !== undefined) addToCart(recommend(state.pairTemp).filter((r) => r.item.id).map((r) => r.item.id));
  else if (d.remove !== undefined) setState({ cart: state.cart.filter((_, i) => i !== Number(d.remove)) });
  else if (d.reset !== undefined) setState({ cat: "all", temp: null });
  else if (d.tempClear !== undefined) setState({ temp: null });
  else if (d.pause !== undefined) setState({ paused: !state.paused });
  else if (d.guide !== undefined) setState({ guide: true });
});

/* 탭 줄(드로어 스펙 칩, 기술 묶음, 기술 항목): 방향키로 이동합니다. */
document.addEventListener("keydown", (e) => {
  if (!(e.target instanceof Element) || !["ArrowRight", "ArrowLeft"].includes(e.key)) return;
  const step = e.key === "ArrowRight" ? 1 : -1;
  const turn = (list, cur) => list[(list.indexOf(cur) + step + list.length) % list.length];
  if (e.target.closest(".dr-chips, .tech-groups, .tech-items")) e.preventDefault();
  if (e.target.closest(".dr-chips")) {
    const next = turn(specKeysNow(), state.spec);
    setState({ spec: next });
    document.querySelector(`.dr-chips [data-spec="${next}"]`).focus();
  } else if (e.target.closest(".tech-groups")) {
    const next = turn(TECH_GROUPS.map((g) => g.id), state.techGroup);
    setState({ techGroup: next, techItem: 0 });
    document.querySelector(`.tech-groups [data-tech-group="${next}"]`).focus();
  } else if (e.target.closest(".tech-items")) {
    const n = techItems(PRODUCT, state.techGroup).length;
    const next = (state.techItem + step + n) % n;
    setState({ techItem: next });
    document.querySelector(`.tech-items [data-tech-item="${next}"]`).focus();
  }
});

/* 아직 없는 사진은 자리째 숨깁니다. */
const dropMissing = (t) => (t.closest("figure") || t).remove();
document.addEventListener("error", (e) => {
  const t = e.target;
  if (t.tagName === "IMG" && t.hasAttribute("data-optional")) dropMissing(t);
}, true);
/* 이 스크립트가 붙기 전에 이미 실패한 HTML 속 사진도 숨깁니다. */
document.querySelectorAll("img[data-optional]").forEach((t) => { if (t.complete && !t.naturalWidth) dropMissing(t); });

/* 주소에 #spec=cfm이 있으면 그 설명을 열어 둡니다. */
function specFromHash() {
  const key = (location.hash.match(/^#spec=(\w+)$/) || [])[1];
  if (key && METRICS[key]) setState({ spec: key });
}

/* ---------- 시작 ---------- */

renderChrome();
if (PAGE === "collection") {
  renderCollectionStatic();
  renderCollection();
  $("sort").addEventListener("change", (e) => setState({ sort: e.target.value }));
  $("tempRange").addEventListener("input", (e) => setState({ temp: Number(e.target.value) }));
} else if (PRODUCT) {
  renderProductStatic();
  renderSize();
  renderTech();
  renderCompare();
  renderPair();
  $("compareSelect").addEventListener("change", (e) => setState({ compareId: e.target.value }));
  /* 구매 버튼이 화면 위로 사라지면 하단 구매 바를 올립니다. */
  new IntersectionObserver(([en]) => {
    const show = !en.isIntersecting && en.boundingClientRect.top < 0;
    $("buyBar").classList.toggle("show", show);
    $("buyBar").inert = !show;
  }).observe($("addBtn"));
  /* 기술 패널이 화면 밖에 있거나 탭이 가려지면 패널 장면을 멈춥니다. */
  new IntersectionObserver(([en]) => {
    techVisible = en.isIntersecting;
    if (SCENE.panel) SCENE.panel.hold("hidden", !techVisible);
  }).observe($("techPanel"));
}
document.addEventListener("visibilitychange", () => {
  for (const h of [SCENE.panel, SCENE.drawer]) if (h) h.hold("tab", document.hidden);
});
specFromHash();
window.addEventListener("hashchange", specFromHash);
