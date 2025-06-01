export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "게이밍 마우스",
    price: 100,
    imageUrl: "/images/mouse.png",
  },
  {
    id: 2,
    name: "게이밍 키보드",
    price: 150,
    imageUrl: "/images/keyboard.png",
  },
  {
    id: 3,
    name: "게이밍 헤드폰",
    price: 200,
    imageUrl: "/images/headphone.png",
  },
];
