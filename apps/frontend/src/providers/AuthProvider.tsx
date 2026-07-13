import { useMemo, useState } from "react";

import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );

  const login = (jwt: string) => {
    localStorage.setItem("accessToken", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
