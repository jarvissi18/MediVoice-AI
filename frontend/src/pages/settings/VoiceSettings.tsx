import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mic,
  Loader2,
  Save,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getSettings,
  updateSettings,
  type Settings,
} from "../../services/settingsApi";

export default function VoiceSettings() {
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
      toast.error("Unable to load voice settings.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;

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

      toast.success("Voice settings updated.");
    } catch {
      toast.error("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          className="animate-spin text-blue-600"
          size={45}
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
            <ArrowLeft size={18}/>
            Back to Settings
          </button>

          <h1 className="text-4xl font-bold">
            Voice AI Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Configure MediVoice AI speech recognition.
          </p>

        </div>

        <div className="rounded-3xl bg-purple-100 p-5">
          <Mic
            size={42}
            className="text-purple-600"
          />
        </div>

      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="grid gap-8">

          {/* Language */}

          <div>

            <label className="mb-2 block font-medium">
              Voice Language
            </label>

            <select
              value={settings.voice_language}
              onChange={(e)=>
                setSettings({
                  ...settings,
                  voice_language:e.target.value
                })
              }
              className="w-full rounded-xl border p-3"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>

          </div>

                    {/* Voice Timeout */}

          <div>
            <label className="mb-2 block font-medium">
              Voice Timeout (Seconds)
            </label>

            <input
              type="number"
              min={1}
              max={30}
              value={settings.voice_timeout}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  voice_timeout: Number(e.target.value),
                })
              }
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-2 text-sm text-slate-500">
              Maximum waiting time before voice recognition stops listening.
            </p>
          </div>

          {/* Confidence */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="font-medium">
                Voice Confidence
              </label>

              <span className="rounded-lg bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                {settings.voice_confidence}%
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={settings.voice_confidence}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  voice_confidence: Number(e.target.value),
                })
              }
              className="w-full"
            />

            <div className="mt-2 flex justify-between text-sm text-slate-500">
              <span>Less Strict</span>
              <span>More Accurate</span>
            </div>
          </div>

          {/* Save */}

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
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

      {/* Information */}

      <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6">
        <div className="flex items-center gap-3">
          <Volume2
            size={24}
            className="text-purple-600"
          />

          <h3 className="text-lg font-semibold text-purple-700">
            Voice Recognition
          </h3>
        </div>

        <p className="mt-3 leading-7 text-slate-600">
          These settings control how MediVoice AI processes spoken input.
          Increasing the confidence threshold makes recognition stricter,
          while lowering it allows more flexible speech matching. Timeout
          determines how long the system waits for speech before stopping.
        </p>
      </div>
    </div>
  );
}