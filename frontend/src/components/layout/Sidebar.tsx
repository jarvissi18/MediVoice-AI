import {
  LayoutDashboard,
  UserRound,
  Users,
  ChartColumn,
  Settings,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = (role: string) => [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Patients",
    icon: UserRound,
    path: "/patients",
  },

  ...(role === "Administrator"
    ? [
        {
          title: "Staff",
          icon: Users,
          path: "/users",
        },
         {
          title: "Settings",
          icon: Settings,
          path: "/settings",
        },
      ]
    : []),

  {
    title: "Analytics",
    icon: ChartColumn,
    path: "/analytics",
  },

 
];


export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-[#0F172A] text-white shadow-2xl">
      {/* ================= LOGO ================= */}

      <div className="border-b border-slate-700/40 px-7 py-7">
        <div className="flex items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 text-2xl shadow-lg">
            🏥
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-wide">
              MediVoice AI
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Hospital Management System
            </p>
          </div>
        </div>
      </div>

      {/* ================= MENU ================= */}

      <nav className="flex-1 px-5 py-8">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <div className="space-y-3">
          {menuItems(user?.role ?? "").map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Icon
                      size={21}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <span className="font-medium">
                    {item.title}
                  </span>
                </div>

                <ChevronRight
                  size={18}
                  className="opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ================= SYSTEM STATUS ================= */}

      <div className="mx-5 mb-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 shadow-xl">
        <p className="text-sm font-semibold">
          System Status
        </p>

       

        <div className="mt-4 flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>

          <span className="text-xs">
            Online
          </span>
        </div>
      </div>

    
    </aside>
  );
}