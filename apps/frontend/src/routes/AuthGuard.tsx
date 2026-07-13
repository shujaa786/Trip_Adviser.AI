import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

import { useAuth } from "../providers";

interface Props {
  children: ReactNode;
}

export function AuthGuard({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
