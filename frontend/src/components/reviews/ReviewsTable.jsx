export function ReviewsTable({ reviews, emptyMessage = "Пока нет обзоров." }) {
  return (
    <section className="card table-wrap">
      <h2>Лента</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Игра</th>
            <th>Автор</th>
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
              <td>{r.author.email}</td>
              <td>{r.rating}</td>
              <td>{r.reviewText}</td>
              <td className="muted">{new Date(r.createdAt).toLocaleString("ru-RU")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {reviews.length === 0 && <p className="muted">{emptyMessage}</p>}
    </section>
  );
}
