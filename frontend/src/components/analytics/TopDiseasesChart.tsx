import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { TopDisease } from "../../services/patientApi";

interface Props {
  data: TopDisease[];
}

export default function TopDiseasesChart({ data }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-800">
        Top Diseases
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Most common diseases among patients.
      </p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="disease" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="patients"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}