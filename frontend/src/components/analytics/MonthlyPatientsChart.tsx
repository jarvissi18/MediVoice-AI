import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { MonthlyPatient } from "../../services/patientApi";

interface Props {
  data: MonthlyPatient[];
}

export default function MonthlyPatientsChart({ data }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-800">
        Monthly Patients
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Patient registrations month-wise.
      </p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="patientsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="patients"
              stroke="#2563EB"
              fill="url(#patientsGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}