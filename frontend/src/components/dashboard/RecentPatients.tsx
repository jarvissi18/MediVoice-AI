import { useEffect, useState } from "react";
import { ArrowRight, Clock3 } from "lucide-react";
import { getPatients } from "../../services/patientApi";
import type { Patient } from "../../types/patient";
import { useNavigate } from "react-router-dom";

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-cyan-500",
];

export default function RecentPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadRecentPatients();
  }, []);

  const loadRecentPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPatients();

      // Latest 5 patients only
      setPatients(data.slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("Failed to load patients.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const getTimeAgo = (date?: string) => {
    if (!date) return "Just now";

    const created = new Date(date);
    const now = new Date();

    const diff = Math.floor(
      (now.getTime() - created.getTime()) / 60000
    );

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min`;

    const hours = Math.floor(diff / 60);

    if (hours < 24) return `${hours} hr`;

    const days = Math.floor(hours / 24);

    return `${days} day`;
  };

  return (
    <div className="flex h-full flex-col">

      {/* Header */}

      <div className="mb-4 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Patients
          </h2>

          <p className="text-xs text-slate-500">
            Latest registrations
          </p>
        </div>

        <button
          onClick={() => navigate("/patients")}
          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
        >
          View All
        </button>

      </div>

      {/* Loading */}

      {loading && (
        <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
          Loading patients...
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}

      {!loading && !error && patients.length === 0 && (
        <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
          No patients found.
        </div>
      )}

      {/* List */}

      {!loading && !error && patients.length > 0 && (
        <div className="flex-1 space-y-2 overflow-y-auto pr-1">

          {patients.map((patient, index) => (

            <div
              key={patient.id}
              className="group flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:border-blue-200 hover:bg-slate-50"
            >

              {/* Left */}

              <div className="flex items-center gap-3">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${
                    avatarColors[index % avatarColors.length]
                  }`}
                >
                  {getInitials(patient.name)}
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-slate-800">
                    {patient.name}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {patient.village}
                  </p>

                </div>

              </div>

              {/* Right */}

              <div className="flex items-center gap-3">

                <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600">
                  {patient.disease}
                </span>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">

                  <Clock3 size={12} />

                  {getTimeAgo(patient.created_at)}

                </div>

                <ArrowRight
                  size={16}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}