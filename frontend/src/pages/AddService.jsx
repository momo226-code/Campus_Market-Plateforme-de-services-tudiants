import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, PlusCircle } from "lucide-react";

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
      return setError("Veuillez remplir tous les champs, y compris la catégorie.");
    }

    try {
      setLoading(true);
      await API.post("/services", form);
      // On redirige vers le dashboard pour que l'utilisateur voie son nouveau service
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de l'ajout du service. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D7CDC1]/20 pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Bouton Retour */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3D332D]/50 hover:text-[#3D332D] mb-8 font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Retour
        </button>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/50 relative overflow-hidden">
          
          {/* Accent Cuivré */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#C59473]"></div>

          <div className="mb-10">
            <h2 className="text-3xl font-[1000] tracking-tighter text-[#3D332D] flex items-center gap-3">
              Proposer un talent <Sparkles className="text-[#C59473]" size={28} />
            </h2>
            <p className="text-[#3D332D]/50 font-medium mt-2">Partage tes compétences avec la communauté UM6P.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold mb-8 flex items-center gap-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Titre */}
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Nom de la prestation</label>
              <input
                name="title"
                placeholder="Ex: Tresses, Coaching, Cuisine..."
                onChange={handleChange}
                className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D]"
                required
              />
            </div>

            {/* Catégorie & Prix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Catégorie</label>
                <select
                  name="category"
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D] appearance-none"
                  required
                >
                  <option value="">Choisir...</option>
                  <option value="Beauté & Soins">Beauté & Soins</option>
                  <option value="Cuisine">Cuisine</option>
                  <option value="Cours & Tutorat">Cours & Tutorat</option>
                  <option value="Technologie">Technologie</option>
                  <option value="Art & Design">Art & Design</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Prix indicatif (DH)</label>
                <input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D]"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Description détaillée</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Décris ce que tu proposes précisément..."
                onChange={handleChange}
                className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D] resize-none"
                required
              />
            </div>

            {/* Bouton de validation */}
            <button
              disabled={loading}
              className="w-full bg-[#3D332D] hover:bg-[#C59473] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-3 group disabled:opacity-50 mt-4"
            >
              {loading ? "Mise en ligne..." : (
                <>
                  Publier mon service <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
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