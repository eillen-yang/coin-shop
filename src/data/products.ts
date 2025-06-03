export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: "마우스" | "키보드" | "헤드폰"; // 추가
};

export const products: Product[] = [
  {
    id: 1,
    name: "게이밍 마우스",
    price: 100,
    imageUrl: "/images/mouse.png",
    category: "마우스", // 추가
  },
  {
    id: 2,
    name: "게이밍 키보드",
    price: 150,
    imageUrl: "/images/keyboard.png",
    category: "키보드", // 추가
  },
  {
    id: 3,
    name: "게이밍 헤드폰",
    price: 200,
    imageUrl: "/images/headphone.png",
    category: "헤드폰", // 추가
  },
];
