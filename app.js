const GLOSSARY = [
  { k: "GSM", name: "원단 중량", unit: "g/m²", std: "ASTM D3776 (KNIT) · ISO 3801 (WOVEN)",
    dir: "낮을수록 가벼움",
    body: "원단 1 m²의 중량(g). NESCL R 제품명의 숫자는 이 값입니다.",
    ref: [["~120", "레이스 상의"], ["120~180", "사계절 상의"], ["180~300", "보온 레이어"]] },
  { k: "CFM", name: "통기도", unit: "ft³/min/ft²", std: "ASTM D737 · 125 Pa",
    dir: "높을수록 공기가 잘 통함",
    body: "125 Pa 압력차에서 원단 1 ft²를 1분간 통과하는 공기량. 싱글렛은 높은 값, 바람막이는 낮은 값이 유리합니다. 타공 원단은 타공부와 비타공부를 따로 측정합니다.",
    ref: [["5 미만", "방풍"], ["20~100", "중간"], ["150 이상", "메쉬"]] },
  { k: "MVTR", name: "투습도", unit: "g/m²/24h", std: "JIS L 1099 B-1",
    dir: "높을수록 수증기가 잘 빠짐",
    body: "24시간 동안 원단 1 m²를 통과하는 수증기량(g). 시험 방법에 따라 값이 크게 달라지므로 같은 방법끼리만 비교합니다.",
    ref: [["8,000 미만", "낮음"], ["8,000~15,000", "보통"], ["20,000 이상", "높음"]] },
  { k: "RET", name: "증발저항", unit: "m²·Pa/W", std: "ISO 11092",
    dir: "낮을수록 땀 증발이 쉬움",
    body: "땀 증기가 원단을 통과할 때의 저항. 원단 단위 시험값이며 완제품 값이 아닙니다. 20을 넘으면 고강도 러닝에 적합하지 않습니다.",
    ref: [["6 미만", "매우 좋음"], ["6~13", "좋음"], ["13~20", "보통"]] },
  { k: "CLO", name: "보온", unit: "clo", std: "ISO 15831 · ISO 9920",
    dir: "높을수록 보온",
    body: "보온 단위. 1 CLO는 0.155 m²·K/W입니다. 서멀 마네킹은 착장 전체를 측정하므로 제품별 값은 기여분을 추정한 근사치(±0.03)입니다.",
    ref: [["0.05", "싱글렛"], ["0.2~0.3", "미드레이어"], ["0.5 이상", "겨울 착장"]] },
  { k: "신장률 · 회복률", name: "", unit: "%", std: "ISO 20932-1",
    dir: "신장률은 가동 범위, 회복률은 형태 유지",
    body: "정해진 하중에서 늘어나는 비율(가로/세로)과, 하중을 제거한 뒤 원래 길이로 돌아오는 비율. 회복률이 낮으면 장거리에서 형태가 처집니다.",
    ref: [["10% 미만", "직물"], ["15~30%", "스트레치 직물"], ["40~90%", "니트"]] },
  { k: "압박", name: "", unit: "mmHg", std: "PRESSURE SENSOR",
    dir: "높을수록 강한 압박",
    body: "착용 시 피부에 가해지는 압력. 공인 스포츠 등급은 없으며 의료용 압박 등급과는 다른 체계입니다.",
    ref: [["5~10", "약함"], ["10~15", "스포츠"], ["18 이상", "의료용"]] },
  { k: "데니어", name: "", unit: "D", std: "YARN SPEC",
    dir: "낮을수록 가는 실",
    body: "실 9,000 m의 중량(g). 원단 중량과는 다른 값입니다.",
    ref: [["7~10D", "초경량"], ["15~20D", "중간"], ["30D 이상", "내구성 위주"]] },
];

const PRODUCTS = [
  {
    id: "r01", code: "R-01", cat: "RACE", name: "Singlet 95",
    img: "assets/img/r01-singlet.webp", price: "89,000",
    one: "레이저 타공 · 본딩 마감 · 레이스 핏",
    temp: [12, 30],
    tempNote: "단독 착용, 템포런 기준. 레이스 강도에서는 8°C부터.",
    desc: "하프·풀코스 레이스용 싱글렛. 등판 견갑골 사이에 레이저 타공 존을 두었고, 암홀과 밑단은 봉제 대신 본딩으로 마감했습니다.",
    kpis: [
      ["GSM", "원단 중량", "95", "g/m²", "ASTM D3776"],
      ["CFM", "통기도", "190", "", "ASTM D737 · 125 Pa"],
      ["MVTR", "투습도", "24,000", "g/m²/24h", "JIS L 1099 B-1"],
      ["RET", "증발저항", "2.4", "m²·Pa/W", "ISO 11092"],
      ["CLO", "보온", "0.06", "", "ISO 15831"],
      ["", "제품 무게 (M)", "68", "g", "S 64 · L 73 · XL 78"],
    ],
    specs: [
      ["FABRIC", [
        ["원단", "Aero-Knit 95", "", "", "싱글 저지 메쉬"],
        ["혼용률", "재생 폴리에스터 92% · 폴리우레탄 8%", "", "", ""],
        ["원단 중량", "95", "g/m²", "ASTM D3776", ""],
        ["생산", "원단 대한민국 · 봉제 대한민국", "", "", ""],
      ]],
      ["PERFORMANCE", [
        ["통기도", "190", "CFM", "ASTM D737 · 125 Pa", "타공 존 240 CFM"],
        ["투습도", "24,000", "g/m²/24h", "JIS L 1099 B-1", "A-1 기준 약 11,000"],
        ["증발저항", "2.4", "m²·Pa/W", "ISO 11092", ""],
        ["보온", "0.06", "CLO", "ISO 15831", "기여값 근사, ±0.03"],
        ["신장률 (가로/세로)", "55 / 35", "%", "ISO 20932-1", "회복률 95%, 세탁 50회 후 92%"],
        ["건조 시간", "21", "분", "AATCC 201", ""],
        ["자외선 차단", "UPF 15", "", "AS/NZS 4399", "블랙 기준"],
      ]],
      ["FIT", [
        ["핏", "레이스 핏", "", "", "가슴 정사이즈, 몸통 길이 +2 cm"],
        ["실측 (M)", "가슴 단면 46 · 총장 66", "cm", "", ""],
        ["제품 무게", "S 64 · M 68 · L 73 · XL 78", "g", "", "건조 상태, 택 제외"],
        ["솔기", "본딩", "", "", "0.3 mm 테이프, 봉제선 없음"],
        ["배번 고정", "밑단 안쪽 루프 4개", "", "", "옷핀 불필요"],
      ]],
      ["CARE", [
        ["세탁", "30°C 약세탁, 자연 건조", "", "", "섬유유연제, 건조기, 다림질 금지"],
      ]],
    ],
    construction: [
      [58, 30, "레이저 타공 존", "등판 상부 Ø1.2 mm 타공 약 3,200개. 타공 존 개구율 약 5%."],
      [25, 58, "사이드 시그널 테이프", "왼쪽 옆선 형광 본딩 테이프. 옆선 봉제 대체."],
      [43, 17, "레이서백 · 본딩 암홀", "팔 스윙 범위를 확보한 레이서백 컷. 암홀 0.3 mm 본딩 테이프."],
      [50, 86, "본딩 밑단", "3 mm 실리콘 도트. 말림 방지."],
    ],
    use: {
      yes: [["레이스", "12°C 이상 하프·풀코스"], ["인터벌", "트랙, 고강도"]],
      no: [["5°C 이하", "단독 착용"]],
    },
  },
  {
    id: "r02", code: "R-02", cat: "THERMAL", name: "Hood Sleeve 185",
    img: "assets/img/r02-hoodsleeve.webp", price: "119,000",
    one: "그리드 플리스 · 핑거홀 · 워치 윈도우",
    temp: [-3, 10],
    tempNote: "단독 착용, 템포런 기준. Wind Shell 28 병용 시 −8°C까지.",
    desc: "네스클 후드슬리브의 레이스 사양. 내면 그리드 플리스가 공기층과 투습 채널을 형성합니다. 어깨 패널은 스타일 라인의 타이다잉 공정을 적용했습니다.",
    kpis: [
      ["GSM", "원단 중량", "185", "g/m²", "ASTM D3776"],
      ["CFM", "통기도", "65", "", "ASTM D737 · 125 Pa"],
      ["MVTR", "투습도", "12,000", "g/m²/24h", "JIS L 1099 B-1"],
      ["RET", "증발저항", "5.5", "m²·Pa/W", "ISO 11092"],
      ["CLO", "보온", "0.30", "", "ISO 15831"],
      ["", "제품 무게 (M)", "310", "g", "S 295 · L 330 · XL 350"],
    ],
    specs: [
      ["FABRIC", [
        ["원단", "Grid Fleece 185", "", "", "내면 그리드 기모"],
        ["혼용률", "폴리에스터 90% · 폴리우레탄 10%", "", "", ""],
        ["원단 중량", "185", "g/m²", "ASTM D3776", ""],
        ["생산", "원단 대한민국 · 봉제 대한민국", "", "", ""],
      ]],
      ["PERFORMANCE", [
        ["통기도", "65", "CFM", "ASTM D737 · 125 Pa", ""],
        ["투습도", "12,000", "g/m²/24h", "JIS L 1099 B-1", "A-1 기준 약 6,500"],
        ["증발저항", "5.5", "m²·Pa/W", "ISO 11092", ""],
        ["보온", "0.30", "CLO", "ISO 15831", "기여값 근사, ±0.03"],
        ["신장률 (가로/세로)", "60 / 45", "%", "ISO 20932-1", "회복률 93%"],
        ["건조 시간", "38", "분", "AATCC 201", ""],
        ["자외선 차단", "UPF 50+", "", "AS/NZS 4399", ""],
      ]],
      ["FIT", [
        ["핏", "슬림 핏", "", "", "러닝 베스트 아래 착용 기준"],
        ["실측 (M)", "총장 70 · 소매 67", "cm", "", "소매는 손등 덮개 4 cm 포함"],
        ["제품 무게", "S 295 · M 310 · L 330 · XL 350", "g", "", "건조 상태, 택 제외"],
        ["솔기", "플랫락", "", "", "베스트 어깨끈 접촉 부위 봉제선 이동"],
      ]],
      ["CARE", [
        ["세탁", "30°C, 뒤집어서 세탁", "", "", "표백제 금지, 자연 건조"],
      ]],
    ],
    construction: [
      [50, 9, "그리드 후드", "본체와 같은 그리드 플리스 내면."],
      [50, 30, "타이다잉 어깨 패널", "스타일 라인의 타이다잉 공정을 기능 원단에 적용."],
      [86, 89, "핑거홀 커프", "엄지 고정, 손등 보온. 왼쪽 손목에 워치 윈도우."],
      [67, 83, "리플렉티브 탭", "밑단 반사 탭. 반사 성능 등급은 표기하지 않음."],
    ],
    use: {
      yes: [["단독 착용", "−3~10°C 템포런"], ["Wind Shell 28 병용", "−8°C까지"]],
      no: [["15°C 이상", "고강도 러닝"]],
    },
  },
  {
    id: "r03", code: "R-03", cat: "SHELL", name: "Wind Shell 28",
    img: "assets/img/r03-shell.webp", price: "159,000",
    one: "7D 립스탑 · 발수(DWR) · 셀프 패킹",
    temp: [0, 15],
    tempNote: "겉옷 기준. Hood Sleeve 185 위에 착용 시 −8°C까지.",
    desc: "출발 대기, 새벽 강바람, 하산 구간용 초경량 쉘. 7D 나일론 립스탑, 후드 없음, 무게 82 g(M). 가슴 포켓에 10 × 8 × 5 cm로 수납됩니다. 발수(DWR) 제품이며 방수 제품이 아닙니다.",
    kpis: [
      ["GSM", "원단 중량", "28", "g/m²", "ISO 3801"],
      ["CFM", "통기도", "1.5", "", "ASTM D737 · 125 Pa"],
      ["MVTR", "투습도", "14,000", "g/m²/24h", "JIS L 1099 B-1"],
      ["RET", "증발저항", "6.0", "m²·Pa/W", "ISO 11092"],
      ["CLO", "보온", "0.10", "", "ISO 15831"],
      ["", "제품 무게 (M)", "82", "g", "S 78 · L 87 · XL 93"],
    ],
    specs: [
      ["FABRIC", [
        ["원단", "7D Nylon Ripstop", "", "", "멤브레인, 코팅 없음"],
        ["혼용률", "나일론 100%", "", "", ""],
        ["원사", "7", "D", "", "립 원사 15D"],
        ["원단 중량", "28", "g/m²", "ISO 3801", ""],
        ["발수 가공", "C0 DWR", "", "", "PFAS 미사용"],
        ["생산", "원단 일본 · 봉제 대한민국", "", "", ""],
      ]],
      ["PERFORMANCE", [
        ["통기도", "1.5", "CFM", "ASTM D737 · 125 Pa", "방풍"],
        ["투습도", "14,000", "g/m²/24h", "JIS L 1099 B-1", "A-1 기준 약 7,000"],
        ["증발저항", "6.0", "m²·Pa/W", "ISO 11092", ""],
        ["보온", "0.10", "CLO", "ISO 15831", "기여값 근사, ±0.03"],
        ["발수도", "초기 5급 · 세탁 5회 후 3~4급", "", "ISO 4920", "세탁 ISO 6330"],
        ["방수", "해당 없음", "", "", "내수압 표기 없음, 심실링 없음"],
        ["건조 시간", "12", "분", "AATCC 201", ""],
      ]],
      ["FIT", [
        ["핏", "레귤러 핏", "", "", "Hood Sleeve 185 위 착용 기준"],
        ["실측 (M)", "총장 68 · 소매 66", "cm", "", ""],
        ["제품 무게", "S 78 · M 82 · L 87 · XL 93", "g", "", "후드 없음"],
        ["패킹 크기", "10 × 8 × 5", "cm", "", "가슴 포켓 셀프 패킹"],
        ["솔기", "접착 테이프 (어깨)", "", "", "비방수"],
        ["소매", "엘라스틱 바인딩", "", "", ""],
      ]],
      ["CARE", [
        ["세탁", "30°C, 섬유유연제 금지", "", "", "발수 저하 시 저온 건조기 10분"],
      ]],
    ],
    construction: [
      [50, 28, "레이저 벤트 슬릿", "요크 라인의 레이저 컷 세로 슬릿. 방풍 원단의 배기 통로."],
      [50, 20, "하프 지퍼", "하프 집업으로 무게 절감. 형광 지퍼 풀."],
      [64, 36, "셀프 패킹 포켓", "가슴 포켓에 본체 수납. 패킹 크기 10 × 8 × 5 cm."],
      [12, 86, "엘라스틱 커프", "엘라스틱 바인딩. 시계 위 고정."],
    ],
    use: {
      yes: [["출발 대기", "출발 후 접어서 휴대"], ["강풍", "풍속 6 m/s 이상, 0~15°C"]],
      no: [["강우", "방수 제품 아님"]],
    },
  },
  {
    id: "r04", code: "R-04", cat: "CARRY", name: "Half Tights 210",
    img: "assets/img/r04-tights.webp", price: "109,000",
    one: "젤 8개 수납 · 12 mmHg · 인심 22 cm",
    temp: [5, 30],
    tempNote: "템포런 기준. 무릎 아래가 노출되는 하프 길이.",
    desc: "베스트 없이 풀코스를 달리는 러너용 하프타이츠. 허리 포켓에 젤 6개, 좌우 허벅지 포켓에 젤 1개씩 수납합니다. 한쪽 허벅지 포켓에는 6.7인치 스마트폰이 들어갑니다.",
    kpis: [
      ["GSM", "원단 중량", "210", "g/m²", "ASTM D3776"],
      ["CFM", "통기도", "30", "", "ASTM D737 · 125 Pa"],
      ["MVTR", "투습도", "14,000", "g/m²/24h", "JIS L 1099 B-1"],
      ["RET", "증발저항", "4.6", "m²·Pa/W", "ISO 11092"],
      ["CLO", "보온", "0.08", "", "ISO 15831"],
      ["", "제품 무게 (M)", "185", "g", "S 172 · L 198 · XL 212"],
    ],
    specs: [
      ["FABRIC", [
        ["원단", "Compress-Knit 210", "", "", "컴프레션 니트"],
        ["혼용률", "나일론 76% · 폴리우레탄 24%", "", "", ""],
        ["원단 중량", "210", "g/m²", "ASTM D3776", ""],
        ["생산", "원단 대한민국 · 봉제 대한민국", "", "", ""],
      ]],
      ["PERFORMANCE", [
        ["통기도", "30", "CFM", "ASTM D737 · 125 Pa", ""],
        ["투습도", "14,000", "g/m²/24h", "JIS L 1099 B-1", "A-1 기준 약 8,000"],
        ["증발저항", "4.6", "m²·Pa/W", "ISO 11092", ""],
        ["보온", "0.08", "CLO", "ISO 15831", "기여값 근사, ±0.03"],
        ["신장률 (가로/세로)", "85 / 60", "%", "ISO 20932-1", "회복률 95%"],
        ["압박", "대퇴 12 · 무릎 위 8", "mmHg", "", "센서 측정, M 사이즈. 의료용 등급 아님"],
        ["건조 시간", "28", "분", "AATCC 201", ""],
        ["자외선 차단", "UPF 50+", "", "AS/NZS 4399", ""],
      ]],
      ["STORAGE", [
        ["젤 수납", "최대 8개", "", "", "허리 6 · 허벅지 좌우 각 1"],
        ["스마트폰", "6.7인치 1대", "", "", "허벅지 포켓, 수납 시 젤 7개"],
        ["총 용량", "약 0.6", "L", "", ""],
        ["포켓 바운스", "±4", "mm", "", "자체 시험, n=5 · 젤 6개 · 4'00\"/km"],
      ]],
      ["FIT", [
        ["핏", "컴프레션 핏", "", "", ""],
        ["인심 (M)", "22", "cm", "", "하프 길이"],
        ["허리 밴드", "폭 9 cm 무봉제 와이드 밴드", "", "", "드로코드"],
        ["제품 무게", "S 172 · M 185 · L 198 · XL 212", "g", "", "건조 상태, 택 제외"],
        ["솔기", "플랫락", "", "", ""],
      ]],
      ["CARE", [
        ["세탁", "30°C, 뒤집어서 세탁", "", "", "섬유유연제 금지, 뉘어서 건조"],
      ]],
    ],
    construction: [
      [22, 21, "360° 젤 포켓", "허리 둘레 메쉬 포켓 밴드. 젤 6개 수납."],
      [44, 30, "형광 드로코드", "조임 끈 끝단 형광 처리."],
      [88, 55, "허벅지 포켓", "좌우 각 1개. 6.7인치 스마트폰 수납, 상단 이중 원단."],
      [25, 86, "실리콘 그리퍼", "도트 패턴 실리콘 밑단. 말림 방지."],
    ],
    use: {
      yes: [["풀코스", "베스트 없이 젤 8개 휴대"], ["롱런", "급수 지원 코스"]],
      no: [["트레일", "수납 용량 부족"]],
    },
  },
];

const COMPARE_ROWS = [
  ["원단 중량", "g/m²", ["95", "185", "28", "210"]],
  ["제품 무게 (M)", "g", ["68", "310", "82", "185"]],
  ["통기도", "CFM", ["190", "65", "1.5", "30"]],
  ["투습도", "g/m²/24h", ["24,000", "12,000", "14,000", "14,000"]],
  ["증발저항", "RET · m²·Pa/W", ["2.4", "5.5", "6.0", "4.6"]],
  ["보온", "CLO", ["0.06", "0.30", "0.10", "0.08"]],
  ["권장 기온", "°C", ["12~30", "−3~10", "0~15", "5~30"]],
  ["솔기", "", ["본딩", "플랫락", "접착 테이프", "플랫락"]],
  ["수납", "", ["배번 루프 4개", "없음", "셀프 패킹", "젤 8개"]],
];

const ITEMS = {
  singlet:    { name: "Singlet 95",            line: "NESCL R", clo: 0.06 },
  tee:        { name: "기능성 반팔",            line: "NESCL",   clo: 0.09 },
  base:       { name: "롱슬리브 베이스레이어",  line: "NESCL",   clo: 0.20 },
  hood:       { name: "Hood Sleeve 185",       line: "NESCL R", clo: 0.30 },
  shell:      { name: "Wind Shell 28",         line: "NESCL R", clo: 0.10 },
  tights:     { name: "Half Tights 210",       line: "NESCL R", clo: 0.08 },
  longtights: { name: "롱타이츠",              line: "NESCL",   clo: 0.20 },
  gloves:     { name: "장갑 · 넥워머",          line: "NESCL",   clo: null },
};

const BONUS = { easy: 0, tempo: 5, race: 9 };

function feelsLike(t, w, rain) {
  let f = t;
  if (t <= 10 && w >= 1.3) {
    const p = Math.pow(w * 3.6, 0.16);
    f = 13.12 + 0.6215 * t - 11.37 * p + 0.3965 * t * p;
  }
  if (rain) f -= 3;
  return Math.round(f);
}

function recommend(t, w, intensity, rain) {
  const feels = feelsLike(t, w, rain);
  const eff = feels + BONUS[intensity];

  let tops;
  if (eff >= 17) tops = ["singlet"];
  else if (eff >= 12) tops = ["tee"];
  else if (eff >= 7) tops = ["base"];
  else if (eff >= 2) tops = ["hood"];
  else if (eff >= -3) tops = ["hood", "shell"];
  else tops = ["base", "hood", "shell"];
  if ((w >= 6 || rain) && t <= 15 && eff < 15 && !tops.includes("shell")) tops.push("shell");

  const bottom = eff >= 10 ? "tights" : "longtights";

  const rows = [
    ...tops.map((k, i) => ({ layer: `상의 ${i + 1}`, item: ITEMS[k] })),
    { layer: "하의", item: ITEMS[bottom] },
    ...(feels < 3 ? [{ layer: "액세서리", item: ITEMS.gloves }] : []),
  ];
  const total = rows.reduce((sum, r) => sum + (r.item.clo ?? 0), 0);

  const tips = [];
  if (intensity === "race" && t <= 10 && !tops.includes("shell")) tips.push("출발 대기 중에는 Wind Shell 28을 착용하고, 출발 후 접어서 휴대합니다(패킹 10 × 8 × 5 cm).");
  if (rain && tops.includes("shell")) tips.push("Wind Shell 28은 발수(DWR) 제품이며 방수 제품이 아닙니다. 1시간 이상 강우 시 권장하지 않습니다.");
  if (t >= 24) tips.push("고온 구간. 밝은 색, 고통기 상의와 급수 계획을 권장합니다.");
  if (feels <= -15) tips.push("체감 기온 −15°C 이하. 실외 고강도 러닝은 권장하지 않습니다.");
  if (!tips.length) tips.push("출발 후 1 km 동안 약간 서늘한 상태가 적정 착용 기준입니다.");

  return { feels, eff, rows, total, tips };
}

const T_MIN = -15, T_MAX = 35;
const pct = (t) => ((t - T_MIN) / (T_MAX - T_MIN)) * 100;
const num = (n) => String(n).replace("-", "−");
const rangeText = ([lo, hi]) => `${num(lo)}~${num(hi)}`;
const nameHTML = (name) => { const i = name.lastIndexOf(" "); return `${name.slice(0, i)} <b>${name.slice(i + 1)}</b>`; };
const ruler = ([lo, hi]) => `
  <div class="ruler"><i style="left:${pct(lo)}%;width:${pct(hi) - pct(lo)}%"></i></div>
  <div class="ruler-ticks" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
  <div class="ruler-scale" aria-hidden="true"><span>−10</span><span>0</span><span>10</span><span>20</span><span>30</span></div>`;

const card = (p) => `
  <a class="card" href="#${p.id}">
    <div class="shot"><img src="${p.img}" alt="${p.name}" width="1122" height="1402" loading="lazy"></div>
    <p class="card-meta"><span>${p.code}</span><span>${p.cat}</span></p>
    <h3 class="card-name">${nameHTML(p.name)}</h3>
    <p class="card-one">${p.one}</p>
    <dl class="rows">
      <div><dt>원단 중량</dt><dd>${p.kpis[0][2]}<span class="u">g/m²</span></dd></div>
      <div><dt>제품 무게 (M)</dt><dd>${p.kpis[5][2]}<span class="u">g</span></dd></div>
      <div><dt>통기도</dt><dd>${p.kpis[1][2]}<span class="u">CFM</span></dd></div>
      <div><dt>권장 기온</dt><dd>${rangeText(p.temp)}<span class="u">°C</span></dd></div>
    </dl>
    ${ruler(p.temp)}
  </a>`;

const glossaryRow = (g) => `
  <tr>
    <th scope="row"><b>${g.k}</b><span>${[g.name, g.unit].filter(Boolean).join(" · ")}</span></th>
    <td class="def"><p>${g.body}</p><span class="micro mute">${g.std}</span></td>
    <td class="dir">${g.dir}</td>
    <td class="gl-ref"><ul>${g.ref.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join("")}</ul></td>
  </tr>`;

const unit = (u) => (u ? `<span class="u">${u}</span>` : "");
const specRow = ([k, v, u, m, n]) => `
  <tr><th scope="row">${k}</th>${m || n
    ? `<td class="v">${v}${unit(u)}</td><td class="m">${m ? `<span>${m}</span>` : ""}${n ? `<em>${n}</em>` : ""}</td>`
    : `<td class="v" colspan="2">${v}${unit(u)}</td>`}</tr>`;

const pdpBody = (p) => `
  <div class="pdp-media"><div class="pdp-figure shot">
    <img src="${p.img}" alt="${p.name}" width="1122" height="1402">
    ${p.construction.map(([x, y, t], i) => `<button class="callout" type="button" style="left:${x}%;top:${y}%" data-i="${i}" aria-label="상세 ${i + 1}: ${t}">${i + 1}</button>`).join("")}
  </div></div>
  <div class="pdp-info">
    <p class="micro mute">${p.code} · ${p.cat}</p>
    <h2 class="pdp-name" id="pdpName">${nameHTML(p.name)}</h2>
    <p class="pdp-one">${p.one}</p>
    <p class="pdp-price">₩${p.price}<small>예시 가격</small></p>
    <p>${p.desc}</p>

    <h3 class="pdp-h">KEY NUMBERS</h3>
    <dl class="plate is-3"><div class="plate-grid">${p.kpis.map(([code, label, v, u, m]) => `
      <div><dt>${code ? `<span class="micro">${code}</span>` : ""}${label}</dt><dd class="val">${v}${unit(u)}</dd><dd class="method">${m}</dd></div>`).join("")}
    </div></dl>

    <h3 class="pdp-h">TEMPERATURE RANGE</h3>
    <dl class="rows"><div><dt>권장 기온</dt><dd>${rangeText(p.temp)}<span class="u">°C</span></dd></div></dl>
    ${ruler(p.temp)}
    <p class="fine">${p.tempNote}</p>

    <h3 class="pdp-h">SPECIFICATION</h3>
    <table class="tbl spec"><tbody>${p.specs.map(([group, rows]) => `
      <tr class="grp"><th colspan="3" scope="colgroup">${group}</th></tr>${rows.map(specRow).join("")}`).join("")}
    </tbody></table>

    <h3 class="pdp-h">CONSTRUCTION</h3>
    <ol class="cons">${p.construction.map(([, , t, b], i) => `
      <li data-i="${i}"><span class="callout">${i + 1}</span><div><h4>${t}</h4><p>${b}</p></div></li>`).join("")}
    </ol>

    <h3 class="pdp-h">WHEN TO WEAR</h3>
    <table class="tbl spec"><tbody>
      ${p.use.yes.map(([t, d]) => `<tr><th scope="row">권장</th><td class="v">${t}</td><td class="m"><em>${d}</em></td></tr>`).join("")}
      ${p.use.no.map(([t, d]) => `<tr><th scope="row">권장하지 않음</th><td class="v">${t}</td><td class="m"><em>${d}</em></td></tr>`).join("")}
    </tbody></table>

    <p class="fine">수치는 예시이며 실제 시험성적서가 아닙니다.</p>
  </div>`;

const compareTable = () => `
  <colgroup><col class="lab"><col><col><col><col></colgroup>
  <thead><tr><th></th>${PRODUCTS.map((p) => { const i = p.name.lastIndexOf(" "); return `
    <th scope="col"><span class="code">${p.code}</span><span class="num">${p.name.slice(i + 1)}</span><span class="noun">${p.name.slice(0, i).toUpperCase()}</span></th>`; }).join("")}</tr></thead>
  <tbody>${COMPARE_ROWS.map(([label, u, vals]) => `
    <tr><th scope="row">${label}${u ? `<span>${u}</span>` : ""}</th>${vals.map((v) => `<td${u ? "" : ' class="txt"'}>${v}</td>`).join("")}</tr>`).join("")}
  </tbody>`;

const layerResult = (r) => `
  <p class="tool-h">추천 조합</p>
  <dl class="plate is-3 is-fixed"><div class="plate-grid">
    <div><dt>체감 기온</dt><dd class="val">${num(r.feels)}<span class="u">°C</span></dd></div>
    <div><dt>운동 시 체감</dt><dd class="val">${num(r.eff)}<span class="u">°C</span></dd></div>
    <div><dt>합산 CLO</dt><dd class="val">약 ${r.total.toFixed(2)}</dd></div>
  </div></dl>
  <table class="tbl">
    <thead><tr><th>레이어</th><th>제품</th><th>라인</th><th class="r">CLO</th></tr></thead>
    <tbody>${r.rows.map(({ layer, item }) => `
      <tr><th scope="row">${layer}</th><td>${item.name}</td><td class="soft">${item.line}</td>${item.clo === null
        ? `<td class="soft r">제외</td>`
        : `<td class="fig r">${item.clo.toFixed(2)}</td>`}</tr>`).join("")}
    </tbody>
    <tfoot><tr><th colspan="3" scope="row">합계</th><td class="fig r">약 ${r.total.toFixed(2)}</td></tr></tfoot>
  </table>
  <p class="tip">${r.tips.join("<br>")}</p>`;

document.getElementById("glossaryRows").innerHTML = GLOSSARY.map(glossaryRow).join("");
document.getElementById("cards").innerHTML = PRODUCTS.map(card).join("");
document.getElementById("compareTable").innerHTML = compareTable();

const navLinks = [...document.querySelectorAll(".nav a")];
const spy = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    for (const a of navLinks) a.setAttribute("aria-current", String(a.hash === `#${entry.target.id}`));
  }
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("#hero, .sec").forEach((el) => spy.observe(el));

const toc = document.getElementById("toc");
document.getElementById("tocOpen").addEventListener("click", () => toc.showModal());
toc.addEventListener("click", (e) => { if (e.target.closest("[data-close], a")) toc.close(); });

function bindCallouts(root) {
  const on = { hover: null, focus: null, pin: null };
  const set = (key, value) => {
    on[key] = value;
    root.querySelectorAll(".callout").forEach((c) => c.toggleAttribute("data-on", Object.values(on).includes(c.closest("[data-i]").dataset.i)));
  };
  root.querySelectorAll("[data-i]").forEach((el) => {
    const i = el.dataset.i;
    el.addEventListener("pointerenter", () => set("hover", i));
    el.addEventListener("pointerleave", () => set("hover", null));
    if (!el.matches(".callout")) return;
    el.addEventListener("focus", () => set("focus", el.matches(":focus-visible") ? i : null));
    el.addEventListener("blur", () => set("focus", null));
    el.addEventListener("click", () => set("pin", on.pin === i ? null : i));
  });
}

const pdp = document.getElementById("pdp");
const ids = PRODUCTS.map((p) => p.id);
function route() {
  const i = ids.indexOf(location.hash.slice(1));
  if (i >= 0) {
    document.getElementById("pdpBody").innerHTML = pdpBody(PRODUCTS[i]);
    document.getElementById("pdpPos").textContent = `${String(i + 1).padStart(2, "0")} / ${String(ids.length).padStart(2, "0")}`;
    bindCallouts(pdp);
    if (!pdp.open) pdp.showModal();
    pdp.scrollTop = 0;
  } else if (pdp.open) {
    pdp.close();
  }
}
window.addEventListener("hashchange", route);
pdp.addEventListener("close", () => { if (ids.includes(location.hash.slice(1))) location.hash = "lineup"; });
pdp.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) pdp.close();
  const step = e.target.closest("[data-step]");
  if (step) location.hash = ids[(ids.indexOf(location.hash.slice(1)) + Number(step.dataset.step) + ids.length) % ids.length];
});
route();

const layerForm = document.getElementById("layerForm");
function renderLayers() {
  const { temp, wind, intensity, rain, tempOut, windOut } = layerForm.elements;
  const t = Number(temp.value);
  const w = Number(wind.value);
  tempOut.innerHTML = `${num(t)}${unit("°C")}`;
  windOut.innerHTML = `${w}${unit("m/s")}`;
  document.getElementById("layerResult").innerHTML = layerResult(recommend(t, w, intensity.value, rain.checked));
}
layerForm.addEventListener("input", renderLayers);
renderLayers();
