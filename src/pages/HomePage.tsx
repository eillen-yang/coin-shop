import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCoinStore } from "../store/coinStore";

export default function HomePage() {
  const { addCoins } = useCoinStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleDraw = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용이 가능합니다.");
      navigate("/login");
      return;
    }
    const reward = Math.floor(Math.random() * 6);
    addCoins(reward);
    alert(`🎁 랜덤 박스 결과 : ${reward}개 코인을 획득했습니다 !!`);
  };

  return (
    <div className="mt-6 text-center">
      <h2 className="mb-4 text-2xl font-semibold">
        랜덤박스 코인샵에 오신 걸 환영합니다 🎁
      </h2>

      <button
        onClick={handleDraw}
        className="mb-4 py-2 px-6 bg-purple-500 text-white rounded"
      >
        🎁 뽑기 도전
      </button>
    </div>
  );
}
