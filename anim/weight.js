/* 제품 무게: 제품 선화가 접시저울에 내려앉고 바늘이 살짝 지나쳤다가 M 값에 멈춥니다.
   이어서 아래 S, M, L, XL 칩이 차례로 켜지며 바늘이 p.sizes 값으로 옮겨 가고, 마지막에 고른 사이즈에서 멈춥니다.
   제품 없이 열면 칩 자리에 네 제품을 놓고 같은 사이즈 값을 차례로 잽니다. 5초 루프. */
SCENES.weight = (svg, { p, products, size }) => {
  const duration = 5;
  const pick = SIZES.includes(size) ? size : "M";
  // 칩 한 칸 = 한 번 잴 대상. 제품이 있으면 사이즈 네 개, 없으면 제품 네 개(같은 사이즈 값).
  const steps = p
    ? SIZES.map((s) => ({ label: s, v: p.sizes[s], kind: p.kind, note: `${s} 사이즈` }))
    : products.map((q) => ({ label: q.code, v: q.sizes[pick], kind: q.kind, note: `${pick} 사이즈` }));
  const first = p ? SIZES.indexOf("M") : 0;
  const last = p ? SIZES.indexOf(pick) : steps.length - 1;
  const max = Math.ceil(Math.max(...products.flatMap((q) => SIZES.map((s) => q.sizes[s]))) / 100) * 100;

  // 시간(초)
  const LAND = 0.9, SETTLE = 0.6, STEP0 = 2.0, STEP = 0.55, MOVE = 0.3, FINAL = STEP0 + STEP * steps.length;

  // 저울: 접시, 몸통, 원형 눈금판
  const CX = 172, CY = 165, R = 50, PLATE = 96;
  const A0 = -120, A1 = 120; // 0 g과 최대값의 바늘 각도(위쪽이 0도)
  const ang = (v) => lerp(A0, A1, clamp01(v / max));
  const polar = (a, r) => [CX + r * Math.sin((a * Math.PI) / 180), CY - r * Math.cos((a * Math.PI) / 180)];
  const line = { stroke: INK, "stroke-width": 1.5, fill: "none" };

  el(svg, "rect", { x: CX - 76, y: 106, width: 152, height: 116, rx: 14, ...line });
  el(svg, "circle", { cx: CX, cy: CY, r: R, ...line });
  for (let v = 0; v <= max; v += 50) {
    const long = v % 100 === 0;
    const [x1, y1] = polar(ang(v), R - (long ? 9 : 5));
    const [x2, y2] = polar(ang(v), R - 1);
    el(svg, "line", { x1, y1, x2, y2, stroke: long ? INK : SUB, "stroke-width": 1.5 });
  }
  // 눈금 숫자는 바늘이 닿지 않는 눈금판 아래 양 끝에 둡니다.
  for (const v of [0, max]) label(svg, polar(ang(v), R)[0], 216, String(v), { anchor: "middle" });
  label(svg, CX, CY + 36, "g", { anchor: "middle" });
  const needle = el(svg, "line", { x1: CX, y1: CY, x2: CX, y2: CY - (R - 12), stroke: INK, "stroke-width": 2, "stroke-linecap": "round" });
  el(svg, "circle", { cx: CX, cy: CY, r: 4, fill: INK });

  // 접시와 그 위에 놓이는 옷은 함께 눌립니다.
  const plate = el(svg, "g", {});
  el(plate, "line", { x1: CX, y1: PLATE + 3, x2: CX, y2: 106, ...line });
  el(plate, "rect", { x: CX - 80, y: PLATE, width: 160, height: 6, rx: 3, fill: PHOTO, stroke: INK, "stroke-width": 1.5 });
  const cloth = el(plate, "g", {});
  // 종류별 선화. 원점은 옷 밑단 가운데입니다.
  const SHAPES = {
    top: ["M-14 -66 Q0 -56 14 -66 L32 -61 L46 -42 L35 -35 L28 -44 L28 0 L-28 0 L-28 -44 L-35 -35 L-46 -42 L-32 -61 Z"],
    outer: [
      "M-12 -66 Q0 -58 12 -66 L30 -61 L46 -6 L35 -3 L26 -42 L26 0 L-26 0 L-26 -42 L-35 -3 L-46 -6 L-30 -61 Z",
      "M-12 -66 Q-15 -82 0 -84 Q15 -82 12 -66",
      "M0 -60 L0 0",
    ],
    bottom: ["M-28 -58 L28 -58 L33 0 L5 0 L1 -32 L-1 -32 L-5 0 L-33 0 Z", "M-28 -50 L28 -50"],
  };
  const shapes = Object.fromEntries(Object.entries(SHAPES).map(([k, ds]) => {
    const g = el(cloth, "g", {});
    ds.forEach((d, i) => el(g, "path", { d, fill: i === 0 ? PHOTO : "none", stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round" }));
    return [k, g];
  }));

  // 읽음값
  const readout = label(svg, CX + 88, 172, "", { size: 34, weight: 700, fill: INK });
  const note = label(svg, CX + 90, 196, "", { fill: SUB });

  // 칩
  const CW = 60, GAP = 12, X0 = 200 - (steps.length * CW + (steps.length - 1) * GAP) / 2;
  const chips = steps.map((s, i) => {
    const x = X0 + i * (CW + GAP);
    return {
      box: el(svg, "rect", { x, y: 240, width: CW, height: 26, rx: 13, "stroke-width": 1.5 }),
      text: label(svg, x + CW / 2, 258, s.label, { anchor: "middle", weight: 600 }),
      value: label(svg, x + CW / 2, 288, `${fmt(s.v)} g`, { anchor: "middle" }),
    };
  });
  const litFill = p ? MINE : INK;
  const litText = PHOTO;

  /* 시각 t의 상태: 바늘 값, 지금 칩, 다녀간 칩 수, 옷 높이 */
  function stateAt(t) {
    if (t < LAND) return { v: 0, cur: -1, seen: 0, kind: steps[first].kind, drop: easeInOut(seg(t, 0.1, LAND)) ** 1.6 };
    if (t < STEP0) {
      const v0 = steps[first].v, tau = Math.min(t - LAND, SETTLE * 2);
      const damp = Math.exp(-11.5 * tau), w = (2 * Math.PI) / 0.4;
      const v = tau >= SETTLE ? v0 : v0 * (1 - damp * Math.cos(w * tau)) + 30 * damp * Math.sin(w * tau);
      return { v, cur: -1, seen: 0, kind: steps[first].kind, drop: 1 };
    }
    // 칩 차례: i번째 칩이 켜지면 바늘이 앞 값에서 그 값으로 옮겨 갑니다. 끝나면 고른 칩으로 돌아옵니다.
    const i = Math.min(steps.length, Math.floor((t - STEP0) / STEP));
    const to = i < steps.length ? i : last;
    const from = i === 0 ? first : i - 1;
    const k = easeInOut(seg(t, STEP0 + STEP * i, STEP0 + STEP * i + MOVE));
    return { v: lerp(steps[from].v, steps[to].v, k), cur: to, seen: Math.min(steps.length, i + 1), kind: steps[k < 0.5 ? from : to].kind, drop: 1 };
  }

  return {
    duration,
    frame(t) {
      const s = stateAt(t);
      const dip = (6 * s.v) / max;
      plate.setAttribute("transform", `translate(0 ${dip.toFixed(2)})`);
      cloth.setAttribute("transform", `translate(${CX} ${lerp(PLATE - 230, PLATE, s.drop).toFixed(1)})`);
      cloth.setAttribute("opacity", clamp01(s.drop * 3).toFixed(2));
      for (const [k, g] of Object.entries(shapes)) g.setAttribute("display", k === s.kind ? "inline" : "none");
      const [x2, y2] = polar(ang(s.v), R - 12);
      needle.setAttribute("x2", x2.toFixed(1));
      needle.setAttribute("y2", y2.toFixed(1));
      readout.textContent = `${fmt(Math.round(s.v))} g`;
      note.textContent = steps[s.cur < 0 ? first : s.cur].note;
      chips.forEach((c, i) => {
        const lit = i === s.cur, seen = i < s.seen || lit;
        c.box.setAttribute("fill", lit ? litFill : "none");
        c.box.setAttribute("stroke", lit ? litFill : seen ? INK : FAINT);
        c.text.setAttribute("fill", lit ? litText : seen ? INK : FAINT);
        c.value.setAttribute("opacity", seen ? 1 : 0);
      });
    },
  };
};
