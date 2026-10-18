export type Product = {
  id: string;
  name: string;
  desc: string;
  detail: string;
  price: number;
  emoji: string;
  from: string;
  to: string;
};

export const STORE = {
  name: "gabby",
  headline: "매일 입어도 질리지 않는 베이직 웨어",
  story:
    "gabby는 유행보다 오래 입는 옷을 만듭니다. 군더더기 없는 실루엣과 탄탄한 원단, 어디에나 어울리는 색만 골랐어요. 한 벌을 사도 열 번 다르게 입을 수 있는 옷장을 목표로 합니다.",
  kakao: "준비중",
  bank: "국민은행",
  account: "123456-01-234567",
  holder: "가비",
  phone: "010-1234-5678",
};

export const products: Product[] = [
  { id: "wool-coat", name: "오버사이즈 울 코트", desc: "어깨선이 떨어지는 롱 싱글 코트", detail: "울 70% 혼방 원단으로 가볍고 따뜻합니다. 어깨선을 내려 재단해 니트 위에 입어도 여유 있고, 무릎 아래까지 내려오는 기장이라 바람막이 역할까지 해요. 프리 사이즈 / 차콜·베이지.", price: 189000, emoji: "🧥", from: "#2f3640", to: "#8a93a3" },
  { id: "heavy-tee", name: "헤비 코튼 티셔츠", desc: "20수 원단의 탄탄한 반팔 티", detail: "20수 코튼 100%의 두툼한 원단으로 세탁 후에도 목이 늘어나지 않습니다. 박시한 핏이라 혼자 입어도, 셔츠 안에 받쳐도 좋아요. S–XL / 화이트·블랙·그레이.", price: 39000, emoji: "👕", from: "#e9ecf5", to: "#9fb0f0" },
  { id: "straight-denim", name: "스트레이트 데님 팬츠", desc: "허리부터 밑단까지 곧게 떨어지는 핏", detail: "12oz 생지 데님으로 입을수록 몸에 맞게 길이 듭니다. 하이웨스트 스트레이트 핏, 밑단은 롤업 없이 입을 수 있는 기장이에요. 26–34 / 미디엄 블루.", price: 69000, emoji: "👖", from: "#27408b", to: "#6f8fe0" },
  { id: "lambs-cardigan", name: "램스울 니트 가디건", desc: "단추 하나로 분위기가 달라지는 니트", detail: "부드러운 램스울을 촘촘하게 짰습니다. 앞단추를 모두 채우면 니트, 열면 가벼운 아우터로 입어요. 프리 사이즈 / 오트밀·네이비.", price: 79000, emoji: "🧶", from: "#c9b8a6", to: "#efe6dc" },
  { id: "canvas-tote", name: "캔버스 에코 토트백", desc: "노트북까지 들어가는 넉넉한 사이즈", detail: "두꺼운 10온스 캔버스에 내부 포켓을 달았습니다. 어깨에 메도 끈이 파고들지 않고, 비 오는 날엔 안쪽만 닦아 쓰면 돼요. 가로 40 × 세로 36cm.", price: 29000, emoji: "👜", from: "#1a1a1a", to: "#4a5bd9" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const won = (n: number) => n.toLocaleString("ko-KR") + "원";
