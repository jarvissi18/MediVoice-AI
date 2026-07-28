import { useEffect, useRef, useState } from "react";
import {
  User,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const initials =
    user?.full_name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  const menuItems = [
    {
      title: "My Profile",
      icon: User,
      action: () => {
        navigate("/profile");
        setOpen(false);
      },
    },
    {
      title: "Help",
      icon: HelpCircle,
      action: () => {
        alert("Help Center will be available soon.");
        setOpen(false);
      },
    },
    {
      title: "Logout",
      icon: LogOut,
      action: () => {
        logout();
        navigate("/", {
          replace: true,
        });
        setOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      {/* Profile Button */}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition hover:shadow-md"
      >
        {/* Avatar */}

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
          {initials}
        </div>

        {/* User Info */}

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-slate-800">
            {user?.full_name ?? "User"}
          </p>

          <p className="text-xs text-slate-500">
            {user?.role ?? "Unknown Role"}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}

          <div className="border-b border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900">
              {user?.full_name ?? "User"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {user?.email ?? "No Email"}
            </p>

            <span className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {user?.role ?? "Unknown Role"}
            </span>
          </div>

          {/* Menu */}

          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={item.action}
                  className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />

                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}