import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="page">
      <h1>Главная</h1>
      <p className="lead">
        Добро пожаловать на игровой портал: новости индустрии, гайды, скидки и пользовательские обзоры. Этот
        интерфейс — одностраничное приложение (SPA), данные обзоров и игр загружаются с REST API.
      </p>
      <div className="grid-2">
        <section className="card">
          <h2>Топ игр месяца</h2>
          <p className="muted">Cyberpunk 2077 — футуристический RPG в открытом мире.</p>
          <Link className="btn" to="/reviews">
            Читать обзоры
          </Link>
        </section>
        <section className="card">
          <h2>Главные новости</h2>
          <p className="muted">Анонсы релизов и обновлений от крупных издателей.</p>
          <Link className="btn ghost" to="/news">
            К новостям
          </Link>
        </section>
      </div>
    </div>
  );
}
