import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function AddPatientButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
    >
      <Plus size={20} />
      Add Patient
    </button>
  );
}