import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export function AccountPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const data = await api.myReviews();
        setReviews(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page">
      <h1>Личный кабинет</h1>
      <p className="lead">
        Здесь отображаются только ваши обзоры (эндпоинт <code>GET /api/me/reviews</code> с JWT).
      </p>
      {error && <p className="error">{error}</p>}
      <section className="card table-wrap">
        <h2>Мои обзоры</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Игра</th>
              <th>Оценка</th>
              <th>Текст</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>
                  {r.game.title}
                  <div className="tag">{r.game.genre}</div>
                </td>
                <td>{r.rating}</td>
                <td>{r.reviewText}</td>
                <td className="muted">{new Date(r.createdAt).toLocaleString("ru-RU")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {reviews.length === 0 && <p className="muted">Вы ещё не оставляли обзоров.</p>}
      </section>
    </div>
  );
}
