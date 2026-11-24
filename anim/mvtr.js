/* MVTR 투습도: 아래 피부에서 수증기 점이 올라와 원단을 지나 위쪽 계량컵에 모입니다. 4초 루프.
   왼쪽 위 시계가 한 바퀴(24시간) 도는 동안 컵 수위가 scalePos("mvtr", 값)까지 찹니다.
   점의 수도 같은 비율로 늘어서 값이 큰 제품일수록 수증기가 촘촘히 올라옵니다. 한 바퀴가 끝나면 컵을 비웁니다. */
SCENES.mvtr = (svg, { p }) => {
  const [, hi] = METRICS.mvtr.scale;
  const value = p ? p.nums.mvtr : METRICS.mvtr.bands[1][1]; // 제품이 없으면 "보통" 대역 상한을 예시로 씁니다
  const pos = scalePos("mvtr", value);
  const duration = 4;
  const FILL_END = 3.8; // 이때 24시간이 다 차고, 남은 0.2초는 가득 찬 채로 둡니다

  // 그림 좌표
  const CX0 = 150, CX1 = 290; // 컵 안쪽 왼쪽, 오른쪽
  const TOP = 64, FAB = 200; // 컵 위 끝, 원단 윗면(컵 바닥)
  const SKIN = 264; // 피부 띠 윗면
  const H = FAB - TOP;

  // 피부
  el(svg, "rect", { x: 40, y: SKIN, width: 320, height: 16, fill: FAINT });
  label(svg, 30, SKIN + 13, "피부", { weight: 600, fill: INK, anchor: "end" });

  // 수증기 점: 피부에서 출발해 수면에 닿으면 사라집니다.
  const N = Math.max(6, Math.round(48 * pos));
  const RISE = 0.9; // 피부에서 원단을 지나 물속으로 스며들기까지 걸리는 시간
  const SINK = FAB - 14; // 점이 사라지는 높이(원단 바로 위 물속)
  const dots = Array.from({ length: N }, (_, i) => ({
    x: CX0 + 10 + (((i * 11) % N) / Math.max(1, N - 1)) * (CX1 - CX0 - 20),
    start: (i / N) * duration,
    node: el(svg, "circle", { r: 3, fill: SUB }),
  }));

  // 컵에 모인 물
  const water = el(svg, "rect", { x: CX0, width: CX1 - CX0, fill: SUB, opacity: 0.28 });
  const surface = el(svg, "line", { x1: CX0, x2: CX1, stroke: INK, "stroke-width": 1.5 });

  // 원단(컵 바닥)
  el(svg, "rect", { x: CX0 - 14, y: FAB, width: CX1 - CX0 + 28, height: 8, fill: p ? MINE : INK });
  label(svg, CX0 - 20, FAB + 9, "원단", { weight: 600, fill: INK, anchor: "end" });

  // 컵 벽과 눈금(1만 단위)
  const wall = { stroke: INK, "stroke-width": 1.5, fill: "none" };
  el(svg, "path", { d: `M${CX0} ${TOP} L${CX0} ${FAB} M${CX1} ${TOP} L${CX1} ${FAB}`, ...wall });
  for (let v = 10000; v <= hi; v += 10000) {
    const y = FAB - scalePos("mvtr", v) * H;
    el(svg, "line", { x1: CX0, x2: CX0 + 10, y1: y, y2: y, stroke: SUB, "stroke-width": 1.5 });
    label(svg, CX0 - 6, y + 5, `${v / 10000}만`, { anchor: "end" });
  }
  label(svg, (CX0 + CX1) / 2, TOP - 14, "모인 수증기", { weight: 600, fill: INK, anchor: "middle" });

  // 수위 옆 값
  const valText = label(svg, CX1 + 20, 0, "", { size: 16, weight: 700, fill: INK });
  const unitText = label(svg, CX1 + 20, 0, "g/m²", {});
  const tag = p ? null : label(svg, CX1 + 20, 0, "예시", {});

  // 시계: 4초에 한 바퀴가 24시간입니다.
  const OX = 62, OY = 68, R = 28;
  const wedge = el(svg, "path", { fill: FAINT });
  el(svg, "circle", { cx: OX, cy: OY, r: R, ...wall });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * 2 * Math.PI;
    el(svg, "line", { x1: OX + Math.sin(a) * (R - 6), y1: OY - Math.cos(a) * (R - 6), x2: OX + Math.sin(a) * R, y2: OY - Math.cos(a) * R, stroke: INK, "stroke-width": 1.5 });
  }
  const hand = el(svg, "line", { x1: OX, y1: OY, stroke: INK, "stroke-width": 2, "stroke-linecap": "round" });
  el(svg, "circle", { cx: OX, cy: OY, r: 3, fill: INK });
  const hours = label(svg, OX, OY + R + 20, "", { weight: 700, fill: INK, anchor: "middle" });

  return {
    duration,
    frame(t) {
      const k = seg(t, 0, FILL_END);
      const level = FAB - pos * k * H; // 수면 y

      // 시계
      const a = k * 2 * Math.PI;
      const hx = OX + Math.sin(a) * (R - 8), hy = OY - Math.cos(a) * (R - 8);
      hand.setAttribute("x2", hx.toFixed(1));
      hand.setAttribute("y2", hy.toFixed(1));
      const ex = OX + Math.sin(a) * R, ey = OY - Math.cos(a) * R;
      wedge.setAttribute("d", k >= 1
        ? `M${OX - R} ${OY} A${R} ${R} 0 1 1 ${OX + R} ${OY} A${R} ${R} 0 1 1 ${OX - R} ${OY} Z`
        : `M${OX} ${OY} L${OX} ${OY - R} A${R} ${R} 0 ${k > 0.5 ? 1 : 0} 1 ${ex.toFixed(1)} ${ey.toFixed(1)} Z`);
      hours.textContent = `${Math.round(k * 24)}시간`;

      // 물
      water.setAttribute("y", level.toFixed(1));
      water.setAttribute("height", (FAB - level).toFixed(1));
      surface.setAttribute("y1", level.toFixed(1));
      surface.setAttribute("y2", level.toFixed(1));
      surface.setAttribute("opacity", k > 0 ? 1 : 0);

      // 값 표기는 수면을 따라 올라갑니다.
      const ty = Math.min(level, FAB - 26);
      valText.setAttribute("y", (ty + 5).toFixed(1));
      unitText.setAttribute("y", (ty + 22).toFixed(1));
      if (tag) tag.setAttribute("y", (ty - 14).toFixed(1));
      valText.textContent = fmt(Math.round((value * k) / 100) * 100);

      // 점
      for (const [i, d] of dots.entries()) {
        const ph = ((t - d.start + duration) % duration) / RISE;
        const y = lerp(SKIN - 4, SINK, ph);
        const fade = Math.min(ph * 6, (y - SINK) / (FAB - SINK)); // 피부에서 나타나고 원단 위에서 스며듭니다
        d.node.setAttribute("cx", (d.x + Math.sin(ph * 6 + i) * 3).toFixed(1));
        d.node.setAttribute("cy", y.toFixed(1));
        d.node.setAttribute("opacity", ph < 1 ? clamp01(fade).toFixed(2) : 0);
      }
    },
  };
};
