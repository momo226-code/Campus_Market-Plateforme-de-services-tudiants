import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, PlusCircle, ChevronDown } from "lucide-react";

// Source unique de vérité pour les catégories
const CATEGORIES = [
  "Beauté & Soins",
  "Cuisine",
  "Cours & Tutorat",
  "Technologie",
  "Art & Design",
  "Transport"
];

const AddService = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation côté client
    if (!form.title || !form.description || !form.price || !form.category) {
      return setError("Veuillez remplir tous les champs, y compris la catégorie.");
    }

    try {
      setLoading(true);
      
      // Envoi au backend
      // Le token est normalement géré automatiquement par ton intercepteur axios dans API
      await API.post("/services", form);
      
      // Redirection vers le dashboard pour voir le nouveau service dans la liste
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de l'ajout du service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Retour vers le Dashboard */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#3D332D]/50 hover:text-[#3D332D] mb-8 font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Retour au studio
        </button>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/30 relative overflow-hidden">
          
          {/* Ligne d'accent Ventura */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#C59473]"></div>

          <div className="mb-10">
            <h2 className="text-4xl font-[1000] tracking-tighter text-[#3D332D] flex items-center gap-3">
              Proposer un talent <Sparkles className="text-[#C59473]" size={28} />
            </h2>
            <p className="text-[#3D332D]/60 font-medium mt-2">Fais briller tes compétences au sein de l'UM6P.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl text-sm font-bold mb-8">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Titre du service */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Nom de ta prestation</label>
              <input
                name="title"
                type="text"
                placeholder="Ex: Coaching Python, Box repas, Tresses..."
                onChange={handleChange}
                value={form.title}
                className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] focus:ring-4 focus:ring-[#C59473]/5 outline-none transition-all font-semibold text-[#3D332D] placeholder:text-[#3D332D]/20"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Menu des Catégories */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Catégorie</label>
                <div className="relative">
                  <select
                    name="category"
                    onChange={handleChange}
                    value={form.category}
                    className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choisir...</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#3D332D]/30 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Prix */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Prix indicatif (DH)</label>
                <input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  value={form.price}
                  className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] placeholder:text-[#3D332D]/20"
                  required
                />
              </div>
            </div>

            {/* Description détaillée */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Description de ton offre</label>
              <textarea
                name="description"
                rows="5"
                placeholder="Détaille ce que tu proposes (lieu, durée, matériel fourni...)"
                onChange={handleChange}
                value={form.description}
                className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] resize-none placeholder:text-[#3D332D]/20"
                required
              />
            </div>

            {/* Bouton de Soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-4 group disabled:opacity-50 mt-4"
            >
              {loading ? (
                "Mise en ligne..."
              ) : (
                <>
                  Publier sur Ventura <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;