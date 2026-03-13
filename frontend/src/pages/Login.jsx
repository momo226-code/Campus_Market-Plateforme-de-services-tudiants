import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight, Star, CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.success;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      const token = res.data.token;
      
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      const redirectTo = location.state?.from?.pathname || "/dashboard"; 
      
      // Feedback visuel avant de partir
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 300);

    } catch (error) {
      setError(error.response?.data?.message || "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9] relative overflow-hidden px-4">
      
      {/* Orbes décoratifs Ventura */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#C59473]/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#3D332D]/5 blur-[150px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block group">
            <div className="w-16 h-16 bg-[#3D332D] rounded-[2rem] flex items-center justify-center text-[#D7CDC1] font-black text-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              V
            </div>
          </Link>
          <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-[#3D332D] mt-6">
            Welcome Back<span className="text-[#C59473]">.</span>
          </h1>
          <p className="text-[#3D332D]/40 font-bold uppercase text-[9px] tracking-[0.3em] mt-3">Connectez-vous à votre espace UM6P</p>
        </div>

        {successMsg && (
          <div className="mb-6 bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl text-xs font-black flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle size={18} /> {successMsg}
          </div>
        )}

        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-xs font-black flex items-center gap-2">
                <Star size={14} fill="currentColor" /> {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/30 ml-2">Email Campus</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#3D332D]/20 group-focus-within:text-[#C59473] transition-colors" size={18} />
                  <input
                    name="email"
                    type="email"
                    placeholder="prenom.nom@um6p.ma"
                    onChange={handleChange}
                    className="w-full pl-14 pr-4 py-5 bg-[#FDFBF9] border border-[#D7CDC1]/50 rounded-2xl focus:border-[#C59473] focus:ring-4 focus:ring-[#C59473]/5 outline-none transition-all font-semibold text-[#3D332D]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/30 ml-2">Sécurité</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#3D332D]/20 group-focus-within:text-[#C59473] transition-colors" size={18} />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="w-full pl-14 pr-14 py-5 bg-[#FDFBF9] border border-[#D7CDC1]/50 rounded-2xl focus:border-[#C59473] focus:ring-4 focus:ring-[#C59473]/5 outline-none transition-all font-semibold text-[#3D332D]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#3D332D]/20 hover:text-[#3D332D] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-[#C59473] text-white py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-3 group disabled:opacity-50 active:scale-95"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Accéder à l'espace <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#D7CDC1]/20 text-center">
            <p className="text-[#3D332D]/40 text-xs font-bold">
              Pas encore de compte ?
              <Link to="/register" className="text-[#C59473] font-black hover:text-[#3D332D] ml-2 transition-colors">
                CRÉER UN COMPTE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;