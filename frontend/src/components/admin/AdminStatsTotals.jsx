export function AdminStatsTotals({ totals }) {
  if (!totals) return null;

  const items = [
    { label: "Пользователи", value: totals.users },
    { label: "Обзоры", value: totals.reviews },
    { label: "Игры в каталоге", value: totals.games }
  ];

  return (
    <div className="grid-2">
      {items.map((item) => (
        <section key={item.label} className="card">
          <h2>{item.label}</h2>
          <p className="stat-value">{item.value}</p>
        </section>
      ))}
    </div>
  );
}
