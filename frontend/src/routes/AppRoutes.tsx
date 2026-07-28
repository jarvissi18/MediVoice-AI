import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Patients from "../pages/patients/Patients";
import Analytics from "../pages/analytics/Analytics";
import MainLayout from "../layouts/MainLayout";

import Settings from "../pages/settings/Settings";
import HospitalSettings from "../pages/settings/HospitalSettings";
import AdminSettings from "../pages/settings/AdminSettings";
import VoiceSettings from "../pages/settings/VoiceSettings";
import DatabaseSettings from "../pages/settings/DatabaseSettings";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Profile from "../pages/profile/Profile";
import Users from "../pages/Staff";
import AdminRoute from "../components/auth/AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Main Layout */}
        <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/patients" element={<Patients />} />

        <Route path="/users" element={<Users />} />

        <Route path="/analytics" element={<Analytics />} />

                  <Route
            path="/settings"
            element={
              <AdminRoute>
                <Settings />
              </AdminRoute>
            }
          />

        {/* Settings Pages */}
        <Route
          path="/settings/hospital"
          element={<AdminRoute><HospitalSettings /></AdminRoute>}
        />

        <Route
          path="/settings/admin"
          element={<AdminRoute><AdminSettings/></AdminRoute>}
        />

        <Route
          path="/settings/voice"
          element={<AdminRoute><VoiceSettings /></AdminRoute>}
        />

        <Route
          path="/settings/database"
          element={<AdminRoute><DatabaseSettings /></AdminRoute>}
        />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}