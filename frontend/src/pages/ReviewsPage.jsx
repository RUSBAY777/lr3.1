import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { ReviewForm } from "../components/reviews/ReviewForm";
import { ReviewsTable } from "../components/reviews/ReviewsTable";

export function ReviewsPage() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const [g, r] = await Promise.all([api.getGames(), api.getReviews()]);
      setGames(g);
      setReviews(r);
    } catch (e) {
      setError(e.message || "Не удалось загрузить данные");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreateReview = async (payload) => {
    await api.createReview(payload);
    await load();
  };

  return (
    <div className="page">
      <h1>Обзоры</h1>
      <p className="lead">Публичная лента обзоров из базы данных. Добавление доступно авторизованным пользователям.</p>

      {user && <ReviewForm games={games} onSubmit={handleCreateReview} />}

      {!user && (
        <p className="muted">
          Чтобы оставить обзор, <Link to="/login">войдите</Link> или <Link to="/register">зарегистрируйтесь</Link>.
        </p>
      )}

      {error && <p className="error">{error}</p>}

      <ReviewsTable reviews={reviews} />
    </div>
  );
}
