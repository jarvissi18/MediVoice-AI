import { useEffect, useState } from "react";
import type { Patient } from "../../types/patient";
import VoiceInputButton from "../speech/VoiceInputButton";
import { toast } from "react-toastify";
import {
  createPatient,
  updatePatient,
  parseVoice,
} from "../../services/patientApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  patient?: Patient | null;
}

const emptyForm: Omit<Patient, "id"> = {
  name: "",
  age: 0,
  gender: "Male",
  village: "",
  disease: "",
  mobile: "",
};

const emptyErrors = {
  name: "",
  age: "",
  village: "",
  disease: "",
  mobile: "",
};

export default function PatientFormModal({
  open,
  onClose,
  onSuccess,
  patient,
}: Props) {
  const [form, setForm] =
    useState<Omit<Patient, "id">>(emptyForm);

  const [errors, setErrors] =
    useState(emptyErrors);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        village: patient.village,
        disease: patient.disease,
        mobile: patient.mobile,
      });
    } else {
      setForm(emptyForm);
    }

    setErrors(emptyErrors);
  }, [patient, open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "age"
          ? Number(value)
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const validationErrors = {
      name: "",
      age: "",
      village: "",
      disease: "",
      mobile: "",
    };

    let valid = true;

    if (!form.name.trim()) {
      validationErrors.name =
        "Patient name is required";
      valid = false;
    }

    if (
      form.age < 1 ||
      form.age > 120
    ) {
      validationErrors.age =
        "Age must be between 1 and 120";
      valid = false;
    }

    if (!form.village.trim()) {
      validationErrors.village =
        "Village is required";
      valid = false;
    }

    if (!form.disease.trim()) {
      validationErrors.disease =
        "Disease is required";
      valid = false;
    }

    if (
      !/^[0-9]{10}$/.test(form.mobile)
    ) {
      validationErrors.mobile =
        "Enter a valid 10-digit mobile number";
      valid = false;
    }

    setErrors(validationErrors);

    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      if (patient?.id) {
        await updatePatient(
          patient.id,
          form
        );

        toast.success(
          "Patient updated successfully"
        );
      } else {
        await createPatient(form);

        toast.success(
          "Patient added successfully"
        );
      }

      onSuccess();
      onClose();

      setForm(emptyForm);
      setErrors(emptyErrors);
    } catch (err) {
      console.error(err);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl animate-modalPop">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              {patient
                ? "Edit Patient"
                : "Add New Patient"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter patient information manually
              or use Voice AI.
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-8">

          {/* Voice AI */}

          <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h3 className="text-lg font-semibold text-blue-700">
                  🎤 Voice AI Assistant
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Speak patient details and AI
                  will automatically fill the
                  form.
                </p>

              </div>

              <VoiceInputButton
                onTranscript={async (
                  text
                ) => {
                  try {
                    const loadingToast =
                      toast.loading(
                        "Processing voice with AI..."
                      );

                    const response =
                      await parseVoice(
                        text
                      );

                    if (
                      !response.success
                    ) {
                      toast.update(
                        loadingToast,
                        {
                          render:
                            response.message ||
                            "Unable to process voice.",
                          type: "error",
                          isLoading: false,
                          autoClose: 3000,
                        }
                      );

                      return;
                    }

                    setForm((prev) => ({
                    ...prev,

                    ...(response.name !== undefined && response.name !== "" && {
                      name: response.name,
                    }),

                    ...(response.age !== undefined && response.age !== 0 && {
                      age: response.age,
                    }),

                    ...(response.gender !== undefined && response.gender !== "" && {
                      gender: response.gender,
                    }),

                    ...(response.village !== undefined && response.village !== "" && {
                      village: response.village,
                    }),

                    ...(response.disease !== undefined && response.disease !== "" && {
                      disease: response.disease,
                    }),

                    ...(response.mobile !== undefined && response.mobile !== "" && {
                      mobile: response.mobile,
                    }),
                  }));

                  
                    toast.update(
                      loadingToast,
                      {
                        render:
                          "Patient details extracted successfully",
                        type: "success",
                        isLoading: false,
                        autoClose: 2500,
                      }
                    );
                  } catch (error) {
                    console.error(
                      error
                    );

                    toast.error(
                      "Unable to process voice."
                    );
                  }
                }}
              />

            </div>

          </div>

          {/* Form */}

          <div className="grid grid-cols-2 gap-5">

                        {/* Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Patient Name
              </label>

              <input
                name="name"
                placeholder="Enter patient name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Age */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Age
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={form.age}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.age && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.age}
                </p>
              )}
            </div>

            {/* Gender */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Village */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Village
              </label>

              <input
                name="village"
                placeholder="Enter village"
                value={form.village}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.village && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.village}
                </p>
              )}
            </div>

            {/* Disease */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Disease
              </label>

              <input
                name="disease"
                placeholder="Enter disease"
                value={form.disease}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.disease && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.disease}
                </p>
              )}
            </div>

            {/* Mobile */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <input
                name="mobile"
                placeholder="Enter mobile number"
                value={form.mobile}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.mobile && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.mobile}
                </p>
              )}
            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : patient
                ? "Update Patient"
                : "Save Patient"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}