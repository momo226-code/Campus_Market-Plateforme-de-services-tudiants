import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Phone, UserPlus, Star, ArrowRight } from "lucide-react";

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

    // 1. Validation de base
    if (!form.name || !form.email || !form.password || !form.phone) {
      return setError("Veuillez remplir tous les champs.");
    }

    // 2. Validation de l'email institutionnel
    if (!form.email.endsWith("@um6p.ma")) {
      return setError("Veuillez utiliser votre adresse @um6p.ma");
    }

    try {
      setLoading(true);
      await API.post("/auth/register", form);
      
      // 3. Redirection avec message de succès vers Login
      navigate("/login", { 
        state: { success: "Ton compte Ventura a été créé ! Tu peux maintenant te connecter." } 
      });

    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D7CDC1]/30 relative overflow-hidden px-4 py-12">
      
      {/* Effets de profondeur Ventura */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C59473]/15 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3D332D]/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* En-tête épuré */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#C59473]/10 text-[#C59473] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-[#C59473]/20">
            Rejoins le campus
          </div>
          <h1 className="text-4xl font-[1000] tracking-tighter text-[#3D332D]">
            Créer un compte <span className="text-[#C59473]">.</span>
          </h1>
        </div>

        {/* Card Formulaire */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/50 relative overflow-hidden">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 animate-shake">
                <Star size={16} fill="currentColor" /> {error}
              </div>
            )}

            <div className="space-y-3">
              {/* Nom Complet */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-1 block">Identité</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30 group-focus-within:text-[#C59473] transition-colors" size={18} />
                  <input
                    name="name"
                    type="text"
                    placeholder="Prénom Nom"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D] text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-1 block">Email UM6P</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30 group-focus-within:text-[#C59473] transition-colors" size={18} />
                  <input
                    name="email"
                    type="email"
                    placeholder="prenom.nom@um6p.ma"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D] text-sm"
                    required
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-1 block">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30 group-focus-within:text-[#C59473] transition-colors" size={18} />
                  <input
                    name="phone"
                    type="text"
                    placeholder="06XXXXXXXX"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D] text-sm"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-1 block">Sécurité</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30 group-focus-within:text-[#C59473] transition-colors" size={18} />
                  <input
                    name="password"
                    type="password"
                    placeholder="Mot de passe robuste"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D] text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-[#C59473] text-white py-4.5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-3 group disabled:opacity-50 mt-6"
            >
              {loading ? "Création du compte..." : (
                <>
                  Créer mon accès <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#D7CDC1]/20 text-center">
            <p className="text-[#3D332D]/50 text-sm font-medium">
              Déjà inscrit ?{" "}
              <Link to="/login" className="text-[#C59473] font-black hover:underline ml-1">
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