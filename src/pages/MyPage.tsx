import { useCoinStore } from "../store/coinStore";
import { usePurchaseStore } from "../store/purchaseStore";
import { getCategoryStats } from "../utils/statistics";

export default function MyPage() {
  const purchases = usePurchaseStore((state) => state.purchases);
  const purchasesReset = usePurchaseStore((state) => state.reset);

  const coins = useCoinStore((state) => state.coins);
  const coinReset = useCoinStore((state) => state.reset);
  const totalCoinSpent = purchases.reduce((sum, p) => sum + p.price, 0);
  const totalCoinEarned = coins + totalCoinSpent;

  const categoryStats = getCategoryStats(purchases);

  const handleReset = () => {
    coinReset();
    purchasesReset();
  };

  console.log("categoryState", categoryStats, purchases);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">마이페이지</h2>
      <button
        onClick={handleReset}
        className="mb-4 p-2 bg-blue-600 text-white rounded"
      >
        코인 / 구매내역 초기화
      </button>

      <div className="mb-4 space-y-1">
        <p>💰 지금까지 모은 코인 : {totalCoinEarned}개</p>
        <p>🧾 사용한 코인 : {totalCoinSpent}개</p>
        <p>🪙 남은 코인 : {coins}개</p>
      </div>

      <h3 className="mt-6 mb-2 text-xl font-semibold">
        📊 카테고리별 구매 통계
      </h3>
      {Object.keys(categoryStats).length === 0 ? (
        <p className="text-gray-500">구매한 상품이 없습니다.</p>
      ) : (
        <ul className="space-y-1">
          {Object.entries(categoryStats).map(([category, total]) => (
            <li key={category}>
              🏷 {category} : {total}코인 사용
            </li>
          ))}
        </ul>
      )}

      <hr className="my-4" />

      <h2 className="text-2xl font-bold mb-4">🧾 구매 내역</h2>
      {purchases.length === 0 ? (
        <p>아직 구매한 상품이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {purchases.map((item, index) => (
            <li key={index} className="flex items-center gap-4 border-b pb-2">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  💰 {item.price} 코인에 구매함
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
