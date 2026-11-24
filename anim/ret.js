/* RET 증발저항: 위아래 두 줄의 원단 단면에서 땀 증기 점이 피부에서 같은 박자로 올라옵니다.
   점이 원단 안에 머무는 시간은 0.2초 + RET × 0.06초입니다. 머무는 시간이 박자보다 길면
   원단 밑에서 기다리는 점이 생겨 뭉칩니다. 윗줄은 이 제품, 아랫줄은 RET 20 기준 원단입니다. 3초 루프. */
SCENES.ret = (svg, { p }) => {
  const duration = 3;
  const BEAT = 0.2; // 점이 올라오는 간격(초). duration을 나눠떨어지게 둡니다.
  const N = duration / BEAT;
  const RISE = 0.35; // 피부에서 원단 밑까지
  const OUT = 0.4; // 원단 위로 빠져나가 사라지기까지
  const BASE = 20;
  const value = p ? p.nums.ret : 6;
  const dwell = (ret) => 0.2 + ret * 0.06;
  const wait = (ret) => Math.max(0, dwell(ret) - 0.6); // 원단이 받아들이지 못해 밑에서 기다리는 시간

  const LX0 = 30, LX1 = 180; // 점이 올라오는 가로 범위
  const FX0 = 20, FX1 = 190; // 원단과 피부선 가로 범위
  const LANES = [3, 11, 6, 0, 13, 8, 1, 10, 5, 14, 2, 9, 4, 12, 7]; // 점마다 올라오는 자리. 이웃한 점이 떨어지도록 섞었습니다.

  function row(top, ret, { title, note, fabric }) {
    const fy = top + 22; // 원단 윗면
    const fh = 20;
    const skin = top + 92;
    const t1 = label(svg, FX0, top, title, { weight: 600, fill: INK });
    if (note) el(t1, "tspan", { text: `  ${note}`, fill: SUB, "font-weight": 400 });
    el(svg, "rect", { x: FX0, y: fy, width: FX1 - FX0, height: fh, fill: fabric, opacity: fabric === FAINT ? 1 : 0.9 });
    el(svg, "line", { x1: FX0, y1: skin, x2: 290, y2: skin, stroke: SUB, "stroke-width": 1.5 });
    label(svg, FX0, skin + 18, "피부");
    label(svg, 290, fy + fh / 2 + 4.5, `원단 안 ${dwell(ret).toFixed(2)}초`, { anchor: "end", weight: 700, fill: INK });
    // 머무는 시간 막대: 기준 원단(1.40초)이 90px
    el(svg, "rect", { x: 200, y: fy + fh + 8, width: (90 * dwell(ret)) / dwell(BASE), height: 4, fill: fabric === FAINT ? SUB : INK });

    const d = dwell(ret), w = wait(ret);
    label(svg, 290, fy + fh + 34, w > 0 ? "밑에 쌓임" : "바로 빠짐", { anchor: "end" });
    const dots = LANES.map((lane, i) => ({
      x: lerp(LX0, LX1, lane / (N - 1)),
      start: i * BEAT,
      node: el(svg, "circle", { r: 4, fill: INK }),
    }));
    return (t) => {
      for (const dot of dots) {
        const k = (t - dot.start + duration) % duration; // 이 점이 올라온 뒤 지난 시간
        let y, o = 1;
        const queue = (k2) => fy + fh + 5 + ((RISE + w - k2) / BEAT) * 5; // 앞에 기다리는 점 수만큼 아래에 섭니다
        if (k < RISE) y = lerp(skin - 4, queue(RISE), easeOut(k / RISE));
        else if (k < RISE + w) y = queue(k); // 원단 밑에 줄 서서 기다림
        else if (k < RISE + w + d) y = lerp(fy + fh - 5, fy + 5, (k - RISE - w) / d); // 원단 안
        else if (k < RISE + w + d + OUT) {
          const e = (k - RISE - w - d) / OUT;
          y = lerp(fy - 5, fy - 14, e);
          o = 1 - e;
        } else o = 0;
        dot.node.setAttribute("cx", dot.x.toFixed(1));
        dot.node.setAttribute("cy", (y || 0).toFixed(1));
        dot.node.setAttribute("opacity", o.toFixed(2));
        dot.node.setAttribute("fill", k >= RISE + w && k < RISE + w + d && fabric !== FAINT ? PHOTO : INK);
      }
    };
  }

  const fTop = row(22, value, { title: p ? `이 제품 RET ${value}` : `RET ${value} 원단`, fabric: p ? MINE : INK });
  const fBase = row(162, BASE, { title: `RET ${BASE} 기준 원단`, note: "실제 제품 아님", fabric: FAINT });

  // 오른쪽 눈금: 0(아래)~20(위)
  const AX = 340, Y0 = 250, Y1 = 50;
  const ty = (v) => lerp(Y0, Y1, v / BASE);
  label(svg, AX, 30, "RET", { anchor: "middle", weight: 600, fill: INK });
  el(svg, "line", { x1: AX, y1: Y0, x2: AX, y2: Y1, stroke: SUB, "stroke-width": 1.5 });
  for (let v = 0; v <= BASE; v += 5) {
    el(svg, "line", { x1: AX - 4, y1: ty(v), x2: AX, y2: ty(v), stroke: SUB, "stroke-width": 1.5 });
    label(svg, AX - 9, ty(v) + 4.5, String(v), { anchor: "end" });
  }
  el(svg, "circle", { cx: AX, cy: ty(BASE), r: 5, fill: PHOTO, stroke: SUB, "stroke-width": 1.5 });
  label(svg, AX + 12, ty(BASE) + 4.5, "기준");
  el(svg, "circle", { cx: AX, cy: ty(value), r: 6, fill: p ? MINE : INK });
  label(svg, AX + 12, ty(value) + 4.5, String(value), { weight: 700, fill: INK });
  label(svg, 380, 290, "낮을수록 잘 빠짐", { anchor: "end" });
  el(svg, "circle", { cx: 24, cy: 285.5, r: 4, fill: INK });
  label(svg, 34, 290, "땀 증기");

  return {
    duration,
    frame(t) {
      fTop(t);
      fBase(t);
    },
  };
};
