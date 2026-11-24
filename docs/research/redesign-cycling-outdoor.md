# 사이클·아웃도어 레이싱 쇼핑몰 여섯 곳은 흰 바탕, 1px 회색 선, 단색 등급 막대를 공통으로 씁니다

조사일 2026년 11월 24일. NESCL R 목업을 다시 디자인하기 위해 러닝 밖의 스펙 중심 퍼포먼스 브랜드 여섯 곳(MAAP, Pas Normal Studios, Rapha Pro Team, Café du Cycliste, Arc'teryx, On)의 상품 상세 페이지(PDP)와 컬렉션 페이지를 HTML과 CSS로 받아 수치를 뽑았습니다. 여섯 곳 모두 페이지 바탕은 흰색이고, 제품 콘텐츠 영역에 브랜드 강조색을 쓰지 않으며, 성능을 1~5 단계나 단계 이름으로 보여 주는 막대 또는 아이콘을 둡니다. 현재 NESCL R 화면의 베이지 면(#F3F1EE)과 주황 강조(#FF4A12)는 여섯 곳 어디에서도 같은 역할로 쓰이지 않습니다.

**표기 규칙.** 값마다 근거를 붙였습니다.

- [측정]: 받은 CSS 파일의 선언, CSS 변수, HTML 클래스와 마크업에서 직접 읽은 값입니다.
- [측정·픽셀]: 제품 사진을 내려받아 모서리 픽셀 색을 읽은 값입니다. CSS 값은 아니지만 실제 사진에서 잰 값입니다.
- [추정]: 화면 구조, 클래스 이름, 사진을 보고 짐작한 값입니다.

**수집 방법.** curl로 HTML을 받고 `<link rel=stylesheet>`의 CSS를 모두 내려받아 변수, font-size, letter-spacing, border, padding 빈도를 셌습니다. Café du Cycliste PDP는 직접 요청이 429로 막혀 `r.jina.ai`에 `X-Return-Format: html` 헤더를 붙여 HTML을 받았고, CSS는 원 사이트에서 직접 받았습니다. 섹션 순서는 HTML 본문 텍스트 순서와 r.jina.ai 마크다운으로 확인했습니다. 브라우저 렌더링 결과(계산된 스타일)는 보지 않았으므로, CSS 안에 값이 여러 개 있는 경우 실제 화면에 어느 값이 걸리는지는 빈도와 클래스 이름으로 판단했습니다.

| 조사한 페이지 | URL |
|---|---|
| MAAP PDP | maap.cc/products/pro-air-jersey-3-0-black-acid |
| MAAP 컬렉션 | maap.cc/collections/road?gender=Man |
| Pas Normal Studios PDP | pasnormalstudios.com/en-int/products/mechanism-bibs-black |
| Pas Normal Studios 컬렉션 | pasnormalstudios.com/en-int/collections/mechanism |
| Rapha PDP | rapha.cc/us/en/product/mens-pro-team-jersey-ii/CUM01XXBBK |
| Rapha 컬렉션 | rapha.cc/us/en/shop/pro-team |
| Café du Cycliste PDP | cafeducycliste.com/en/products/men-cycling-bibshort-marinette4-black |
| Café du Cycliste 컬렉션 | cafeducycliste.com/en-us/collections/mens-race-collection |
| Arc'teryx PDP | arcteryx.com/us/en/shop/mens/alpha-sv-jacket-9899 |
| Arc'teryx 컬렉션 | arcteryx.com/us/en/c/mens/shell-jackets |
| On PDP | on.com/en-us/products/cloudboom-strike-3me3048/mens/black-white-shoes-3ME30480299 |

Salomon S/LAB 페이지는 HTML을 받았지만 제품 마크업이 거의 없는 빈 셸이어서 On으로 대신했습니다. On은 레이싱 신발 PDP(Cloudboom Strike)를 봤습니다.

## 비교표

| 사이트 | 바탕 / 본문 / 보조 글자 | 선 | 강조색과 쓰는 곳 | 글꼴 | 본문 / 작은 라벨 / 제품명 / 섹션 제목 (px) | 간격 단위와 섹션 간격 | 최대 폭 |
|---|---|---|---|---|---|---|---|
| MAAP | #FFFFFF / #222222 / #777777 [측정] | 1px #E7E7E7, 강한 선 #CCCCCC [측정] | 기능용만: 장바구니 선택 #0000FF, 결제 구분선 #CCFD50 [측정] | TWK Everett, TWK Everett Mono, Rhymes Display [측정] | 16·14 / 12·10 / 20~28 [추정] / 32·40 [측정] | 4·8·12·16·24·32·48·64·72·96 [측정], 섹션 상하 32~72 가변 [측정] | 고정 폭 없음, 좌우 24~72 가변 [측정] |
| Pas Normal Studios | #FFFFFF / #000000 / rgba(0,0,0,.4~.7) [측정] | 1px rgba(0,0,0,.1) [측정] | 없음 [측정] | Plain [측정] | 14·16 / 10·12 / 18 / 24 [측정] | Tailwind 4px 단위, 섹션 48·80·96 [측정] | 좌우 20·40·50 [측정] |
| Rapha Pro Team | #FFFFFF / #000000 / #595959, 링크 #737373 [측정] | 1px #E2E2E2 [측정] | 콘텐츠에는 없음. 분홍 #F17296 토큰 있음 [측정], 세일 표시로 추정 [추정] | Trade Gothic Next, Trade Gothic Next Condensed, Kings Caslon [측정] | 14·16 / 12·14 / 24 / 20 [측정] | 8 단위, 섹션 상하 32 [측정] | 1120·1440 [측정] |
| Café du Cycliste | #FFFFFF / #898989(본문), 제목 #000000 [측정] | 1px #E3E3E3 [측정] | 링크 밑줄과 장바구니에 #C5570E [측정] | Söhne, Söhne Schmal Kursiv, GT Alpina [측정] | 14 / 13 / 32~33 [측정] / 32~33 [측정] | 4px 단위, 좌우 20·32·56 [측정] | 컨테이너 85% [측정] |
| Arc'teryx | #FFFFFF [추정] / #1A1A1A / #666666·#767676 [측정] | 1px #CCCCCC, 비활성 #B2B2B2 [측정] | 상태 메시지용 빨강·노랑·파랑·초록 세 단계 [측정], 제품 영역에는 없음 [추정] | Helvetica Now Display, Elan ITC, URW DIN [측정] | 16 / 12·14 / 26 / 22·28 [측정] | 8·16·32·48·64·96·160 [측정] | 1520, 좌우 38 [측정] |
| On | #FFFFFF [추정] / #000000 / #666666 [측정] | 1px #E5E5E5, 아코디언 1px #000000 [측정] | 포커스 링 #2F7EFE만 [측정] | On, On Diatype Mono, On Mono [측정] | 16~20 / 14 / 33~42 / 26~33 [측정] | 4·8·12·16·24·40 [측정] | 1480 [측정] |

## MAAP

| 항목 | 값 | 근거 |
|---|---|---|
| 바탕 | body `background-color: var(--surface-primary)` = #FFFFFF. 스펙 표 패널과 푸터만 cement #F7F7F7 | 측정 |
| 글자 | 본문 #222222(`--text-primary`), 라벨과 링크 #777777(`--color-brand-titanium`) | 측정 |
| 선 | 기본 1px #E7E7E7(`--border-secondary`, 1px 선언 18회), 강한 선 #CCCCCC, 진한 선 #222222 | 측정 |
| 강조색 | #0000FF는 장바구니 버튼 선택 상태와 위시리스트 안내 상단 5px 선, #CCFD50은 장바구니 구분선 4px와 프로필 점. 상품 본문에는 쓰지 않음 | 측정(CSS 규칙 위치) |
| 글꼴 | 본문 TWK Everett, 상품 카드와 세부 라벨 TWK Everett Mono, 세리프 Rhymes Display | 측정 |
| 글자 크기 | 본문 16·14·12, 컴포넌트 12(가장 많이 쓰임, 25회)·10, 소제목 28·20·16, 제목 32·40·48·64·72 | 측정 |
| 자간과 대문자 | body `letter-spacing: normal`, 라벨 .25px·.5px, 큰 제목 -.5px, 대문자 라벨 .12em. uppercase 선언 15회 | 측정 |
| 제품명과 가격 | 제품명은 소제목 20~28px, 가격은 12~14px 컴포넌트 크기 | 추정 |
| 간격 | 4·8·12·16·24·32·48·64·72·96px 단계(`--spacing-size-one`~`ten`). PDP 섹션 상하 `clamp(32px…72px)`, 좌우 `clamp(24px…72px)` | 측정 |
| 그리드 | 컬렉션 4열, 간격 12px, 991px 이하 2열, 타일 4:5. 상품 카드 글자 Everett Mono 12px/24px, 카드 아래 여백 16px 12px | 측정 |
| 사진 | 모델 착용, 밝은 회색 스튜디오 배경(위 #908F95에서 아래 #BEBEBE로 밝아짐), 비율 3:4(1077x1436) | 측정·픽셀 |
| 사진 구도 | 정면은 머리부터 허벅지 중간, 측면 컷은 얼굴을 잘라 옷만 보여 줌. 색상 선택은 흰 바탕 플랫레이 PNG 썸네일 | 추정(사진 확인), 파일명 `_LP_FLATLAY.png`는 측정 |

**PDP 순서** [측정]. 라인 라벨(MEN'S | MENTAL ATHLETIC), 제품명, 가격, 사이즈, 색상 썸네일, 사이즈 안내·리뷰·배송·크래시 교체 링크, Description, 성능 등급 6항목, Features(사진·영상과 한 줄 설명 4개), Technical Specifications 표, Care 순입니다.

**스펙 표현** [측정]. 성능 등급은 항목마다 64x64 SVG 아이콘 하나, 항목 이름, 단계 이름, 한 줄 설명으로 이뤄집니다. 이번 제품은 Fit Race, Breathability Elite, Thermal Dispersion Elite, Moisture Wicking Advanced, Aerodynamics Performance, Performance Weight Ultralight입니다. 아이콘은 채운 부분 #222222와 비운 부분 #CCCCCC 두 색만 써서 단계를 보여 줍니다. 단계 이름은 Performance, Advanced, Elite로 정해진 사다리입니다. Technical Specifications는 `dl` 표로, 왼쪽 라벨 #777777과 오른쪽 정렬 값을 1fr 2fr로 나누고 행마다 아래쪽 1px #E7E7E7 선과 상하 16px 여백을 둡니다. 값에는 Product Weight 110 g처럼 단위가 붙습니다.

**전문적으로 읽히는 점.** 아이콘 파일 이름(BREATHABILITY_ELITE, MOISTURE_ADVANCED)으로 보아 등급 단어는 제품마다 고르는 정해진 세트로 추정합니다. Fit 값이 Race라는 말로 따로 나옵니다. 컬렉션 카드를 모노 12px로 써서 상품 목록이 스펙 시트처럼 보입니다.

**일반적으로 보일 수 있는 점.** 장바구니 바에 `backdrop-filter: blur(35px)` 유리 효과와 24px 둥근 모서리(`--border-radius-lg`, 14회)를 씁니다. 기능용 강조색이 파랑, 라임, 보라, 주황, 분홍 다섯 개라서 그대로 옮기면 화면이 산만해집니다.

## Pas Normal Studios

| 항목 | 값 | 근거 |
|---|---|---|
| 바탕 | `--background: var(--white)` = #FFFFFF. 사진 자리 채움색 #F0F0F0(인라인 `--background:#F0F0F0`) | 측정 |
| 글자 | 본문 #000000. 보조 글자는 같은 검정의 투명도로 처리: 비활성 탭 rgba(0,0,0,.4), 컬렉션 메타 rgba(0,0,0,.7) | 측정(text-black/40, /70 클래스) |
| 선 | 1px rgba(0,0,0,.1)(border-black/10), 혜택 배지 1px #F0F0F0 | 측정 |
| 강조색 | 없음. CSS에 남은 #3B82F6, #E5E7EB는 Tailwind 기본값이고 화면 클래스에서는 쓰지 않음 | 측정 |
| 글꼴 | Plain(Optimo), 대체 Arial | 측정 |
| 글자 크기 | PDP 클래스 사용 횟수 기준 12px(41회), 14px(26회), 16px(21회), 10px(14회), 18px(9회), 데스크톱 24px(md:text-2xl 17회) | 측정 |
| 제품명 | h1 18px, font-weight 500, line-height tight. 그 아래 한 줄 설명 14px, 데스크톱 16px | 측정 |
| 가격 | €260.00, 구매 버튼과 같은 줄 14~16px | 추정(버튼 클래스) |
| 자간과 대문자 | 큰 글자 -.03em·-.02em. 대문자는 PDP에서 9곳만, 모두 12px 이하 라벨(JOIN THE RIDE 등) | 측정 |
| 간격 | 좌우 여백 20px, 태블릿 40px, 데스크톱 50px(lg:px-13). 섹션 위 간격 48px, 데스크톱 96px. 섹션 상하 80px(lg:py-20), 40px(lg:py-10) | 측정 |
| 그리드 | PDP 정보 영역 데스크톱 2열(lg:grid-cols-2). 컬렉션 타일 4:5, 타일 간격 8px | 측정, 타일 간격은 추정 |
| 사진 | 플랫 패키지 컷은 흰 바탕(og 이미지 `bg=FFFFFF`). 모델 컷은 아주 옅은 차가운 회백색 #F1F3EE~#ECEEE9, 4:5(1920x2400) | 측정·픽셀 |
| 사진 구도 | 서 있는 정면 전신과 자전거 위 라이딩 자세를 섞음 | 추정(사진 확인) |

**PDP 순서** [측정]. 카테고리(Men's Bibs), 제품명, 한 줄 설명, Color와 썸네일 13개, Size와 Size guide, 사이즈 버튼 7개(높이 44px), 구매 버튼과 가격, 혜택 배지 3개(Crash Replacement, 30 days return, 2 year warranty), Reserve in store, 정보 탭 격자, 아코디언 4개 순입니다.

**스펙 표현** [측정]. 정보 탭은 2열 격자의 칸 4개(Key Features, Product Specifications, Details, Shipping and Payments)입니다. 칸 높이 36px, 오른쪽과 아래쪽에 1px rgba(0,0,0,.1) 선, 바깥 테두리 같은 선에 모서리 2px입니다. WISE 참고 화면의 탭 줄과 가장 비슷한 구조입니다. Key Features 안에는 다시 가로 탭(On Bike, Elastic Grippers, Straps, Chamois, Fabric, Front Mesh, Chamois Stitching)이 있고, 선택한 탭은 검정 500, 나머지는 rgba(0,0,0,.4)입니다. 탭마다 4:5 썸네일이 붙습니다. Details는 "Aerodynamic race fit", "Material: 82% Polyamide, 18% Elastane"처럼 짧은 사실을 나열합니다.

**전문적으로 읽히는 점.** 컬렉션 타일마다 10px 대문자 "Compare" 체크박스가 있어 제품끼리 비교할 수 있습니다 [측정]. 모서리 반경이 2~3px뿐이고 그림자가 없습니다 [측정].

**일반적으로 보일 수 있는 점.** 이 사이트 자체에는 거의 없습니다. 다만 Tailwind 기본 색(#9CA3AF, #E5E7EB, 파란 포커스 링)이 CSS에 남아 있어, 같은 도구로 만들면서 기본값을 지우지 않으면 흔한 화면이 됩니다.

## Rapha (Pro Team)

| 항목 | 값 | 근거 |
|---|---|---|
| 바탕 | body #FFFFFF, 보조 면 #F2F2F2 | 측정 |
| 글자 | 본문 #000000(일부 #121212), 설명 #595959, 밑줄 링크 #737373 | 측정 |
| 선 | 1px #E2E2E2(1px 선언 69회), 진한 선 1px #000000·#121212, 셋째 회색 #B2B2B2 | 측정 |
| 강조색 | 분홍 #F17296·#FA3C6E·#EA0643 토큰과 상태색(초록 #3C822F, 빨강 #D53638, 파랑 #2D87E2)이 있음. PDP 본문 영역은 흑백만 씀 | 토큰은 측정, 쓰는 곳은 추정 |
| 글꼴 | 제목 Trade Gothic Next Condensed No.20(대문자), 본문 Trade Gothic Next, 세리프 Kings Caslon, 숫자 전용 Rapha Sans Numerals | 측정 |
| 글자 크기 | 14px(선언 244회), 12px(109회), 16px(90회), 24px(32회). 제목 단계 48·32·24·20·14·12, 행간 1.2 | 측정 |
| 제품명 | 24px/29px, 700, 대문자, 자간 1.2px, Condensed | 측정 |
| 섹션 제목 | "Performance" 20px/24px, 자간 1px, 대문자 Condensed | 측정 |
| 작은 라벨 | 14px 700 대문자, 자간 .7px. 기능 목록 12px 300, 앞에 6x6px 검정 사각형 | 측정 |
| 설명문 | 16px #595959, 최대 46ch. 등급 설명 14px #595959 | 측정 |
| 간격 | gap 8·12·16·24·32px가 대부분. 성능 섹션 상하 32px, 2열 간격 32px, 행 간격 24px. 정보 서랍 너비 520px, 안쪽 여백 40px | 측정 |
| 그리드 | 12열과 4열 규칙. 기능 이미지 카드 데스크톱 25vw(4개 한 줄). 컬렉션 타일 1200px 이상 25vw(4열), 정사각형 1:1 | 측정(sizes 속성, 이미지 URL `ar_1:1`) |
| 사진 | 모델 착용, 따뜻한 베이지 배경 #D9CBC2~#CAB9AF. 기능 캐러셀은 3:4, 진한 파랑 배경 #002669~#005784의 등판 컷 | 측정·픽셀 |
| 컬렉션 사진 | 마네킹(고스트) 컷을 1:1로 자름 | 측정(이미지 경로 `mannequin/`) |

**PDP 순서** [측정]. 제품명, $210, 리뷰 13개, Size, 모델 키와 착용 사이즈, Size guide, Summary·Materials & care·Specifications 밑줄 링크(오른쪽 520px 서랍으로 열림), 혜택 3줄, Features(3:4 이미지 카드 4개), Performance(1~5 등급 4항목), Seen in(관련 이야기 3개), The collection(Pro Team 소개), You may also like, Reviews 순입니다.

**스펙 표현** [측정]. Performance 섹션은 "Each rating runs from 1 (low) to 5 (high)"라는 설명 한 줄 아래 Breathability 3/5, Insulation 1/5, Windproof rating 1/5, Water resistance 1/5 네 항목을 2열로 놓습니다. 항목마다 14px 대문자 이름, 14px #595959 정의 한 줄("How easily heat and sweat escape"), 5칸 막대, 숫자 "3 / 5"가 붙습니다. 막대는 칸마다 높이 2px, 칸 사이 8px, 채운 칸 #000000, 빈 칸 #E2E2E2이고, 칸이 140ms 간격으로 왼쪽부터 차는 애니메이션이 있습니다. 안내문이 제품끼리 한눈에 비교하라고 밝히고 있어 다른 제품도 같은 네 항목을 쓰는 것으로 추정합니다(이번 조사에서는 이 제품 하나만 확인). 기능 목록에는 착용 온도(18-35°C)와 핏 설명(engaged fit)이 따로 한 줄씩 들어갑니다.

**전문적으로 읽히는 점.** 좁은 Condensed 대문자 제목과 2px 등급 막대가 경기 기록표처럼 보입니다. 사진 배경은 따뜻한 베이지인데 페이지 면은 흰색과 #F2F2F2뿐이라 따뜻한 색이 사진 안에만 머뭅니다.

**일반적으로 보일 수 있는 점.** 칩과 버튼에 9999px 알약 모양(33회)을 많이 씁니다. "Seen in"과 콘텐츠 링크가 PDP 중간에 끼어 스펙 흐름을 끊습니다 [추정].

## Café du Cycliste

| 항목 | 값 | 근거 |
|---|---|---|
| 바탕 | #FFFFFF(`--colors-background`), 보조 면 #F6F6F6, 푸터 #E8E8E8 | 측정 |
| 글자 | 본문 색이 `--colors-text-secondary` = #898989, 제목 #000000, 가격 #242424 | 측정 |
| 선 | 1px #E3E3E3(`--colors-line-and-border`), 푸터 선 #525051. 입력칸 #AFAFAF·#808080 | 측정 |
| 강조색 | 번트 오렌지 #C5570E. 텍스트 링크 색과 2px 밑줄, 장바구니 버튼에 씀. 별점 아이콘 #C8B89F, 라이딩 스타일 칩 #E1DDDC | 측정 |
| 글꼴 | 본문 Söhne Buch, 강조 Söhne Dreiviertelfett, 제목 Söhne Schmal Halbfett·Dreiviertelfett Kursiv(좁은 굵은 이탤릭), GT Alpina 이탤릭. PageFly가 남긴 Tenor Sans도 CSS에 있음 | 측정 |
| 글자 크기 | 14px(클래스 64회), 13px(29회), 32px·데스크톱 33px(21회), 17px(12회), 20px | 측정 |
| 제품명과 섹션 제목 | 32~33px 대문자 좁은 이탤릭. 섹션 제목(Specifications, Temperature Range 등)도 같은 크기 | 측정 |
| 자간과 대문자 | 본문 자간 .28px(56회). uppercase 클래스 100회 | 측정 |
| 간격 | 좌우 20px, 데스크톱 32px·56px. 세로 간격 28px, 문단 아래 20px | 측정 |
| 그리드 | 스펙 영역 컨테이너 최대 85%, 데스크톱 100%. 컬렉션 카드 간격 6px(gap-1.5, 195회) | 측정, 간격의 쓰임은 추정 |
| 사진 | 모델 전신 정면·후면, 중립 회색 #E5E5E5, 3:4. 패키지 컷 #EFEFEF. 2:1 야외 라이딩 사진 3장 | 측정·픽셀 |

**PDP 순서** [측정]. 경로 표시, 제품명(Marinette), 부제(Men's Lightweight Bib Shorts), 가격, Size, 설명, 기능 이미지 3개, Specifications(대문자 4줄), Usage(Temperature Range와 라이딩 스타일), Fit, Sustainability, Material & Care, Delivery & Returns, Reviews, 라이딩 사진, 라인 소개(RACE, AUDAX, OUTLANDS, Classic, Active, Explore) 순입니다.

**스펙 표현** [측정]. Temperature Range는 가로 막대 위에 -10°C, 0°C, 15°C, +30°C 눈금을 `left: 0%, 22.73%, 56.82%, 90.9%`로 찍고, 스크립트가 채움 폭을 정합니다. 그 아래 라이딩 스타일(Road, Race, Commuting 등)을 32~33px 대문자 이탤릭 단어로 나열하고, 해당하는 단어만 검정에 4px 검정 밑줄, 나머지는 #A5A5A5로 둡니다. Material & Care는 Composition(58% Polyamide, 42% Elastane), 세탁 아이콘, Weight 0.3 kg, Made In, Fabric 순의 짧은 줄입니다. 섹션은 더하기·빼기 기호로 여닫는 아코디언입니다.

**전문적으로 읽히는 점.** 착용 온도를 숫자 눈금으로 보여 주고, 제품을 RACE·AUDAX 같은 라인 이름으로 묶습니다.

**일반적으로 보일 수 있는 점.** 본문 글자 #898989는 흰 바탕에서 대비가 약합니다. 이미지 대체 텍스트에 "Liquid error"가 그대로 노출됩니다 [측정]. 서체가 네 계열에 남은 서체까지 섞여 있습니다. 주황 강조는 링크와 장바구니에만 쓰지만, NESCL R이 같은 주황을 넓게 쓰면 이 사이트보다 강하게 보입니다 [추정].

## Arc'teryx

| 항목 | 값 | 근거 |
|---|---|---|
| 바탕 | body에 배경 지정 없음(기본 흰색), 상품 칸 #FAFAFA, 회색 면 #E9E9E9 | 측정(토큰), 페이지 바탕은 추정 |
| 글자 | 본문 #1A1A1A(`--colour-copy`), 보조 #666666, 접근성용 #767676, 진한 회색 #333333 | 측정 |
| 선 | 1px #CCCCCC(`--pinline-grey`), 비활성 테두리 1px #B2B2B2(14회) | 측정 |
| 강조색 | 상태용 네 가지 색을 세 단계씩(예: 빨강 #FBEBEB·#C86464·#990000). 상품 영역에는 쓰지 않음 | 토큰은 측정, 쓰는 곳은 추정 |
| 글꼴 | 본문과 h2·h3 Helvetica Now Display, 제품명과 h4 Elan ITC 대문자, URW DIN 계열 | 측정 |
| 글자 크기 | 본문 16px, 행간 1.5, 자간 .02rem(0.32px). 작은 글자 14px, 자간 .0175rem. 12px 보조 | 측정 |
| 제품명 | 26px(모바일 24px), Elan, 400, 대문자, 행간 1 | 측정 |
| 섹션 제목 | h2 Helvetica 300(가는 굵기), 행간 1.15. h3 28px·24px, h4 22px·20px 대문자 Elan | 측정 |
| 간격 | 0.5·1·2·3·4·6·10rem(8·16·32·48·64·96·160px). PDP 최대 폭 95rem(1520px), 좌우 2.375rem(38px), 모바일 13px | 측정 |
| 그리드 | 12·8·6·4열 규칙. 분류 배지 영역 간격 32px, 아이콘 40x40 | 측정 |
| 사진 | 모델 컷은 따뜻한 회갈색 배경(위 #A49582, 아래 #C5BCAD), 1350x1710(약 4:5). 패키지 컷은 순백 #FFFFFF. 뷰는 Front, Side, Back, Hood, Fabric Detail | 측정·픽셀, 뷰 이름은 alt 텍스트 측정 |
| 컬렉션 사진 | 흰 바탕 패키지 컷 1350x1710 | 측정(이미지 URL) |

**PDP 순서** [측정]. 갤러리(원단 확대 컷 포함), 제품명, 리뷰, 한 줄 요약, $900, 색상, Size와 Sizing chart, 설명, 분류 배지 4개(Alpha, Climb, Severe Weather, GORE-TEX와 각 정의), ReBIRD WASH, 기능 캐러셀(GORE-TEX PRO ePE, Expanded storage, Freedom of reach, Layer-ready fit), Features & Specs, Fit & Sizing, Materials & Care, 리뷰 순입니다.

**스펙 표현** [측정]. Features & Specs는 Durable, Construction, Design & Fit, Snowsport features 같은 묶음 제목 아래 네모 글머리(`list-style-type: square`) 목록을 두고, 끝에 키와 값 표(Size, Weight 492g / 1 lb 1.4 oz, Fit Regular, Activity Alpine, Model X000009899, Manufacturing facility)를 붙입니다. Materials에는 "100d 3L GORE-TEX PRO ePE, recycled plain weave, 136 gsm"처럼 데니어, 겹 수, 원단 무게가 한 줄에 들어갑니다. 분류 배지는 40px 아이콘, 이름, 한 문장 정의 세 줄입니다.

**전문적으로 읽히는 점.** 원단 수치(100d, 3L, 136 gsm)와 무게(492 g)를 숨기지 않고 본문에 씁니다. Alpha라는 시리즈 이름이 용도(알파인)를 뜻하고, 같은 분류 배지를 다른 제품에도 붙이는 체계로 추정합니다.

**일반적으로 보일 수 있는 점.** 리뷰 위젯(Bazaarvoice)이 자체 스타일을 덮어쓰는 CSS를 따로 두고 있어 리뷰 영역만 다른 사이트처럼 보입니다 [추정]. 기능 캐러셀의 마케팅 문장이 길어 스펙보다 먼저 읽힙니다.

## On (Cloudboom Strike)

| 항목 | 값 | 근거 |
|---|---|---|
| 바탕 | body에 배경 지정 없음, #FFFFFF 선언이 가장 많음(162회) | 측정(빈도), 페이지 바탕은 추정 |
| 글자 | 본문 #000000, 보조 #666666, 중간 #333333·#4D4D4D | 측정 |
| 선 | 1px #E5E5E5, 칩 1px rgba(0,0,0,.1), 아코디언 아래 1px #000000 | 측정 |
| 강조색 | #2F7EFE는 포커스 링(`box-shadow: 0 0 0 .25rem`)에만 씀. 오류 #ED0000, 경고 #E15F14 | 측정 |
| 글꼴 | On(자체 그로테스크), 한국어 대체 Noto Sans KR, 라벨용 On Diatype Mono, On Mono, On Semi Mono | 측정 |
| 글자 크기 | 화면 폭에 따라 커지는 단계: 12~14, 14~16, 16~20, 20~26, 26~33, 33~42, 42~53px. 본문 행간 1.5 | 측정 |
| 제품명 | 33~42px(작은 배치 26~33px), 700, 자간 -.01em, 행간 1.2 | 측정 |
| 작은 라벨 | 척도 끝 라벨 14px On Diatype Mono, 대문자, 자간 .06em, #666666 | 측정 |
| 간격 | gap 8·16·4·12·24px 순으로 많음. 아코디언 머리 상하 24px. 척도 항목 사이 40px. 칩 높이 38px, 모서리 3px | 측정 |
| 그리드 | 12열(`repeat(12,[col-start] 1fr)`), 최대 폭 92.5rem(1480px)과 74rem | 측정 |
| 사진 | 흰 바탕 #FFFFFF 위 측면 제품 컷, 기능 설명은 별도 사진 | 측정·픽셀 |

**PDP 순서** [측정]. 경로(Road Running), 제품명(Men's / Cloudboom Strike / Black | White), $280, 용도 칩(Race Shoe, Half Marathon, Marathon, 누르면 설명), 한 줄 요약, 색상, 사이즈, Size chart와 True to size, Add to bag, 아코디언(Size & Fit, Shipping & Returns, Materials & Transparency), 핵심 수치, Activities, Key features, 척도 3개, 기술 설명 3개(Cushioned Bounceboard, Carbon fiber Speedboard, Ultralight upper), 세트 상품 순입니다.

**스펙 표현** [측정]. 핵심 수치는 아이콘, 항목 이름, 값으로 된 칸(Road running style Fast, Lacing Standard, Heel to toe drop 4 mm, Weight 210 g)이고, 항목마다 "What does Weight mean?" 설명 팝오버가 있습니다. 척도는 Cushioning High(양 끝 Low, Max), Responsiveness High(Gentle, Max), Stability Medium(Neutral, Stable) 세 개입니다. 칸마다 높이 1px 검정 선이고, 해당 칸만 높이 4px(데스크톱 8px)로 두꺼워지며 칸 사이는 8px(데스크톱 12px)입니다. 양 끝 라벨은 모노 14px 대문자 #666666입니다.

**전문적으로 읽히는 점.** 값마다 단위(4 mm, 210 g)가 붙고, 모노 대문자 라벨이 계측 장비 눈금처럼 보입니다. 척도가 채운 막대가 아니라 위치 표시여서 많고 적음이 아닌 성격(부드러움과 단단함)을 보여 줍니다.

**일반적으로 보일 수 있는 점.** 모든 항목에 설명 팝오버가 붙어 클릭 요소가 많습니다 [추정]. 화면 폭 따라 크기가 바뀌는 글자가 7단계로 많아, 작은 쇼핑몰이 그대로 옮기면 단계가 과합니다 [추정].

## 반복되는 패턴과 NESCL R에 옮길 만한 것

여섯 곳에서 두 번 이상 나온 패턴만 적었습니다. 괄호 안은 해당 사이트입니다.

1. **페이지 바탕은 흰색, 회색 면은 한 단계만 씁니다.** 흰 바탕 위에 #F2F2F2~#F7F7F7 하나를 스펙 패널이나 사진 자리 채움에만 씁니다(MAAP #F7F7F7, Rapha #F2F2F2, PNS #F0F0F0, CdC #F6F6F6, Arc #FAFAFA). 따뜻한 베이지 면을 쓰는 곳은 없습니다. NESCL R의 #F3F1EE 면은 #F2F2F2나 #F7F7F7 같은 중립 회색으로 바꾸는 쪽이 이 무리와 맞습니다.
2. **사진 배경은 따뜻해도 되지만 페이지 면과 분리합니다.** Rapha(#D9CBC2)와 Arc'teryx(#A49582~#C5BCAD)는 모델 사진 배경이 따뜻한데 페이지 면은 흰색과 중립 회색입니다. MAAP(#BEBEBE 계열), CdC(#E5E5E5)는 중립 회색 스튜디오입니다. NESCL R의 사진 배경 #E3DFD9는 사진 안에만 남기고 화면 면 색에서 빼면 됩니다.
3. **선은 1px, 색은 #E2E2E2~#E7E7E7 또는 rgba(0,0,0,.1)입니다.** 진한 선이 필요할 때만 1px 검정을 씁니다(On 아코디언, Rapha, MAAP border-primary). 모서리는 0~3px이고, 둥근 알약 모양은 칩과 버튼에만 둡니다(PNS, On, Arc).
4. **강조색은 제품 콘텐츠에 쓰지 않습니다.** 색이 있는 곳은 포커스 링(On), 장바구니(MAAP, CdC), 상태 메시지(Arc, Rapha)뿐입니다. CdC만 링크에 주황 #C5570E를 씁니다. NESCL R의 #FF4A12를 남긴다면 장바구니 버튼이나 선택 상태 하나로 줄이는 것이 이 무리의 관행에 가깝습니다.
5. **보조 글자는 #595959~#777777입니다(Rapha #595959, Arc #666666, On #666666, MAAP #777777).** PNS는 검정 투명도 40~70%로 같은 효과를 냅니다. CdC의 #898989는 대비가 약한 예외입니다.
6. **글자 크기는 네다섯 단계면 충분합니다.** 실제로 많이 쓰는 값은 12·14·16px 본문과 라벨, 18~26px 제품명, 20~33px 섹션 제목입니다(Rapha 12·14·16·20·24, PNS 10·12·14·16·18·24, Arc 12·14·16·26). 제품명이 26px을 넘는 곳은 On과 CdC뿐입니다.
7. **작은 라벨은 대문자에 자간을 넓히고, 스펙 라벨에는 모노나 좁은 서체를 씁니다.** Rapha 14px 700 대문자 .7px(약 .05em), On 모노 14px 대문자 .06em, MAAP 모노 12px, PNS 10~12px 대문자. 본문 자간은 0~0.02em으로 거의 건드리지 않습니다. WISE의 굵은 대문자 섹션 라벨과 같은 계열입니다.
8. **간격은 4px이나 8px 단위이고, 섹션 사이는 32~96px입니다.** MAAP 32~72px 가변, PNS 48·80·96px, Rapha 32px, Arc 48·96px. 좌우 여백은 모바일 13~24px, 데스크톱 38~72px입니다.
9. **성능은 정해진 항목과 같은 칸 수의 얇은 막대로 보여 줍니다.** Rapha는 1~5 다섯 칸, 2px, 채움 #000000 비움 #E2E2E2에 "3 / 5" 숫자. On은 1px 선 위 해당 칸만 4~8px 두께, 양 끝에 모노 라벨. MAAP는 단색 아이콘과 Performance·Advanced·Elite 단계 이름. CdC는 온도 눈금 막대. 네 곳 모두 항목 이름 아래 한 줄 정의를 둡니다. WISE의 0~5 지수 줄은 Rapha 방식(숫자와 칸)과 On 방식(위치 표시) 사이에 있습니다.
10. **스펙 표는 왼쪽 회색 라벨, 오른쪽 값, 행마다 1px 선입니다.** MAAP는 1fr 2fr, 값 오른쪽 정렬, 행 상하 16px. Arc와 CdC는 무게(492 g, 0.3 kg), 원단(100d 3L 136 gsm, 58% Polyamide)처럼 숫자와 단위를 값으로 씁니다.
11. **정보는 탭이나 서랍으로 접습니다.** PNS는 높이 36px 칸 4개를 1px 선 격자로 묶은 탭, Rapha는 밑줄 링크로 여는 520px 오른쪽 서랍, On과 CdC는 아래 선 1px 아코디언입니다. WISE 참고 화면의 기술 탭 줄은 PNS 탭 격자와 거의 같습니다.
12. **기술 설명은 사진이나 영상 한 장에 이름과 문단 하나입니다.** MAAP Features(사진·영상과 한 줄), PNS Key Features(탭마다 4:5 썸네일), On 기술 3개, Arc 캐러셀. WISE의 왼쪽 글, 오른쪽 원단 영상 패널과 같은 단위입니다.
13. **사진 비율은 4:5나 3:4로 통일합니다.** MAAP 3:4, PNS 4:5, Rapha 기능 3:4, Arc 약 4:5, CdC 3:4. 컬렉션 타일만 Rapha가 1:1입니다. 상품 목록은 데스크톱 4열입니다(MAAP 간격 12px, Rapha 25vw).
14. **제품을 레이스 라인 이름과 핏 이름으로 묶습니다.** Rapha Pro Team, CdC RACE, MAAP Fit Race, Arc'teryx Alpha, PNS "Aerodynamic race fit". 라인 이름이 PDP 맨 위 라벨이나 맨 아래 라인 소개로 다시 나옵니다.
15. **AI가 만든 것처럼 보이게 하는 요소는 이 무리에서 드뭅니다.** 큰 둥근 카드, 그림자, 그라데이션, 따뜻한 면 색, 넓게 쓰인 강조색을 쓰는 곳이 없습니다. 예외는 MAAP 장바구니 바의 유리 블러와 24px 모서리, CdC의 연한 본문 회색과 남은 서체이고, 둘 다 따라 하지 않는 편이 낫습니다.
