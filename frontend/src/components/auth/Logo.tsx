import { BrainCircuit } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">

      <div
        className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-cyan-400
        via-blue-500
        to-indigo-600
        shadow-xl
        shadow-blue-500/30
        "
      >
        <BrainCircuit
          size={32}
          className="text-white"
        />
      </div>

      <div>

        <h2 className="text-2xl font-black tracking-tight">
          MediVoice AI
        </h2>

        <p className="text-sm text-blue-100">
          Intelligent Healthcare Platform
        </p>

      </div>

    </div>
  );
}