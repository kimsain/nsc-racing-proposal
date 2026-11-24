# NESCL R 예시 판매 사이트 (비공식 콘셉트 목업)

네거티브 스플릿 클럽(네스클)이 원단 수치를 공개하는 레이싱 라인 NESCL R을 낸다면 판매 페이지가 어떻게 생길지 그려 본 목업입니다. WISE, SOAR, Vollebak처럼 스펙을 앞세워 옷을 파는 해외 쇼핑몰의 구성을 조합했습니다. 제품, 수치, 가격, 사진은 모두 예시이고, 장바구니는 주문으로 이어지지 않습니다.

## 실행

빌드 없는 정적 사이트입니다.

```bash
python3 scripts/serve.py
```

http://localhost:4173 을 엽니다. 컬렉션은 `index.html`, 상세는 `product.html?id=r01`부터 `r04`까지입니다. 주소 끝에 `#spec=cfm`처럼 붙이면 그 스펙 설명이 열린 채로 시작합니다.

## 화면 구성

- **컬렉션(`index.html`)**: 제목과 소개, 도구 줄(카테고리 탭, 오늘 기온 슬라이더, 정렬), 제품 카드 4개, 원단 시험편 사진, 네 제품 비교표 순서입니다.
- **상세(`product.html`)**: 사진과 구매 영역(핵심 수치 4칸, 통기·땀 배출·보온 0~5 지수, 사이즈), 기술 패널, 스펙 표, 권장 기온과 함께 입기, 다른 제품과 비교, 핏과 실측, 하단 고정 구매 바 순서입니다.
- **기술 패널**: 통기, 땀 배출, 보온, 핏과 보호 네 묶음 탭과 0~5 단계 표, 그 묶음의 측정 항목과 부위 탭이 있습니다. 측정 항목은 움직이는 SVG 그림, 부위는 사진으로 보여 줍니다. 구매 영역의 지수 줄을 누르면 이 패널의 같은 묶음으로 갑니다.
- **스펙 설명 드로어**: 핵심 수치 칸, 기술 패널의 "측정 방법과 네 제품 비교", 스펙 표 행, 비교표 행 이름을 누르면 오른쪽(모바일은 아래)에서 열립니다. 이 제품의 값으로 움직이는 SVG 그림, 정의, 중요한 이유, 측정 방법, 값의 위치, 네 제품 비교, 한계를 보여 줍니다.

## 파일

| 파일 | 내용 |
|---|---|
| `data.js` | 모든 숫자와 문구 (제품 4개, 스펙 11개의 설명, 지수 기준, 기온 프리셋) |
| `logic.js` | 판단 코드 (값 표시, 지수 단계, 기온별 조합, 컬렉션 필터와 정렬). DOM을 쓰지 않습니다 |
| `app.js` | 상태 객체 `state`와 `setState`, 화면 그리기, 이벤트 연결 |
| `anim.js`, `anim/*.js` | 스펙 설명 그림. `anim.js`에 재생과 정지, `anim/`에 스펙마다 장면 하나 |
| `index.html`, `product.html`, `styles.css` | 마크업과 스타일. 색, 글자 크기, 간격은 `styles.css`의 `:root` 토큰에만 있고 `docs/shop-spec.md` 6절과 같습니다. 폰트는 Pretendard 하나입니다 |
| `tests/logic.test.js` | `node tests/logic.test.js`로 지수 경계, 데이터 일관성, 기온별 조합을 확인합니다 |
| `scripts/scene-preview.html`, `scene-shot.sh` | 스펙 그림을 제품별, 시점별로 나란히 찍어 확인합니다 (`sh scripts/scene-shot.sh cfm`) |
| `scripts/images/` | Codex CLI로 사진을 만드는 프롬프트(`prompts.json`)와 스크립트(`generate.py`), 바탕을 #F2F2F2 무채색으로 맞추는 `neutralize.py` |
| `docs/shop-spec.md` | 이 사이트의 설계 문서 |
| `docs/site-research.json`, `docs/research/` | 참고한 해외 쇼핑몰 조사 원본과 2026-11-24 개편 때 잰 디자인 값 |
| `concepts_brief.md` | 2026-11-24 디자인 개편의 검토 기록과 결정 |

## 사진 다시 만들기

```bash
python3 scripts/images/generate.py --missing
```

톤 기준 이미지(`style-anchor`)를 스타일 참조로 붙여 같은 톤으로 만듭니다. 만든 뒤에는 바탕을 맞춥니다.

```bash
python3 scripts/images/neutralize.py r01-singlet
python3 scripts/images/neutralize.py --check
```

`neutralize.py`는 색기가 적은 픽셀을 회색으로 바꾸고 주황 테이프 같은 진한 색만 남긴 뒤, 모서리 바탕 밝기를 242(#F2F2F2)에 맞춥니다. `--check`는 사이트용 사진의 모서리 색을 보여 줍니다. r01-perf와 r04-pocket은 원단이 화면을 꽉 채운 근접 사진이라 모서리가 원단이어서 `-`로 나옵니다. 원본 PNG는 `scripts/images/raw/`(git 제외)에, 사이트용 webp는 `assets/img/`에 저장됩니다. 아직 만들지 않은 사진은 페이지에서 자리째 숨겨집니다.

## 참고한 사이트

상세페이지 구조와 기술 패널은 WISE, 기온 막대는 SOAR와 Bandit, 스펙 표는 Vollebak과 Outlier, 실수치를 붙인 척도는 Rapha를 참고했습니다. 2026-11-24 개편에서는 Satisfy, Tracksmith, District Vision, Norda, MAAP, Pas Normal Studios, Comme des Garçons, Arc'teryx, On의 바탕, 간격, 글자 크기를 재서 흰 바탕과 무채색 체계를 정했습니다. 화면에는 참고 사이트 이름을 적지 않습니다.
