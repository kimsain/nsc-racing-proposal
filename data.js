/* 사이트의 모든 숫자와 문구는 이 파일에만 둡니다. NESCL R 제품, 수치, 가격, 사진은 예시입니다. */

const SITE = {
  notice: "비공식 콘셉트 목업입니다. 제품, 수치, 가격은 예시이며 판매하지 않습니다.",
  intro: "원단 수치를 공개하는 네스클의 레이싱 라인입니다. 제품 이름의 숫자는 원단 1 m²의 무게(g)입니다.",
  cartNote: "콘셉트 목업이라 주문할 수 없습니다. 담은 제품은 저장되지 않습니다.",
  refs: ["WISE", "SOAR Running", "Vollebak", "Outlier", "Arc'teryx", "Rapha", "Tracksmith", "Bandit Running"],
};

/* 스펙 사전. 상세페이지의 숫자를 누르면 열리는 설명 드로어가 이 내용을 씁니다.
   scale과 bands가 있으면 기준 대역 띠를, index가 있으면 0~5 단계 범례를 그립니다. */
const METRICS = {
  gsm: {
    abbr: "GSM", name: "원단 중량", unit: "g/m²", std: "ASTM D3776 (니트) · ISO 3801 (직물)",
    def: "원단 1 m²의 무게입니다. NESCL R 제품 이름 끝의 숫자가 이 값입니다.",
    why: "짜임이 같다면 원단 중량이 낮을수록 옷이 가볍습니다. 러닝 상의로 보면 레이스용은 대체로 120 g/m² 아래, 보온용은 180 g/m² 위에 있습니다.",
    how: "정해진 크기로 자른 시험편을 저울로 잰 뒤 1 m²로 환산합니다. 원단 단위 값입니다.",
    limit: "원단 중량이 같아도 짜임에 따라 통기도와 보온이 달라집니다. 원단 중량만으로 시원함을 판단하지 않습니다.",
    scale: [0, 320], bands: [[0, 120, "경량"], [120, 180, "중량"], [180, 320, "고중량"]],
  },
  weight: {
    abbr: "", name: "제품 무게", unit: "g", std: "건조 상태 · 택 제외",
    def: "완제품 한 벌의 무게입니다. 마른 상태에서 택을 떼고 잽니다.",
    why: "레이스 내내 몸에 지고 가는 무게입니다. 땀을 머금으면 더 무거워집니다.",
    how: "사이즈마다 따로 잽니다. 기본 표시는 M이고, 사이즈를 고르면 그 값으로 바뀝니다.",
    limit: "같은 사이즈라도 생산 편차로 몇 g씩 차이가 납니다.",
  },
  cfm: {
    abbr: "CFM", name: "통기도", unit: "CFM", std: "ASTM D737 · 125 Pa", index: "air",
    def: "원단 양쪽의 압력 차가 125 Pa일 때 원단 1 ft²를 1분 동안 지나가는 공기량(ft³)입니다.",
    why: "달릴 때 생기는 맞바람이 원단을 지나가야 몸의 열이 빠집니다. 싱글렛은 높을수록, 바람막이는 낮을수록 좋습니다.",
    how: "시험편을 장비에 고정하고 압력 차를 125 Pa로 맞춘 뒤 지나가는 공기량을 잽니다. 원단 단위 값입니다.",
    limit: "봉제선, 겹친 부위, 몸에 붙는 정도에 따라 실제로 느끼는 통기는 달라집니다.",
    photo: "assets/img/lab-permeability.webp",
    scale: [0, 250],
  },
  mvtr: {
    abbr: "MVTR", name: "투습도", unit: "g/m²/24h", std: "JIS L 1099 B-1",
    def: "24시간 동안 원단 1 m²를 지나가는 수증기의 양(g)입니다.",
    why: "땀이 수증기일 때 옷 밖으로 빠져야 안쪽이 젖지 않습니다. 바람막이처럼 통기도가 낮은 옷일수록 이 값으로 땀 배출을 봅니다.",
    how: "흡습제를 담은 컵을 원단으로 덮어 물 위에 뒤집어 놓고, 늘어난 무게로 계산합니다.",
    limit: "시험 방법(JIS B-1, A-1, ASTM E96)에 따라 같은 원단도 값이 크게 달라서, 같은 방법으로 잰 값끼리만 비교합니다.",
    scale: [0, 30000], bands: [[0, 8000, "낮음"], [8000, 15000, "보통"], [15000, 30000, "높음"]],
  },
  ret: {
    abbr: "RET", name: "증발저항", unit: "m²·Pa/W", std: "ISO 11092", index: "sweat",
    def: "땀 증기가 원단을 지날 때 받는 저항입니다. 숫자가 낮을수록 잘 빠집니다.",
    why: "투습도가 땀이 얼마나 많이 빠지는지라면, 증발저항은 얼마나 쉽게 빠지는지입니다. 피부 온도에 맞춘 열판에서 재서 달릴 때의 느낌에 가깝습니다.",
    how: "35°C로 데운 젖은 열판 위에 원단을 놓고, 증발을 유지하는 데 드는 열량으로 계산합니다.",
    limit: "원단 단위 시험값이며 완제품 값은 아닙니다. 업계에서는 흔히 6 미만을 매우 좋음, 6~13을 좋음으로 보고, 지수도 이 경계를 따릅니다.",
    scale: [0, 25],
  },
  clo: {
    abbr: "CLO", name: "보온력", unit: "clo", std: "ISO 15831 · ISO 9920", index: "warmth",
    def: "옷의 보온력 단위입니다. 1 clo는 21°C 실내에 가만히 앉은 사람이 편안한 정도의 보온입니다.",
    why: "레이어를 겹칠 때 고르는 기준이 됩니다. 같은 기온이라도 강도와 바람에 따라 필요한 보온이 달라집니다.",
    how: "서멀 마네킹 표면 온도를 유지하는 데 드는 열량으로 계산합니다. 착장 전체를 재므로 제품별 값은 기여분을 추정한 근사치(±0.03)입니다.",
    limit: "달리는 중에는 맞바람과 땀 때문에 표시값보다 덜 따뜻합니다.",
    scale: [0, 0.6],
  },
  dry: {
    abbr: "", name: "건조 시간", unit: "분", std: "AATCC 201",
    def: "젖은 원단이 정해진 조건에서 다 마르는 데 걸리는 시간입니다.",
    why: "젖은 옷은 무거워지고, 달리기를 멈춘 뒤에는 체온을 빼앗습니다.",
    how: "원단에 물을 떨어뜨리고 열판 위에서 다 마를 때까지 시간을 잽니다.",
    limit: "실내 열판에서 잰 값이라 바람, 햇빛, 습도에 따라 실제 시간은 달라집니다.",
  },
  stretch: {
    abbr: "", name: "신장률 · 회복률", unit: "%", std: "ASTM D2594 (R-01, R-02) · ASTM D4964 (R-04)",
    def: "신장률은 원단이 정해진 힘을 받았을 때 늘어나는 비율이고, 회복률은 힘을 뺀 뒤 원래 길이로 돌아오는 비율입니다.",
    why: "옷이 팔 스윙과 보폭을 따라 늘어나야 몸을 잡아당기지 않습니다. 회복률이 낮으면 세탁을 거듭할수록 늘어진 채로 남습니다.",
    how: "가로와 세로 시험편을 정해진 힘으로 당긴 뒤 늘어난 길이와 남은 길이를 잽니다. 회복률은 100에서 남은 늘어남(%)을 뺀 값입니다. 스판덱스가 많은 컴프레션 원단은 탄성 원단용 시험법으로 잽니다.",
    limit: "그림의 남은 늘어남은 잘 보이도록 4배로 키워 그렸습니다.",
  },
  temp: {
    abbr: "", name: "권장 기온", unit: "°C", std: "템포런 강도 기준",
    def: "템포런 강도로 달릴 때 이 옷이 맞는 기온 범위입니다.",
    why: "같은 옷도 강도와 바람에 따라 덥거나 춥게 느껴집니다. 그래서 강도 기준을 하나로 정하고 네 제품을 같은 눈금에 놓습니다.",
    how: "시험 규격이 있는 값이 아니라, 보온과 통기도를 바탕으로 정한 권장 범위입니다.",
    limit: "상의와 하의는 한 벌만 입었을 때, 바람막이는 상의 위에 덧입었을 때의 범위입니다. 이지런이나 출발 대기 중에는 더 춥게 느껴집니다.",
  },
  compression: {
    abbr: "", name: "압박", unit: "mmHg", std: "다리 모형 · 압력 센서 · M 사이즈",
    def: "옷이 피부를 누르는 압력입니다. 단위는 수은주 밀리미터(mmHg)입니다.",
    why: "압박이 약하면 포켓에 넣은 젤이 흔들리고, 너무 강하면 오래 입기 불편합니다.",
    how: "M 사이즈를 다리 모형에 입히고 대퇴와 무릎 위에 압력 센서를 넣어 잽니다.",
    limit: "의료용 압박 등급이 아니며, 다리 둘레에 따라 값이 달라집니다.",
  },
  repel: {
    abbr: "", name: "발수도", unit: "급", std: "ISO 4920 · 세탁 ISO 6330",
    def: "원단 표면이 물을 튕겨 내는 정도를 1~5급으로 나눈 값입니다.",
    why: "가랑비와 땀이 겉감에 스며들면 원단이 무거워지고 바람막이 안쪽이 축축해집니다.",
    how: "45도로 기울인 시험편에 물 250 mL를 뿌린 뒤, 젖은 모양을 표준 사진과 비교합니다.",
    limit: "발수는 방수가 아닙니다. 심실링이 없어 비가 오래 오면 젖고, 발수 성능은 세탁할수록 떨어집니다.",
  },
};

/* 0~5 지수. cuts는 단계가 바뀌는 경계값이고, 아래 경계를 포함합니다. low가 true면 값이 낮을수록 단계가 높습니다. */
const INDEX = {
  air: { name: "통기", metric: "cfm", cuts: [5, 20, 50, 100, 180], dir: "높을수록 바람이 잘 통합니다.",
    levels: ["바람을 막음", "바람을 대부분 막음", "조금 통함", "잘 통함", "아주 잘 통함", "최대로 통함"] },
  sweat: { name: "땀 배출", metric: "ret", low: true, cuts: [20, 13, 6, 4, 2],
    dir: "높을수록 땀 증기가 쉽게 빠집니다. RET가 낮을수록 높은 단계입니다.",
    levels: ["고강도에 맞지 않음", "보통", "좋음", "매우 좋음", "뛰어남", "최상"] },
  warmth: { name: "보온", metric: "clo", cuts: [0.05, 0.1, 0.2, 0.3, 0.45], dir: "높을수록 따뜻합니다.",
    levels: ["거의 없음", "아주 얇음", "얇음", "중간", "두꺼움", "아주 두꺼움"] },
};

/* 상세페이지 기술 패널의 묶음. 지수가 있는 묶음은 위에 0~5 눈금을 보여 줍니다.
   제품의 specKeys와 parts[].group으로 묶음 안의 탭이 정해집니다. 권장 기온은 기온 구역에서 따로 다룹니다. */
const TECH_GROUPS = [
  { id: "air", name: "통기", index: "air", metrics: ["cfm"] },
  { id: "sweat", name: "땀 배출", index: "sweat", metrics: ["ret", "mvtr", "dry"] },
  { id: "warmth", name: "보온", index: "warmth", metrics: ["clo", "gsm"] },
  { id: "fit", name: "핏과 보호", metrics: ["weight", "stretch", "compression", "repel"] },
];

const CATEGORIES = [
  { id: "all", name: "전체" },
  { id: "top", name: "상의" },
  { id: "outer", name: "바람막이" },
  { id: "bottom", name: "하의" },
];
const SORTS = [
  { id: "default", name: "추천순" },
  { id: "gsm-asc", name: "원단 중량 낮은 순" },
  { id: "gsm-desc", name: "원단 중량 높은 순" },
  { id: "weight-asc", name: "제품 무게 가벼운 순" },
  { id: "price-asc", name: "가격 낮은 순" },
];
const SIZES = ["S", "M", "L", "XL"];

const PRODUCTS = [
  {
    id: "r01", code: "R-01", kind: "top", cat: "레이스 상의", name: "Singlet 95", price: 89000, color: "블랙",
    hook: "95 g/m² 메쉬 저지에 등판만 레이저 타공한 레이스 싱글렛입니다.",
    temp: [10, 30],
    nums: { gsm: 95, cfm: 190, mvtr: 24000, ret: 2.4, clo: 0.06, dry: 21, weight: 72, stretch: [55, 35], recovery: 95, recoveryWash50: 92 },
    sizes: { S: 68, M: 72, L: 77, XL: 82 },
    keyTags: ["gsm", "weight", "cfm", "temp"],
    card: ["gsm", "cfm", "ret", "weight"],
    specKeys: ["gsm", "weight", "cfm", "mvtr", "ret", "clo", "dry", "stretch", "temp"],
    compareWith: "r02",
    gallery: [
      ["r01-singlet", "R-01 Singlet 95 뒷면"], ["r01-front", "R-01 Singlet 95 앞면"], ["r01-perf", "등판 레이저 타공 확대"],
      ["r01-hem", "밑단 본딩과 배번 루프"], ["r01-swatch", "Aero-Knit 95 원단 시험편"],
    ],
    fabric: { part: "몸판", name: "Aero-Knit 95", structure: "싱글 저지 메쉬", mix: "재생 폴리에스터 92% · 폴리우레탄 8%", origin: "원단 대한민국 · 봉제 대한민국" },
    extraRows: [
      { group: "성능", m: "cfm", label: "통기도 (타공 구역)", value: "240 CFM", note: "등판 위쪽 타공 구역만 잰 값" },
      { group: "성능", label: "자외선 차단", value: "UPF 15", note: "AS/NZS 4399, 블랙 기준" },
      { group: "핏", label: "솔기", value: "본딩", note: "0.3 mm 테이프, 봉제선 없음" },
      { group: "핏", label: "배번 고정", value: "밑단 안쪽 루프 4개", note: "옷핀이 필요 없습니다" },
    ],
    fit: { name: "레이스 핏", def: "가슴은 정사이즈, 몸통 길이는 2 cm 길게 잡았습니다." },
    measure: [["가슴 단면", [44, 46, 48, 50]], ["총장", [64, 66, 68, 70]]],
    care: [["wash30", "30°C 약세탁"], ["nobleach", "표백제 금지"], ["nodry", "건조기 금지, 자연 건조"], ["noiron", "다림질 금지"]],
    careNote: "섬유유연제는 땀 배출 성능을 떨어뜨립니다.",
    parts: [
      { x: 50, y: 28, img: "r01-perf", group: "air", title: "레이저 타공 구역", body: "등판 위쪽에 지름 1.2 mm 구멍 약 3,200개를 뚫었습니다. 타공 구역의 통기도는 240 CFM입니다." },
      { x: 62, y: 21, group: "fit", title: "레이서백과 본딩 암홀", body: "팔 스윙 범위를 넓힌 레이서백 컷입니다. 암홀은 0.3 mm 본딩 테이프로 마감했습니다." },
      { x: 25, y: 62, group: "fit", title: "사이드 시그널 테이프", body: "왼쪽 옆선을 봉제 대신 주황색 본딩 테이프로 이었습니다." },
      { x: 60, y: 89, img: "r01-hem", group: "fit", title: "본딩 밑단과 배번 루프", body: "안쪽에 3 mm 실리콘 도트를 넣어 말려 올라가지 않습니다. 안쪽 루프 4개에 배번을 겁니다." },
    ],
  },
  {
    id: "r02", code: "R-02", kind: "top", cat: "보온 상의", name: "Hood Sleeve 185", price: 119000, color: "블랙",
    hook: "185 g/m² 그리드 플리스로 만든 겨울 템포런용 후드 긴팔입니다.",
    temp: [-3, 10],
    nums: { gsm: 185, cfm: 65, mvtr: 12000, ret: 5.5, clo: 0.3, dry: 38, weight: 310, stretch: [60, 45], recovery: 93 },
    sizes: { S: 295, M: 310, L: 330, XL: 350 },
    keyTags: ["gsm", "weight", "clo", "temp"],
    card: ["gsm", "clo", "ret", "weight"],
    specKeys: ["gsm", "weight", "cfm", "mvtr", "ret", "clo", "dry", "stretch", "temp"],
    compareWith: "r01",
    gallery: [
      ["r02-hoodsleeve", "R-02 Hood Sleeve 185 앞면"], ["r02-back", "R-02 Hood Sleeve 185 뒷면"], ["r02-cuff", "핑거홀 커프 확대"],
      ["transfer-tiedye-panel", "타이다잉 어깨 패널 확대"], ["r02-swatch", "Grid Fleece 185 원단 시험편"],
    ],
    fabric: { part: "몸판", name: "Grid Fleece 185", structure: "안쪽 그리드 기모 니트", mix: "폴리에스터 90% · 폴리우레탄 10%", origin: "원단 대한민국 · 봉제 대한민국" },
    extraRows: [
      { group: "원단", label: "어깨 패널", value: "타이다잉 염색 니트", note: "스타일 라인의 타이다잉 공정" },
      { group: "성능", label: "자외선 차단", value: "UPF 50+", note: "AS/NZS 4399" },
      { group: "핏", label: "솔기", value: "플랫락", note: "베스트 어깨끈 자리를 피해 배치" },
    ],
    fit: { name: "슬림 핏", def: "러닝 베스트 안에 입는 기준으로 몸에 붙게 잡았습니다." },
    measure: [["가슴 단면", [47, 49, 51, 53]], ["총장", [68, 70, 72, 74]], ["소매", [65, 67, 69, 71]]],
    care: [["wash30", "30°C, 뒤집어서 세탁"], ["nobleach", "표백제 금지"], ["nodry", "건조기 금지, 자연 건조"], ["noiron", "다림질 금지"]],
    careNote: "안쪽 기모가 뭉치지 않게 뒤집어서 세탁합니다.",
    parts: [
      { x: 45, y: 12, group: "warmth", title: "그리드 후드", body: "본체와 같은 그리드 플리스를 안쪽에 썼습니다. 모자 아래에 겹쳐 써도 두껍지 않습니다." },
      { x: 27, y: 33, img: "transfer-tiedye-panel", group: "fit", title: "타이다잉 어깨 패널", body: "스타일 라인의 타이다잉 공정을 기능 원단에 적용했습니다." },
      { x: 15, y: 86, img: "r02-cuff", group: "warmth", title: "핑거홀 커프", body: "엄지를 걸어 소매를 고정하고 손등을 4 cm 덮습니다." },
      { x: 63, y: 81, group: "fit", title: "리플렉티브 탭", body: "밑단에 반사 탭을 달았습니다. 반사 성능 등급은 표기하지 않습니다." },
    ],
  },
  {
    id: "r03", code: "R-03", kind: "outer", cat: "바람막이", name: "Wind Shell 28", price: 159000, color: "블랙",
    hook: "28 g/m² 7D 립스탑으로 만든 초경량 바람막이입니다.",
    temp: [0, 15], layerMin: -8,
    nums: { gsm: 28, cfm: 1.5, mvtr: 14000, ret: 6, clo: 0.1, dry: 12, weight: 82, repel: [5, "3~4"] },
    sizes: { S: 78, M: 82, L: 87, XL: 93 },
    keyTags: ["gsm", "weight", "cfm", "temp"],
    card: ["gsm", "cfm", "repel", "weight"],
    specKeys: ["gsm", "weight", "cfm", "mvtr", "ret", "clo", "dry", "repel", "temp"],
    compareWith: "r02",
    gallery: [
      ["r03-shell", "R-03 Wind Shell 28 앞면"], ["r03-back", "R-03 Wind Shell 28 뒷면"], ["r03-packed", "가슴 포켓에 접어 넣은 모습"],
      ["r03-swatch", "7D 립스탑 원단 시험편 위 물방울"],
    ],
    fabric: { part: "몸판", name: "7D Nylon Ripstop", structure: "립스탑 직물, 멤브레인과 코팅 없음", mix: "나일론 100%", origin: "원단 일본 · 봉제 대한민국" },
    extraRows: [
      { group: "원단", label: "발수 가공", value: "C0 DWR", note: "PFAS 미사용" },
      { group: "성능", label: "방수", value: "해당 없음", note: "내수압 표기 없음, 심실링 없음" },
      { group: "핏", label: "패킹 크기", value: "10 × 8 × 5 cm", note: "가슴 포켓 셀프 패킹" },
      { group: "핏", label: "소매", value: "엘라스틱 바인딩", note: "시계 위에서 고정" },
    ],
    fit: { name: "레귤러 핏", def: "Hood Sleeve 185 위에 겹쳐 입을 여유를 두었습니다." },
    measure: [["가슴 단면", [52, 54, 56, 58]], ["총장", [66, 68, 70, 72]], ["소매", [64, 66, 68, 70]]],
    care: [["wash30", "30°C 약세탁"], ["nobleach", "표백제 금지"], ["lowdry", "발수가 떨어지면 저온 건조기 10분"], ["noiron", "다림질 금지"]],
    careNote: "발수 제품이며 방수 제품은 아닙니다.",
    parts: [
      { x: 50, y: 27, group: "air", title: "레이저 벤트 슬릿", body: "요크 라인을 따라 세로 슬릿을 레이저로 냈습니다. 방풍 원단 안의 더운 공기가 빠지는 길입니다." },
      { x: 49, y: 19, group: "fit", title: "하프 지퍼", body: "풀 지퍼 대신 하프 지퍼로 무게를 줄였습니다. 지퍼 풀은 주황입니다." },
      { x: 62, y: 32, img: "r03-packed", group: "fit", title: "셀프 패킹 포켓", body: "가슴 포켓에 본체를 접어 넣으면 10 × 8 × 5 cm가 됩니다." },
      { x: 85, y: 87, group: "fit", title: "엘라스틱 커프", body: "소매 끝을 엘라스틱으로 감싸 시계 위에서 고정합니다." },
    ],
  },
  {
    id: "r04", code: "R-04", kind: "bottom", cat: "하의", name: "Half Tights 210", price: 109000, color: "블랙",
    hook: "210 g/m² 컴프레션 니트에 젤 8개를 넣는 풀코스용 하프타이츠입니다.",
    temp: [5, 30],
    nums: { gsm: 210, cfm: 30, mvtr: 14000, ret: 4.6, clo: 0.08, dry: 28, weight: 185, stretch: [85, 60], recovery: 95, compression: [12, 8] },
    sizes: { S: 172, M: 185, L: 198, XL: 212 },
    keyTags: ["gsm", "weight", "compression", "temp"],
    card: ["gsm", "compression", "ret", "weight"],
    specKeys: ["gsm", "weight", "cfm", "mvtr", "ret", "clo", "dry", "stretch", "compression", "temp"],
    compareWith: "r01",
    gallery: [
      ["r04-tights", "R-04 Half Tights 210 옆면"], ["r04-side", "R-04 Half Tights 210 반대쪽 옆면"], ["r04-pocket", "허리 포켓 벨트에 넣은 젤 6개"],
      ["r04-swatch", "Compress-Knit 210 원단 시험편"],
    ],
    fabric: { part: "몸판", name: "Compress-Knit 210", structure: "컴프레션 니트", mix: "나일론 76% · 폴리우레탄 24%", origin: "원단 대한민국 · 봉제 대한민국" },
    extraRows: [
      { group: "성능", label: "자외선 차단", value: "UPF 50+", note: "AS/NZS 4399" },
      { group: "수납", label: "젤 수납", value: "최대 8개", note: "허리 6 · 허벅지 좌우 1씩" },
      { group: "수납", label: "스마트폰", value: "6.7인치 1대", note: "허벅지 포켓, 넣으면 젤은 7개" },
      { group: "수납", label: "포켓 흔들림", value: "±4 mm", note: "자체 시험, 젤 6개, 4'00\"/km" },
      { group: "핏", label: "허리 밴드", value: "폭 9 cm 무봉제 밴드", note: "드로코드" },
    ],
    fit: { name: "컴프레션 핏", def: "허벅지를 고르게 눌러 포켓이 흔들리지 않게 잡았습니다." },
    measure: [["허리 (늘이지 않은 상태)", [62, 68, 74, 80]], ["인심", [21, 22, 23, 24]], ["허벅지 단면", [22, 23.5, 25, 26.5]]],
    care: [["wash30", "30°C, 뒤집어서 세탁"], ["nobleach", "표백제 금지"], ["nodry", "건조기 금지, 뉘어서 건조"], ["noiron", "다림질 금지"]],
    careNote: "섬유유연제는 압박과 회복률을 떨어뜨립니다.",
    parts: [
      { x: 60, y: 26, img: "r04-pocket", group: "fit", title: "360° 젤 포켓", body: "허리를 한 바퀴 두른 메쉬 포켓 벨트에 젤 6개가 들어갑니다." },
      { x: 33, y: 35, group: "fit", title: "형광 드로코드", body: "조임 끈 끝을 형광 주황으로 처리했습니다." },
      { x: 73, y: 55, group: "fit", title: "허벅지 포켓", body: "좌우 하나씩 있고, 한쪽에는 6.7인치 스마트폰이 들어갑니다." },
      { x: 50, y: 83, group: "fit", title: "실리콘 그리퍼", body: "밑단 안쪽 실리콘 도트가 말려 올라가는 것을 막습니다." },
    ],
  },
];

/* 함께 입기와 기온 필터. R 라인이 비는 자리는 스타일 라인 제품으로 채웁니다. */
const NESCL_ITEMS = {
  base: { name: "롱슬리브 베이스레이어", line: "NESCL" },
  longtights: { name: "롱타이츠", line: "NESCL" },
  gloves: { name: "장갑과 넥워머", line: "NESCL" },
};
const TEMP_AXIS = [-15, 30];
const TEMP_PRESETS = [
  { label: "여름 템포런", t: 25 },
  { label: "11월 새벽 템포런", t: 8 },
  { label: "1월 강변 템포런", t: -2 },
];
