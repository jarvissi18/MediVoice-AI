import { useEffect, useState } from "react";

export interface UserFormData {
  full_name: string;
  email: string;
  password: string;
}

interface Props {
  initialData?: UserFormData;
  isEdit?: boolean;
  loading?: boolean;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

export default function UserForm({
  initialData,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<UserFormData>({
    full_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.full_name.trim()) {
      alert("Full Name is required");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!isEdit && !form.password.trim()) {
      alert("Password is required");
      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {!isEdit && (
        <div>
          <label className="block mb-1 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      )}

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update"
            : "Create"}
        </button>
      </div>
    </form>
  );
}