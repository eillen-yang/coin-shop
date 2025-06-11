import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCoinStore } from "../store/coinStore";
import GenericForm from "../components/common/GenericForm";

type SimpleProduct = {
  name: string;
  price: number;
};

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

      <GenericForm<SimpleProduct>
        initialData={{ name: "", price: 0 }}
        fields={[
          { key: "name", label: "상품명", type: "text" },
          { key: "price", label: "가격", type: "number" },
        ]}
        onSubmit={(data) => {
          console.log("등록된 상품:", data);
          alert(`"${data.name}" 상품이 등록되었습니다.`);
        }}
      />
    </div>
  );
}
