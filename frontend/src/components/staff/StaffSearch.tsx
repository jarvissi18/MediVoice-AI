interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function UserSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}