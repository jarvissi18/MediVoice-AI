import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-6
      border
      "
    >
      {children}
    </div>
  );
}