import {
  BrainCircuit,
  CheckCircle2,
} from "lucide-react";

export default function LoginBanner() {
  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#0A1F44]">

      
      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-16 py-14">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">

              <BrainCircuit
                size={30}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">

                MediVoice AI

              </h2>

              <p className="text-blue-200">

                Intelligent Healthcare Platform

              </p>

            </div>

          </div>

        </div>

        {/* Hero */}

        <div className="max-w-xl">

          <h1 className="text-4xl font-extrabold leading-tight text-white">

            Intelligent Healthcare,

            <br />

            Smarter Every Day

          </h1>

          <p className="mt-6 text-lg leading-8 text-blue-100">

            Empowering hospitals with AI-driven patient registration,
            voice-assisted workflows and secure healthcare management.

          </p>

          <div className="mt-10 space-y-5">

            <Feature text="Voice Assisted Patient Entry" />

            <Feature text="AI Analytics Dashboard" />

            <Feature text="Secure Role Based Access" />

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 pt-6">

          <p className="text-sm tracking-wide text-blue-200">

            Trusted by Modern Hospitals

          </p>

        </div>

      </div>

    </div>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={20}
        className="text-cyan-300"
      />

      <span className="text-lg text-white">

        {text}

      </span>

    </div>
  );
}