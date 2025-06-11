import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useCoinStore } from "../../store/coinStore";

export default function Layout() {
  // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const coin = useCoinStore((state) => state.coins);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header className="p-4 bg-gray-100 flex justify-between items-center">
        <nav className="space-x-4">
          <Link to={"/"}>홈</Link>
          {isLoggedIn ? (
            <>
              <Link to={"/products"}>상품</Link>
              <Link to={"/mypage"}>마이페이지</Link>
              <button
                className="text-sm underline cursor-pointer"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link to={"/login"}>로그인</Link>
          )}
        </nav>
        {isLoggedIn && <div className="text-sm">💰 내 코인: {coin}개</div>}
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
