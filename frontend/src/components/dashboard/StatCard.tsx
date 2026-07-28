import type { LucideIcon } from "lucide-react";


type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Glow */}

      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl"
        style={{
          backgroundColor: color,
        }}
      />

      <div className="relative flex items-center justify-between">

        {/* Left */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold leading-none tracking-tight text-slate-900">
            {value}
          </h2>

          <div className="mt-3">
          <span className="text-xs text-slate-400">
            Live data
          </span>
        </div>
        </div>

        {/* Right */}

        <div
          className="flex h-16 w-16 items-center justify-center rounded-full shadow-md transition-all duration-300 group-hover:scale-105"
          style={{
            backgroundColor: `${color}15`,
          }}
        >
          <Icon
            size={30}
            style={{
              color,
            }}
          />
        </div>

      </div>

    </div>
  );
}