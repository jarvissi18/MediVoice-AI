import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Patient } from "../../types/patient";

interface Props {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (id: number) => void;
}

export default function PatientRow({
  patient,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="transition-colors duration-200 hover:bg-slate-50">

      <td className="px-5 py-4 font-medium text-slate-800">
        {patient.name}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {patient.village}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {patient.age}
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            patient.gender === "Male"
              ? "bg-blue-100 text-blue-700"
              : patient.gender === "Female"
              ? "bg-pink-100 text-pink-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {patient.gender}
        </span>
      </td>

      <td className="px-5 py-4 text-slate-600">
        {patient.disease}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {patient.mobile}
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-center gap-2">

          <button
            onClick={() => onEdit(patient)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => patient.id && onDelete(patient.id)}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      </td>

    </tr>
  );
}