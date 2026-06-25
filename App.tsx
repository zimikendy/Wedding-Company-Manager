import React, { ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import CustomersPage from './pages/CustomersPage';
import StaffPage from './pages/StaffPage';
import FinancePage from './pages/FinancePage';
import CalendarPage from './pages/CalendarPage';
import PackagesPage from './pages/PackagesPage';
import SettingsPage from './pages/SettingsPage';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                <Route index element={<DashboardPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="finance" element={<FinancePage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="packages" element={<PackagesPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
        <HashRouter>
            <AppRoutes />
        </HashRouter>
    </AuthProvider>
  );
};

export default App;