import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import "./App.css";
import ApplicationsPage from "./Pages/ApplicationsPage";
import SettingPage from "./Pages/SettingPage";
import PackagePage from "./Pages/PackagePage";
import AnalysPage from "./Pages/AnalysPage";
import LoginPage from "./Pages/LoginPage";
import AccountPage from "./Pages/AccountPage";
import CategoryPage from "./Pages/CategoryPage";
import PlanSelectPage from "./Pages/PlanSelectPage";
import GuidePage from "./Pages/GuidePage";
import OrdersPage from "./Pages/OrdersPage";
import PromoPage from "./Pages/PromoPage";
import ScrollToTop from "./Components/ScroolToTop";

// --- YENİ ƏLAVƏ ---
// Bu komponent yoxlayır ki, istifadəçi login olub ya yox.
const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Əgər login olubsa, Layout-u (və içindəki səhifələri) göstər
  // Əgər olmayıbsa, məcburi /login səhifəsinə at
  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    localStorage.setItem("theme", savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* LOGİN SƏHİFƏSİ */}
        <Route path="/login" element={<LoginPage />} />

        {/* PLAN SEÇİM SƏHİFƏSİ (login sonrası, layout xaricində) */}
        <Route path="/plan-select" element={<PlanSelectPage />} />

        {/* YALNIZ LOGİN OLANLARIN GÖRƏ BİLƏCƏYİ SƏHİFƏLƏR */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/accounts" element={<AccountPage />} />
          <Route path="/categorys" element={<CategoryPage />} />
          <Route path="/analys" element={<AnalysPage />} />
          <Route path="/packages" element={<PackagePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/promo" element={<PromoPage />} />
        </Route>

        {/* Yanlış link */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
