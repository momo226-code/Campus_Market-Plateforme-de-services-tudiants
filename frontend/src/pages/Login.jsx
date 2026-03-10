import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Star } from "lucide-react";

// Assets
import textureImg from "../assets/texture.png";

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
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    } catch (error) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4"
      style={{ 
        backgroundImage: `url(${textureImg})`, 
        backgroundSize: '400px', 
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Gradients de fond circulaires pour le style "Vibrant" */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2563eb]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ff5c5c]/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Logo / Badge */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-900/20">
              V
            </div>
          </Link>
          <h1 className="text-3xl font-[1000] tracking-tighter text-[#0f172a]">
            Bon retour sur <span className="text-[#2563eb]">VENTURA.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Connecte-toi pour gérer tes services</p>
        </div>

        {/* Formulaire Card */}
        <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 relative overflow-hidden">
          
          {/* Petite barre de dégradé en haut de la card */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2563eb] to-[#ff5c5c]"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 animate-shake">
                <Star size={16} fill="currentColor" /> {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Input Email */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Email Campus</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={20} />
                  <input
                    name="email"
                    type="email"
                    placeholder="exemple@um6p.ma"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#2563eb] focus:bg-white focus:outline-none transition-all font-medium text-[#0f172a]"
                    required
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={20} />
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#2563eb] focus:bg-white focus:outline-none transition-all font-medium text-[#0f172a]"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#0f172a] hover:bg-[#2563eb] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {loading ? "Vérification..." : (
                <>
                  Se connecter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Nouveau ici ?{" "}
              <Link to="/register" className="text-[#2563eb] font-black hover:underline ml-1">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        {/* Footer discret */}
        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-8">
          © 2026 Ventura Campus Market
        </p>
      </div>
    </div>
  );
};

export default Login;