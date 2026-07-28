import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function AdminRoute({
  children,
}: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "Administrator") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}