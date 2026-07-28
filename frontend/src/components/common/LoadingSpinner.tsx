import { Loader2 } from "lucide-react";

interface Props {
  text?: string;
  size?: number;
}

export default function LoadingSpinner({
  text = "Loading...",
  size = 28,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      <Loader2
        size={size}
        className="animate-spin text-blue-600"
      />

      <p className="mt-4 text-sm font-medium text-gray-500">
        {text}
      </p>

    </div>
  );
}