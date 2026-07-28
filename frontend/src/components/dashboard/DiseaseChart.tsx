import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Fever", value: 35 },
  { name: "Cold", value: 22 },
  { name: "BP", value: 18 },
  { name: "Diabetes", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function DiseaseChart() {
  return (
    <div className="bg-white rounded-2xl border shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Disease Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}