import { Activity, ShieldCheck } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div
      className="
      w-full
      max-w-[500px]
      rounded-[28px]
      border
      border-white/95
      bg-white/95
      p-10
      shadow-[0_30px_90px_rgba(0,0,0,.28)]
      "
    >
      {/* Logo */}

      <div className="mb-8 flex justify-center">

        <div
          className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-cyan-500
          to-blue-600
          "
        >

          <Activity
            size={30}
            className="text-white"
          />

        </div>

      </div>

      {/* Heading */}

      <h2
        className="
        text-center
        text-4xl
        font-bold
        tracking-tight
        text-slate-900
        "
      >
        Welcome Back
      </h2>

      <p
        className="
        mt-3
        text-center
        text-slate-500
        "
      >
        Sign in to continue to MediVoice AI
      </p>

      {/* Form */}

      <div className="mt-10">

        <LoginForm />

      </div>

      {/* Footer */}

      <div
        className="
        mt-8
        border-t
        border-slate-200
        pt-5
        "
      >

        <div
          className="
          flex
          items-center
          justify-center
          gap-2
          text-sm
          text-slate-500
          "
        >

          <ShieldCheck
            size={16}
            className="text-green-600"
          />

          Protected by JWT Authentication

        </div>

      </div>

    </div>
  );
}