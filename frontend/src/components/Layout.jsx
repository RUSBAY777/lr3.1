import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";

export function Layout() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          GamePortal
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Главная
          </NavLink>
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/guides">Гайды</NavLink>
          <NavLink to="/industry">Индустрия</NavLink>
          <NavLink to="/sales">Скидки</NavLink>
          <NavLink to="/reviews">Обзоры</NavLink>
          {isAdmin && (
            <NavLink to="/admin" className="admin-link">
              Админ
            </NavLink>
          )}
        </nav>
        <div className="auth-zone">
          {user ? (
            <>
              <span className="user-email" title={user.email}>
                {user.email}
              </span>
              <Link to="/account" className="btn ghost">
                Кабинет
              </Link>
              <button type="button" className="btn" onClick={logout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn ghost">
                Вход
              </Link>
              <Link to="/register" className="btn">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <span>{new Date().getFullYear()} Сайт о видеоиграх</span>
      </footer>
    </div>
  );
}
