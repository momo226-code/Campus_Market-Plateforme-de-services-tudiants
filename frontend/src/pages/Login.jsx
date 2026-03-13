import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight, Star, CheckCircle } from "lucide-react"; // Ajout de CheckCircle

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // On récupère le message de succès venant du Register
  const successMsg = location.state?.success;

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
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    } catch (error) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D7CDC1]/30 relative overflow-hidden px-4">
      
      {/* Cercles de couleurs flous pour l'ambiance Ventura */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C59473]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3D332D]/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Logo / Badge */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#3D332D] rounded-2xl flex items-center justify-center text-[#D7CDC1] font-black text-2xl shadow-xl">
              V
            </div>
          </Link>
          <h1 className="text-4xl font-[1000] tracking-tighter text-[#3D332D]">
            VENTURA<span className="text-[#C59473]">.</span>
          </h1>
          <p className="text-[#3D332D]/60 font-medium mt-2 italic">L'excellence de l'UM6P en un clic.</p>
        </div>

        {/* --- BLOC MESSAGE DE SUCCÈS (Nouveau) --- */}
        {successMsg && (
          <div className="mb-6 bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <CheckCircle size={20} />
            {successMsg}
          </div>
        )}

        {/* Formulaire Card */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/50 relative overflow-hidden">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-2">
                <Star size={16} fill="currentColor" /> {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-1 block">Email Campus</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30 group-focus-within:text-[#C59473] transition-colors" size={20} />
                  <input
                    name="email"
                    type="email"
                    placeholder="votre.nom@um6p.ma"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D]"
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-1 block">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30 group-focus-within:text-[#C59473] transition-colors" size={20} />
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D]"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-[#C59473] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {loading ? "Authentification..." : (
                <>
                  Entrer dans Ventura <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#D7CDC1]/20 text-center">
            <p className="text-[#3D332D]/50 text-sm font-medium">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-[#C59473] font-black hover:underline ml-1">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[#3D332D]/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-8">
          © 2026 Ventura Campus Market
        </p>
      </div>
    </div>
  );
};

export default Login;