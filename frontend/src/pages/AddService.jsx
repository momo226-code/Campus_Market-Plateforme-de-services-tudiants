import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, PlusCircle, ChevronDown } from "lucide-react";

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

    if (!form.title || !form.description || !form.price || !form.category) {
      return setError("Veuillez remplir tous les champs.");
    }

    try {
      setLoading(true);
      await API.post("/services", form);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de l'ajout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // pt-24 sur mobile, pt-32 sur desktop pour s'accorder avec le nouveau Layout
    <div className="min-h-screen bg-[#FDFBF9] pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Retour */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#3D332D]/50 hover:text-[#3D332D] mb-6 md:mb-8 font-bold transition-colors group text-sm md:text-base"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Retour au studio
        </button>

        {/* Card du formulaire - Arrondis adaptés au mobile */}
        <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/30 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-[#C59473]"></div>

          <div className="mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-[1000] tracking-tighter text-[#3D332D] flex items-center gap-3">
              Proposer un talent <Sparkles className="text-[#C59473] shrink-0" size={24} md:size={28} />
            </h2>
            <p className="text-[#3D332D]/60 font-medium mt-2 text-sm md:text-base">Fais briller tes compétences au sein de l'UM6P.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 md:p-5 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold mb-6 md:mb-8">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

            {/* Titre du service */}
            <div>
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-2 md:ml-4 mb-2 md:mb-3 block">Nom de ta prestation</label>
              <input
                name="title"
                type="text"
                placeholder="Ex: Coaching Python, Box repas..."
                onChange={handleChange}
                value={form.title}
                className="w-full px-5 md:px-7 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] placeholder:text-[#3D332D]/20 text-sm md:text-base"
                required
              />
            </div>

            {/* Grid adaptative : 1 col sur mobile, 2 cols sur tablette/desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Menu des Catégories */}
              <div className="relative">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-2 md:ml-4 mb-2 md:mb-3 block">Catégorie</label>
                <div className="relative">
                  <select
                    name="category"
                    onChange={handleChange}
                    value={form.category}
                    className="w-full px-5 md:px-7 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] appearance-none cursor-pointer text-sm md:text-base"
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
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-2 md:ml-4 mb-2 md:mb-3 block">Prix indicatif (DH)</label>
                <input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  value={form.price}
                  className="w-full px-5 md:px-7 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] text-sm md:text-base"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-2 md:ml-4 mb-2 md:mb-3 block">Description de ton offre</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Détaille ce que tu proposes..."
                onChange={handleChange}
                value={form.description}
                className="w-full px-5 md:px-7 py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl md:rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] resize-none text-sm md:text-base"
                required
              />
            </div>

            {/* Bouton de Soumission - py-5 sur mobile pour être massif et cliquable */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-black text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-3 md:gap-4 group disabled:opacity-50 mt-4"
            >
              {loading ? (
                "Mise en ligne..."
              ) : (
                <>
                  Publier sur Ventura <PlusCircle size={18} md:size={20} className="group-hover:rotate-90 transition-transform" />
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