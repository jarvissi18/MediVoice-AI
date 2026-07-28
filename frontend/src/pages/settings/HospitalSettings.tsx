import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Loader2,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getSettings,
  updateSettings,
  type Settings,
} from "../../services/settingsApi";

export default function HospitalSettings() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      const data = await getSettings();

      setSettings(data);
    } catch (error) {
      toast.error("Unable to load hospital settings.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;

    if (!settings.hospital_name.trim()) {
      toast.error("Hospital name is required.");
      return;
    }

    if (!settings.hospital_email.trim()) {
      toast.error("Hospital email is required.");
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

      toast.success("Hospital settings saved successfully.");
    } catch (error) {
      toast.error("Failed to save settings.");
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
            className="mb-4 flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Settings
          </button>

          <h1 className="text-4xl font-bold text-slate-900">
            Hospital Information
          </h1>

          <p className="mt-2 text-slate-500">
            Update hospital details used across the
            application.
          </p>
        </div>

        <div className="rounded-3xl bg-blue-100 p-5">
          <Building2
            size={40}
            className="text-blue-600"
          />
        </div>
      </div>

      {/* Form */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-7">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Hospital Name
            </label>

            <input
              value={settings.hospital_name}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  hospital_name: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Hospital Address
            </label>

            <textarea
              rows={4}
              value={settings.hospital_address}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  hospital_address: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Phone Number
              </label>

              <input
                value={settings.hospital_phone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    hospital_phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={settings.hospital_email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    hospital_email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
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
    </div>
  );
}