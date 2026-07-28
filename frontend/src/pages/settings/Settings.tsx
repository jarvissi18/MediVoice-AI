import {
  Building2,
  User,
  Mic,
  Database,
  Info,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Hospital Information",
      description:
        "Manage hospital name, address, phone number and email.",
      icon: Building2,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      route: "/settings/hospital",
    },
    {
      title: "Admin Profile",
      description:
        "Update administrator profile information and account details.",
      icon: User,
      color: "bg-green-100",
      iconColor: "text-green-600",
      route: "/settings/admin",
    },
    {
      title: "Voice AI",
      description:
        "Configure speech recognition settings used by MediVoice AI.",
      icon: Mic,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      route: "/settings/voice",
    },
    {
      title: "Database",
      description:
        "View database status, health and storage information.",
      icon: Database,
      color: "bg-cyan-100",
      iconColor: "text-cyan-600",
      route: "/settings/database",
    },
  ];

  return (
    <div className="h-[calc(100vh-90px)] overflow-y-auto space-y-8 pr-2">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Configure MediVoice AI system settings and administration.
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={24}
              className="text-green-600"
            />

            <div>
              <p className="text-xs text-slate-500">
                System Status
              </p>

              <h3 className="font-semibold text-green-700">
                Running 
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon
                  size={30}
                  className={card.iconColor}
                />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {card.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                {card.description}
              </p>

              <button
                onClick={() => navigate(card.route)}
                className="mt-7 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Configure

                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {/* About */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <Info className="text-blue-600" />

          <h2 className="text-2xl font-bold text-slate-900">
            About MediVoice AI
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">
              Version
            </p>

            <h3 className="mt-1 font-semibold text-slate-900">
              1.0.0
            </h3>
          </div>

          
          </div>
      </div>
    </div>
  );
}