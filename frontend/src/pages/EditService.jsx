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
  const { id } = useParams(); // Récupère l'ID du service depuis l'URL
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

  // 1. Charger les données actuelles du service au montage du composant
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await API.get(`/services/${id}`);
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
      // 2. Envoyer la mise à jour (PUT) au backend
      await API.put(`/services/${id}`, form);
      // Redirection vers le dashboard après succès
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
        <Loader2 className="animate-spin text-[#C59473]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Retour */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#3D332D]/50 hover:text-[#3D332D] mb-8 font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Annuler et retourner au dashboard
        </button>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/30 relative overflow-hidden">
          
          {/* Ligne d'accent Ventura */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#3D332D]"></div>

          <div className="mb-10">
            <h2 className="text-4xl font-[1000] tracking-tighter text-[#3D332D] flex items-center gap-3">
              Modifier mon talent <Sparkles className="text-[#C59473]" size={28} />
            </h2>
            <p className="text-[#3D332D]/60 font-medium mt-2">Mets à jour tes informations pour la communauté.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl text-sm font-bold mb-8">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Titre */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Nom de la prestation</label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Catégorie */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Catégorie</label>
                <div className="relative">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] appearance-none cursor-pointer"
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Prix indicatif (DH)</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D]"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-4 mb-3 block">Description</label>
              <textarea
                name="description"
                rows="5"
                value={form.description}
                onChange={handleChange}
                className="w-full px-7 py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl focus:border-[#C59473] outline-none transition-all font-semibold text-[#3D332D] resize-none"
                required
              />
            </div>

            {/* Bouton de Sauvegarde */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-black text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-4 group disabled:opacity-50 mt-4"
            >
              {loading ? "Mise à jour..." : (
                <>
                  Enregistrer les modifications <Save size={20} className="group-hover:scale-110 transition-transform" />
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