import { useState } from "react";

const RATINGS = [5, 4, 3, 2, 1];

export function ReviewForm({ games, onSubmit }) {
  const [form, setForm] = useState({
    gameId: games[0] ? String(games[0].id) : "",
    reviewText: "",
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        gameId: Number(form.gameId),
        reviewText: form.reviewText,
        rating: Number(form.rating)
      });
      setForm((f) => ({ ...f, reviewText: "" }));
    } catch (err) {
      setError(err.message || "Ошибка сохранения");
    } finally {
      setSubmitting(false);
    }
  };

  if (!games.length) {
    return <p className="muted">Нет игр в каталоге для обзора.</p>;
  }

  return (
    <section className="card">
      <h2>Новый обзор</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Игра
          <select
            value={form.gameId}
            onChange={(e) => setForm({ ...form, gameId: e.target.value })}
            required
          >
            {games.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title} ({g.genre.name})
              </option>
            ))}
          </select>
        </label>
        <label>
          Текст (от 10 символов)
          <textarea
            rows={4}
            value={form.reviewText}
            onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
            required
            minLength={10}
          />
        </label>
        <label>
          Оценка
          <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
            {RATINGS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Отправка…" : "Опубликовать"}
        </button>
      </form>
    </section>
  );
}
