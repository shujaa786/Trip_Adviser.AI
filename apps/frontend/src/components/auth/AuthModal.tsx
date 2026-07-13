import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface Props {
  open: boolean;
  onClose: () => void;
  isLogin: boolean;
}

export default function AuthModal({ open, onClose, isLogin }: Props) {
  const [mode, setMode] = useState(isLogin);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        display: "grid",
        placeItems: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: 480,
          maxWidth: "92vw",
          background: "#1e293b",
          padding: 32,
          borderRadius: 16,
          color: "white",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 700 }}>
          {mode ? "Login" : "Register"}
        </h2>

        {mode ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegisterForm onSuccess={() => setMode(true)} />
        )}

        <div
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {mode ? (
            <>
              No account?{" "}
              <button onClick={() => setMode(false)}>Register</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode(true)}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
