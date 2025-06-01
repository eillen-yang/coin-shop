// src/routes/router.tsx

import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/common/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import MyPage from "../pages/MyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
]);
