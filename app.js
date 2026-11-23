const GLOSSARY = [
  { k: "GSM", full: "grams per square meter", dir: "↓ 낮을수록 가볍다", body: "원단 1㎡의 무게. 레이스 싱글렛은 80~110, 겨울 미드레이어는 180~250 정도. 같은 소재라면 무게·두께·보온을 가장 빠르게 가늠하는 숫자.", scale: ["~110 레이스", "~160 트레이닝", "~250 보온"] },
  { k: "CFM", full: "air permeability · ASTM D737", dir: "↑ 높을수록 바람이 통한다", body: "1 ft² 면적을 1분 동안 통과하는 공기량. 싱글렛은 높을수록 시원하고, 바람막이는 낮을수록 바람을 막는다. 용도에 따라 '좋은 값'이 반대.", scale: ["<5 방풍", "~60 균형", "300+ 메쉬"] },
  { k: "MVTR", full: "moisture vapor transmission · g/m²/24h", dir: "↑ 높을수록 땀 증기가 빠진다", body: "원단이 하루 동안 내보내는 수증기 양. 숫자가 클수록 속이 덜 꿉꿉하다. 쉘과 레이스 상의 비교에 특히 유용.", scale: ["<8k 답답", "~15k 양호", "20k+ 우수"] },
  { k: "RET", full: "evaporative resistance · ISO 11092", dir: "↓ 낮을수록 숨을 잘 쉰다", body: "땀이 증발할 때 원단이 거는 저항. 0~6이면 '매우 잘 통함', 13 이상이면 고강도 러닝엔 덥다. MVTR보다 실제 체감에 가깝다.", scale: ["0–6 최상", "6–13 양호", "13+ 둔함"] },
  { k: "CLO", full: "thermal insulation · ISO 15831", dir: "↑ 높을수록 따뜻하다", body: "보온 단위. 1 CLO는 21°C 실내에서 정장 한 벌이 주는 보온. 레이어를 더하면 대략 합산되므로 '오늘 몇 CLO가 필요한지'로 옷을 고를 수 있다.", scale: ["0.1 싱글렛", "0.4 미드", "0.8+ 겨울"] },
  { k: "신장률 / 회복률", full: "stretch & recovery · ASTM D2594", dir: "↑ 신장은 움직임, 회복은 형태 유지", body: "얼마나 늘어나는지(가로/세로)와, 늘어난 뒤 얼마나 원래대로 돌아오는지. 회복률이 낮으면 50km 지점에서 옷이 처진다.", scale: ["<30% 우븐", "~50% 니트", "회복 95%+"] },
  { k: "압박 mmHg", full: "graduated compression", dir: "↑ 높을수록 강하게 잡아준다", body: "타이츠가 허벅지를 누르는 압력. 15~20 mmHg 정도가 레이스용 근육 진동 억제 구간으로 자주 쓰인다.", scale: ["~10 소프트", "15–20 레이스", "20+ 리커버리"] },
  { k: "데니어 (D)", full: "yarn linear density", dir: "↓ 낮을수록 얇고 가볍다", body: "실 9,000m의 무게(g). 7D 립스탑은 초경량 패커블, 20D는 내구성 위주. 바람막이 무게를 이해하는 핵심.", scale: ["7D 초경량", "15D 균형", "30D+ 내구"] },
];

const PRODUCTS = [
  {
    id: "r01", code: "R-01 · RACE", name: "AERO 95 레이스 싱글렛", img: "assets/img/r01-singlet.webp", price: "89,000",
    one: "95 GSM · 레이저 타공 · 접착 마감", temp: [12, 32],
    desc: "하프·풀코스 레이스 데이를 위한 싱글렛. 등판 전체를 레이저 타공해 열이 가장 많이 쌓이는 견갑골 사이를 열었고, 암홀과 밑단은 봉제 대신 접착으로 마감해 30km 이후의 쓸림을 없앴습니다.",
    kpis: [["GSM", 95, "", 0.3], ["CFM", 310, "", 0.95], ["RET", 1.8, "m²Pa/W", 0.9], ["MVTR", "22,000", "g/m²/24h", 0.9], ["무게 (M)", 68, "g", 0.85], ["UPF", 30, "", 0.6]],
    specs: [
      ["원단", "Aero-Knit 95", "재생 폴리에스터 92% · 폴리우레탄 8%"],
      ["중량", "95 g/m²", "KS K ISO 3801"],
      ["통기도", "310 CFM", "ASTM D737 · 125 Pa"],
      ["투습도", "22,000 g/m²/24h", "JIS L 1099 B-1"],
      ["증발저항", "RET 1.8", "ISO 11092"],
      ["신장률 (가로/세로)", "55% / 35%", "회복률 95% (세탁 50회 후 92%)"],
      ["건조 시간", "18분", "사내 기준: 0.5 ml 적하 후 확산 건조"],
      ["핏", "레이스 핏", "가슴 기준 정사이즈, 몸통 길이 +2cm (배번 고정 고려)"],
    ],
    tech: [
      ["레이저 타공 존", "등판 견갑골 사이 타공 밀도 2배. 전면은 배번 핀 고정을 위해 타공 없음."],
      ["본딩 암홀 · 밑단", "봉제선 0. 0.3mm 접착 테이프로 마감해 겨드랑이 마찰 제거."],
      ["사이드 시그널 테이프", "왼쪽 옆선 형광 본딩 테이프 — 시인성 + 봉제선 대체."],
      ["배번 루프", "밑단 안쪽 4개 루프로 핀 없이 배번 고정."],
    ],
    use: [["레이스 데이", "15°C 이상 하프·풀"], ["인터벌", "트랙 · 고강도"], ["NO", "5°C 이하 단독 착용", true]],
    hotspots: [
      [58, 30, "레이저 타공 존", "등판 상부에 직경 0.8mm 타공 2,400개. 열이 몰리는 견갑골 사이를 집중 배기."],
      [25, 58, "시그널 테이프", "옆선 봉제 대신 형광 본딩 테이프. 야간 시인성과 무봉제 착용감을 동시에."],
      [43, 17, "레이서백 · 본딩 암홀", "팔 스윙 범위를 막지 않는 레이서백 컷, 봉제선 없는 접착 마감."],
      [50, 86, "본딩 밑단", "말려 올라가지 않도록 3mm 실리콘 도트 + 접착 마감."],
    ],
  },
  {
    id: "r02", code: "R-02 · THERMAL", name: "THERMO GRID 185 후드슬리브", img: "assets/img/r02-hoodsleeve.webp", price: "119,000",
    one: "185 GSM 그리드 플리스 · CLO 0.42", temp: [-6, 10],
    desc: "네스클의 시그니처 후드슬리브를 레이스 스펙으로. 안쪽 그리드 플리스가 공기층을 만들어 보온하고, 그리드 사이 채널로 땀 증기를 뺍니다. 어깨 타이다잉 패널은 스타일 라인 DNA를 그대로 가져왔습니다.",
    kpis: [["GSM", 185, "", 0.6], ["CLO", 0.42, "", 0.55], ["CFM", 120, "", 0.55], ["RET", 4.5, "m²Pa/W", 0.75], ["무게 (M)", 238, "g", 0.5], ["신장 (가로)", "60", "%", 0.8]],
    specs: [
      ["원단", "Grid Fleece 185", "폴리에스터 88% · 폴리우레탄 12%"],
      ["중량", "185 g/m²", "KS K ISO 3801"],
      ["보온", "0.42 CLO", "ISO 15831 서멀 마네킹 (단독 착용)"],
      ["통기도", "120 CFM", "ASTM D737"],
      ["증발저항", "RET 4.5", "ISO 11092"],
      ["신장률 (가로/세로)", "60% / 45%", "회복률 93%"],
      ["소매 길이", "손등까지 +4cm", "핑거홀 사용 시 손등 커버"],
      ["핏", "슬림 핏", "러닝 베스트 아래 레이어링 기준 설계"],
    ],
    tech: [
      ["그리드 플리스 내면", "격자형 기모가 공기층(보온)과 배출 채널(통기)을 동시에."],
      ["핑거홀 + 워치 윈도우", "왼손목 개구부로 소매를 걷지 않고 페이스 확인."],
      ["플랫락 봉제", "모든 봉제선 평봉 처리, 베스트 어깨끈 닿는 부위는 봉제선 이동."],
      ["타이다잉 어깨 패널", "스타일 라인 DNA. R 라인에서도 '네스클다움'은 유지."],
    ],
    use: [["겨울 롱런", "-5 ~ 5°C · 베스트 착용"], ["가을 템프", "5 ~ 10°C 단독"], ["NO", "15°C 이상 고강도", true]],
    hotspots: [
      [50, 9, "그리드 후드", "안쪽 그리드 플리스가 이어진 후드. 헤어밴드 위로 덮어도 땀이 갇히지 않음."],
      [50, 30, "타이다잉 어깨 패널", "스타일 라인의 타이다잉 공정을 기능 원단에 적용 — 두 라인이 만나는 지점."],
      [86, 89, "핑거홀 커프", "엄지 고정으로 소매가 말려 올라가지 않고, 손등까지 보온."],
      [67, 83, "리플렉티브 탭", "밑단 형광 반사 탭. 야간 한강 러닝 시인성."],
    ],
  },
  {
    id: "r03", code: "R-03 · SHELL", name: "ZERO 7D 윈드쉘", img: "assets/img/r03-shell.webp", price: "159,000",
    one: "7D 립스탑 · 72 g · 주먹 크기로 패킹", temp: [-10, 14],
    desc: "레이스 출발 전 대기, 새벽 강바람, 고개 하산을 위한 초경량 쉘. 7데니어 립스탑으로 72g, 가슴 포켓 안으로 접어 넣으면 젤 2개 크기가 됩니다. 등판 레이저 슬릿으로 오르막의 열을 뺍니다.",
    kpis: [["무게 (M)", 72, "g", 0.95], ["데니어", "7", "D", 0.95], ["CFM", 1.5, "", 0.1], ["내수압", "1,500", "mm", 0.4], ["MVTR", "18,000", "g/m²/24h", 0.75], ["패킹", "8×6", "cm", 0.9]],
    specs: [
      ["원단", "7D Nylon Ripstop", "나일론 100% · C0 발수 (PFAS-free)"],
      ["중량", "32 g/m²", "KS K ISO 3801"],
      ["통기도", "1.5 CFM", "ASTM D737 — 사실상 방풍"],
      ["투습도", "18,000 g/m²/24h", "JIS L 1099 B-1"],
      ["내수압", "1,500 mm", "ISO 811 · 발수 지속 세탁 20회"],
      ["패킹 크기", "8 × 6 × 4 cm", "가슴 포켓 셀프 패킹"],
      ["소매", "엘라스틱 바인딩", "시계 위로 당겨 올려도 고정"],
      ["핏", "레귤러", "후드슬리브 위 레이어링 기준"],
    ],
    tech: [
      ["레이저 벤트 슬릿", "등판 요크 12개 슬릿. 방풍은 유지하면서 등판 열 배출."],
      ["셀프 패킹 포켓", "가슴 포켓을 뒤집어 본체 수납, 지퍼풀에 고리."],
      ["하프 집업", "무게 절감 + 오르막에서 빠른 환기."],
      ["초음파 접착 솔기", "어깨 솔기는 초음파 접착으로 바늘구멍 누수 제거."],
    ],
    use: [["레이스 출발 대기", "버리지 않아도 되는 무게"], ["바람 부는 날", "풍속 5m/s 이상"], ["NO", "폭우 장시간 (방수 아님)", true]],
    hotspots: [
      [50, 28, "레이저 벤트 슬릿", "등판 요크 12개 슬릿 — 바람은 막고 열은 뺀다."],
      [50, 20, "하프 지퍼 · 형광 풀", "장갑 낀 손으로 잡히는 형광 지퍼 풀."],
      [64, 36, "셀프 패킹 포켓", "포켓을 뒤집으면 재킷 전체가 8×6cm로 수납."],
      [12, 86, "엘라스틱 커프", "시계 위로 걷어도 내려오지 않는 바인딩."],
    ],
  },
  {
    id: "r04", code: "R-04 · CARRY", name: "CARRY 8 레이스 하프타이츠", img: "assets/img/r04-tights.webp", price: "109,000",
    one: "젤 8개 수납 · 16 mmHg · 인심 22cm", temp: [0, 30],
    desc: "베스트 없이 풀코스를 뛰는 러너를 위한 타이츠. 허리 360° 포켓에 젤 6개, 허벅지 포켓에 스마트폰과 젤 2개. 무엇을 얼마나 넣을 수 있는지 숫자로 알려드립니다.",
    kpis: [["젤 수납", 8, "개", 0.9], ["총 용량", 1.1, "L", 0.7], ["압박", 16, "mmHg", 0.6], ["GSM", 210, "", 0.6], ["인심", 22, "cm", 0.5], ["무게 (M)", 164, "g", 0.6]],
    specs: [
      ["원단", "Compress-Knit 210", "나일론 72% · 폴리우레탄 28%"],
      ["중량", "210 g/m²", "KS K ISO 3801"],
      ["압박", "허벅지 16 mmHg", "단계 압박, 무릎 위 12 mmHg"],
      ["수납", "허리 6 + 허벅지 2", "젤 8개 또는 6.7\" 폰 + 젤 6개"],
      ["포켓 바운스", "±4 mm", "사내 기준: 젤 6개 · 페이스 4'00\"/km 측정"],
      ["인심 (M)", "22 cm", "하프 길이, 허벅지 쓸림 방지"],
      ["허리", "무봉제 와이드 밴드 + 드로코드", "폭 9cm"],
      ["신장률 (가로/세로)", "70% / 60%", "회복률 96%"],
    ],
    tech: [
      ["360° 메쉬 포켓 밴드", "허리 둘레 6칸, 칸마다 젤 1개 기준 폭 설계."],
      ["사이드 허벅지 포켓", "6.7인치 폰 수납, 상단 이중 원단으로 튀어나옴 방지."],
      ["실리콘 그리퍼 밑단", "말려 올라감 방지, 피부 자극 낮은 도트 패턴."],
      ["형광 드로코드 팁", "출발선에서 빠르게 찾는 조임 끈."],
    ],
    use: [["풀코스", "베스트 없이 젤 8개"], ["롱런 훈련", "물병 없는 코스"], ["NO", "트레일 (수납 부족)", true]],
    hotspots: [
      [22, 21, "360° 젤 포켓", "허리 메쉬 6칸 — 칸마다 젤 1개, 달리면서 꺼낼 수 있는 각도."],
      [44, 30, "형광 드로코드", "출발 직전 조임 조절. 끝단 형광 처리."],
      [88, 55, "허벅지 포켓", "6.7\" 스마트폰 수납, 상단 이중 원단으로 바운스 억제."],
      [25, 86, "실리콘 그리퍼", "도트 실리콘 밑단으로 42km 내내 고정."],
    ],
  },
];

const T_MIN = -15, T_MAX = 35;
const pct = (t) => ((t - T_MIN) / (T_MAX - T_MIN)) * 100;
const tempBar = ([lo, hi]) => `
  <div class="temp-bar"><i style="left:${pct(lo)}%;width:${pct(hi) - pct(lo)}%"></i></div>
  <div class="temp-scale"><span>${T_MIN}°</span><span>권장 ${lo}° ~ ${hi}°C</span><span>${T_MAX}°</span></div>`;

document.getElementById("glossaryGrid").innerHTML = GLOSSARY.map((g) => `
  <article class="gl">
    <header><h3>${g.k}</h3><span class="full">${g.full}</span></header>
    <span class="dir">${g.dir}</span>
    <p>${g.body}</p>
    <div class="scale">${g.scale.map((s) => `<span>${s}</span>`).join("")}</div>
  </article>`).join("");

document.getElementById("cards").innerHTML = PRODUCTS.map((p) => `
  <button class="card" data-id="${p.id}" type="button">
    <img src="${p.img}" alt="${p.name}" loading="lazy" />
    <div class="meta">
      <span class="code">${p.code}</span>
      <h3>${p.name}</h3>
      <p class="one">${p.one}</p>
      ${tempBar(p.temp)}
      <div class="chips">${p.kpis.slice(0, 3).map(([k, v, u]) => `<span>${k} ${v}${u ? " " + u : ""}</span>`).join("")}</div>
    </div>
  </button>`).join("");

const COMPARE_ROWS = [
  ["원단 중량 (GSM)", ["95", "185", "32", "210"], "min"],
  ["제품 무게 (M)", ["68 g", "238 g", "72 g", "164 g"], "min"],
  ["통기도 (CFM)", ["310", "120", "1.5", "60"], null],
  ["증발저항 (RET)", ["1.8", "4.5", "5.2", "3.9"], "min"],
  ["보온 (CLO)", ["0.08", "0.42", "0.20", "0.15"], null],
  ["권장 기온", ["12 ~ 32°C", "-6 ~ 10°C", "-10 ~ 14°C", "0 ~ 30°C"], null],
  ["봉제 방식", ["접착", "플랫락", "초음파 접착", "플랫락"], null],
  ["수납", ["배번 루프", "-", "셀프 패킹", "젤 8개 · 1.1 L"], null],
];
document.getElementById("compareTable").innerHTML = `
  <thead><tr><th></th>${PRODUCTS.map((p) => `<th>${p.code.split(" · ")[0]} ${p.name.split(" ")[0]} ${p.name.split(" ")[1]}</th>`).join("")}</tr></thead>
  <tbody>${COMPARE_ROWS.map(([label, vals, best]) => {
    const nums = vals.map((v) => parseFloat(v));
    const bestIdx = best === "min" ? nums.indexOf(Math.min(...nums)) : -1;
    return `<tr><th>${label}</th>${vals.map((v, i) => `<td class="${i === bestIdx ? "best" : ""}">${v}</td>`).join("")}</tr>`;
  }).join("")}</tbody>`;

const pdp = document.getElementById("pdp");
const pdpBody = document.getElementById("pdpBody");

function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  pdpBody.innerHTML = `
    <div class="pdp-grid">
      <div class="pdp-media">
        <div class="pdp-figure">
          <img src="${p.img}" alt="${p.name}" />
          ${p.hotspots.map(([x, y], i) => `<button class="hs" style="left:${x}%;top:${y}%" data-i="${i}" aria-expanded="false" aria-label="디테일 ${i + 1}">${i + 1}</button>`).join("")}
        </div>
        <div class="hs-pop" hidden></div>
      </div>
      <div class="pdp-info">
        <span class="code">${p.code}</span>
        <h2>${p.name}</h2>
        <p class="price">₩${p.price} <small style="color:#999;font-size:12px">(콘셉트 가격)</small></p>
        <p class="desc">${p.desc}</p>
        ${tempBar(p.temp)}
        <h4>Key numbers</h4>
        <div class="kpis">${p.kpis.map(([k, v, u, m]) => `
          <div class="kpi"><small>${k}</small><strong>${v}<u>${u}</u></strong><div class="meter"><i style="width:${m * 100}%"></i></div></div>`).join("")}
        </div>
        <h4>Specification</h4>
        <table class="spec-table">${p.specs.map(([k, v, n]) => `<tr><th>${k}</th><td>${v}<small>${n}</small></td></tr>`).join("")}</table>
        <h4>Construction</h4>
        <div class="tech">${p.tech.map(([k, v]) => `<div><b>${k}</b><span>${v}</span></div>`).join("")}</div>
        <h4>When to wear</h4>
        <div class="use">${p.use.map(([k, v, no]) => `<div class="${no ? "no" : ""}"><b>${k}</b>${v}</div>`).join("")}</div>
      </div>
    </div>`;
  const pop = pdpBody.querySelector(".hs-pop");
  pdpBody.querySelectorAll(".hs").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      pdpBody.querySelectorAll(".hs").forEach((b) => b.setAttribute("aria-expanded", "false"));
      if (open) { pop.hidden = true; return; }
      const [, , title, text] = p.hotspots[btn.dataset.i];
      btn.setAttribute("aria-expanded", "true");
      pop.innerHTML = `<b>${btn.dataset.i * 1 + 1} · ${title}</b>${text}`;
      pop.hidden = false;
    });
  });
  pdp.showModal();
  pdp.scrollTop = 0;
}

document.getElementById("cards").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openProduct(card.dataset.id);
});
document.getElementById("pdpClose").addEventListener("click", () => pdp.close());
pdp.addEventListener("click", (e) => { if (e.target === pdp) pdp.close(); });

const NESCL_ITEMS = {
  singlet: { name: "AERO 95 레이스 싱글렛", img: "assets/img/r01-singlet.webp", note: "R-01", clo: 0.08 },
  tee: { name: "네스클 기능성 반팔 (기존 라인)", note: "NESCL", clo: 0.12 },
  hood: { name: "THERMO GRID 185 후드슬리브", img: "assets/img/r02-hoodsleeve.webp", note: "R-02", clo: 0.42 },
  base: { name: "롱슬리브 베이스레이어 (기존 라인)", note: "NESCL", clo: 0.25 },
  shell: { name: "ZERO 7D 윈드쉘", img: "assets/img/r03-shell.webp", note: "R-03", clo: 0.2 },
  tights: { name: "CARRY 8 하프타이츠", img: "assets/img/r04-tights.webp", note: "R-04", clo: 0.15 },
  longtights: { name: "윈터 롱타이츠 (기존 라인)", note: "NESCL", clo: 0.3 },
  gloves: { name: "장갑 · 넥워머", note: "ACC", clo: 0.1 },
};
const BONUS = { easy: 0, tempo: 5, race: 9 };

function recommend() {
  const t = +document.getElementById("temp").value;
  const w = +document.getElementById("wind").value;
  const intensity = document.querySelector('input[name="intensity"]:checked').value;
  const rain = document.getElementById("rain").checked;
  document.getElementById("tempOut").textContent = `${t}°C`;
  document.getElementById("windOut").textContent = `${w} m/s`;

  const feels = Math.round(t - w * 1.2 - (rain ? 3 : 0));
  const eff = feels + BONUS[intensity];
  let kit;
  if (eff >= 18) kit = ["singlet", "tights"];
  else if (eff >= 12) kit = ["tee", "tights"];
  else if (eff >= 6) kit = ["base", "tights"];
  else if (eff >= 0) kit = ["hood", "tights"];
  else if (eff >= -6) kit = ["hood", "shell", "longtights"];
  else kit = ["base", "hood", "shell", "longtights", "gloves"];
  if ((w >= 6 || rain) && !kit.includes("shell") && eff < 14) kit.splice(1, 0, "shell");
  if (intensity === "race" && eff >= 12) kit[0] = "singlet";

  const items = kit.map((k) => NESCL_ITEMS[k]);
  const clo = items.reduce((s, i) => s + i.clo, 0).toFixed(2);
  const tips = [];
  if (intensity === "race" && t < 10) tips.push("출발 대기 동안은 ZERO 7D 쉘을 입고, 5km 지점에서 접어 포켓에 넣으세요.");
  if (rain) tips.push("비 예보: 쉘은 발수(1,500mm)이지 방수가 아닙니다. 1시간 이상 폭우면 체온 관리에 주의.");
  if (eff >= 18) tips.push("체감 고온 구간: 흰색·고CFM 상의와 급수 계획이 기록을 지킵니다.");
  if (!tips.length) tips.push("처음 1km가 살짝 춥게 느껴지면 맞게 입은 겁니다.");

  document.getElementById("layerResult").innerHTML = `
    <div class="lr-head">
      <div><small>체감 기온</small><strong>${feels}°C</strong></div>
      <div><small>운동 중 체감</small><strong class="hot">${eff}°C</strong></div>
      <div><small>추천 총 보온</small><strong>${clo} CLO</strong></div>
    </div>
    <div class="lr-items">${items.map((i) => `
      <div class="lr-item">
        ${i.img ? `<img src="${i.img}" alt="" />` : `<div class="ph">${i.note}</div>`}
        <div><b>${i.name}</b><span>${i.note === "NESCL" ? "스타일 라인과 섞어 입어도 OK" : i.note === "ACC" ? "손끝·목 보온" : "NESCL R"}</span></div>
        <em>${i.clo.toFixed(2)} CLO</em>
      </div>`).join("")}
    </div>
    <p class="lr-tip">${tips.join("<br />")}</p>`;
}
document.getElementById("layerForm").addEventListener("input", recommend);
recommend();
