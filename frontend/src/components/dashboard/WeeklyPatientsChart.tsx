import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { TrendingUp } from "lucide-react";

const data = [
  { day: "Mon", patients: 35 },
  { day: "Tue", patients: 42 },
  { day: "Wed", patients: 39 },
  { day: "Thu", patients: 51 },
  { day: "Fri", patients: 48 },
  { day: "Sat", patients: 60 },
  { day: "Sun", patients: 55 },
];

export default function WeeklyPatientsChart() {
  return (
    <div className="flex h-full flex-col">

      {/* Header */}

      <div className="mb-4 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Patient Overview
          </h2>

          <p className="text-xs text-slate-500">
            Weekly registrations
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5">

          <TrendingUp
            size={16}
            className="text-green-600"
          />

          <span className="text-xs font-semibold text-green-700">
            +18%
          </span>

        </div>

      </div>

      {/* Chart */}

      <div className="flex-1">

        <ResponsiveContainer
          width="100%"
          height={240}
        >
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#CBD5E1",
                strokeDasharray: "3 3",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            />

            <Line
              type="monotone"
              dataKey="patients"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#2563EB",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

        <div>

          <p className="text-[11px] text-slate-500">
            Average
          </p>

          <h3 className="text-lg font-bold text-slate-900">
            47/day
          </h3>

        </div>

        <div className="text-right">

          <p className="text-[11px] text-slate-500">
            Peak Day
          </p>

          <h3 className="text-lg font-bold text-blue-600">
            Saturday
          </h3>

        </div>

      </div>

    </div>
  );
}