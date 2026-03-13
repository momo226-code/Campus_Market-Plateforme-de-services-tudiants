import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, Save, ChevronDown, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Beauté & Soins",
  "Cuisine",
  "Cours & Tutorat",
  "Technologie",
  "Art & Design",
  "Transport"
];

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await API.get(`/services/${id}`);
        // Sécurité : on s'assure de ne récupérer que ce dont on a besoin
        const { title, description, price, category } = res.data;
        setForm({ title, description, price, category });
      } catch (err) {
        setError("Impossible de récupérer les détails du service.");
      } finally {
        setFetching(false);
      }
    };
    fetchServiceData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.put(`/services/${id}`, form);
      // Feedback visuel avant redirection (optionnel mais sympa)
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#C59473]" size={40} />
          <p className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40">Chargement du studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Retour - Plus compacte sur mobile */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#3D332D]/40 hover:text-[#3D332D] mb-6 md:mb-8 font-bold transition-colors group text-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Annuler les modifications
        </button>

        <div className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/30 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#3D332D]"></div>

          <div className="mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-[1000] tracking-tighter text-[#3D332D] flex items-center gap-3 leading-none">
              Édition <Sparkles className="text-[#C59473] shrink-0" size={24} />
            </h2>
            <p className="text-[#3D332D]/40 font-bold mt-2 uppercase text-[9px] tracking-[0.2em]">Mise à jour de ton offre</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 md:p-5 rounded-2xl text-xs font-bold mb-8">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

            {/* Titre */}
            <div>
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/30 ml-2 mb-3 block">Nom du service</label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className="w-full px-6 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1]/50 rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D]"
                placeholder="Ex: Coaching Mathématiques"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Catégorie */}
              <div className="relative">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/30 ml-2 mb-3 block">Catégorie</label>
                <div className="relative">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-6 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1]/50 rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] appearance-none cursor-pointer"
                    required
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#3D332D]/30 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Prix */}
              <div>
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/30 ml-2 mb-3 block">Prix (DH)</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-6 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1]/50 rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D]"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/30 ml-2 mb-3 block">Détails de la prestation</label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                className="w-full px-6 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1]/50 rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] resize-none"
                required
              />
            </div>

            {/* Bouton de Sauvegarde */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-[#C59473] text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Sauvegarder <Save size={18} className="group-hover:translate-y-[-2px] transition-transform" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditService;