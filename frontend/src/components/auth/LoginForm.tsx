import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login as loginApi } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useAuth();

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginApi({
        email,
        password,
      });

      auth.login(
        response.access_token,
        response.user
      );

      toast.success(
        `Welcome ${response.user.full_name}`
      );

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail ??
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-7"
    >
      {/* EMAIL */}

      <div>

        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

          <Mail
            size={16}
            className="text-blue-600"
          />

          Email Address

        </label>

        <div className="group relative">

          <Mail
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            group-focus-within:text-blue-600
            transition
            "
          />

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            py-4
            pl-12
            pr-4
            text-slate-800
            shadow-sm
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            hover:border-blue-300
            "
          />

        </div>

      </div>

      {/* PASSWORD */}

      <div>

        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

          <Lock
            size={16}
            className="text-blue-600"
          />

          Password

        </label>

        <div className="group relative">

          <Lock
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            group-focus-within:text-blue-600
            transition
            "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            py-4
            pl-12
            pr-12
            shadow-sm
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            hover:border-blue-300
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-blue-600
            transition
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

      </div>

      
      {/* BUTTON */}

      <button
        disabled={loading}
        className="
        group
        flex
        h-14
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        btn-glow bg-gradient-to-r
        from-blue-600
        to-indigo-600
        font-semibold
        text-white
        shadow-lg
        shadow-blue-500/25
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-blue-500/30
        disabled:cursor-not-allowed
        disabled:opacity-70
        "
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />

            Signing In...
          </>
        ) : (
          <>
            Sign In

            <ArrowRight
              size={18}
              className="
              transition-transform
              group-hover:translate-x-1
              "
            />
          </>
        )}
      </button>

    </form>
  );
}