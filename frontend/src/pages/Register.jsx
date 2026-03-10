import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Phone, UserPlus, ArrowRight, Star } from "lucide-react";

// Assets
import textureImg from "../assets/texture.png";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.phone) {
      return setError("Veuillez remplir tous les champs.");
    }

    try {
      setLoading(true);
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (error) {
      setError("Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4 py-12"
      style={{ 
        backgroundImage: `url(${textureImg})`, 
        backgroundSize: '400px', 
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Halos lumineux dynamiques */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2563eb]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff5c5c]/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">
            Rejoins la communauté
          </div>
          <h1 className="text-3xl font-[1000] tracking-tighter text-[#0f172a]">
            Créer un compte <span className="text-[#ff5c5c]">VENTURA.</span>
          </h1>
        </div>

        {/* Card Formulaire */}
        <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 relative overflow-hidden">
          
          {/* Ligne de dégradé Ventura */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff5c5c] to-[#2563eb]"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 animate-bounce-short">
                <Star size={16} fill="currentColor" /> {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Nom Complet */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Identité</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    name="name"
                    type="text"
                    placeholder="Ton nom complet"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#2563eb] focus:bg-white focus:outline-none transition-all font-medium text-[#0f172a] text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    name="email"
                    type="email"
                    placeholder="ton-email@um6p.ma"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#2563eb] focus:bg-white focus:outline-none transition-all font-medium text-[#0f172a] text-sm"
                    required
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Contact</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    name="phone"
                    type="text"
                    placeholder="06XXXXXXXX"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#2563eb] focus:bg-white focus:outline-none transition-all font-medium text-[#0f172a] text-sm"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-1 block">Sécurité</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] transition-colors" size={18} />
                  <input
                    name="password"
                    type="password"
                    placeholder="Créer un mot de passe"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#2563eb] focus:bg-white focus:outline-none transition-all font-medium text-[#0f172a] text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#0f172a] hover:bg-[#2563eb] text-white py-4.5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 group disabled:opacity-50 mt-4"
            >
              {loading ? "Création..." : (
                <>
                  Créer mon compte <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Déjà un membre ?{" "}
              <Link to="/login" className="text-[#2563eb] font-black hover:underline ml-1">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;