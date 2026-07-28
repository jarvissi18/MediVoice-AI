import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import type { Patient } from "../../types/patient";

import {
  getPatients,
  deletePatient,
} from "../../services/patientApi";

import PatientSearch from "../../components/patient/PatientSearch";
import AddPatientButton from "../../components/patient/AddPatientButton";
import PatientTable from "../../components/patient/PatientTable";
import PatientFormModal from "../../components/patient/PatientFormModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      setLoading(true);

      const data = await getPatients();

      setPatients(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load patients.");
    } finally {
      setLoading(false);
    }
  }

  const filteredPatients = useMemo(() => {
    const keyword = search.toLowerCase();

    return patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(keyword) ||
        patient.mobile.toLowerCase().includes(keyword) ||
        patient.disease.toLowerCase().includes(keyword) ||
        patient.village.toLowerCase().includes(keyword)
      );
    });
  }, [patients, search]);

  function handleAddPatient() {
    setSelectedPatient(null);
    setIsModalOpen(true);
  }

  function handleEditPatient(patient: Patient) {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  }

  async function handleDeletePatient(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(id);

      toast.success("Patient deleted successfully");

      fetchPatients();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete patient");
    }
  }

  return (
    <div className="flex h-full flex-col gap-6">

      {/* Header */}

      <div className="flex shrink-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Patients
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage patient records and registrations.
          </p>
        </div>

        <AddPatientButton onClick={handleAddPatient} />

      </div>

      {/* Search */}

      <div className="shrink-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

        <PatientSearch
          value={search}
          onChange={setSearch}
        />

      </div>

      {/* Loading */}

      {loading && (
        <LoadingSpinner
          text="Loading patient records..."
        />
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Table */}

      {!loading && !error && (
        <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <PatientTable
            patients={filteredPatients}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
          />

        </div>
      )}

      {/* Modal */}

      <PatientFormModal
        open={isModalOpen}
        patient={selectedPatient}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPatient(null);
        }}
        onSuccess={fetchPatients}
      />

    </div>
  );
}