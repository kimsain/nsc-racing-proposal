/* CFM 통기도: 왼쪽에서 공기 입자 24개가 원단으로 흘러옵니다. 통과 비율은 scalePos("cfm", 값)입니다.
   통과한 입자는 오른쪽으로 빠져나가고, 막힌 입자는 원단 앞에서 위아래로 튕겨 흩어집니다. 3초 루프. */
SCENES.cfm = (svg, { p }) => {
  const value = p ? p.nums.cfm : 120;
  const N = 24;
  const pass = Math.round(N * scalePos("cfm", value));
  const duration = 3;
  const FX = 210; // 원단 위치

  label(svg, 24, 34, "맞바람", { size: 14, weight: 600, fill: INK });
  label(svg, 376, 34, "몸 쪽", { size: 14, weight: 600, fill: INK, anchor: "end" });

  // 원단 단면: 위아래로 이어진 실 마디. 통기도가 높을수록 마디 사이가 벌어집니다.
  const gap = lerp(1, 9, scalePos("cfm", value));
  for (let y = 56; y < 250; y += 12) el(svg, "rect", { x: FX - 4, y, width: 8, height: 12 - gap, fill: p ? MINE : INK });
  label(svg, FX, 274, "압력 차 125 Pa", { anchor: "middle" });
  const count = label(svg, 376, 274, "", { anchor: "end", weight: 700, fill: INK });

  // 입자: 높이와 출발 시각을 고르게 나눕니다. 앞의 pass개가 통과합니다(위아래로 섞이도록 순서를 엇갈립니다).
  const order = Array.from({ length: N }, (_, i) => (i * 7) % N);
  const dots = order.map((slot, i) => ({
    y: 64 + (slot / (N - 1)) * 176,
    start: (i / N) * duration,
    through: i < pass,
    dir: slot % 2 ? 1 : -1,
    node: el(svg, "circle", { r: 4, fill: INK }),
  }));

  return {
    duration,
    frame(t) {
      for (const d of dots) {
        const k = ((t - d.start + duration) % duration) / duration; // 0~1, 입자마다 한 바퀴
        let x = lerp(20, 380, k);
        let y = d.y;
        let o = 1;
        if (!d.through && x > FX - 10) {
          const bounce = (x - (FX - 10)) / 170;
          x = FX - 10 - bounce * 60;
          y = Math.max(52, Math.min(252, d.y + d.dir * bounce * 70)); // 아래 글자를 덮지 않게 원단 높이 안에 둡니다
          o = 1 - bounce;
        }
        d.node.setAttribute("cx", x.toFixed(1));
        d.node.setAttribute("cy", y.toFixed(1));
        d.node.setAttribute("opacity", clamp01(o).toFixed(2));
      }
      count.textContent = `통과 ${pass} / ${N}`;
    },
  };
};
