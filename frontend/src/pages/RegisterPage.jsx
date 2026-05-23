import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Пароль не короче 6 символов");
      return;
    }
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка регистрации");
    }
  };

  return (
    <div className="page">
      <h1>Регистрация</h1>
      <p className="lead">Пароль на сервере хэшируется bcrypt с солью (через bcryptjs).</p>
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
            minLength={6}
            autoComplete="new-password"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">
          Создать аккаунт
        </button>
        <p className="muted">
          Уже есть аккаунт? <Link to="/login">Вход</Link>
        </p>
      </form>
    </div>
  );
}
