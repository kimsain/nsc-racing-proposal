/* 발수도: 45도로 기운 원형 시험편에 노즐에서 물방울 7개가 떨어집니다. 6초 루프.
   앞 3초는 새 제품(p.nums.repel[0]), 뒤 3초는 세탁 5회 뒤(p.nums.repel[1]) 상태입니다.
   퍼지는 물방울 비율은 (5 - 급)/4이고, 퍼진 물방울은 짙은 얼룩으로 남고 나머지는 굴러떨어집니다. */
SCENES.repel = (svg, { p }) => {
  const grades = p ? p.nums.repel : [5, "3~4"];
  const duration = 6;
  const PHASE = 3;
  const N = 7;
  const C = { x: 175, y: 128 }; // 시험편 중심
  const RX = 80, RY = 56; // 시험편 반지름(기울기 방향, 옆 방향)
  const U = { x: Math.SQRT1_2, y: Math.SQRT1_2 }; // 아래로 기운 방향
  const V = { x: -Math.SQRT1_2, y: Math.SQRT1_2 };
  const NOZZLE = { x: 175, y: 58 };
  const toScreen = (a, b) => ({ x: C.x + a * U.x + b * V.x, y: C.y + a * U.y + b * V.y });

  // 상태마다 급 목록("3~4"는 [3, 4])과 퍼지는 물방울 수
  const states = grades.map((g, i) => {
    const list = String(g).split("~").map(Number);
    const mean = list.reduce((s, v) => s + v, 0) / list.length;
    const spread = Math.round(N * clamp01((5 - mean) / 4));
    return { g, list, spread, name: i === 0 ? "새 제품" : "세탁 5회 뒤" };
  });

  // 위: 두 상태 라벨. 지금 상태만 진하게, 밑줄이 진행도를 보여 줍니다.
  const tops = [
    label(svg, 24, 30, `${states[0].name} ${states[0].g}급`, { size: 14 }),
    label(svg, 376, 30, `${states[1].name} ${states[1].g}급`, { size: 14, anchor: "end" }),
  ];
  // 14px 글자 폭 어림값(한글 13, 빈칸 4, 그 밖 7)으로 밑줄 길이를 정합니다.
  const widths = tops.map((n) => [...n.textContent].reduce((s, ch) => s + (/[가-힣]/.test(ch) ? 13 : ch === " " ? 4 : 7), 0));
  const bar = el(svg, "line", { y1: 38, y2: 38, stroke: INK, "stroke-width": 1.5 });

  // 45도 표시
  const UL = toScreen(-RX, 0);
  el(svg, "line", { x1: UL.x, y1: UL.y, x2: UL.x - 54, y2: UL.y, stroke: FAINT, "stroke-width": 1.5, "stroke-dasharray": "3 3" });
  el(svg, "line", { x1: UL.x, y1: UL.y, x2: UL.x - 26, y2: UL.y - 26, stroke: FAINT, "stroke-width": 1.5 });
  const ar = 22;
  el(svg, "path", { d: `M ${UL.x - ar} ${UL.y} A ${ar} ${ar} 0 0 1 ${(UL.x - ar * Math.SQRT1_2).toFixed(1)} ${(UL.y - ar * Math.SQRT1_2).toFixed(1)}`, fill: "none", stroke: SUB, "stroke-width": 1.5 });
  label(svg, UL.x - 58, UL.y - 8, "45°", { anchor: "end" });

  // 시험편: 원단 면과 고정 링
  const rot = `rotate(45 ${C.x} ${C.y})`;
  el(svg, "ellipse", { cx: C.x, cy: C.y, rx: RX, ry: RY, transform: rot, fill: FAINT, "fill-opacity": 0.35 });
  const stainLayer = el(svg, "g");
  el(svg, "ellipse", { cx: C.x, cy: C.y, rx: RX, ry: RY, transform: rot, fill: "none", stroke: p ? MINE : INK, "stroke-width": 2 });

  // 노즐
  el(svg, "path", { d: `M ${NOZZLE.x - 10} 44 H ${NOZZLE.x + 10} V 50 L ${NOZZLE.x + 5} ${NOZZLE.y} H ${NOZZLE.x - 5} L ${NOZZLE.x - 10} 50 Z`, fill: INK });

  // 물방울: 떨어질 자리(시험편 위 좌표)와 출발 시각. 앞에서부터 고르게 섞어 spread개가 퍼집니다.
  const SPOTS = [[-45, -20], [-10, 22], [-35, 24], [0, -24], [5, 4], [-30, -4], [-55, -8]];
  const drops = SPOTS.map(([a, b], i) => {
    const land = toScreen(a, b);
    const edge = RX * Math.sqrt(1 - (b * b) / (RY * RY)) - a; // 기울기 방향으로 가장자리까지 거리
    return {
      i, a, b, land, edge,
      start: 0.05 + i * 0.3,
      stain: el(stainLayer, "ellipse", { fill: SUB, "fill-opacity": 0.6, transform: `rotate(45 ${land.x.toFixed(1)} ${land.y.toFixed(1)})` }),
      node: el(svg, "path", { fill: PHOTO, stroke: INK, "stroke-width": 1.5 }),
    };
  });
  const spreads = (d, s) => Math.floor(((d.i + 1) * s.spread) / N) > Math.floor((d.i * s.spread) / N);

  const result = label(svg, 376, 150, "", { anchor: "end", weight: 700, fill: INK });

  // 아래: 1~5급 판정 칸
  label(svg, 24, 261, "판정", { weight: 600, fill: INK });
  const cells = [1, 2, 3, 4, 5].map((g, i) => {
    const x = 96 + i * 50;
    return {
      g,
      box: el(svg, "rect", { x, y: 242, width: 44, height: 28, rx: 3, "stroke-width": 1.5 }),
      text: label(svg, x + 22, 261, `${g}급`, { anchor: "middle" }),
    };
  });

  // 물방울 모양: 떨어질 때는 눈물 모양, 맺히면 둥근 방울
  const TEAR = "M 0 -7 C 2.5 -3 4 0 4 2.5 A 4 4 0 0 1 -4 2.5 C -4 0 -2.5 -3 0 -7 Z";
  const ROUND = "M -6 0 A 6 6 0 1 0 6 0 A 6 6 0 1 0 -6 0 Z";
  const FALL = 0.3, SPREAD = 0.35, ROLL = 0.45, DROP = 0.3;

  return {
    duration,
    frame(t) {
      const k = t < PHASE ? 0 : 1;
      const s = states[k];
      const tau = t - k * PHASE;

      tops.forEach((n, i) => {
        n.setAttribute("fill", i === k ? INK : FAINT);
        n.setAttribute("font-weight", i === k ? 700 : 500);
      });
      const w = widths[k];
      const x0 = k === 0 ? 24 : 376 - w;
      bar.setAttribute("x1", x0);
      bar.setAttribute("x2", (x0 + w * seg(tau, 0, PHASE * 0.97)).toFixed(1));

      let stains = 0;
      for (const d of drops) {
        const wet = spreads(d, s);
        const u = tau - d.start;
        let x = 0, y = 0, sc = 0, o = 0, shape = ROUND;
        let sr = 0;
        if (u >= 0 && u < FALL) {
          // 노즐에서 떨어짐
          const f = u / FALL;
          x = lerp(NOZZLE.x + (d.land.x - NOZZLE.x) * 0.1, d.land.x, f);
          y = lerp(NOZZLE.y + 4, d.land.y, f * f);
          sc = 1; o = 1; shape = TEAR;
        } else if (u >= FALL && wet) {
          // 떨어진 자리에서 퍼져 얼룩으로 남음
          const f = easeOut(seg(u, FALL, FALL + SPREAD));
          x = d.land.x; y = d.land.y;
          sc = 1 - f; o = 1 - f;
          sr = f;
          stains += 1;
        } else if (u >= FALL) {
          // 둥근 방울로 굴러 가장자리에서 떨어짐
          const r = seg(u, FALL, FALL + ROLL);
          const pos = toScreen(d.a + d.edge * r * r, d.b);
          x = pos.x; y = pos.y; sc = 1; o = 1;
          if (u > FALL + ROLL) {
            const f = seg(u, FALL + ROLL, FALL + ROLL + DROP);
            x += 6 * f; y += 36 * f * f; o = 1 - f;
          }
        }
        d.node.setAttribute("d", shape);
        d.node.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${Math.max(0.01, sc).toFixed(2)})`);
        d.node.setAttribute("opacity", clamp01(o).toFixed(2));
        d.stain.setAttribute("cx", (d.land.x + 2 * sr).toFixed(1));
        d.stain.setAttribute("cy", (d.land.y + 2 * sr).toFixed(1));
        d.stain.setAttribute("rx", (14 * sr).toFixed(2));
        d.stain.setAttribute("ry", (9 * sr).toFixed(2));
      }
      result.textContent = stains ? `얼룩 ${stains}곳` : "자국 없음";

      const one = s.list.length === 1;
      for (const c of cells) {
        const on = s.list.includes(c.g);
        c.box.setAttribute("fill", on ? INK : "none");
        c.box.setAttribute("fill-opacity", on && !one ? 0.3 : 1);
        c.box.setAttribute("stroke", on ? INK : FAINT);
        c.text.setAttribute("fill", on && one ? PHOTO : on ? INK : SUB);
        c.text.setAttribute("font-weight", on ? 700 : 500);
      }
    },
  };
};
