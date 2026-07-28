interface SummaryCardProps {
  title: string;
  value: number;
  color?: "blue" | "green" | "purple" | "pink";
}

export default function SummaryCard({
  title,
  value,
  color = "blue",
}: SummaryCardProps) {
  const colorStyles = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-100",
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      className={`rounded-3xl border ${styles.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className={`inline-flex rounded-xl ${styles.bg} px-3 py-2`}>
        <span className={`text-sm font-semibold ${styles.text}`}>
          {title}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-4xl font-bold text-slate-800">
          {value}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Current Count
        </p>
      </div>
    </div>
  );
}