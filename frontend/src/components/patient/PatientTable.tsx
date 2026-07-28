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
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-3 text-5xl">🩺</div>

          <h3 className="text-lg font-semibold text-slate-700">
            No Patients Found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Add a patient or change the search keyword.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">

      {/* Only this area scrolls */}

      <div className="min-h-0 flex-1 overflow-auto">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 z-20 bg-slate-100 shadow-sm">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Village
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Age
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Gender
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Disease
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Mobile
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">

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