interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PatientSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search patient..."
      className="w-full md:w-80 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}