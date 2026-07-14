import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { register } from "../../api/auth.api";

interface Props {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await register({
        name,
        email,
        password,
      });

      toast.success(
        data.message ?? "Account created successfully. Please login.",
      );

      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Unable to register");
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
          Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim() || !email.trim() || !password.trim()}
        className={`w-full rounded-lg py-3 font-semibold text-white transition ${
          loading || !name.trim() || !email.trim() || !password.trim()
            ? "cursor-not-allowed bg-blue-500 opacity-70"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating Account..." : "Register"}
      </button>
    </form>
  );
}
