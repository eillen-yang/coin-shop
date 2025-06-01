import { usePurchaseStore } from "../store/purchaseStore";

export default function MyPage() {
  const purchases = usePurchaseStore((state) => state.purchases);

  return (
    <div>
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
