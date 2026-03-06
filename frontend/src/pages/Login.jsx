import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      // Redirection intelligente si vient d’une route protégée
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);

    } catch (error) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden text-white">

      {/* Glow background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 blur-3xl rounded-full"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-slate-900 border border-slate-800 p-10 rounded-2xl w-96 shadow-xl"
      >
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Connexion
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 
                       focus:border-blue-500 focus:outline-none transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 
                       focus:border-blue-500 focus:outline-none transition"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg 
                       font-medium transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            S'inscrire
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;