import { useEffect, useState } from "react";
import {
  Users,
  Activity,
  CalendarDays,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import RecentPatients from "../../components/dashboard/RecentPatients";

import {
  getDashboardStats,
  type DashboardStats,
} from "../../services/patientApi";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardStats();

      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(90vh-100px)] flex-col gap-3 overflow-hidden">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Admin! Here's today's hospital overview.
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

          <CalendarDays
            className="text-blue-600"
            size={20}
          />

          <div className="leading-tight">

            <p className="text-xs text-slate-500">
              Today
            </p>

            <p className="text-sm font-semibold text-slate-800">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

          </div>

        </div>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <StatCard
          title="Today's Patients"
          value={loading ? "..." : String(stats?.todayPatients ?? 0)}
          icon={Users}
          color="#2563EB"
        />

        

        <StatCard
          title="Total Patients"
          value={
            loading
              ? "..."
              : String(stats?.totalPatients ?? 0)
          }
          icon={Activity}
          color="#7C3AED"
        />

      

      </div>

      {/* ================= MIDDLE ================= */}

      <div className="flex-1 overflow-hidden">

        <div className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <RecentPatients />
        </div>

        

      </div>

      

    </div>
  );
}