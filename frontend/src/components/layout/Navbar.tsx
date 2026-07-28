import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import { CalendarDays } from "lucide-react";

export default function Navbar() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const weekday = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left */}

        <div className="flex items-center gap-6">
          <SearchBar />
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          {/* Date */}

          <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm xl:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <CalendarDays
                size={20}
                className="text-blue-600"
              />
            </div>

            <div className="leading-tight">
              <p className="text-[11px] font-medium text-slate-500">
                {weekday}
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {formattedDate}
              </p>
            </div>
          </div>

          

          {/* Profile */}

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}