/* Shared case data for Kit A and Kit B */
const THEMES = {
  compose: { "a-bg":"#ffd23a","a-bg2":"#ffe9a3","a-ink":"#1d1608","a-mute":"#5c4a12","a-line":"rgba(29,22,8,.16)","a-card":"#ffe27a","a-hi":"#7a4f00",
    "b-bg":"#fbf6e9","b-ink":"#1d1608","b-mute":"#7a6c52","b-line":"#eadfc4","b-card":"#ffffff","b-before":"#2b241a","b-after":"#f3e7c4","b-hi":"#a06e00",
    "mark":"#1d1608","glow":"rgba(255,196,40,.6)","sol-bg":"#1d1608","sol-ink":"#fbf2d7","sol-hi":"#ffd23a" },
  guess: { "a-bg":"#1f3a72","a-bg2":"#3a5ea8","a-ink":"#f3f6fc","a-mute":"#b2c0df","a-line":"rgba(243,246,252,.18)","a-card":"#28478a","a-hi":"#a9c6ff",
    "b-bg":"#f3f4f7","b-ink":"#12204a","b-mute":"#636c8a","b-line":"#dde1ea","b-card":"#ffffff","b-before":"#1b1e27","b-after":"#e3e8f2","b-hi":"#2f55c8",
    "mark":"#2f55c8","glow":"rgba(80,130,255,.45)","sol-bg":"#12204a","sol-ink":"#eef2fb","sol-hi":"#a9c6ff" },
  "luckin-web": { "a-bg":"#2348e8","a-bg2":"#4a6dff","a-ink":"#ffffff","a-mute":"#c9d3ff","a-line":"rgba(255,255,255,.22)","a-card":"#1c3cd0","a-hi":"#cfe6ff",
    "b-bg":"#f5f7ff","b-ink":"#0d1b5c","b-mute":"#5f6a99","b-line":"#dfe4f7","b-card":"#ffffff","b-before":"#20232c","b-after":"#e3e9ff","b-hi":"#2348e8",
    "mark":"#2348e8","glow":"rgba(35,72,232,.45)","sol-bg":"#0d1b5c","sol-ink":"#eef2ff","sol-hi":"#9db6ff" },
  "luckin-campaign": { "a-bg":"#06070b","a-bg2":"#16245e","a-ink":"#f4f6ff","a-mute":"#8e95ab","a-line":"rgba(120,150,255,.2)","a-card":"#0e1222","a-hi":"#5d86ff",
    "b-bg":"#eef1fb","b-ink":"#0a0f24","b-mute":"#5d6585","b-line":"#d9def0","b-card":"#ffffff","b-before":"#0b0d14","b-after":"#dde5ff","b-hi":"#2f5bff",
    "mark":"#2f5bff","glow":"rgba(47,91,255,.55)","sol-bg":"#0a0f24","sol-ink":"#eef1ff","sol-hi":"#7fa0ff" },
  additable: { "a-bg":"#dce8f7","a-bg2":"#ffffff","a-ink":"#233047","a-mute":"#57677f","a-line":"rgba(35,48,71,.14)","a-card":"#eaf2fc","a-hi":"#2f6fd6",
    "b-bg":"#f4f7fb","b-ink":"#1d2638","b-mute":"#5e6b80","b-line":"#dde4ee","b-card":"#ffffff","b-before":"#2c3a52","b-after":"#dfe9f6","b-hi":"#2f6fd6",
    "mark":"#3d8bff","glow":"rgba(110,170,255,.5)","sol-bg":"#233047","sol-ink":"#eef4fc","sol-hi":"#9fd0ff" }
};

const CASES = {
  compose: {
    tab: "Compose",
    meta: ["Mobile App Redesign", "Compose Coffee", "Case 01"],
    titleLines: ["Order,", "first."],
    hero: { kind: "cutout", src: "img/compose-hand.png", logo: "img/compose-logo.png", alt: "손에 든 폰 속 리디자인한 컴포즈커피 앱 메인 화면" },
    statement: "앱을 여는 이유는 단 하나, <strong>주문</strong>이다.",
    overview: "컴포즈커피 앱은 설치 후 한 달 안에 4명 중 3명이 떠난다. 그런데 현재 UI에 대한 반응은 나쁘지 않았다. 그래서 문제를 디자인이 아니라 주문까지의 거리로 보고, 메인 화면을 주문 중심으로 다시 짰다.",
    facts: [["Role", null], ["Period", null], ["Team", null], ["Tools", "Figma"]],
    context: {
      sub: "사용자 이용통계",
      big: { label: "1개월 이탈률", value: "75.2", unit: "%", note: "이탈 기간 1개월 기준", chip: "2025.08" },
      compare: [["컴포즈커피", 75.2, false], ["스타벅스", 30.3, true]],
      stats: [["49.0", "%", "사용자 중 직장인"], ["44.8", "%", "사용자 중 초등학생 부모"], ["80", "%", "현재 UI에 대한 긍정 반응 · 자체 설문"]],
      source: "IGAWorks Marketing Cloud, 2025.08 안드로이드 기준 · 만족도는 자체 설문",
      diagnosis: { vis: { kind: "phone", src: "img/compose-before.jpg", alt: "기존 컴포즈커피 앱 메인 화면" }, pts: [[44, 88], [50, 52], [88, 92]],
        title: "기존 앱 진단",
        issues: [
          ["하단 탭에 묻힌 주문 버튼", "핵심 행동인 주문 버튼이 하단 탭바에 묻혀 한눈에 들어오지 않는다."],
          ["화면 중앙을 차지한 스탬프", "주문과 무관한 스탬프 10칸이 화면 중앙을 차지해 시선이 분산된다."],
          ["연한 회색 하단 아이콘", "하단 메뉴 아이콘 색이 연해 활력이 없고 한눈에 구분되지 않는다."]
        ] },
      insight: "UI는 괜찮았다.<br>문제는 <em>주문까지의 거리</em>라고 봤다.",
      insightNote: "바쁜 직장인과 학부모에게 필요한 건 새로운 기능보다 빠르고 확실한 주문."
    },
    process: [
      ["Discover", "사용자 이용통계로 누가 쓰는지, 얼마나 떠나는지 확인하고 앱오더 사용자 설문을 진행했다."],
      ["Define", "만족도는 높은데 이탈은 높다. 문제를 ‘주문까지의 거리’로 정의했다."],
      ["Benchmark", "더벤티와 투썸플레이스 앱에서 주문 동선과 하단 메뉴 구성을 비교했다."],
      ["Design", "메인 화면을 주문 중심으로 재배치하는 세 가지 결정을 내렸다."]
    ],
    decisions: [
      { tag: "Decision 01", title: "주문 버튼을 첫눈에 보이는 곳으로",
        body: "주문은 이 앱의 가장 중요한 행동인데, 기존에는 하단 탭바에 다른 메뉴와 나란히 놓여 있었다.",
        visual: { kind: "phones", before: { src: "img/compose-before.jpg", mark: { type: "ring", x: 50, y: 87.5, size: 26 } },
          after: [{ src: "img/compose-after.jpg", mark: { type: "ring", x: 82.5, y: 53.5, size: 38 } }] },
        problem: "핵심 행동인 주문 버튼이 하단 탭바에 묻혀 한눈에 들어오지 않는다.",
        evidence: "주 사용자는 시간이 부족한 직장인과 학부모. 더벤티는 메인 화면에 오더 버튼을 둬 주문 단계를 줄였다.",
        evidenceImg: ["img/bench-venti.jpg", "벤치마킹 · 더벤티", "메인 화면 오더 버튼"],
        solution: "주문 버튼을 화면 위쪽에 <strong>가장 크게</strong> 두고, 입체 아이콘으로 먼저 보이게 했다." },
      { tag: "Decision 02", title: "스탬프 대신 늘 마시던 메뉴를",
        body: "화면 한가운데를 차지하던 스탬프 10칸은 주문과 상관없는 정보였다.",
        visual: { kind: "phones", before: { src: "img/compose-before.jpg", mark: { type: "box", x: 3.5, y: 43, w: 93, h: 33 } },
          after: [{ src: "img/compose-after.jpg", mark: { type: "box", x: 3.5, y: 55, w: 93, h: 32 } }] },
        problem: "주문과 무관한 스탬프 영역이 화면 중앙을 차지해 시선이 분산된다.",
        evidence: "앱을 여는 목적은 주문이다. 투썸플레이스는 필요한 기능만 배치해 가독성을 높였다.",
        evidenceImg: ["img/bench-twosome.jpg", "벤치마킹 · 투썸플레이스", "필요한 기능만 배치한 메인"],
        solution: "스탬프는 한 줄 요약(1/10)으로 줄이고, 그 자리에 <strong>‘늘 마시던 걸로’</strong> 바로 주문을 넣었다." },
      { tag: "Decision 03", title: "회색 아이콘에 브랜드 컬러를",
        body: "하단 메뉴는 매번 보는 영역인데, 연한 회색 아이콘이라 구분이 어렵고 브랜드도 드러나지 않았다.",
        visual: { kind: "strips", before: ["img/compose-nav-before.jpg"], after: ["img/compose-nav-after.jpg"] },
        problem: "하단 메뉴 아이콘 색이 연해 활력이 없고 한눈에 구분되지 않는다.",
        evidence: "투썸플레이스는 브랜드 아이덴티티를 살린 하단 메뉴로 가독성과 브랜드 인지를 함께 잡았다.",
        solution: "아이콘에 컴포즈 옐로를 입히고, 자주 쓰는 <strong>멤버십(바코드)</strong>을 탭에 올렸다." }
    ],
    compare: { kind: "phone", title: "직접 밀어서<br>비교해보기", note: "같은 메인 화면, 같은 해상도. 손잡이를 움직이면 기존 화면과 리디자인 화면이 겹쳐 보인다.", before: "img/compose-before.jpg", after: "img/compose-after.jpg" },
    reflection: {
      quote: "불편을 찾기보다,<br><em>목적</em>을 봤다.",
      learnings: [
        ["What I learned", "우리 시각에서 불편해 보였던 부분이 실제 사용자에게는 크게 불편하지 않았다. 그래서 불편을 억지로 찾기보다 앱의 목적을 먼저 고려하게 됐다."],
        ["Next", null]
      ]
    }
  },

  guess: {
    tab: "GUESS",
    meta: ["UX/UI App Redesign", "GUESS Korea", "Case 02"],
    titleLines: ["Denim,", "archived."],
    hero: { kind: "phone", src: "img/guess-main.jpg", alt: "리디자인한 GUESS Korea 앱 아카이브 피드 홈" },
    statement: "쇼핑몰이 아닌, <strong>데님 핏</strong>을 발견하고 저장하는 브랜드 앱.",
    overview: "게스는 역삼각형 로고와 독보적인 핏으로 사랑받아 온 데님 브랜드다. 하지만 지금의 게스 앱은 프로모션 배너 중심이라 브랜드가 지향하는 프리미엄 이미지를 전하지 못하고, 온라인 구매의 고질적 한계인 ‘기장과 핏’에 대한 경험도 비어 있었다. 후르츠 패밀리의 미니멀한 감도와 유니클로의 직관적인 정보 체계를 결합해, 핏 가이드를 중심으로 브랜드 경험을 넓히는 앱을 목표로 했다.",
    facts: [["Role", null], ["Period", null], ["Team", null], ["Tools", "Figma"]],
    context: {
      diagnosis: { vis: { kind: "phone", src: "img/guess-before.jpg", alt: "기존 GUESS Korea 앱 메인 화면" }, pts: [[60, 42], [18, 14], [50, 92]],
        title: "현재 앱 진단",
        issues: [
          ["과도한 배너 비중", "메인 화면의 프로모션 배너가 너무 커서, 어떤 상품이 있는지 보기도 전에 광고에 피로감을 느낀다."],
          ["위계 질서 부재", "로고, 배너, 카테고리가 모두 똑같이 자기주장을 해서 어디를 먼저 봐야 할지 모른다."],
          ["하단 바의 존재감", "하단 내비게이션이 아이콘과 텍스트로 꽉 차 상품 하단부를 가리고, 검은 모바일용 내비게이션은 용도가 불분명하다."]
        ] },
      reframe: { before: ["초기 포지셔닝", "빠른 탐색 → 빠른 구매", "패스트패션형 쇼핑 흐름 · ZARA · H&M · UNIQLO"],
                 after: ["재정의된 방향", "브랜드 경험 → 핏 탐색 → 저장 → 구매", "데님 아카이브 기반 브랜드 앱 · Levi’s · Polo Ralph Lauren"] },
      table: { head: ["항목", "현재 GUESS 앱", "벤치마크에서 확인한 방향"],
        rows: [["앱의 역할", "상품 나열 · 구매 처리", "브랜드 경험을 전달하는 탐색 공간"], ["첫 인상", "프로모션 배너 중심", "캠페인 비주얼 · 스토리 중심"], ["고객 관계", "거래 중심", "멤버십 · 충성 고객 관리 중심"], ["제품 정보", "옵션 · 가격 중심", "핏 · 스타일링 가이드 포함"]] },
      source: "공식 사이트 및 벤치마크 구조 비교를 바탕으로 정리한 포지셔닝 판단",
      insight: "한계는 디자인이 아니라<br><em>쇼핑몰 구조</em>에 있었다.",
      insightNote: "경쟁사 기준을 다시 세워 보니, 기존 GUESS Korea 앱은 브랜드 앱이 아니라 쇼핑몰 구조에 머물러 있었다."
    },
    process: [
      ["Diagnose", "현재 앱의 배너 비중, 정보 위계, 하단 바를 진단했다."],
      ["Reposition", "경쟁사를 ZARA·H&M·UNIQLO에서 Levi’s·Polo Ralph Lauren으로 다시 세우고 포지셔닝을 재정의했다."],
      ["Structure", "IA와 유저 저니를 설계하고 와이어플로우로 발견부터 결제까지의 흐름을 검증했다."],
      ["Design", "런처 아이콘, 스플래시, 아카이브 피드 홈, 핏 아카이브, 결제까지 시안을 완성했다."]
    ],
    flow: { title: "쇼핑보다 먼저, 스타일과 핏을 발견하는 흐름",
      steps: [["발견", "Archive Feed", "오늘의 아카이브와 큐레이션 콘텐츠로 스타일과 핏을 발견한다."], ["탐색", "Fit Archive", "데님 핏 아카이브에서 다양한 핏과 스타일을 비교한다."], ["분석", "Fit Scan", "Fit Scan으로 체형을 분석하고 나에게 맞는 핏을 추천받는다."], ["저장", "My Archive", "마음에 드는 핏과 상품을 My Denim Archive에 저장한다."], ["구매", "Payment", "저장한 상품을 확인하고 간편하게 결제한다."]] },
    decisions: [
      { tag: "Decision 01", title: "배너 대신 캠페인 비주얼로 시작하는 홈",
        body: "앱에 들어오는 순간부터 GUESS의 감성과 세계관을 전달하도록, 홈을 아카이브 피드로 바꿨다.",
        visual: { kind: "phones", before: { src: "img/guess-before.jpg" }, after: [{ src: "img/guess-main.jpg" }] },
        problem: "큰 프로모션 배너가 화면을 차지해, 브랜드가 지향하는 프리미엄 이미지가 전달되지 않는다.",
        evidence: "벤치마킹한 앱들은 메인 화보를 꽉 채우지 않고 라운드 값을 크게 준 카드로 띄워, 배너가 아닌 콘텐츠로 활용했다.",
        solution: "캠페인 배너, <strong>퀵 카테고리</strong>, 데님 에디트로 이어지는 아카이브 피드 홈. 이미지만 보고도 원하는 카테고리로 바로 이동한다." },
      { tag: "Decision 02", title: "상품 나열 대신, 핏으로 분류한 데님 아카이브",
        body: "슬림 · 스트레이트 · 와이드 · 부츠컷 · 루즈. 상품을 핏 기준으로 묶어, 목적에 따라 탐색하는 리스트 기반의 아카이브를 만들었다.",
        visual: { kind: "web", plain: true, before: null, after: [{ src: "img/guess-archive-list.jpg" }] },
        problem: "기존 앱의 제품 정보는 옵션과 가격 중심이라, 수많은 데님 중 나에게 맞는 핏을 비교하기 어렵다.",
        evidence: "벤치마크한 브랜드들은 옵션과 가격만이 아니라 핏과 스타일링 가이드를 제품 정보에 함께 담고 있었다.",
        solution: "<strong>데님 핏 아카이브</strong>. 핏별로 비교하는 리스트에 실루엣, 특징, 추천 체형 정보를 함께 보여주고, 저장 버튼과 큐레이션으로 아카이브를 쌓은 뒤 구매로 이어지게 했다." },
      { tag: "Decision 03", title: "온라인 구매의 불안, 핏을 먼저 보여준다",
        body: "게스의 핵심 카테고리인 데님을 구매 전에 충분히 이해하도록 핏 정보를 앞에 놓았다.",
        visual: { kind: "phones", before: null, after: [{ src: "img/guess-fitarchive.jpg" }, { src: "img/guess-fitscan.jpg" }, { src: "img/guess-detail.jpg" }] },
        problem: "온라인에서 데님을 살 때 기장과 핏을 확신할 수 없어 구매를 망설이게 된다.",
        evidence: "벤치마킹한 브랜드들은 미니멀한 UI와 AI를 활용한 가상 피팅으로 구매 확신을 주고 있었다.",
        solution: "핏을 비교하는 <strong>데님 핏 아카이브</strong>, 전신을 스캔하는 Fit Scan, 기장(Inseam)에 맞춘 Perfect Fit 추천을 상품 상세까지 연결했다." },
      { tag: "Decision 03", title: "한 번 사고 끝나는 거래 대신, 쌓이는 아카이브",
        body: "일회성 구매가 아니라 브랜드 팬을 만드는 구조를 마이페이지에 담았다.",
        visual: { kind: "phones", before: null, after: [{ src: "img/guess-mypage.jpg" }] },
        problem: "기존 앱의 고객 관계는 거래 중심이라, 구매 이후 다시 찾아올 이유가 약하다.",
        evidence: "재설정한 벤치마크인 Levi’s와 Polo Ralph Lauren은 멤버십과 충성 고객 관리를 중심에 둔다.",
        solution: "핏 프로필, <strong>GUESS Archive Pass</strong> 멤버십, 저장 아카이브를 한곳에 모아 구매 이후에도 이어지는 경험을 만들었다." },
      { tag: "Decision 04", title: "하단 내비게이션은 다섯 개만",
        body: "꽉 차 있던 하단 바를 핵심 기능만 남겨 정리하고, 나머지는 드로어 메뉴로 옮겼다.",
        visual: { kind: "strips", before: ["img/guess-nav-before.jpg"], after: ["img/guess-nav-after.jpg"] },
        problem: "하단 내비게이션이 아이콘과 텍스트로 꽉 차 있고, 그 아래 검은 내비게이션은 용도가 불분명하다.",
        evidence: "이 앱의 핵심 여정은 핏 탐색, 저장, 마이 아카이브로 빠르게 오가는 것이다.",
        solution: "홈 · 검색 · 저장 · <strong>핏스캔</strong> · 마이페이지만 남기고, 캠페인과 핏 카테고리는 드로어 메뉴에서 접근하게 했다." }
    ],
    compare: { kind: "phone", title: "배너에서<br>아카이브로", note: "같은 메인 화면을 겹쳐 보면, 화면을 덮던 배너가 캠페인 카드와 퀵 카테고리로 바뀐 것이 보인다.", before: "img/guess-before.jpg", after: "img/guess-main.jpg" },
    reflection: {
      quote: "쇼핑앱이 아닌,<br><em>핏을 발견하는</em> 앱으로.",
      learnings: [
        ["What I learned", "처음에는 빠른 구매 중심의 패스트패션 앱으로 접근했다. 경쟁사 기준을 다시 세우면서, 게스에 필요한 건 속도가 아니라 브랜드 경험과 핏 확신이라는 걸 알게 됐다."],
        ["Expected · 기대 효과", "구매 확신 향상, 재방문 유도, 차별화된 앱 경험. 개인화된 데님 경험으로 전환율과 고객 충성도가 높아지기를 기대한다."]
      ]
    }
  },

  "luckin-web": {
    tab: "Luckin Web",
    meta: ["Website Redesign", "Luckin Coffee", "Case 03"],
    titleLines: ["Invisible tech,", "visible art."],
    hero: { kind: "web", src: "img/lkweb-hero.jpg", alt: "리디자인한 루이싱 커피 웹사이트 메인 히어로" },
    statement: "기술은 보이지 않게, <strong>아름다움</strong>은 눈에 띄게.",
    overview: "루이싱은 키오스크 없는 100% 앱 주문과 AI 기반 물류로 성장한 테크 기업이다. 그런데 웹사이트(lkcoffee.com)는 2010년대 스타일의 레이아웃과 빽빽한 줄글로 그 기술력을 전혀 보여주지 못했다. 강점인 ‘테크’는 살리고 약점인 ‘디자인 감성’을 보완해, 똑똑한데 아름답기까지 한 프리미엄 테크 브랜드로 리포지셔닝했다.",
    facts: [["Role", null], ["Period", null], ["Team", null], ["Tools", "Figma"]],
    context: {
      sub: "루이싱 커피의 현재",
      big: { label: "중국 내 매장 수", value: "30,000", unit: "+", note: "탄생 7년 만에 중국 내 스타벅스를 넘어 점유율 1위", chip: "Retail Tech" },
      stats: [["100", "%", "키오스크 없는 앱 주문 시스템"], ["1:1", "", "구매 패턴을 분석한 맞춤 큐레이션과 쿠폰"], ["2030", "", "타깃 · 한국과 중국의 직장인과 학생"]],
      source: "기획안 시장 분석 기준",
      diagnosis: { vis: { kind: "web", src: "img/lkweb-before.jpg", alt: "기존 루이싱 커피 웹사이트" }, pts: [[30, 28], [32, 84], [86, 30]],
        title: "기존 웹사이트 진단",
        issues: [
          ["형식의 노후화", "2010년대 초반 스타일의 바둑판식 나열과 고정된 레이아웃, 저화질 이미지."],
          ["기술력의 텍스트화", "최고의 테크 기업인데, 이를 인포그래픽이 아닌 빽빽한 줄글로 보여줘 읽고 싶지 않다."],
          ["정보의 파편화", "브랜드 철학, 기술력, 투자자 정보가 유기적으로 연결되지 않는다."]
        ] },
      table: { head: ["SWOT", "내용"],
        rows: [["Strength", "스타벅스를 능가한 3만 개 매장의 빅데이터, 효율적인 테크 기업"], ["Weakness", "기술력을 담지 못하는 투박한 UI, 테이크아웃 전문점이라 브랜드 경험 부재, 웹상 정보 분산"], ["Opportunity", "글로벌 확장기에 따른 브랜드 이미지 재정립, 미니멀한 테크 디자인 선호 급증"], ["Threat", "경쟁사 대비 낮은 디지털 미감, 복잡한 투자 정보로 인한 기업가치 저평가 우려"]] },
      insight: "최고의 테크 기업인데,<br>웹사이트는 <em>2010년대</em>에 머물러 있었다.",
      insightNote: "타깃은 합리적인 가격으로 프리미엄 브랜드 경험을 갖고 싶은 한국과 중국의 2030 직장인과 학생."
    },
    process: [
      ["Analyze", "기존 웹사이트와 시장 현황을 분석해 문제를 세 가지로 정리했다."],
      ["Benchmark", "스타벅스, 아라비카, 컴포즈 웹사이트에서 일관된 브랜드 컬러와 고감도 비주얼이라는 공통점을 찾았다."],
      ["Position", "SWOT과 STP로 ‘The Invisible Tech, The Visible Art’ 포지셔닝을 정했다."],
      ["Design", "메인 히어로, About Us, 앱 전환 영역을 다시 설계했다."]
    ],
    decisions: [
      { tag: "Decision 01", title: "바둑판식 나열 대신, 한 잔의 확신",
        body: "메인 히어로에서 데이터 기반 원두 선정과 우승 레시피를 강조해 ‘이 커피는 힙하고 맛있다’는 시각적 확신을 주도록 했다.",
        visual: { kind: "web", before: { src: "img/lkweb-before.jpg" }, after: [{ src: "img/lkweb-hero.jpg" }] },
        problem: "고정된 레이아웃과 저화질 이미지가 첨단 테크 브랜드라는 정체성을 대변하지 못한다.",
        evidence: "스타벅스, 아라비카, 컴포즈는 커피의 질감과 매장 같은 고해상도 이미지·영상 중심으로, 설명 없이 브랜드를 인지시킨다.",
        evidenceImg: ["img/lkweb-bench.jpg", "벤치마킹 · 경쟁사 웹사이트", "고감도 비주얼과 일관된 컬러"],
        solution: "‘Everywhere You Are, Reliable as Always’ 카피와 큰 제품 비주얼로 히어로를 채우고, <strong>루이싱 블루</strong>를 사이트 전체 톤으로 가져갔다." },
      { tag: "Decision 02", title: "빽빽한 텍스트 대신 스크롤 스토리텔링",
        body: "About Us의 빽빽한 텍스트를 스크롤 스토리텔링으로 바꾸고, 기술력은 깔끔한 이미지 카드로 보여줬다.",
        visual: { kind: "web", before: { src: "img/lkweb-before-about.jpg" }, after: [{ src: "img/lkweb-quality.jpg" }] },
        problem: "브랜드 철학과 기술력이 긴 줄글로만 설명되어 있어 읽고 싶지 않다.",
        evidence: "스타벅스 리저브는 잡지 같은 스토리텔링으로, 애플은 스크롤에 따라 하나씩 보여주는 방식으로 신뢰감을 만든다.",
        solution: "아라비카 원두, WBC 챔피언 블렌딩, 갓 볶은 원두를 <strong>세 장의 카드</strong>로 나눠 스크롤하며 하나씩 읽히게 했다." },
      { tag: "Decision 03", title: "테이크아웃 브랜드답게, 웹에서 앱으로",
        body: "매장에 머무는 경험이 없는 테이크아웃 전문점이라는 약점을, 웹에서 앱 주문으로 이어지는 흐름으로 바꿨다.",
        visual: { kind: "web", before: null, after: [{ src: "img/lkweb-nearby.jpg" }, { src: "img/lkweb-easy.jpg" }] },
        problem: "웹 방문자가 루이싱의 핵심 경험인 앱 주문으로 이어지는 연결이 없다.",
        evidence: "한국과 중국 유저 모두 루이싱에서 원하는 건 앱 주문, 빠른 픽업, 개인화 쿠폰이라는 편리함이다.",
        solution: "‘Find Nearby Luckin Coffee’와 <strong>Download App</strong>, ‘We are easy and fast’로 웹 방문을 앱 주문으로 연결했다." }
    ],
    compare: { kind: "web", title: "2010년대에서<br>지금으로", note: "같은 첫 화면을 겹쳐 보면, 투자 정보 중심의 페이지가 제품과 브랜드 중심의 히어로로 바뀐 것이 보인다.", before: "img/lkweb-before.jpg", after: "img/lkweb-hero.jpg" },
    reflection: {
      quote: "저가 브랜드에서,<br><em>가장 진보된 테크 브랜드</em>로.",
      learnings: [
        ["Expected · 기대 효과", "이미지 쇄신, 투명한 정보 제공을 통한 투자 가치 상승, 세련된 정보 구조로 웹 방문자의 앱 다운로드율 증가를 기대한다."],
        ["What I learned", null]
      ]
    }
  },

  "luckin-campaign": {
    tab: "Luckin Campaign",
    meta: ["Global Campaign · Promotion Web", "Luckin Coffee", "Case 04"],
    titleLines: ["Brew", "your luck."],
    hero: { kind: "image", src: "img/camp-hero.jpg", site: "campaign/index.html", alt: "You're missing your luck QR 포스터 키비주얼" },
    statement: "루이싱이 한국에 온다면, 처음 받는 공짜 커피를 <strong>행운</strong>으로.",
    overview: "중국에서 이미 폭발적인 인기로 중국 시장에서는 스타벅스보다 매장 수가 많은 루이싱 커피가 한국에 런칭한다면 어떨까라는 발상에서 시작되었습니다. 또한 글로벌로 런칭할 때도 맥락이 이어지길 바라는 마음으로 기획을 시작했습니다. 루이싱은 앱을 처음 다운로드하면 거의 공짜 커피 한 잔인 쿠폰을 주는데, 이 혜택을 더 재밌게 전달하며 인앱 다운로드 수를 늘리고 브랜드 이름까지 직관적으로 전달할 방법을 고민하던 중, 루이싱의 이름(luck + in의 합성어)과 처음 받아보는 혜택인 공짜 커피를 연결해 보면 재미있겠다는 생각을 하게 되었습니다.",
    facts: [["Role", "기획 · 리서치 · 디자인 · AI 활용 구현"], ["Period", "2026.05 – 06"], ["Team", "개인 작업"], ["Tools", "Figma · ChatGPT · Midjourney · Photoshop"]],
    context: {
      sub: "루이싱을 들여다보며",
      big: { label: "루이싱 매장 수 (2025년 말)", value: "31,048", unit: "", note: "중국 로컬 브랜드를 넘어 2025년 뉴욕까지, 이미 글로벌 확장 단계", chip: "Global Expansion" },
      stats: [["100", "%", "앱 주문 · 캐셔리스 매장, 빠르게 소비되는 디지털 커피"], ["≈ 50", "%", "주 1회 이상 QR을 스캔하는 Gen Z와 밀레니얼"], ["88", "%", "QR에 대한 소비자 태도가 더 긍정적으로 변했다고 답한 마케터 (2025)"]],
      source: "기획안 리서치 기준 · Reuters, Mintel, QR 마케팅 자료",
      diagnosis: { vis: { kind: "web", src: "img/lkweb-before.jpg", alt: "기존 루이싱 커피 웹사이트" }, pts: [[30, 28], [32, 84], [86, 30]],
        title: "그런데 웹사이트는",
        issues: [
          ["2010년대에 머문 화면", "바둑판식 레이아웃과 저화질 이미지로, 테크 브랜드라는 정체성을 전혀 보여주지 못했습니다."],
          ["읽고 싶지 않은 줄글", "최고의 테크 기업인데 그걸 빽빽한 줄글로만 설명하고 있었습니다."],
          ["프로모션이 없는 사이트", "투자 정보와 회사 정보만 나열되어 있고, 앱으로 이어지는 프로모션 기능은 아예 없었습니다."]
        ] },
      table: { head: ["현재 마케팅", "특징", "한계"],
        rows: [["앱 다운로드 할인", "첫 주문 · 신규 가입 혜택", "가격 중심 이미지가 강함"], ["쿠폰 · 바우처", "앱 접속, 재구매 유도", "경쟁사도 쉽게 따라 함"], ["빠른 픽업 · 주문", "편의성 강조", "브랜드 감정은 남지 않음"], ["협업 · 시즌 메뉴", "바이럴 가능성", "캠페인 경험으로 이어지지 않음"]] },
      insight: "혜택은 있지만,<br><em>기억되는 첫 경험</em>은 약하다.",
      insightNote: "그래서 과제는 ‘앱 다운받으면 할인’이 아니라, QR을 찍는 순간부터 루이싱이라는 이름을 기억하게 만들고 앱에서 혜택을 직접 경험하게 만드는 것이었습니다."
    },
    process: [
      ["Research", "루이싱이 어떤 브랜드인지, 시장과 마케팅, 웹사이트가 어디에 서 있는지 먼저 정리했습니다."],
      ["Idea", "luck + in이라는 이름과 첫 공짜 커피를 연결하고, 스캔 한 번이면 되는 QR과 FOMO 카피로 정했습니다."],
      ["AI Visual", "ChatGPT와 Midjourney로 몇십 장씩 생성하고, 고르고, 포토샵으로 직접 다듬었습니다."],
      ["Build", "시안 + 설계도 + 섹션별 요구사항을 프롬프트로 묶어 웹사이트를 구현했습니다."]
    ],
    flow: { title: "단계마다 사용자가 느낄 감정까지 적어 두고 디자인했습니다",
      steps: [["Entry", "미스터리 포스터", "“뭐지?” 흰 배경에 QR과 문구만"], ["Brew", "브루잉 인터랙션", "“나만 놓치는 건가?” Brewing your luck…"], ["Reveal", "랜덤 쿠폰 공개", "“와! 받았다!” 커피 물결 속에서 떠오르는 카드"], ["Claim", "앱 다운로드", "“한번 써볼까?” Your luck lives in the Luckin app."], ["Share", "SNS 공유", "“나도 공유해야지!” 앱 다운로드보다 뒤에"], ["Complete", "쿠폰 저장 · 첫 주문", "“좋아, 바로 써야지!”"]] },
    decisions: [
      { tag: "Decision 01", title: "스캔 한 번에 연결되는 QR",
        body: "참여 대상을 파악해 보았을 때 글로벌 MZ세대와 커피를 가장 많이 소비하는 연령층 모두가 편하게 참여할 수 있는 콘텐츠는 어떤 것일까 생각해 보았습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/arch/r_poster.jpg" }] },
        problem: "앱 다운로드 할인과 쿠폰은 강한 전환 장치지만, 가격 중심 이미지가 강하고 경쟁사도 쉽게 따라 합니다.",
        evidence: "Gen Z와 밀레니얼의 약 절반이 이미 주 1회 이상 QR을 스캔하고 있었습니다.",
        solution: "스캔 한 번에 연결되는 <strong>QR 형식</strong>이 가장 적합하겠다고 판단했습니다." },
      { tag: "Decision 02", title: "You’re missing your luck",
        body: "‘You’re missing your luck’이라는 문구로 포스터를 만들고, 사람들의 포모를 자극해 QR 코드를 찍어 보게 하는 방식으로 인앱 다운로드를 받는 프로모션을 기획했습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/camp-posters.jpg" }, { src: "img/hq/camp-userflow.jpg" }] },
        problem: "사람들이 QR을 찍게 만드는 감정은 행운을 얻고 싶은 마음보다 ‘혹시 나만 놓치고 있는 게 있나?’에 더 가깝다고 생각했습니다.",
        evidence: "MZ는 단순 광고보다 놀이와 몰입이 있는 참여형 경험에 더 반응합니다.",
        solution: "QR을 찍으면 웹사이트가 나오고, <strong>브루잉되는 인터랙션</strong>이 돌아가며 랜덤한 쿠폰들이 떠오르고, 바로 인앱 다운로드까지 연결되게끔 만들었습니다." },
      { tag: "Decision 03", title: "한국 메인 홈페이지",
        body: "한국에 런칭하게 되는 상황이기에 한국 메인 홈페이지에는 히어로에 영상을 배치하는 방향을 넣었습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/hq/camp-home-orig.jpg" }, { src: "img/hq/camp-menu-posters.jpg" }] },
        problem: "기존 웹사이트는 투자 정보와 회사 정보만 나열되어 있고 프로모션 기능이 아예 없었습니다.",
        evidence: "루이싱은 이미 싱가포르와 중국, 뉴욕에 매장이 있는 글로벌 브랜드입니다.",
        solution: "이미 싱가포르와 중국, 뉴욕에 매장이 있다는 것을 알려 주고, <strong>대표 메뉴 사진을 스타일리시하게 연출한 포스터</strong>를 배치했으며, 각국의 매장 사진들은 감성을 통일해 넣었습니다." },
      { tag: "Decision 04", title: "몇십 장의 생성 끝에 고른 매장 사진",
        body: "웹사이트의 전체적인 색감을 통일하기 위해 ChatGPT에 각 지역의 도시 사진 무드 레퍼런스를 준 후 루이싱 커피 매장을 생성해 달라고 했습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/hq/camp-ai-stores.jpg" }, { src: "img/hq/camp-city-final.jpg" }] },
        problem: "나라마다 매장 사진의 감성이 다르면 웹사이트 전체 색감이 깨집니다.",
        evidence: "몇십 장의 생성 끝에 매장이 잘 보이면서도 각국의 특색이 잘 드러나는 사진을 골랐습니다.",
        solution: "고른 사진을 <strong>포토샵으로 전체적인 색감을 보정</strong>한 후 웹사이트 시안을 완성했습니다." },
      { tag: "Decision 05", title: "도트로 그린 도시 포스터",
        body: "각 매장에도 그 나라의 특색을 나타내는 포스터가 있기를 바랐습니다. 그래서 한국과 중국, 미국, 싱가포르의 도시들을 나타내는 특색 있는 포스터를 만들었습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/hq/camp-dot-posters.jpg" }] },
        problem: "QR 코드가 자연스럽게 배치되면서 각 도시의 무드도 나타내야 했습니다.",
        evidence: "도트화로 그려지면 좋겠다고 생각했고, 몇 가지 도트 타입 포스터 레퍼런스를 수집했습니다.",
        solution: "<strong>QR 코드와 각 도시의 랜드마크</strong>가 잘 녹아 있는 포스터들을 디자인했습니다." },
      { tag: "Decision 06", title: "플립되는 매장 카드",
        body: "웹페이지에서 각 매장의 사진이 나올 때 카드가 플립되며 회전하면 재미를 줄 수 있겠다는 생각이 들었습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/hq/camp-flips6.jpg" }, { src: "img/camp-web-city.jpg" }] },
        problem: "매장 사진만 나열하면 도시마다의 이야기가 스쳐 지나갑니다.",
        evidence: "마우스를 올리면 어두워지면서 유기체 블러 처리, 입체적인 카드가 팝업되도록 설계했습니다.",
        solution: "검은 카드를 드래그하면 하얀 카드로 바뀌도록, 각 섹션마다 <strong>라이트 버전과 다크 버전 2개</strong>를 배치했습니다." },
      { tag: "Decision 07", title: "히어로는 출근길 지하철",
        body: "메인 히어로에 오는 영상은, 커피를 가장 많이 소비하는 현대인들이 가장 많이 지나다니는 곳이 어디일까 생각했을 때 바로 떠오른 직장인들의 출근길 지하철로 정했습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/hq/camp-mj-subway.jpg" }, { src: "img/hq/camp-subway.jpg" }] },
        problem: "미드저니로 각기 다른 플랫폼들과 사람들이 지나다니는 바쁜 길목 등을 생성했지만, 미드저니가 타이포에 약했습니다.",
        evidence: "생성된 이미지들은 업스케일링 후 어도비 포토샵 후보정으로 직접 로고를 플랫폼에 넣거나 간판에 배치했습니다.",
        solution: "그 후 다시 <strong>미드저니에서 영상으로 생성</strong>해, 포스터를 메인으로 장면이 자연스럽게 전환되는 캠페인 느낌의 영상을 제작해 넣었습니다." },
      { tag: "Decision 08", title: "설계도처럼 정리해서 프롬프트로",
        body: "시안을 다 만든 후 웹사이트 구현은 시안 사진을 쭉 깔고, 각 섹션마다 담당될 부분을 직접 설계도처럼 만들었습니다.",
        visual: { kind: "web", before: null, plain: true, after: [{ src: "img/hq/camp-home-memo.jpg" }] },
        problem: "인터랙션과 각각의 요소들을 자세히 배치하려면 코딩으로는 많은 시간이 걸리게 됩니다.",
        evidence: "사진 이미지 시안 + 설계도 시안 + 섹션마다 요구했던 부분을 정리한 글 등을 프롬프트로 정리해 넣었습니다.",
        solution: "기획 단계에는 꽤 많은 시간이 걸렸지만, <strong>웹사이트 빌딩 자체의 시간은 많이 단축</strong>할 수 있었습니다." }
    ],
    compare: { kind: "web", title: "시안 위에<br>인터랙션을 적다", note: "원본 시안 위에 섹션마다 적용할 인터랙션을 직접 적었습니다. 이 시안 + 설계도 + 요구사항 글을 프롬프트로 묶어 넣어, 기획엔 시간이 걸렸지만 빌드 시간은 크게 줄었습니다.", before: "img/hq/camp-home-orig.jpg", after: "img/hq/camp-home-memo.jpg" },
    story: {
      facts: [["Role", "기획 · 리서치 · 디자인"], ["Period", "2026.05 – 06"], ["Team", "개인 작업"], ["Tools", "Figma · ChatGPT · Midjourney · Photoshop"]],
      sub: "루이싱 커피가 한국에 런칭한다면 어떨까라는 발상에서 시작된<br>QR 기반 프로모션 웹사이트 기획입니다.",
      heroImg: "img/live/site-hero.jpg",
      heroVideo: "img/live/campaign.mp4",
      links: [["캠페인 웹사이트 보기", "campaign/index.html"], ["QR 브루잉 웹 보기", "campaign/brew.html"]],
      sections: [
        { id: "st-start", nav: "시작", room: "rB", eyebrow: "기획의 시작", title: "루이싱 커피가 한국에 런칭한다면",
          paras: [
            "중국에서 이미 폭발적인 인기로 중국 시장에서는 스타벅스보다|매장 수가 많은 루이싱 커피가 한국에 런칭한다면 어떨까라는|발상에서 시작되었습니다. 또한 글로벌로 런칭할 때도|맥락이 이어지길 바라는 마음으로 기획을 시작하게 되었습니다.",
            "루이싱 커피는 앱을 처음 다운로드하면 쿠폰을 발급해 줍니다.|거의 공짜 커피 한 잔을 주는 셈입니다.",
            "원래도 저가 커피이지만, 이 혜택을 더 재밌게 전달하면서|인앱 다운로드 수를 늘리고 브랜드의 이름까지 직관적으로|전달할 수 있는 방법이 무엇인지 고민했습니다.",
            "그러던 중 루이싱(Luckin)이라는 이름이 행운을 뜻하는 luck과|in의 합성어라는 점에 주목하게 되었습니다. 이름 자체에 이미|‘행운’이 담겨 있다면, 처음 받아보는 혜택인 공짜 커피를|‘행운’으로 전달해 보면 재미있겠다는 생각이 들었습니다.",
            "그래서 이 캠페인의 카피와 인터랙션, 포스터는 모두|브랜드 이름에서 출발한 ‘행운’이라는 키워드를 중심으로 만들게 되었습니다."
          ],
          blocks: [{ type: "equation", items: [["Luckin", "luck + in", "브랜드 이름에 담긴 행운"], ["First Coupon", "공짜 커피 한 잔", "첫 앱 다운로드 혜택"], ["Brew your luck", "처음 받는 커피를 행운으로", "캠페인 컨셉"]] }] },

        { id: "st-research", nav: "분석", room: "rN", eyebrow: "시장 및 현황 분석", title: "루이싱은 지금 어떤 브랜드일까",
          paras: [
            "아이디어를 구체화하기 전에 루이싱이 지금 어떤 브랜드이고|어떤 상황에 있는지부터 정리해 보았습니다.",
            "루이싱은 스타벅스처럼 공간을 중심으로 한 브랜드가 아니라,|100% 앱 주문과 캐셔리스 매장을 기반으로 빠르게 소비되는|디지털 커피 경험에 가까운 브랜드였습니다. 또한 2025년|뉴욕에 첫 미국 매장을 열며 이미 글로벌 확장 단계에 들어서 있었습니다."
          ],
          blocks: [
            { type: "stats", items: [["31,048", "2025년 말 기준 루이싱 매장 수"], ["100%", "앱 주문 · 캐셔리스 매장"], ["≈ 50%", "주 1회 이상 QR을 스캔하는 Gen Z와 밀레니얼"], ["88%", "QR에 대한 소비자 태도가 긍정적으로 변했다고 답한 마케터"]], source: "Reuters, Mintel, QR 마케팅 자료 기준" },
            { type: "text", paras: ["하지만 현재 웹사이트는 2010년대 초반 스타일의 바둑판식 레이아웃과|빽빽한 줄글로 되어 있어 테크 브랜드라는 정체성을 보여주지 못하고|있었고, 투자 정보와 회사 정보만 나열되어 있을 뿐 프로모션 기능은 없었습니다.",
            "마케팅 또한 앱 다운로드 할인과 쿠폰처럼 전환에는 강했지만|가격 중심의 이미지가 강해, 처음 루이싱을 만나는 사람에게|브랜드를 기억하게 만들기에는 부족하다고 느꼈습니다."] },
            { type: "table", head: ["현재 마케팅", "특징", "한계"], rows: [["앱 다운로드 할인", "첫 주문 · 신규 가입 혜택", "가격 중심 이미지가 강함"], ["쿠폰 · 바우처", "앱 접속, 재구매 유도", "경쟁사도 쉽게 따라 함"], ["빠른 픽업 · 주문", "편의성 강조", "브랜드 감정은 남지 않음"], ["협업 · 시즌 메뉴", "바이럴 가능성", "캠페인 경험으로 이어지지 않음"]] },
            { type: "images", cols: 3, items: [["img/arch/r_market.jpg", "시장 상황"], ["img/arch/r_web.jpg", "현재 웹사이트 분석"], ["img/arch/r_mz.jpg", "글로벌 MZ 소비자 인사이트"]] }
          ] },

        { id: "st-idea", nav: "방향", room: "rB", eyebrow: "문제 정의와 캠페인 방향", title: "혜택은 있지만,<br>기억되는 첫 경험은 약하다",
          paras: [
            "그래서 단순히 ‘앱을 다운받으면 할인’이 아니라, QR을 찍는 순간부터|루이싱이라는 이름을 기억하고, 앱을 다운받아 루이싱 커피가 주는|혜택을 경험하도록 만드는 것을 과제로 잡았습니다.",
            "캠페인의 방향은 브랜드 네임과 연동해 인지도를 확보하는 것,|그리고 쿠폰을 뿌리는 브랜드에서 행운을 발견하게 하는|디지털 커피 브랜드로 인식을 전환하는 것으로 정했습니다.",
            "참여 대상을 파악해 보았을 때 글로벌 MZ세대, 그리고 커피를|가장 많이 소비하는 연령층 모두가 편하게 참여할 수 있는 콘텐츠는|어떤 것일까 생각해 보니, 스캔 한 번에 연결되는 QR 형식이|가장 적합하겠다고 판단하게 되었습니다."
          ],
          blocks: [
            { type: "copy", strike: "Looking for your luck?", main: "You’re missing your luck.", sub: "Scan before someone else claims it",
              text: "사람들이 QR을 찍게 만드는 감정은 행운을 얻고 싶은 마음보다|‘혹시 나만 놓치고 있는 게 있나?’에 더 가깝다고 생각했습니다.||그래서 뻔한 문장보다 사람들의 포모를 자극하는|‘You’re missing your luck’이라는 문구로 포스터를 만들고,|QR 코드를 찍어 보게 하는 방식으로 인앱 다운로드를 받는|프로모션을 기획하게 되었습니다.",
              img: "img/arch/r_poster.jpg" }
          ] },

        { id: "st-flow", nav: "플로우", room: "rN", eyebrow: "사용자 플로우", title: "포스터에서 앱 다운로드까지",
          paras: ["QR을 찍으면 웹사이트가 나오고, 브루잉되는 인터랙션이 돌아가며|랜덤한 쿠폰들이 떠오르고, 바로 인앱 다운로드까지 연결되게끔|만들었습니다. 단계마다 사용자가 느낄 감정까지 함께 적어 두고 디자인했습니다."],
          blocks: [
            { type: "steps", items: [["Entry", "미스터리 포스터", "“뭐지?”"], ["Brew", "브루잉 인터랙션", "“나만 놓치는 건가?”"], ["Reveal", "랜덤 쿠폰 공개", "“와! 받았다!”"], ["Claim", "앱 다운로드", "“한번 써볼까?”"], ["Share", "SNS 공유", "“나도 공유해야지!”"], ["Complete", "쿠폰 저장 · 첫 주문", "“좋아, 바로 써야지!”"]] },
            { type: "brewweb", title: "QR을 찍으면 열리는 브루잉 웹",
              text: "물 위에 떠 있는 클로버를 누르면 커피가 퍼지며 브루잉이 시작되고,|화면을 누르고 있으면 더 빠르게 저어지도록 만들었습니다.||브루잉이 끝나면 랜덤한 쿠폰 카드가 떠오르고,|바로 앱에서 쿠폰을 받을 수 있도록 연결됩니다.",
              link: ["직접 브루잉해 보기", "campaign/brew.html"],
              items: [["img/live/brew-1.jpg", "01 Entry", "You’re missing your luck. Tap to brew it."], ["img/live/brew-2.jpg", "02 Brewing", "누르고 있으면 더 빠르게 저어지는 브루잉"], ["img/live/brew-3.jpg", "03 Reveal", "랜덤 쿠폰 카드와 앱 연결"]] },
            { type: "images", cols: 1, items: [["img/hq/camp-userflow.jpg", "캠페인 사용자 플로우"]] }
          ] },

        { id: "st-ai", nav: "AI 비주얼", room: "rB", eyebrow: "AI를 활용한 비주얼 제작", title: "생성하고, 고르고, 직접 보정하기",
          paras: ["비주얼의 대부분은 ChatGPT와 미드저니로 생성했지만, 생성된 이미지를|그대로 사용하기보다는 원하는 결과가 나올 때까지 생성하고, 고르고,|직접 보정하는 과정을 반복했습니다."],
          blocks: [
            { type: "sub", no: "01", title: "각 나라의 매장 사진",
              chain: ["도시 무드 레퍼런스", "ChatGPT 매장 생성", "몇십 장 중 선택", "포토샵 색감 보정", "웹 시안 적용"],
              paras: [
                "한국에 런칭하게 되는 상황이기에 한국 메인 홈페이지에는|히어로에 영상을 배치하는 방향을 넣었습니다.",
            "이미 싱가포르와 중국, 뉴욕에 매장이 있다는 것을 알려 주고,|대표 메뉴 사진을 스타일리시하게 연출한 포스터를 배치했으며,|각국의 매장 사진들은 감성을 통일해 넣었습니다.",
                "웹사이트의 전체적인 색감을 통일하기 위해 ChatGPT에 각 지역의|도시 사진 무드 레퍼런스를 준 후 루이싱 커피 매장을 생성해 달라고 했습니다.",
            "몇십 장의 생성 끝에 매장이 잘 보이면서도 각국의 특색이 잘 드러나는|사진을 골랐고, 포토샵으로 전체적인 색감을 보정한 후|웹사이트 시안을 완성했습니다."
              ],
              candidates: ["gen1","gen2","gen3","gen4","gen5","gen6","gen7","gen8","gen9","gen10","gen11","gen12","g3a","g3b","g3c","g3d"],
              cities: [["CHINA", "img/live/site-china.jpg"], ["SINGAPORE", "img/live/site-singapore.jpg"], ["NEW YORK", "img/live/site-newyork.jpg"], ["SEOUL", "img/live/site-seoul.jpg"]],
              extra: { title: "대표 메뉴 포스터", items: ["img/arch/bot3.jpg", "img/arch/bot2.jpg", "img/arch/bot1.jpg"] } },
            { type: "sub", no: "02", title: "도트로 그린 도시 포스터",
              chain: ["도트 포스터 레퍼런스 수집", "도시별 랜드마크", "QR 코드 배치", "포스터 디자인"],
              paras: ["각 매장에도 그 나라의 특색을 나타내는 포스터가 있기를 바랐습니다.|그래서 한국과 중국, 미국, 싱가포르의 도시들을 나타내는|특색 있는 포스터를 만들었습니다.",
            "QR 코드가 자연스럽게 배치되면서 각 도시의 무드를 나타내는 포스터를|만들려면 도트화로 그리면 좋겠다고 생각했고, 몇 가지 도트 타입 포스터|레퍼런스를 수집한 후 QR 코드와 각 도시의 랜드마크가 잘 녹아 있는|포스터들을 디자인하게 되었습니다."],
              posters: ["img/arch/poster1.jpg", "img/arch/poster2.jpg", "img/arch/poster3.jpg", "img/arch/poster4.jpg"] },
            { type: "sub", no: "03", title: "출근길 지하철 히어로 영상",
              chain: ["Midjourney 이미지 생성", "업스케일링", "포토샵 로고 · 간판 합성", "Midjourney 영상 생성"],
              paras: ["메인 히어로에 들어가는 영상은, 커피를 가장 많이 소비하는 현대인들이|가장 많이 지나다니는 곳이 어디일까 생각했을 때 바로 떠오른|직장인들의 출근길 지하철로 정했습니다.",
            "그래서 미드저니를 통해 각기 다른 플랫폼들과 사람들이 지나다니는|바쁜 길목 등을 생성했습니다. 미드저니가 타이포에 약해서, 생성된|이미지들은 업스케일링 후 어도비 포토샵 후보정으로 직접 로고를|플랫폼에 넣거나 간판에 배치했습니다.",
            "그 후 다시 미드저니에서 영상으로 생성해, 포스터를 메인으로|장면이 자연스럽게 전환되는 캠페인 느낌의 영상을 제작해 넣게 되었습니다."],
              seq: [["img/arch/e3.jpg", "Midjourney로 생성한 지하철"], ["img/arch/e4.jpg", "Midjourney로 생성한 플랫폼"], ["img/hq/camp-subway.jpg", "로고와 포스터를 직접 합성한 장면"]],
              story: [["img/arch/story1.jpg", "WAIT"], ["img/arch/story2.jpg", "Did you miss something?"], ["img/arch/story3.jpg", "You’re missing your luck."], ["img/arch/story4.jpg", "Tap to brew it."]] }
          ] },

        { id: "st-web", nav: "웹사이트", room: "rN", eyebrow: "캠페인 웹사이트와 인터랙션", title: "시안에서 실제 웹사이트까지",
          paras: ["원본 시안을 먼저 만든 후, 그 위에 섹션별로 적용할 인터랙션을|직접 적어 가며 발전시켰습니다.",
            "웹페이지에서는 각 매장의 사진이 나올 때 카드가 플립되며 회전하면|재미를 줄 수 있겠다는 생각이 들어, 각 섹션마다 라이트 버전과|다크 버전 2개를 배치했습니다."],
          blocks: [
            { type: "site", title: "구현한 캠페인 웹사이트", text: "완성한 캠페인 웹사이트는 직접 구현해 올려 두었습니다.|히어로의 지하철 영상부터 메뉴 포스터, 지도, 도시별 매장 카드까지|시안에서 설계한 흐름 그대로 이어집니다.",
              link: ["캠페인 웹사이트 보기", "campaign/index.html"],
              items: [["img/live/site-subway.jpg", "Subway"], ["img/live/site-posters.jpg", "Posters"], ["img/live/site-map.jpg", "Brewing Luck Around the World"], ["img/live/site-seoul.jpg", "Seoul, we have arrived."]] },
            { type: "flips", text: "카드를 누르면 실제 웹에서처럼 뒤집힙니다.", items: [["img/arch/flip_sh_b.jpg", "img/arch/flip_sh_w.jpg", "Shanghai"], ["img/arch/flip_sg_b.jpg", "img/arch/flip_sg_w.jpg", "Singapore"], ["img/arch/flip_ny_b.jpg", "img/arch/flip_ny_w.jpg", "New York"]] },
            { type: "notes", items: [["히어로", "영상 위에 20% 정도 어둡게 깔고 그 위에 LUCKIN COFFEE와 내비게이션, 로고를 배치했습니다. 폰트는 전체 Inter, 굵기는 Black, 자간은 -8%로 설정했으며 소리도 나올 수 있도록 했습니다."], ["지도", "지도 위치에 마우스를 올리면 호버 반응으로 매장 아이콘이 나타나도록 했습니다."], ["매장 카드", "마우스를 올리면 화면이 어두워지면서 유기체 블러 처리가 되고, 입체적인 카드가 팝업됩니다. 검은 카드에서 드래그하면 플립되면서 하얀 카드로 바뀌고, 다시 드래그하면 검은 카드로 돌아옵니다."]] },
            { type: "tall2", items: [["img/arch/home.jpg", "원본 시안"], ["img/arch/homeint.jpg", "인터랙션을 적어 둔 시안"]] }
          ] },

        { id: "st-build", nav: "구현", room: "rB", eyebrow: "웹사이트 구현", title: "시안과 설계도를 프롬프트로",
          paras: [
            "인터랙션과 각각의 요소들을 자세히 배치하려면|코딩으로는 많은 시간이 걸리게 됩니다.",
            "그래서 시안을 다 만든 후 웹사이트 구현은, 시안 사진을 쭉 깔고|각 섹션마다 담당될 부분을 설계도처럼 직접 만든 다음,|사진 이미지 시안과 설계도 시안, 섹션마다 요구했던 부분을 정리한 글 등을|프롬프트로 정리해 넣었습니다.",
            "그렇게 해서 기획 단계에는 꽤 많은 시간이 걸렸지만,|웹사이트 빌딩 자체의 시간은 많이 단축할 수 있었습니다."
          ],
          blocks: [{ type: "chainbig", items: [["01", "시안 이미지", "완성한 시안 사진을 쭉 깔기"], ["02", "설계도", "섹션마다 담당될 부분 표시"], ["03", "요구사항 글", "섹션별 인터랙션 정리"], ["04", "프롬프트", "세 가지를 묶어서 전달"]] },
                   { type: "images", cols: 1, items: [["img/hq/camp-home-memo.jpg", "섹션별 요구사항을 적어 둔 시안"]] }] },

        { id: "st-kpi", nav: "KPI", room: "rB", eyebrow: "KPI 목표", title: "이렇게 성과를 확인하고 싶었습니다",
          paras: ["광고에서 랜딩, 랜딩에서 다운로드, 다운로드에서 첫 구매, 그리고|재방문과 재구매로 이어지는 흐름을 기준으로 목표 수치를 잡았습니다.|실제 집행 결과가 아닌 기획 단계의 목표입니다."],
          blocks: [{ type: "kpi", items: [["QR 스캔", "100,000회"], ["웹 경험 완료율", "60%"], ["앱 설치 전환율", "25%"], ["리워드 수령률", "40%"], ["첫 주문 전환율", "30–40%"]] }] }
      ],
      closing: { title: "마치며", paras: [
        "이번 작업에서는 AI를 많이 활용했지만, 생성된 이미지 중 브랜드에 맞는 것을 고르고,|색감을 맞추고, 로고 하나까지 직접 넣는 과정은 결국 제가 판단해야 하는 부분이었습니다.",
        "또한 기획 단계에서 시안과 설계도, 요구사항을 꼼꼼하게 정리해 두었기 때문에 웹사이트를|빌딩하는 시간을 많이 줄일 수 있었고, 생각을 정리하는 데 들인 시간이|결국 작업 전체를 빠르게 만들어 준다는 것을 느낄 수 있었던 작업입니다."
      ] }
    },
    archive: {
      title: "작업 소스",
      lead: "피그마 파일에 정리하지 않은 채로 쌓여 있던 작업 소스들입니다. 이미지 레이어는 211개, 그중 ChatGPT로 생성해 남겨 둔 이미지는 116장이며, 고르는 과정에서 버린 것까지 합하면 훨씬 많습니다.",
      groups: [
        ["리서치 · 기획", "시장 상황부터 문제 정의, 타겟, KPI, 캠페인 컨셉까지", ["r_title","r_market","r_mkt2","r_brand","r_feature","r_web","r_problem","r_dir","r_mz","r_copy","r_target","r_kpi","r_concept","r_poster","r_mood"]],
        ["QR 웹 · 플로우 시안", "You're missing your luck 웹을 여러 번 다시 그린 흔적", ["e1","gpt_early","e2","e6","brewweb","flow"]],
        ["ChatGPT 매장 생성 후보", "도시 무드 레퍼런스를 주고 생성한 매장 사진 중 일부입니다", ["gen1","gen2","gen3","gen4","gen5","gen6","gen7","gen8","gen9","gen10","gen11","gen12","g3a","g3b","g3c","g3d"]],
        ["메뉴 · 포스터", "대표 메뉴 컷, 메뉴 포스터, 도트 포스터, Midjourney 실험", ["menu1","menu2","menu3","bot3","bot2","bot1","poster_hey","poster1","poster2","poster3","poster4","e5","mj1","mj2","mj3"]],
        ["도시 플립 카드", "상하이 · 싱가포르 · 뉴욕, 다크와 라이트 두 장씩", ["flip_sh_b","flip_sh_w","flip_sg_b","flip_sg_w","flip_ny_b","flip_ny_w"]],
        ["히어로 영상 · 스토리보드", "Midjourney 지하철 컷, 로고를 합성한 최종 장면, 모바일 스토리보드", ["e3","e4","subway","seoul","story1","story2","story3","story4"]],
        ["홈페이지 시안", "원본 시안과 섹션별 인터랙션 메모 버전", ["home","homeint"]]
      ],
      note: [
        "중국에서 이미 폭발적인 인기로 중국 시장에서는 스타벅스보다 매장 수가 많은 루이싱 커피가 한국에 런칭한다면 어떨까라는 발상에서 시작되었습니다. 또한 글로벌로 런칭할 때도 맥락이 이어지길 바라는 마음으로 기획을 시작하게 되었습니다.",
        "루이싱 커피는 앱을 처음 다운로드하면 쿠폰을 발급해 줍니다. 거의 공짜 커피 한 잔을 주는 셈입니다. 원래도 저가 커피이지만, 이 혜택을 더 재밌게 전달하면서 인앱 다운로드 수를 늘리고 브랜드의 이름까지 직관적으로 전달할 수 있는 방법이 무엇인지 고민했습니다. 그러던 중 루이싱의 이름(luck + in의 합성어)과 처음 받아보는 혜택인 공짜 커피를 연결해 보면 재미있겠다는 생각을 하게 되었습니다.",
        "참여 대상을 파악해 보았을 때 글로벌 MZ세대, 그리고 커피를 가장 많이 소비하는 연령층 모두가 편하게 참여할 수 있는 콘텐츠는 어떤 것일까 생각해 보니, 스캔 한 번에 연결되는 QR 형식이 가장 적합하겠다고 판단하게 되었습니다.",
        "그 결과 ‘You’re missing your luck’이라는 문구를 활용해 포스터를 만들고, 사람들의 포모를 자극해 QR 코드를 찍어 보게 하는 방식으로 인앱 다운로드를 받는 프로모션을 기획하게 되었습니다. QR을 찍으면 웹사이트가 나오고, 브루잉되는 인터랙션이 돌아가며 랜덤한 쿠폰들이 떠오르고, 바로 인앱 다운로드까지 연결되게끔 만들었습니다.",
        "한국에 런칭하게 되는 상황이기에 한국 메인 홈페이지에는 히어로에 영상을 배치하는 방향을 넣었습니다. 이미 싱가포르와 중국, 뉴욕에 매장이 있다는 것을 알려 주고, 대표 메뉴 사진을 스타일리시하게 연출한 포스터를 배치했으며, 각국의 매장 사진들은 감성을 통일해 넣었습니다.",
        "웹사이트의 전체적인 색감을 통일하기 위해 ChatGPT에 각 지역의 도시 사진 무드 레퍼런스를 준 후 루이싱 커피 매장을 생성해 달라고 했습니다. 몇십 장의 생성 끝에 매장이 잘 보이면서도 각국의 특색이 잘 드러나는 사진을 골랐고, 포토샵으로 전체적인 색감을 보정한 후 웹사이트 시안을 완성했습니다.",
        "각 매장에도 그 나라의 특색을 나타내는 포스터가 있기를 바랐습니다. 그래서 한국과 중국, 미국, 싱가포르의 도시들을 나타내는 특색 있는 포스터를 만들었습니다. QR 코드가 자연스럽게 배치되면서 각 도시의 무드를 나타내는 포스터를 만들려면 도트화로 그리면 좋겠다고 생각했고, 몇 가지 도트 타입 포스터 레퍼런스를 수집한 후 QR 코드와 각 도시의 랜드마크가 잘 녹아 있는 포스터들을 디자인하게 되었습니다.",
        "웹페이지에서는 각 매장의 사진이 나올 때 카드가 플립되며 회전하면 재미를 줄 수 있겠다는 생각이 들어, 각 섹션마다 라이트 버전과 다크 버전 2개를 배치했습니다.",
        "메인 히어로에 들어가는 영상은, 커피를 가장 많이 소비하는 현대인들이 가장 많이 지나다니는 곳이 어디일까 생각했을 때 바로 떠오른 직장인들의 출근길 지하철로 정했습니다. 그래서 미드저니를 통해 각기 다른 플랫폼들과 사람들이 지나다니는 바쁜 길목 등을 생성했습니다. 미드저니가 타이포에 약해서, 생성된 이미지들은 업스케일링 후 어도비 포토샵 후보정으로 직접 로고를 플랫폼에 넣거나 간판에 배치했습니다. 그 후 다시 미드저니에서 영상으로 생성해, 포스터를 메인으로 장면이 자연스럽게 전환되는 캠페인 느낌의 영상을 제작해 넣게 되었습니다.",
        "시안을 다 만든 후 웹사이트 구현은, 시안 사진을 쭉 깔고 각 섹션마다 담당될 부분을 설계도처럼 직접 만든 다음, 사진 이미지 시안 + 설계도 시안 + 섹션마다 요구했던 부분을 정리한 글 등을 프롬프트로 정리해 넣었습니다. 그렇게 해서 기획 단계에는 꽤 많은 시간이 걸렸지만, 웹사이트 빌딩 자체의 시간은 많이 단축할 수 있었던 작업입니다."
      ]
    },
    reflection: {
      quote: "생성은 AI가,<br><em>고르고 다듬는 건</em> 제가.",
      learnings: [
        ["Target · 목표 수치", "QR 스캔 100,000회, 웹 경험 완료율 60%, 앱 설치 전환율 25%, 리워드 수령률 40%, 첫 주문 전환율 30–40%."],
        ["What I learned", "AI가 이미지를 몇십 장 만들어 줘도 무엇이 브랜드에 맞는지 고르고, 색을 맞추고, 로고 하나까지 넣는 건 결국 제 몫이었습니다. 인터랙션과 요소가 많은 웹사이트를 짧은 시간 안에 완성할 수 있었던 건 기획 단계에서 시안과 설계도, 요구사항을 꼼꼼하게 정리해 두었기 때문이었고, 생각을 정리하는 데 쓴 시간이 결국 가장 빠른 길이었습니다."]
      ]
    }
  },

  additable: {
    tab: "additable",
    meta: ["Pamphlet Redesign", "additable", "Case 05"],
    titleLines: ["Beyond sight,", "into sense."],
    hero: { kind: "image", src: "img/add-object.jpg", alt: "additable 리브드 글라스 조명 오브제" },
    statement: "시각을 넘어, <strong>감각</strong>을 경험하도록.",
    overview: "additable은 3D 프린팅으로 새로운 조형의 조명 오브제를 만드는 브랜드다. 기존 팜플렛은 제품 위주의 따뜻한 무드라, 브랜드가 가진 감각적인 조형과 기술이 드러나지 않았다. 브랜드 소개를 더하고 무드를 modern cool로 바꿔, 오브제를 보는 것을 넘어 감각으로 느끼게 하는 팜플렛으로 다시 만들었다.",
    facts: [["Role", null], ["Period", null], ["Team", null], ["Tools", null]],
    context: {
      diagnosis: { vis: { kind: "image", src: "img/add-old.jpg", alt: "기존 additable 팜플렛" }, pts: [[22, 40], [72, 86]], title: "기존 팜플렛", issues: [
        ["제품 위주의 구성", "제품 사진과 스펙이 중심이라 브랜드가 어떤 회사인지 소개되지 않는다."],
        ["warm & cozy 무드", "무드등이라는 제품 특성만 고려한 따뜻한 톤이라, 3D 프린팅 오브제의 감각적인 조형이 묻힌다."]
      ] },
      shifts: [["무드", "warm & cozy", "modern cool"], ["구성", "제품 위주", "브랜드 소개 + 제품"], ["강조", "무드등의 따뜻함", "3D 프린팅 조형과 기술"]],
      insight: "따뜻한 조명이 아니라,<br><em>새로운 조형</em>을 보여줘야 했다.",
      insightNote: "제품 위주의 따뜻한 느낌에서, 감각적인 오브제를 3D 프린팅하는 브랜드의 특성을 더하는 방향으로 바꿨다."
    },
    process: [
      ["Audit", "기존 팜플렛의 제품 위주 구성과 warm & cozy 무드를 분석했다."],
      ["Direction", "modern cool 무드와 브랜드 소개를 더하는 방향을 정했다."],
      ["Cover", "리브드 글라스 질감 너머의 조명을 형상화해 표지를 만들었다."],
      ["Layout", "다양한 공간에 놓인 제품으로 활용도를 보여주는 내지를 구성했다."]
    ],
    decisions: [
      { tag: "Decision 01", title: "따뜻한 무드에서 차가운 감각으로",
        body: "기존 팜플렛의 warm & cozy를 modern cool로 바꿔, 조명보다 오브제의 조형이 먼저 보이게 했다.",
        visual: { kind: "web", plain: true, before: { src: "img/add-old.jpg" }, after: [{ src: "img/add-cover.jpg" }] },
        problem: "제품 위주의 따뜻한 무드라, 감각적인 오브제를 3D 프린팅하는 브랜드의 특성이 드러나지 않는다.",
        evidence: "additable의 차별점은 새로운 조형의 유니크한 오브제와 이를 만드는 3D 프린팅 기술이다.",
        solution: "딥 네이비와 아이스 블루의 <strong>modern cool</strong> 톤, 얇은 산세리프 로고로 오브제가 먼저 보이게 했다." },
      { tag: "Decision 02", title: "조명 대신 빛의 질감을 표지에",
        body: "리브드 글라스 특유의 질감을 넘어 나오는 빛을 그래픽으로 형상화하고, 브랜드 철학을 타이틀에 배치했다.",
        visual: { kind: "web", plain: true, before: null, after: [{ src: "img/add-spread.jpg" }] },
        problem: "제품 사진만으로는 브랜드 스토리와 차별화된 기술이 전달되지 않는다.",
        evidence: "리브드 글라스를 통과해 번지는 빛이 additable 제품의 가장 큰 특징이다.",
        solution: "빛을 형상화한 그래픽과 <strong>브랜드 철학 타이틀</strong>로 브랜드 스토리와 기술을 함께 보여줬다." },
      { tag: "Decision 03", title: "스튜디오샷을 줄이고, 놓인 공간을 보여주기",
        body: "제품에 집중할 수 있도록 제품 소개를 강조하고, 다양한 곳에 배치된 모습으로 활용도를 보여줬다.",
        visual: { kind: "web", plain: true, before: null, after: [{ src: "img/add-inside.jpg" }] },
        problem: "스튜디오샷이 강조될수록 오히려 제품에 집중하기 어려울 거라고 판단했다.",
        evidence: "브랜드의 차별화된 부분을 강조하려면 제품 소개가 중심이 되어야 한다.",
        solution: "제품 소개를 강조하고, <strong>다양한 공간에 배치된 제품</strong>으로 활용도를 소개했다." }
    ],
    compare: null,
    reflection: {
      quote: "보는 팜플렛에서,<br><em>느끼는</em> 팜플렛으로.",
      learnings: [["What I learned", null], ["Next", null]]
    }
  }
};
const ORDER = ["compose", "guess", "luckin-web", "luckin-campaign", "additable"];

/* Atmosphere per project: blurred colour fields instead of flat fills (tokens: atm-a / atm-b / glass). */
const ATM = {
  compose: { "atm-a":"radial-gradient(55% 45% at 50% 30%,rgba(255,210,58,.85),rgba(255,214,80,.35) 45%,transparent 72%),radial-gradient(40% 35% at 95% 85%,rgba(255,186,30,.35),transparent 70%),radial-gradient(35% 30% at 0% 70%,rgba(255,226,140,.45),transparent 70%),linear-gradient(180deg,#fffdf6,#fff4d2)",
    "atm-b":"radial-gradient(40% 30% at 100% 0%,rgba(255,210,58,.30),transparent 70%),radial-gradient(45% 35% at 0% 100%,rgba(255,200,60,.22),transparent 70%),#fbf8f0",
    "a-bg":"#fff6da","a-card":"rgba(255,255,255,.5)","a-glass":"rgba(255,255,255,.5)","a-gline":"rgba(255,255,255,.85)","b-glass":"rgba(255,255,255,.62)","b-gline":"rgba(255,255,255,.9)","b-after":"#fff2c8","grain":".14" },
  guess: { "atm-a":"radial-gradient(55% 50% at 15% 0%,rgba(92,135,230,.55),transparent 70%),radial-gradient(45% 45% at 95% 70%,rgba(56,100,200,.5),transparent 70%),repeating-linear-gradient(135deg,rgba(255,255,255,.025) 0 2px,transparent 2px 6px),linear-gradient(170deg,#132652,#1f3a72 55%,#223f7c)",
    "atm-b":"radial-gradient(40% 35% at 100% 0%,rgba(80,130,255,.18),transparent 70%),radial-gradient(45% 40% at 0% 100%,rgba(140,170,240,.22),transparent 70%),#f3f4f7",
    "a-glass":"rgba(255,255,255,.07)","a-gline":"rgba(255,255,255,.16)","b-glass":"rgba(255,255,255,.66)","b-gline":"rgba(255,255,255,.95)","grain":".12" },
  "luckin-web": { "atm-a":"radial-gradient(50% 50% at 75% 15%,rgba(120,150,255,.75),transparent 70%),radial-gradient(50% 45% at 5% 95%,rgba(10,30,170,.7),transparent 70%),radial-gradient(30% 30% at 40% 60%,rgba(170,200,255,.25),transparent 70%),#2348e8",
    "atm-b":"radial-gradient(40% 35% at 100% 0%,rgba(35,72,232,.16),transparent 70%),radial-gradient(45% 40% at 0% 100%,rgba(120,160,255,.22),transparent 70%),#f6f8ff",
    "a-glass":"rgba(255,255,255,.1)","a-gline":"rgba(255,255,255,.24)","b-glass":"rgba(255,255,255,.66)","b-gline":"rgba(255,255,255,.95)","grain":".12" },
  "luckin-campaign": { "atm-a":"radial-gradient(45% 40% at 50% 0%,rgba(47,91,255,.55),transparent 72%),radial-gradient(35% 35% at 100% 100%,rgba(40,70,220,.3),transparent 70%),radial-gradient(30% 30% at 0% 60%,rgba(90,60,255,.18),transparent 70%),#06070b",
    "atm-b":"radial-gradient(40% 35% at 100% 0%,rgba(47,91,255,.2),transparent 70%),radial-gradient(45% 40% at 0% 100%,rgba(130,150,255,.24),transparent 70%),#eef1fb",
    "a-glass":"rgba(140,165,255,.07)","a-gline":"rgba(140,165,255,.2)","b-glass":"rgba(255,255,255,.66)","b-gline":"rgba(255,255,255,.95)","grain":".16" },
  additable: { "atm-a":"radial-gradient(45% 40% at 20% 15%,rgba(255,255,255,.95),transparent 70%),radial-gradient(45% 45% at 85% 55%,rgba(150,195,250,.75),transparent 70%),radial-gradient(40% 35% at 30% 95%,rgba(185,215,250,.8),transparent 70%),linear-gradient(180deg,#e3edf9,#cfe0f5)",
    "atm-b":"radial-gradient(40% 35% at 100% 0%,rgba(140,190,255,.3),transparent 70%),radial-gradient(45% 40% at 0% 100%,rgba(190,220,255,.4),transparent 70%),#f4f7fb",
    "a-glass":"rgba(255,255,255,.45)","a-gline":"rgba(255,255,255,.85)","b-glass":"rgba(255,255,255,.6)","b-gline":"rgba(255,255,255,.95)","grain":".1" }
};


/* Real screens, in the order a user meets them. kind: phones | web. wide: an extra full-width board. */
const JOURNEY = {
  compose: { title: "홈에서 결제까지, <b>멈추지 않는</b> 주문 흐름", kind: "phones",
    items: [["img/compose-after.jpg", "홈", "주문 버튼이 첫 화면에"], ["img/compose-store-list.jpg", "매장 선택", "가까운 매장 목록"], ["img/compose-store-map.jpg", "지도", "지도에서 바로 찾기"],
            ["img/compose-menu.jpg", "메뉴", "추천 메뉴부터"], ["img/compose-product.jpg", "상품", "수량 고르고 주문하기"], ["img/compose-checkout.jpg", "주문서", "요청사항 · 쿠폰"],
            ["img/compose-confirm.jpg", "매장 확인", "주문 전 매장 한 번 더"], ["img/compose-pay.jpg", "결제", "카드 간편결제"]],
    extra: { title: "주문을 더 빠르게", items: [["img/compose-barcode.jpg", "멤버십 바코드", "홈에서 바로 꺼내는 바코드"], ["img/compose-card.jpg", "카드 간편결제", "카드를 미리 등록해 두는 화면"]] } },
  guess: { title: "같은 흐름을 <b>실제 화면</b>으로 따라가 보기", kind: "phones",
    items: [["img/guess-main.jpg", "Archive Feed", "캠페인 비주얼로 시작"], ["img/guess-fitarchive.jpg", "Fit Archive", "핏별로 비교하는 데님 아카이브"], ["img/guess-fitscan.jpg", "Fit Scan", "전신 스캔으로 핏 분석"],
            ["img/guess-detail.jpg", "Product Detail", "Perfect Fit 추천"], ["img/guess-mypage.jpg", "My Archive · Pass", "핏 프로필과 Archive Pass"]],
    wide: ["img/guess-wireflow.jpg", "와이어플로우 · 아카이브 피드 홈 → 데님 핏 아카이브 → 핏 스캔 → 핏 분석 결과 → 상품 상세 → 내 데님 아카이브 → 결제"] },
  "luckin-web": { title: "한 잔의 비주얼에서 <b>앱 다운로드</b>까지", kind: "web",
    items: [["img/lkweb-hero.jpg", "Hero", "한 잔의 제품 비주얼"], ["img/lkweb-quality.jpg", "Quality", "카드로 읽는 품질 이야기"], ["img/lkweb-nearby.jpg", "Find Nearby", "가까운 매장 찾기"], ["img/lkweb-easy.jpg", "Easy", "앱으로 이어지는 주문"]] },
  "luckin-campaign": { title: "지하철 포스터 한 장에서 <b>도시의 행운</b>까지", kind: "web",
    items: [["img/hq/camp-subway.jpg", "Hero Video", "출근길 지하철에서 포스터로"], ["img/camp-posters.jpg", "Poster Series", "도시마다 이어지는 포스터"], ["img/hq/camp-brew-hero.jpg", "QR Web", "You're missing your luck"], ["img/camp-web-map.jpg", "Lucky Map", "지도에 마우스를 올리면 매장이"], ["img/camp-web-city.jpg", "City Cards", "드래그하면 뒤집히는 도시 카드"]],
    wide: ["img/hq/camp-mj.jpg", "Midjourney로 포스터 무드를 실험한 초기 결과물들. 피그마 파일에는 이미지 레이어 211개, ChatGPT 생성 이미지 116장이 정리되지 않은 채 남아 있습니다."] },
  additable: { title: "표지에서 공간까지, <b>빛의 질감</b>으로 이어지는 팜플렛", kind: "web",
    items: [["img/add-cover.jpg", "Cover", "빛을 형상화한 표지"], ["img/add-spread.jpg", "Spread", "펼침면 구성"], ["img/add-inside.jpg", "Inside", "공간에 놓인 제품"]] }
};
/* Symbols */
const ICONS = {
  up:'<path d="M12 19V5M5 12l7-7 7 7"/>',
  declutter:'<path d="M4 7h16M7 12h10M10 17h4"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-1.2-1-1.4-1-2.4 0-.9.7-1.5 1.6-1.5H16a5 5 0 0 0 5-5c0-4-4-7.5-9-7.5z"/><path d="M7.5 11h.01M10 7.5h.01M14.5 7.5h.01"/>',
  sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v4M17 19h4"/>',
  scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
  bookmark:'<path d="M6 4h12v17l-6-4-6 4z"/>',
  nav:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7.5 15h.01M12 15h.01M16.5 15h.01"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  "arrow-out":'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  qr:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3.4 3.2 14.6 0 18M12 3c-3.2 3.4-3.2 14.6 0 18"/>',
  drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  light:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/>',
  archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>',
  frame:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/>'
};
const ic = k => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ""}</svg>`;

/* Intent map + Problem→Fix board. fixes[i] lines up with decisions[i]; pts = [x%, y%, decision index] on the finished screen. */
const FX = {
  compose: {
    intent: { kind: "phone", src: "img/compose-after.jpg", title: "앱을 여는 순간 <b>주문</b>까지, 한 화면에 담은 세 가지 의도", pts: [[82, 53, 0], [28, 66, 1], [50, 96.5, 2]] },
    fixes: [["up", "Order First", "하단 탭에 묻힌 주문 버튼", "첫눈에 보이는 큰 주문 버튼"],
            ["declutter", "Less Noise", "화면 중앙을 차지한 스탬프 10칸", "늘 마시던 메뉴 바로 주문"],
            ["palette", "Brand Color", "연한 회색 하단 아이콘", "컴포즈 옐로 아이콘"]] },
  guess: {
    intent: { kind: "phone", src: "img/guess-main.jpg", title: "할인 쇼핑몰이 아니라 <b>데님 아카이브</b>로 읽히게", pts: [[60, 33, 0], [27, 81, 1], [88, 82, 2]] },
    fixes: [["sparkle", "Brand First", "화면을 덮는 프로모션 배너", "캠페인 비주얼 아카이브 피드"],
            ["archive", "Denim Archive", "옵션 · 가격 중심의 상품 나열", "핏별로 분류한 데님 핏 아카이브"],
            ["scan", "Fit Confidence", "확신할 수 없는 기장과 핏", "핏 아카이브 · Fit Scan · Perfect Fit"],
            ["bookmark", "Loyalty", "구매로 끝나는 거래", "쌓이는 Archive Pass"],
            ["nav", "Simple Nav", "꽉 찬 하단 바 두 줄", "핵심 기능 다섯 개"]] },
  "luckin-web": {
    intent: { kind: "web", src: "img/lkweb-hero.jpg", title: "기술은 숨기고, <b>한 잔의 비주얼</b>로 설득한다", pts: [[52, 38, 0], [20, 42, 1], [93, 62, 2]] },
    fixes: [["eye", "Visual Proof", "바둑판식 나열 · 저화질 이미지", "한 잔의 제품 비주얼 히어로"],
            ["layers", "Scroll Story", "빽빽한 줄글", "세 장의 카드 스토리"],
            ["arrow-out", "Web to App", "앱으로 이어지지 않는 웹", "Find Nearby · Download App"]] },
  "luckin-campaign": {
    intent: { kind: "image", src: "img/camp-hero.jpg", title: "할인이 아니라 <b>놓치기 싫은 행운</b>으로", pts: [[50, 22, 0], [55, 63, 1]] },
    fixes: [["qr", "Scan Once", "가격 중심 쿠폰", "스캔 한 번에 연결되는 QR"],
            ["bolt", "FOMO", "Looking for your luck?", "You’re missing your luck"],
            ["eye", "Korea Home", "투자 정보뿐인 웹", "히어로 영상 · 메뉴 포스터"],
            ["sparkle", "AI + Curation", "제각각인 매장 사진", "골라서 색감을 통일한 매장"],
            ["frame", "Dot Posters", "흔한 도시 사진", "QR과 랜드마크를 녹인 도트 포스터"],
            ["layers", "Flip Cards", "나열된 매장 사진", "라이트 · 다크로 뒤집히는 카드"],
            ["globe", "Commute Hero", "타이포가 깨진 생성 이미지", "로고를 합성한 지하철 영상"],
            ["arrow-out", "Prompt Blueprint", "요소마다 오래 걸리는 코딩", "시안 + 설계도 + 요구사항 프롬프트"]] },
  additable: {
    intent: { kind: "image", src: "img/add-cover.jpg", title: "따뜻한 조명이 아니라 <b>차갑게 번지는 빛</b>으로", pts: [[40, 85, 0], [78, 40, 1]] },
    fixes: [["drop", "Modern Cool", "Warm & cozy", "Modern cool"],
            ["light", "Light Texture", "제품 사진뿐인 표지", "빛을 형상화한 표지"],
            ["frame", "In Place", "스튜디오샷 중심", "공간에 놓인 제품"]] }
};

