import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/auth.api";
import { useAuth } from "../../providers/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
  const navigate = useNavigate();
  const { login: setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await login({
        email,
        password,
      });

      toast.success(data.message ?? "Login successful");

      setToken(data.token);

      onSuccess();

      navigate("/app");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Unable to login");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !email.trim() || !password.trim()}
        className={`w-full rounded-lg py-3 font-semibold text-white transition ${
          loading || !email.trim() || !password.trim()
            ? "cursor-not-allowed bg-blue-500 opacity-70"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
