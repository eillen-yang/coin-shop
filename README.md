# 랜덤 뽑기 코인샵

> 랜덤 코인 뽑기 기능으로 유저가 코인을 획득하고, 획득한 코인으로 상품을 구매할 수 있는 간단한 미니 프로젝트 서비스

## 개발 환경

| 패키지명          | 버전    |
| ----------------- | ------- |
| @tailwindcss/vite | ^4.1.8  |
| react             | ^19.1.0 |
| react-dom         | ^19.1.0 |
| react-router-dom  | ^6.22.3 |
| tailwindcss       | ^4.1.8  |
| zustand           | ^5.0.5  |

## 기능

### 상품구매

- `zustand`의 미들웨어인 `persist` 사용
- 직접 로컬스토리지에 저장하지 않고 미들웨어를 사용해 전역상태를 자동으로 `localStorage`에 저장하고 복원하는 기능으로 사용했다.

```javascript
persist(store, {
  name: "your-key-name", // localStorage의 key 이름
  storage: createJSONStorage(() => sessionStorage), // 기본은 localStorage
  partialize: (state) => ({ purchases: state.purchases }), // 저장할 필드 선택
  version: 1,
  onRehydrateStorage: () => (state) => {
    console.log("스토어 복원됨", state);
  },
});
```

| 옵션               | 설명                                              |
| ------------------ | ------------------------------------------------- |
| name               | localStorage에 저장될 키 이름                     |
| storage            | 기본은 localStorage, sessionStorage로도 설정 가능 |
| partialize         | 저장할 상태 중 필요한 부분만 선택 가능            |
| version            | 상태 마이그레이션 시 유용                         |
| onRehydrateStorage | 복원 직전/후 후처리 (디버깅용)                    |

### 카테고리 통계

```javascript
/* utils/statistics.ts */

import type { Product } from "../data/products";

export function getCategoryStats(purchaseHistory: Product[]) {
  return (
    purchaseHistory.reduce < Record < string,
    number >>
      ((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + product.price;
        return acc;
      },
      {})
  );
}
```

[GPT에게 물어본 이 코드의 설명](https://chatgpt.com/share/683bff97-f518-800d-968f-a82bcbfebfda)

### 마이페이지 구매내역 정렬

| 기능                                                      | 설명                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| `keyof T`                                                 | 제네릭 객체 T의 키만 추출 (예: `name`)                       |
| `Partial<Record<keyof T, string>>`                        | 필터 값을 키별로 저장하되, 부분적으로만 설정 가능하도록 만듦 |
| T[]를 제네릭으로 받아 정렬 및 필터 조건을 다형적으로 처리 | 재사용 가능한 제네릭 테이블 완성                             |
