import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export default function AppButton({
  children,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
}: Props) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
      flex items-center justify-center gap-2
      rounded-xl
      px-5
      py-3
      font-medium
      transition-all
      duration-200
      hover:scale-[1.02]
      active:scale-[0.98]
      shadow-sm
      hover:shadow-lg
      disabled:opacity-60
      disabled:cursor-not-allowed
      ${styles[variant]}
      ${className}
      `}
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}