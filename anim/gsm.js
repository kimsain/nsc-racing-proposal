/* GSM 원단 중량: 10×10 cm 시험편이 저울에 놓이고 무게가 0에서 (값/100) g까지 오른 뒤 1 m² 값으로 환산됩니다.
   이어서 네 제품의 원단 중량 막대가 가벼운 순서로 올라오고, 이 제품 막대만 주황입니다. 5초 루프.
   시험편 두께와 저울 접시가 내려가는 양은 scalePos("gsm", 값)에 비례합니다. 제품이 없으면 100 g/m² 예시로 그립니다. */
SCENES.gsm = (svg, { p, products }) => {
  const value = p ? p.nums.gsm : 100;
  const pos = scalePos("gsm", value);
  const duration = 5;
  const sample = (value / 100).toFixed(2); // 10×10 cm는 1 m²의 1/100

  // 저울: 접시(평행사변형), 기둥, 몸통, 표시창
  const PY = 146; // 접시 앞쪽 모서리 높이
  const dip = lerp(1, 6, pos);
  const plate = el(svg, "polygon", { fill: "none", stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round" });
  const stem = el(svg, "line", { x1: 104, x2: 104, stroke: INK, "stroke-width": 1.5 });
  el(svg, "rect", { x: 34, y: 168, width: 140, height: 48, fill: "none", stroke: INK, "stroke-width": 1.5 });
  el(svg, "rect", { x: 56, y: 178, width: 96, height: 28, fill: "none", stroke: SUB, "stroke-width": 1.5 });
  const reading = label(svg, 104, 198, "", { size: 18, weight: 700, fill: INK, anchor: "middle" });

  // 시험편: 윗면(평행사변형)과 앞쪽 두께 면. 두께는 원단 중량에 따라 2~10.
  const th = lerp(2, 10, pos);
  const swatch = el(svg, "g", {});
  const top = el(swatch, "polygon", { fill: FAINT, stroke: INK, "stroke-width": 1.5, "stroke-linejoin": "round" });
  const side = el(swatch, "rect", { width: 76, height: th, fill: INK });
  const tag = label(swatch, 101, 0, "시험편 10 × 10 cm", { size: 14, fill: SUB, anchor: "middle" });

  // 환산 문구
  const line1 = label(svg, 204, 56, `10 × 10 cm = ${sample} g`, { size: 15, weight: 500, fill: INK });
  const line2 = label(svg, 204, 92, `1 m² = ${value} g`, { size: 26, weight: 700, fill: INK });
  const line3 = label(svg, 204, 116, "시험편 100장 무게", { size: 14, fill: SUB });

  // 네 제품 막대: 가벼운 순서. 높이는 scalePos("gsm", 값) × 165.
  const BASE = 262;
  label(svg, 184, 262, "네 제품", { size: 14, weight: 600, fill: INK, anchor: "end" });
  label(svg, 184, 282, "원단 중량 g/m²", { size: 14, fill: SUB, anchor: "end" });
  el(svg, "line", { x1: 196, x2: 394, y1: BASE, y2: BASE, stroke: INK, "stroke-width": 1.5 });
  const sorted = [...products].sort((a, b) => a.nums.gsm - b.nums.gsm);
  const bars = sorted.map((q, i) => {
    const x = 222 + i * 52;
    const mine = p && q.id === p.id;
    const h = scalePos("gsm", q.nums.gsm) * 165;
    const rect = el(svg, "rect", { x: x - 15, width: 30, fill: mine || !p ? INK : FAINT });
    const num = label(svg, x, BASE - h - 7, String(q.nums.gsm), { size: 14, weight: mine ? 700 : 500, fill: mine ? INK : SUB, anchor: "middle" });
    label(svg, x, 282, q.code, { size: 14, weight: mine ? 700 : 500, fill: mine ? INK : SUB, anchor: "middle" });
    return { rect, num, h, start: 2 + i * 0.45 };
  });

  return {
    duration,
    frame(t) {
      // 0~1초: 시험편이 내려와 접시에 놓입니다.
      const fall = easeInOut(seg(t, 0.1, 0.9));
      const press = dip * easeOut(seg(t, 0.85, 1.4));
      const py = PY + press;
      plate.setAttribute("points", `28,${py} 160,${py} 180,${py - 22} 48,${py - 22}`);
      stem.setAttribute("y1", py + 1);
      stem.setAttribute("y2", 168);
      const sy = lerp(56, py - 3 - th, fall); // 시험편 앞 모서리(윗면 기준)
      top.setAttribute("points", `56,${sy} 132,${sy} 146,${sy - 16} 70,${sy - 16}`);
      side.setAttribute("x", 56);
      side.setAttribute("y", sy);
      tag.setAttribute("y", sy - 26);
      swatch.setAttribute("opacity", seg(t, 0, 0.25).toFixed(2));

      // 1~2초: 저울 숫자가 0에서 값/100 g까지 오르고 환산 문구가 나타납니다.
      const k = easeOut(seg(t, 1, 1.8));
      reading.textContent = `${(value / 100 * k).toFixed(2)} g`;
      line1.setAttribute("opacity", seg(t, 1.3, 1.6).toFixed(2));
      line2.setAttribute("opacity", seg(t, 1.6, 1.9).toFixed(2));
      line3.setAttribute("opacity", seg(t, 1.7, 2).toFixed(2));

      // 2~4초: 막대가 차례로 올라옵니다. 4~5초는 멈춥니다.
      for (const b of bars) {
        const g = easeOut(seg(t, b.start, b.start + 0.6));
        b.rect.setAttribute("y", (BASE - b.h * g).toFixed(1));
        b.rect.setAttribute("height", (b.h * g).toFixed(1));
        b.num.setAttribute("opacity", seg(t, b.start + 0.45, b.start + 0.65).toFixed(2));
      }
    },
  };
};
