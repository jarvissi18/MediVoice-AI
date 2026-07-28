import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { WeeklyAnalytics } from "../../services/patientApi";

interface WeeklyPatientsChartProps {
  data: WeeklyAnalytics[];
}

export default function WeeklyPatientsChart({
  data,
}: WeeklyPatientsChartProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Weekly Patients
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Weekly patient registrations.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              tick={{ fontSize: 13 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 13 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="patients"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}