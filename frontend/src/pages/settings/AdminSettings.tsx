import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Loader2,
  Save,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getSettings,
  updateSettings,
  type Settings,
} from "../../services/settingsApi";

export default function AdminSettings() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] =
    useState<Settings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      const data = await getSettings();

      setSettings(data);
    } catch {
      toast.error("Failed to load admin settings.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;

    if (!settings.admin_name.trim()) {
      toast.error("Administrator name is required.");
      return;
    }

    if (!settings.admin_email.trim()) {
      toast.error("Administrator email is required.");
      return;
    }

    try {
      setSaving(true);

      await updateSettings({
        hospital_name: settings.hospital_name,
        hospital_address: settings.hospital_address,
        hospital_phone: settings.hospital_phone,
        hospital_email: settings.hospital_email,

        admin_name: settings.admin_name,
        admin_email: settings.admin_email,
        admin_phone: settings.admin_phone,
        admin_role: settings.admin_role,

        voice_language: settings.voice_language,
        voice_timeout: settings.voice_timeout,
        voice_confidence: settings.voice_confidence,
      });

      toast.success("Administrator profile updated.");
    } catch {
      toast.error("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          size={45}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <button
            onClick={() => navigate("/settings")}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Settings
          </button>

          <h1 className="text-4xl font-bold text-slate-900">
            Admin Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage administrator information for MediVoice AI.
          </p>

        </div>

        <div className="rounded-3xl bg-green-100 p-5">
          <User
            size={42}
            className="text-green-600"
          />
        </div>

      </div>

      {/* Form */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="grid gap-6">

          {/* Administrator Name */}

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Administrator Name
            </label>

            <input
              type="text"
              value={settings.admin_name}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  admin_name: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* Email + Phone */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={settings.admin_email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    admin_email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Phone Number
              </label>

              <input
                type="text"
                value={settings.admin_phone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    admin_phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

                    {/* Role */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Administrator Role
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3">
              <Shield
                size={20}
                className="text-blue-600"
              />

              <input
                type="text"
                value={settings.admin_role}
                readOnly
                className="w-full bg-transparent font-medium text-slate-700 outline-none"
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              This role is assigned by the system and cannot be changed.
            </p>
          </div>

          {/* Save Button */}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Save size={18} />
              )}

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>

      {/* Information Card */}

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">

        <h2 className="text-xl font-semibold text-blue-700">
          Administrator Information
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          The administrator profile controls the primary account
          responsible for managing MediVoice AI. The details entered
          here are stored in PostgreSQL and are used throughout the
          application wherever administrator information is required.
        </p>

      </div>

    </div>
  );
}