import LoginBanner from "../../components/auth/LoginBanner";
import LoginCard from "../../components/auth/LoginCard";

export default function Login() {
  return (
    <div className="relative h-screen overflow-hidden">

      {/* ===== Global Background ===== */}

      <div className="absolute inset-0 bg-[#0A1F44]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Glow */}

      <div className="absolute -top-52 -left-44 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[130px]" />

      <div className="absolute bottom-[-180px] right-[-150px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px]" />

      {/* Content */}

      <div className="relative z-10 mx-auto flex h-full max-w-[1700px]">

        {/* Left */}

        <div className="hidden w-[60%] lg:flex">

          <LoginBanner />

        </div>

        {/* Right */}

        <div className="flex w-full items-center justify-center lg:w-[70%]">

          <LoginCard />

        </div>

      </div>

    </div>
  );
}