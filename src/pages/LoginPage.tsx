import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (id === "mandoo" && pw === "mandoothelove") {
      // localStorage.setItem("isLoggedIn", "true");
      login();
      navigate("/products");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">로그인</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="px-3 py-2 w-full border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="px-3 py-2 w-full border rounded"
        />
      </div>
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <button
        onClick={handleLogin}
        className="py-2 w-full rounded bg-blue-500 text-white"
      >
        로그인
      </button>
    </div>
  );
}
