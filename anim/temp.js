/* 권장 기온: 아래 −15~30°C 눈금 위에 네 제품 구간 막대를 깔고, 세로 기온 표시선이 왼쪽에서 오른쪽으로 쓸고 갑니다.
   표시선이 가리키는 기온마다 위쪽 착장 줄을 recommend(t)로 다시 씁니다. 착장에 든 제품 막대는 진하게,
   이 제품이 착장에 들어 있는 동안만 이 제품 이름과 막대가 주황입니다. 6초 루프.
   0~4.8초 쓸기, 4.8~5.6초 이 제품 구간 가운데(제품 없음이면 11월 새벽 템포런 기온)로 돌아와 멈춥니다. */
SCENES.temp = (svg, { p, products }) => {
  const duration = 6;
  const [T0, T1] = TEMP_AXIS;
  const X0 = 72, X1 = 376; // 눈금 왼쪽, 오른쪽 끝
  const xOf = (T) => X0 + ((T - T0) / (T1 - T0)) * (X1 - X0);
  const rest = p ? Math.round((p.temp[0] + p.temp[1]) / 2) : TEMP_PRESETS[1].t;
  const AXIS_Y = 246;

  // 위쪽: 착장 줄과 지금 기온
  label(svg, 24, 30, "템포런 착장", { weight: 600, fill: INK });
  const readout = label(svg, 376, 34, "", { size: 26, weight: 700, fill: INK, anchor: "end" });
  const rows = Array.from({ length: 5 }, (_, i) => {
    const y = 54 + i * 18;
    return {
      name: label(svg, 24, y, ""),
      note: label(svg, 196, y, ""),
      line: label(svg, 376, y, "", { anchor: "end" }),
    };
  });

  // 아래: 제품 구간 막대
  const bars = products.map((q, i) => {
    const y = 168 + i * 20;
    const mine = p && q.id === p.id;
    const w = mine ? 10 : 6;
    const code = label(svg, 24, y + 5, q.code, { weight: mine ? 700 : 500 });
    const dash = q.layerMin !== undefined
      ? el(svg, "line", { x1: xOf(q.layerMin), x2: xOf(q.temp[0]), y1: y, y2: y, "stroke-width": w, "stroke-dasharray": "4 3" })
      : null;
    const bar = el(svg, "line", { x1: xOf(q.temp[0]), x2: xOf(q.temp[1]), y1: y, y2: y, "stroke-width": w });
    return { q, mine, code, dash, bar };
  });

  // 눈금
  el(svg, "line", { x1: X0, x2: X1, y1: AXIS_Y, y2: AXIS_Y, stroke: INK, "stroke-width": 1.5 });
  for (let T = T0; T <= T1; T += 5) {
    el(svg, "line", { x1: xOf(T), x2: xOf(T), y1: AXIS_Y, y2: AXIS_Y + 5, stroke: INK, "stroke-width": 1.5 });
    label(svg, xOf(T), AXIS_Y + 22, minus(T), { anchor: "middle" });
  }
  label(svg, 24, AXIS_Y + 22, "°C", { weight: 600, fill: INK });

  // 세로 기온 표시선과 위쪽 화살촉
  const cursor = el(svg, "g", {});
  el(cursor, "line", { x1: 0, x2: 0, y1: 150, y2: AXIS_Y, stroke: INK, "stroke-width": 1.5 });
  el(cursor, "path", { d: "M -6 142 L 6 142 L 0 150 Z", fill: INK });

  const tempAt = (t) => {
    if (t < 4.8) return lerp(T0, T1, easeInOut(seg(t, 0.2, 4.8)));
    return lerp(T1, rest, easeInOut(seg(t, 4.8, 5.6)));
  };

  return {
    duration,
    frame(t) {
      const T = tempAt(t);
      const shown = Math.round(T);
      cursor.setAttribute("transform", `translate(${xOf(T).toFixed(1)} 0)`);
      cursor.setAttribute("opacity", seg(t, 0, 0.2).toFixed(2));
      readout.textContent = `${minus(shown)}°C`;

      const combo = recommend(shown);
      rows.forEach((row, i) => {
        const r = combo[i];
        const nescl = r && r.item.line === "NESCL";
        const mine = r && p && r.item.id === p.id;
        row.name.textContent = r ? r.item.name : "";
        row.name.setAttribute("fill", nescl ? SUB : mine || !p ? INK : SUB);
        row.name.setAttribute("font-weight", nescl ? 500 : mine || !p ? 700 : 600);
        row.note.textContent = r && r.note ? r.note : "";
        row.line.textContent = r ? (nescl ? "NESCL" : r.item.code) : "";
              });

      for (const b of bars) {
        const on = combo.some((r) => r.item === b.q);
        const color = on ? (b.mine || !p ? INK : SUB) : FAINT;
        b.bar.setAttribute("stroke", color);
        if (b.dash) b.dash.setAttribute("stroke", color);
        b.code.setAttribute("fill", on ? INK : SUB);
      }
    },
  };
};
