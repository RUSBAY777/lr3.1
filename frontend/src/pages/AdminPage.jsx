import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { AdminStatsTotals } from "../components/admin/AdminStatsTotals";
import { ReviewsByGenreBarChart } from "../components/admin/ReviewsByGenreBarChart";
import { ReviewsByGenrePieChart } from "../components/admin/ReviewsByGenrePieChart";
import { ReviewsByMonthChart } from "../components/admin/ReviewsByMonthChart";

export function AdminPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const data = await api.adminStats();
        setStats(data);
      } catch (e) {
        setError(e.message || "Нет доступа к статистике");
      }
    })();
  }, [isAdmin]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="page">
        <h1>Доступ запрещён</h1>
        <p className="lead">Раздел администратора виден только пользователям с ролью ADMIN.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Админ-панель</h1>
      <p className="lead">
        Данные загружаются с защищённого эндпоинта <code>GET /api/admin/stats</code> (JWT + проверка роли).
      </p>
      {error && <p className="error">{error}</p>}
      {stats && (
        <>
          <AdminStatsTotals totals={stats.totals} />
          <ReviewsByGenreBarChart data={stats.reviewsByGenre} />
          <ReviewsByGenrePieChart data={stats.reviewsByGenre} />
          <ReviewsByMonthChart data={stats.reviewsByMonth} />
        </>
      )}
    </div>
  );
}
