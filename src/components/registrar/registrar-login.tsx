import React, { useState } from "react";
import { login } from "../../lib/api-auth";
import { getRoleByName } from "../../lib/roles";

export default function RegistrarLogin({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login({ usernameOrEmail: form.username, password: form.password });
      // Check if user has REGISTRAR role
      const registrarRole = getRoleByName("REGISTRAR");
      if (!data.roles || !data.roles.includes(registrarRole?.id)) {
        setError("Access denied: Only registrar can login here.");
        setLoading(false);
        return;
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Registrar Login</h2>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required className="input mb-4" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required className="input mb-4" />
        <button type="submit" disabled={loading} className="btn w-full bg-blue-700 text-white hover:bg-blue-800">
          {loading ? "Logging in..." : "Login as Registrar"}
        </button>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </form>
    </div>
  );
}
