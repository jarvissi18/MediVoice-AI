import type { Patient } from "../../types/patient";
import PatientRow from "./PatientRow";

interface Props {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: number) => void;
}

export default function PatientTable({
  patients,
  onEdit,
  onDelete,
}: Props) {
  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 shadow-sm">
        <div className="mb-4 text-5xl">🩺</div>

        <h3 className="text-lg font-semibold text-gray-700">
          No Patients Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or add a new patient.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr className="text-sm font-semibold uppercase tracking-wide text-slate-700">

              <th className="px-5 py-4 text-left">
                Name
              </th>

              <th className="px-5 py-4 text-left">
                Village
              </th>

              <th className="px-5 py-4 text-left">
                Age
              </th>

              <th className="px-5 py-4 text-left">
                Gender
              </th>

              <th className="px-5 py-4 text-left">
                Disease
              </th>

              <th className="px-5 py-4 text-left">
                Mobile
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {patients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}