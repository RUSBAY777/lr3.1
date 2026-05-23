import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { NewsPage } from "./pages/NewsPage";
import { GuidesPage } from "./pages/GuidesPage";
import { IndustryPage } from "./pages/IndustryPage";
import { SalesPage } from "./pages/SalesPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccountPage } from "./pages/AccountPage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="guides" element={<GuidesPage />} />
            <Route path="industry" element={<IndustryPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
