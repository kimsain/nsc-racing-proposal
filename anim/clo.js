/* CLO 보온: 가운데 상체 실루엣에서 열을 뜻하는 물결선 6개가 바깥으로 퍼집니다. 실루엣 주위 공기층 두께는 CLO에 비례합니다.
   바깥까지 빠져나가는 물결선은 round(6 × (1 − scalePos("clo", 값)))개이고, 나머지는 공기층 안에서 멈춰 흐려집니다. 4초 루프. */
SCENES.clo = (svg, { p }) => {
  const value = p ? p.nums.clo : 0.3;
  const pos = scalePos("clo", value);
  const N = 6;
  const escape = Math.round(N * (1 - pos));
  const duration = 4;
  const TH = 8 + 80 * pos; // 공기층 두께(px)
  const BOTTOM = 222; // 상체 아래 끝
  const D = 112; // 빠져나간 물결선 앞머리가 멈추는 거리

  // 상체 실루엣(머리와 어깨, 몸통)
  const body = "M186,98 L186,108 C160,112 146,120 144,140 L144,222 L256,222 L256,140 C254,120 240,112 214,108 L214,98 Z";

  // 공기층: 실루엣 외곽선을 두께의 두 배로 그어 바깥 띠를 만듭니다. 바깥 경계선(이 제품)은 1.5px 더 넓게 먼저 긋습니다.
  const band = (g, w, color) => {
    el(g, "path", { d: body, fill: color, stroke: color, "stroke-width": w, "stroke-linejoin": "round" });
    el(g, "circle", { cx: 200, cy: 78, r: 20, fill: color, stroke: color, "stroke-width": w });
  };
  band(el(svg, "g"), TH * 2 + 3, p ? MINE : SUB);
  band(el(svg, "g"), TH * 2, PHOTO);
  band(el(svg, "g", { opacity: 0.5 }), TH * 2, FAINT);
  el(svg, "rect", { x: 0, y: BOTTOM, width: 400, height: 300 - BOTTOM, fill: PHOTO }); // 아래 끝은 잘라 냅니다

  // 물결선: 왼쪽 3개, 오른쪽 3개. 시작점은 몸 가장자리, 방향은 바깥으로 부채꼴.
  const SIDES = [
    { x: 146, y: 138, a: 198 }, { x: 144, y: 165, a: 180 }, { x: 144, y: 192, a: 168 },
    { x: 254, y: 138, a: -18 }, { x: 256, y: 165, a: 0 }, { x: 256, y: 192, a: 12 },
  ];
  // 붙잡히는 순서: 양쪽이 번갈아 가며 섞이도록
  const trapOrder = [1, 4, 0, 5, 2, 3];
  const trapped = new Set(trapOrder.slice(0, N - escape));
  const L = 24; // 물결선 길이
  const fit = Math.min(1, Math.max(0.3, (TH - 6) / L)); // 붙잡힌 물결선이 공기층 안에 들어가는 길이 비율
  const wavePath = "M-24,0 Q-21,-5 -18,0 T-12,0 T-6,0 T0,0"; // 앞머리가 원점
  const waves = SIDES.map((s, i) => ({
    ...s,
    trapped: trapped.has(i),
    node: el(svg, "path", { d: wavePath, fill: "none", stroke: trapped.has(i) ? SUB : INK, "stroke-width": 1.5, "stroke-linecap": "round" }),
  }));

  // 실루엣은 물결선 시작 부분을 덮도록 물결선 위에 그립니다.
  el(svg, "path", { d: body, fill: INK });
  el(svg, "circle", { cx: 200, cy: 78, r: 20, fill: INK });

  // 공기층 두께 치수선(오른쪽 아래)
  const dimY = 234;
  el(svg, "line", { x1: 256, y1: dimY, x2: 256 + TH, y2: dimY, stroke: SUB, "stroke-width": 1.5 });
  el(svg, "line", { x1: 256, y1: dimY - 5, x2: 256, y2: dimY + 5, stroke: SUB, "stroke-width": 1.5 });
  el(svg, "line", { x1: 256 + TH, y1: dimY - 5, x2: 256 + TH, y2: dimY + 5, stroke: SUB, "stroke-width": 1.5 });
  label(svg, 256 + TH + 8, dimY + 5, "공기층");

  label(svg, 24, 34, "몸의 열", { weight: 600, fill: INK });
  label(svg, 376, 34, `빠져나감 ${escape} / ${N}`, { weight: 700, fill: INK, anchor: "end" });
  const pct = Math.round(value * 100);
  label(svg, 200, 282, `${p ? "" : "예시 "}${value} clo · 1 clo의 ${pct}%`, { size: 15, weight: 700, fill: INK, anchor: "middle" });

  return {
    duration,
    frame(t) {
      const go = easeOut(seg(t, 0.2, 3.0)); // 0~1 이동 진행도
      const appear = seg(t, 0, 0.3);
      for (const w of waves) {
        const reach = w.trapped ? TH - 3 : D;
        const d = Math.min(go * D, reach);
        let o = appear;
        let sx = 1;
        if (w.trapped) {
          // 공기층 바깥 경계에서 멈춘 뒤 층 안으로 눌려 들어가며 흐려집니다.
          const stuck = seg(go * D, TH - 3, TH + 40);
          o *= lerp(1, 0.7, stuck);
          sx = lerp(1, fit, stuck);
        }
        const r = (w.a * Math.PI) / 180;
        const x = w.x + Math.cos(r) * d;
        const y = w.y + Math.sin(r) * d;
        w.node.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${w.a}) scale(${sx.toFixed(3)} 1)`);
        w.node.setAttribute("opacity", o.toFixed(2));
      }
    },
  };
};
