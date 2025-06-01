import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCoinStore } from "../store/coinStore";
import { usePurchaseStore } from "../store/purchaseStore";
import { products } from "../data/products";

export default function ProductPage() {
  const { addCoins, buyWithCoins } = useCoinStore();
  const { addPurchase } = usePurchaseStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handlebuy = (product: (typeof products)[number]) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용이 가능합니다.");
      navigate("/login");
      return;
    }
    const success = buyWithCoins(product.price);
    if (success) {
      addPurchase(product);
      alert(`🎉 ${product.name} 구매 성공!`);
    } else {
      alert("코인이 부족합니다ㅠ");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🛒 상품 목록</h2>
      {/* 상품 목록 표시 예정 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4 border rounded text-center shadow"
          >
            <img
              className="w-24 h-24 mx-auto mb-2"
              src={product.imageUrl}
              alt={product.name}
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="mb-2">💰 {product.price}코인</p>
            <button
              onClick={() => handlebuy(product)}
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              구매
            </button>
          </li>
        ))}
      </ul>

      <hr className="my-6" />

      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold">개발자 모드</h3>
        <button
          onClick={() => addCoins(100)}
          className="px-4 py-1 bg-green-500 text-white rounded"
        >
          💰 코인 100개 충전
        </button>
      </div>
    </div>
  );
}
