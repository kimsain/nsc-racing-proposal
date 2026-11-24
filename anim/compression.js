/* 압박: 다리 옆모습에 하프타이츠를 입히고 대퇴와 무릎 위에 띠를 두릅니다. 띠 안쪽으로 모이는 짧은 선은
   압박값 2 mmHg마다 하나이고, 띠는 0.65초(케이던스 184 spm에서 같은 발이 착지하는 간격)마다 살짝 조였다 풀립니다.
   오른쪽 0~20 mmHg 눈금에 두 값을 점으로 찍습니다. 3.9초 루프(착지 6번). */
SCENES.compression = (svg, { p }) => {
  const [thigh, knee] = p ? p.nums.compression : [12, 8];
  const duration = 3.9;
  const STEP = 0.65;
  const SX = 300; // 눈금 x
  const sy = (v) => 250 - (Math.min(20, Math.max(0, v)) / 20) * 200; // 0~20 mmHg를 y 250~50에

  // 다리 선화(무릎 아래만 옅게)와 하프타이츠. 오른쪽이 앞입니다. 타이츠는 옅게 칠해 옷으로 읽히게 합니다.
  el(svg, "path", {
    d: "M 104 163 C 106 168, 108 172, 108 176 C 98 192, 96 214, 106 236 C 112 248, 118 256, 118 266 C 112 272, 112 282, 122 282 L 196 282 C 206 282, 206 272, 196 270 C 178 266, 164 264, 158 258 C 156 238, 158 214, 162 198 C 169 192, 170 180, 168 172 L 171 163",
    fill: "none", stroke: SUB, "stroke-width": 1.5, "stroke-linejoin": "round", "stroke-linecap": "round",
  });
  el(svg, "path", {
    d: "M 93 26 C 74 46, 70 86, 85 119 C 92 136, 100 150, 104 164 Q 138 169, 171 164 C 176 128, 179 80, 161 26 Z",
    fill: FAINT, "fill-opacity": 0.45, stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round",
  });
  el(svg, "path", { d: "M 86 38 Q 127 42, 165 38", fill: "none", stroke: INK, "stroke-width": 1.5 });

  // 띠와 모이는 선. 앞쪽에 ceil(n/2)개, 뒤쪽에 나머지를 둡니다.
  const band = (cx, cy, rx, value, color) => {
    const ring = el(svg, "ellipse", { cx, cy, rx, ry: 6, fill: "none", stroke: color, "stroke-width": 2.5 });
    const n = Math.round(value / 2);
    const sides = [[1, Math.ceil(n / 2)], [-1, Math.floor(n / 2)]].map(([s, count]) => {
      const g = el(svg, "g");
      for (let i = 0; i < count; i++) {
        const y = cy + (i - (count - 1) / 2) * 8;
        const tip = cx + s * (rx + 5);
        el(g, "line", { x1: tip + s * 18, y1: y, x2: tip + s * 4, y2: y, stroke: INK, "stroke-width": 1.5 });
        el(g, "path", { d: `M ${tip} ${y} L ${tip + s * 5} ${y - 3} L ${tip + s * 5} ${y + 3} Z`, fill: INK });
      }
      return { s, g };
    });
    return { ring, rx, sides };
  };
  const bands = [band(127, 96, 47, thigh, p ? MINE : INK), band(137, 150, 36, knee, INK)];

  // 오른쪽 눈금과 두 점
  el(svg, "line", { x1: SX, y1: sy(0), x2: SX, y2: sy(20), stroke: INK, "stroke-width": 1.5 });
  for (const v of [0, 5, 10, 15, 20]) {
    el(svg, "line", { x1: SX - 5, y1: sy(v), x2: SX, y2: sy(v), stroke: INK, "stroke-width": 1.5 });
    label(svg, SX - 9, sy(v) + 4.5, String(v), { anchor: "end" });
  }
  label(svg, SX, 34, "mmHg", { anchor: "middle" });
  const marks = [[thigh, "대퇴", 96, 214], [knee, "무릎 위", 150, 202]];
  for (const [v, name, by, bx] of marks) {
    el(svg, "line", { x1: bx, y1: by, x2: SX - 4, y2: sy(v), stroke: FAINT, "stroke-width": 1.5, "stroke-dasharray": "3 4" });
    el(svg, "circle", { cx: SX, cy: sy(v), r: 4.5, fill: INK });
    label(svg, SX + 12, sy(v) + 4.5, `${name} ${v}`, { weight: 700, fill: INK });
  }
  label(svg, 388, 292, "착지 간격 0.65초 · 184 spm", { anchor: "end" });

  return {
    duration,
    frame(t) {
      // 착지마다 빠르게 조이고 천천히 풉니다.
      const k = (t % STEP) / STEP;
      const squeeze = k < 0.25 ? easeOut(k / 0.25) : 1 - easeInOut((k - 0.25) / 0.75);
      for (const b of bands) {
        b.ring.setAttribute("rx", (b.rx - squeeze * 4).toFixed(2));
        for (const { s, g } of b.sides) g.setAttribute("transform", `translate(${(-s * squeeze * 7).toFixed(2)} 0)`);
      }
    },
  };
};
