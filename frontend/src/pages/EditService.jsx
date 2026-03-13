import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Save, ArrowLeft, Loader2 } from "lucide-react";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  // 1. Charger les données actuelles du service
  useEffect(() => {
    API.get(`/services/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate("/dashboard");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await API.put(`/services/${id}`, form);
      navigate("/dashboard"); // Retour au dashboard après succès
    } catch (error) {
      alert("Erreur lors de la mise à jour");
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#D7CDC1]/20">
      <Loader2 className="animate-spin text-[#C59473]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#D7CDC1]/20 pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#3D332D]/50 hover:text-[#3D332D] mb-8 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Retour au Dashboard
        </button>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/50">
          <h1 className="text-3xl font-[1000] tracking-tighter text-[#3D332D] mb-8">
            Modifier ma pépite<span className="text-[#C59473]">.</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Titre du service</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Catégorie</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D]"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Prix (DH)</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 ml-4 mb-2 block">Description</label>
              <textarea
                name="description"
                rows="5"
                value={form.description}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-[#D7CDC1]/10 border border-transparent rounded-2xl focus:border-[#C59473] focus:bg-white focus:outline-none transition-all font-medium text-[#3D332D] resize-none"
              ></textarea>
            </div>

            <button
              disabled={updating}
              className="w-full bg-[#3D332D] hover:bg-[#C59473] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-[#3D332D]/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {updating ? "Mise à jour..." : (
                <>
                  Enregistrer les modifications <Save size={18} />
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