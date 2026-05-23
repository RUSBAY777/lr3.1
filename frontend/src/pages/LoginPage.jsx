import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка входа");
    }
  };

  return (
    <div className="page">
      <h1>Вход</h1>
      <p className="lead">JWT сохраняется в localStorage и передаётся в заголовке Authorization.</p>
      <form className="form card" onSubmit={onSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">
          Войти
        </button>
        <p className="muted">
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </p>
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          Демо: admin@gameportal.local / admin123456
        </p>
      </form>
    </div>
  );
}
