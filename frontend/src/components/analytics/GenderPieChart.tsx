import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface GenderPieChartProps {
  male: number;
  female: number;
}

const COLORS = ["#3B82F6", "#EC4899"];

export default function GenderPieChart({
  male,
  female,
}: GenderPieChartProps) {
  const data = [
    {
      name: "Male",
      value: male,
    },
    {
      name: "Female",
      value: female,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-800">
        Gender Distribution
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Male vs Female patients.
      </p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}