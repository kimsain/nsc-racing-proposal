/* 건조 시간: 열판 위 원형 시험편 4개(R-01~R-04)에 물을 떨어뜨리면 0.3초 동안 젖은 얼룩이 퍼집니다.
   얼룩은 가장자리부터 줄어들고, 다 없어지는 시각은 건조 시간에 비례합니다(가장 긴 값을 3.2초로).
   위쪽 타이머는 0분에서 가장 긴 값까지 올라갑니다. 다 마른 시험편 아래와 진행 막대 눈금에 분을 띄우고, 이 제품만 주황 테두리를 두릅니다. 4초 루프. */
SCENES.dry = (svg, { p, products }) => {
  const duration = 4;
  const DROP = 0.3; // 물을 떨어뜨려 얼룩이 퍼지는 시간
  const RUN = 3.2; // 가장 긴 건조 시간이 걸리는 길이
  const R = 38; // 시험편 반지름
  const CY = 168;
  const items = products.filter((q) => q.nums.dry !== undefined);
  const maxDry = Math.max(...items.map((q) => q.nums.dry));

  // 타이머와 진행 막대
  label(svg, 40, 40, "경과 시간", { weight: 600, fill: INK });
  const timer = label(svg, 360, 42, "", { size: 22, weight: 700, fill: INK, anchor: "end" });
  el(svg, "line", { x1: 40, y1: 64, x2: 360, y2: 64, stroke: FAINT, "stroke-width": 3, "stroke-linecap": "round" });
  const bar = el(svg, "line", { x1: 40, y1: 64, x2: 40, y2: 64, stroke: INK, "stroke-width": 3, "stroke-linecap": "round" });
  label(svg, 40, 88, "0분", {});

  const gap = 400 / items.length;
  const specs = items.map((q, i) => {
    const cx = gap * (i + 0.5);
    const mine = p && q.id === p.id;
    const g = el(svg, "g", {});
    el(g, "circle", { cx, cy: CY, r: R, fill: FAINT, opacity: 0.45 });
    const stain = el(g, "circle", { cx, cy: CY, r: R, fill: SUB, opacity: 0.9 });
    el(g, "circle", { cx, cy: CY, r: R, fill: "none", stroke: mine ? MINE : SUB, "stroke-width": mine ? 3 : 1.5 });
    label(g, cx, CY + R + 26, q.code, { weight: mine ? 700 : 500, fill: mine ? INK : SUB, anchor: "middle" });
    const done = label(g, cx, CY + R + 50, `${q.nums.dry}분`, { size: mine ? 17 : 15, weight: 700, fill: mine ? INK : SUB, anchor: "middle" });
    // 진행 막대 위 눈금: 이 시험편이 다 마른 자리
    const tx = lerp(40, 360, q.nums.dry / maxDry);
    const tick = el(svg, "g", {});
    el(tick, "line", { x1: tx, y1: 56, x2: tx, y2: 72, stroke: mine ? INK : SUB, "stroke-width": mine ? 3 : 1.5 });
    label(tick, tx, 88, q.code, { weight: mine ? 700 : 500, fill: mine ? INK : SUB, anchor: "middle" });
    return { stain, done, tick, end: DROP + (q.nums.dry / maxDry) * RUN };
  });

  return {
    duration,
    frame(t) {
      const k = seg(t, DROP, DROP + RUN);
      const spread = easeOut(seg(t, 0, DROP));
      timer.textContent = `${Math.round(maxDry * k)}분`;
      bar.setAttribute("x2", lerp(40, 360, k).toFixed(1));
      for (const s of specs) {
        const left = 1 - seg(t, DROP, s.end); // 남은 물의 양(면적 비율)
        s.stain.setAttribute("r", (R * spread * Math.sqrt(left)).toFixed(2));
        s.stain.setAttribute("opacity", left > 0 ? 0.9 : 0);
        const shown = seg(t, s.end, s.end + 0.2);
        s.done.setAttribute("opacity", shown.toFixed(2));
        s.tick.setAttribute("opacity", shown.toFixed(2));
      }
    },
  };
};
