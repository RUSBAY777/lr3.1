export function ChartCard({ title, children, height = 320 }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="chart-container" style={{ width: "100%", height }}>
        {children}
      </div>
    </section>
  );
}
