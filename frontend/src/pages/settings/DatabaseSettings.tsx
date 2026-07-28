import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Database,
  Loader2,
 RefreshCw,
  Server,
  Users,
  Settings as SettingsIcon,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getDatabaseStatus,
  type DatabaseStatus,
} from "../../services/databaseApi";

export default function DatabaseSettings() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [status, setStatus] =
    useState<DatabaseStatus | null>(null);

  useEffect(() => {
    loadDatabaseStatus();
  }, []);

  async function loadDatabaseStatus() {
    try {
      setLoading(true);

      const data = await getDatabaseStatus();

      setStatus(data);
    } catch {
      toast.error("Unable to load database status.");
    } finally {
      setLoading(false);
    }
  }

  async function refreshStatus() {
    try {
      setRefreshing(true);

      const data = await getDatabaseStatus();

      setStatus(data);

      toast.success("Database refreshed.");
    } catch {
      toast.error("Refresh failed.");
    } finally {
      setRefreshing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          size={45}
          className="animate-spin text-cyan-600"
        />
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <button
            onClick={() => navigate("/settings")}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18}/>
            Back to Settings
          </button>

          <h1 className="text-4xl font-bold">
            Database Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor backend and PostgreSQL health.
          </p>

        </div>

        <button
          onClick={refreshStatus}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-60"
        >
          {refreshing ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <RefreshCw size={18}/>
          )}

          Refresh
        </button>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">
            <Database
              size={30}
              className="text-cyan-600"
            />
          </div>

          <h3 className="text-lg font-semibold">
            Database
          </h3>

          <p className="mt-2 text-3xl font-bold text-cyan-600">
            {status.database}
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
            <Server
              size={30}
              className="text-green-600"
            />
          </div>

          <h3 className="text-lg font-semibold">
            Status
          </h3>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {status.status}
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Users
              size={30}
              className="text-blue-600"
            />
          </div>

          <h3 className="text-lg font-semibold">
            Patients
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {status.patients}
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
            <SettingsIcon
              size={30}
              className="text-purple-600"
            />
          </div>

          <h3 className="text-lg font-semibold">
            Settings
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {status.settings}
          </p>

        </div>
      </div>

            {/* API Status */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <Activity
              size={26}
              className="text-green-600"
            />

            <h2 className="text-2xl font-bold">
              API Status
            </h2>
          </div>

          <div className="rounded-2xl bg-green-50 p-5">

            <p className="text-sm text-slate-500">
              Backend Service
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {status.api}
            </h3>

          </div>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Database
              </span>

              <span className="font-semibold">
                {status.database}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Connection
              </span>

              <span className="font-semibold text-green-600">
                {status.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                API Service
              </span>

              <span className="font-semibold text-green-600">
                {status.api}
              </span>
            </div>

          </div>

        </div>

        {/* System Information */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            System Information
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Database Engine
              </span>

              <span className="font-semibold">
                PostgreSQL
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Backend
              </span>

              <span className="font-semibold">
                FastAPI
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Frontend
              </span>

              <span className="font-semibold">
                React + TypeScript
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                ORM
              </span>

              <span className="font-semibold">
                SQLAlchemy
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Version
              </span>

              <span className="font-semibold">
                MediVoice AI v1.0
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-8">

        <h2 className="text-xl font-bold text-cyan-700">
          Database Monitoring
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          This page provides a real-time overview of the backend
          infrastructure used by MediVoice AI. It verifies the
          PostgreSQL database connection, FastAPI backend
          availability, and displays the total number of patient
          records and application settings currently stored.
          Use the <strong>Refresh</strong> button above to retrieve
          the latest system status.
        </p>

      </div>

    </div>
  );
}