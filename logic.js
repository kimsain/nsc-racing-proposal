/* 판단 코드. DOM을 건드리지 않아서 node 테스트에서도 그대로 돌아갑니다. data.js 다음에 불러옵니다. */

const fmt = (n) => Number(n).toLocaleString("ko-KR");
const minus = (n) => String(n).replace("-", "−");
const rangeText = ([lo, hi]) => `${minus(lo)}~${minus(hi)}`;
const covers = ([lo, hi], t) => t >= lo && t <= hi;
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const won = (n) => `${fmt(n)}원`;

/* 스펙 값을 화면용 조각으로. value와 unit은 크게/작게 나눠 쓰고, note는 보조 한 줄입니다. */
function metricParts(p, key, size = "M") {
  const n = p.nums;
  switch (key) {
    case "weight": return { value: fmt(p.sizes[size]), unit: "g", note: `${size} 사이즈` };
    case "temp": return { value: rangeText(p.temp), unit: "°C", note: p.layerMin !== undefined ? `Hood Sleeve 185 위에서 ${minus(p.layerMin)}°C까지` : "" };
    case "stretch": return { value: n.stretch.join(" / "), unit: "%", note: `가로 / 세로 · 회복률 ${n.recovery}%${n.recoveryWash50 ? `, 세탁 50회 뒤 ${n.recoveryWash50}%` : ""}` };
    case "compression": return { value: n.compression.join(" / "), unit: "mmHg", note: "대퇴 / 무릎 위" };
    case "repel": return { value: String(n.repel[0]), unit: "급", note: `세탁 5회 뒤 ${n.repel[1]}급` };
    default: return { value: fmt(n[key]), unit: METRICS[key].unit, note: "" };
  }
}

/* 카드와 비교에 쓰는 짧은 표기. 예: "95 g/m²", "RET 2.4", "발수 5급" */
function shortSpec(p, key) {
  const { value, unit } = metricParts(p, key);
  if (key === "ret") return `RET ${value}`;
  if (key === "repel") return `발수 ${value}급`;
  if (key === "compression") return `${p.nums.compression[0]} mmHg`;
  return `${value} ${unit}`;
}

/* 기준 대역 띠에서 값의 위치(0~1) */
function scalePos(key, v) {
  const [lo, hi] = METRICS[key].scale;
  return Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
}

/* 0~5 지수 단계 */
function indexLevel(indexKey, value) {
  const { cuts, low } = INDEX[indexKey];
  return cuts.filter((c) => (low ? value < c : value >= c)).length;
}
/* 기준 띠의 구간. 지수가 있는 스펙은 INDEX 경계에서 그려서 띠와 0~5 지수가 어긋나지 않게 하고, 칸 이름은 지수 단계 번호입니다. */
function stripBands(key) {
  const m = METRICS[key];
  if (!m.index) return m.bands || [];
  const edges = [m.scale[0], ...[...INDEX[m.index].cuts].sort((a, b) => a - b), m.scale[1]];
  return edges.slice(0, -1).map((a, i) => [a, edges[i + 1], String(indexLevel(m.index, a))]);
}
/* 기술 패널 한 묶음의 탭 목록. 측정 항목이 먼저, 그다음 그 묶음에 속한 부위입니다. */
function techItems(p, groupId) {
  const g = TECH_GROUPS.find((x) => x.id === groupId);
  return [
    ...g.metrics.filter((k) => p.specKeys.includes(k)).map((key) => ({ kind: "metric", key })),
    ...p.parts.map((pt, i) => ({ kind: "part", i, pt })).filter((x) => x.pt.group === groupId).map(({ kind, i }) => ({ kind, i })),
  ];
}
const productIndex = (p) => Object.fromEntries(Object.entries(INDEX).map(([k, ix]) => [k, indexLevel(k, p.nums[ix.metric])]));

/* 템포런 강도 기준 레이어링. 제품의 권장 기온(PRODUCTS.temp)만 보고 정합니다. */
function recommend(t) {
  const shell = byId("r03");
  const rows = [];
  const tops = PRODUCTS.filter((p) => p.kind === "top" && covers(p.temp, t)).sort((a, b) => b.temp[0] - a.temp[0]);
  if (tops.length) {
    rows.push({ item: tops[0], role: "상의" });
  } else {
    if (t < shell.layerMin) rows.push({ item: NESCL_ITEMS.base, role: "속에 받쳐 입기", note: `${minus(shell.layerMin)}°C 아래에서 추가` });
    rows.push({ item: byId("r02"), role: "상의" }, { item: shell, role: "Hood Sleeve 185 위에 덧입기" });
  }
  /* 바람막이는 상의 위에 덧입습니다. Hood Sleeve 위라면 layerMin까지 내려갑니다. */
  const shellMin = rows.some((r) => r.item.id === "r02") ? shell.layerMin : shell.temp[0];
  if (!rows.some((r) => r.item === shell) && t >= shellMin && t <= shell.temp[1]) rows.push({ item: shell, role: "바람이 불면 덧입기", note: "바람이 불면" });
  const tights = byId("r04");
  rows.push(covers(tights.temp, t) ? { item: tights, role: "하의" } : { item: NESCL_ITEMS.longtights, role: "하의" });
  if (t < 0) rows.push({ item: NESCL_ITEMS.gloves, role: "액세서리" });
  return rows;
}

/* 컬렉션: 카테고리와 기온으로 거르고 정렬합니다. 기온을 고르면 제품마다 그 기온에서 맡는 역할을 붙입니다. */
function collection({ cat = "all", temp = null, sort = "default" }) {
  const combo = temp === null ? null : recommend(temp);
  const list = PRODUCTS
    .filter((p) => cat === "all" || p.kind === cat)
    .map((p) => ({ p, role: combo ? (combo.find((r) => r.item === p) || {}).role : null }))
    .filter((x) => !combo || x.role);
  const key = {
    "gsm-asc": (x) => x.p.nums.gsm, "gsm-desc": (x) => -x.p.nums.gsm,
    "weight-asc": (x) => x.p.nums.weight, "price-asc": (x) => x.p.price,
  }[sort];
  return key ? [...list].sort((a, b) => key(a) - key(b)) : list;
}

if (typeof module !== "undefined") module.exports = { fmt, minus, rangeText, covers, byId, won, metricParts, shortSpec, scalePos, indexLevel, stripBands, techItems, productIndex, recommend, collection };
