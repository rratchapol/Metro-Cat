import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import InfoFormPage from "../pages/InfoFormPage";
import ServiceFormPage from "../pages/ServiceFormPage";
import MainLayout from "../layouts/MainLayout";
import type { JSX } from "react";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

const protectedRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/forminfo", element: <InfoFormPage /> },
  { path: "/formservice", element: <ServiceFormPage /> },
];

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Protected Routes */}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <PrivateRoute>
                <MainLayout>{route.element}</MainLayout>
              </PrivateRoute>
            }
          />
        ))}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
