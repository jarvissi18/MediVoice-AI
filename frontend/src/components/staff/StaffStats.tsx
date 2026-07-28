interface Props {
  total: number;
  active: number;
  inactive: number;
}

export default function UserStats({
  total,
  active,
  inactive,
}: Props) {
  const cards = [
    {
      title: "Total Users",
      value: total,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: active,
      color: "text-green-600",
    },
    {
      title: "Inactive Users",
      value: inactive,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <p className="text-gray-500">
            {card.title}
          </p>

          <h2
            className={`text-3xl font-bold mt-2 ${card.color}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}