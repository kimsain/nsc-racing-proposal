/* 신장률 · 회복률: 격자무늬 시험편을 집게로 가로로 당겼다 놓고, 이어서 세로로 짧게 한 번 더 합니다. 4초 루프.
   늘어나는 배율은 (1 + 신장률/100)이고, 놓은 뒤 남은 늘어남 (1 - 회복률/100) × 신장률은 4배로 키워 주황으로 칠합니다.
   가로 폭은 모든 제품 중 가장 많이 늘어나는 값이 화면에 들어가도록 같은 비율로 줄입니다. */
SCENES.stretch = (svg, { p, products }) => {
  const has = p && p.nums.stretch;
  const [sx, sy] = has ? p.nums.stretch : [60, 40];
  const rec = has ? p.nums.recovery : 94;
  const wash = has ? p.nums.recoveryWash50 : undefined;
  const duration = 4;
  const GROW = 4; // 남은 늘어남 과장 배율

  // 가로 시험편: 가장 많이 늘어나는 제품도 오른쪽 집게까지 360 안에 들어오게 원래 폭을 정합니다.
  const maxX = Math.max(60, ...products.filter((q) => q.nums.stretch).map((q) => q.nums.stretch[0]));
  const HX = 32, HY = 104, HH = 76;
  const HW = (360 - HX) / (1 + maxX / 100);
  // 세로 시험편: 가장 많이 늘어나는 세로 값(60%)까지 아래 집게가 245 안에 들어옵니다.
  const VX = 152, VY = 72, VW = 96, VH = 100;

  const phase = label(svg, 24, 34, "", { weight: 600, fill: INK });
  const value = label(svg, 376, 34, "", { weight: 700, fill: INK, anchor: "end" });
  const value2 = label(svg, 376, 54, `가로 ${sx}%`, { anchor: "end" });

  const body = el(svg, "g");
  const fill = el(body, "rect", { fill: FAINT, "fill-opacity": 0.35 });
  const cols = Array.from({ length: 7 }, () => el(body, "line", { stroke: SUB, "stroke-width": 1, "stroke-opacity": 0.55 }));
  const rows = Array.from({ length: 3 }, () => el(body, "line", { stroke: SUB, "stroke-width": 1, "stroke-opacity": 0.55 }));
  const rest = el(body, "rect", { fill: MINE });
  const outline = el(body, "rect", { fill: "none", stroke: INK, "stroke-width": 1.5 });
  const origin = el(body, "rect", { fill: "none", stroke: SUB, "stroke-width": 1.5, "stroke-dasharray": "4 3" });
  // 집게: 고정 집게(a)와 당기는 집게(b). 놓으면 b가 살짝 벌어지며 사라집니다.
  const clampA = el(body, "rect", { rx: 2, fill: INK });
  const clampB = el(body, "rect", { rx: 2, fill: INK });
  const note = label(svg, 0, 0, `남은 늘어남 ${GROW}배 확대`);

  const recText = label(svg, 24, 274, `회복률 ${rec}%`, { weight: 700, fill: INK });
  const washText = label(svg, 376, 274, wash ? `세탁 50회 뒤 ${wash}%` : "", { anchor: "end" });

  const set = (node, attrs) => { for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, typeof v === "number" ? v.toFixed(1) : v); };

  return {
    duration,
    frame(t) {
      const horiz = t < 3;
      const s = (horiz ? sx : sy) / 100;
      const left = (1 - rec / 100) * s * GROW; // 그림에서 남는 늘어남(원래 길이에 대한 비율)
      const pull = horiz ? easeInOut(seg(t, 0, 1.2)) : easeInOut(seg(t, 3.1, 3.4));
      const back = horiz ? easeOut(seg(t, 2, 2.6)) : easeOut(seg(t, 3.5, 3.8));
      const show = horiz ? seg(t, 2.35, 2.6) : seg(t, 3.6, 3.8);
      const ext = back > 0 ? lerp(s, left, back) : s * pull;

      // 시험편 테두리 좌표. 가로는 오른쪽으로, 세로는 아래로 늘어납니다.
      const [x, y, w0, h0] = horiz ? [HX, HY, HW, HH] : [VX, VY, VW, VH];
      const w = horiz ? w0 * (1 + ext) : w0;
      const h = horiz ? h0 : h0 * (1 + ext);
      set(fill, { x, y, width: w, height: h });
      set(outline, { x, y, width: w, height: h });
      set(origin, { x, y, width: w0, height: h0 });
      cols.forEach((c, i) => { const cx = x + (w * (i + 1)) / (cols.length + 1); set(c, { x1: cx, x2: cx, y1: y, y2: y + h }); });
      rows.forEach((r, i) => { const ry = y + (h * (i + 1)) / (rows.length + 1); set(r, { x1: x, x2: x + w, y1: ry, y2: ry }); });
      if (horiz) set(rest, { x: x + w0, y, width: w - w0, height: h0 });
      else set(rest, { x, y: y + h0, width: w0, height: h - h0 });
      rest.setAttribute("opacity", show.toFixed(2));

      // 집게는 시험편 끝을 4만큼 덮습니다. b는 가장 많이 늘어난 자리에 남습니다.
      const far = Math.max(ext, s * pull);
      const open = 6 * back;
      if (horiz) {
        set(clampA, { x: x - 12, y: y - 8, width: 16, height: h0 + 16 });
        set(clampB, { x: x + w0 * (1 + far) - 4 + open, y: y - 8, width: 16, height: h0 + 16 });
        set(note, { x: x + w0, y: y + h0 + 30 });
      } else {
        set(clampA, { x: x - 8, y: y - 12, width: w0 + 16, height: 16 });
        set(clampB, { x: x - 8, y: y + h0 * (1 + far) - 4 + open, width: w0 + 16, height: 16 });
        set(note, { x: x + w0 + 14, y: y + h0 + (h - h0) / 2 + 5 });
      }
      clampB.setAttribute("opacity", (1 - seg(back, 0, 0.5)).toFixed(2));
      note.setAttribute("opacity", show.toFixed(2));
      body.setAttribute("opacity", (horiz ? clamp01(t / 0.1) : seg(t, 3, 3.1)).toFixed(2));

      const dir = horiz ? "가로" : "세로";
      phase.textContent = `${dir}로 ${back > 0 ? "놓기" : "당기기"}`;
      value.textContent = `${dir} ${Math.round((back > 0 ? s : s * pull) * 100)}%`;
      value2.setAttribute("opacity", horiz ? 0 : 1);
      const r = horiz ? seg(t, 2.5, 2.7) : 1;
      recText.setAttribute("opacity", r.toFixed(2));
      washText.setAttribute("opacity", r.toFixed(2));
    },
  };
};
