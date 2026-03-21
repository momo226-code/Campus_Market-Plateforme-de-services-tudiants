import { useState, useRef } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, PlusCircle, ChevronDown, UploadCloud, X, ImageIcon } from "lucide-react";

const CATEGORIES = [
  "Beauté & Soins",
  "Cuisine",
  "Cours & Tutorat",
  "Technologie",
  "Art & Design",
  "Transport",
];

const AddService = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [imageFile, setImageFile]     = useState(null);   // fichier brut
  const [imagePreview, setImagePreview] = useState(null); // URL de prévisualisation
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const fileInputRef                  = useRef(null);
  const navigate                      = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Gestion de l'image ──
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérification type & taille (max 5 Mo)
    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image (JPG, PNG, WEBP...).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Soumission ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.price || !form.category) {
      return setError("Veuillez remplir tous les champs obligatoires.");
    }

    try {
      setLoading(true);

      // On utilise FormData pour envoyer l'image + les champs texte en une seule requête
      const data = new FormData();
      data.append("title",       form.title);
      data.append("description", form.description);
      data.append("price",       form.price);
      data.append("category",    form.category);
      if (imageFile) data.append("image", imageFile);

      await API.post("/services", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de l'ajout du service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Retour */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#3D332D]/50 hover:text-[#3D332D] mb-6 sm:mb-8 font-bold transition-colors group text-sm"
        >
          <ArrowLeft size={17} className="group-hover:-translate-x-1 transition-transform" />
          Retour au studio
        </button>

        {/* Carte formulaire */}
        <div className="bg-white p-5 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-[#3D332D]/5 border border-[#D7CDC1]/30 relative overflow-hidden">

          {/* Barre tricolore en haut */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E8603C] via-[#F2C94C] to-[#7A9E7E]" />

          {/* En-tête */}
          <div className="mb-7 sm:mb-9 mt-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] tracking-tighter text-[#3D332D] flex items-center gap-3 flex-wrap">
              Proposer un talent
              <Sparkles className="text-[#E8603C] shrink-0" size={22} />
            </h2>
            <p className="text-[#3D332D]/55 font-medium mt-2 text-sm">
              Fais briller tes compétences au sein de l'UM6P.
            </p>
          </div>

          {/* Erreur */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl sm:rounded-2xl text-xs font-bold mb-6 flex items-start gap-2">
              <span className="shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">

            {/* ── UPLOAD IMAGE ── */}
            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-1 mb-2 sm:mb-3 block">
                Image du service{" "}
                <span className="text-[#3D332D]/25 normal-case font-semibold tracking-normal">
                  (optionnelle, max 5 Mo)
                </span>
              </label>

              {imagePreview ? (
                /* ── Aperçu de l'image sélectionnée ── */
                <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#E8603C]/30 shadow-md">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  {/* Overlay avec bouton suppression */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-white text-[#3D332D] px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X size={14} /> Supprimer
                    </button>
                  </div>
                  {/* Bouton de suppression toujours visible sur mobile */}
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#3D332D] p-1.5 rounded-lg shadow-md hover:bg-red-50 hover:text-red-500 transition-colors sm:hidden"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#3D332D]/60">
                      {imageFile?.name?.slice(0, 24)}
                      {imageFile?.name?.length > 24 ? "…" : ""}
                    </span>
                  </div>
                </div>
              ) : (
                /* ── Zone de drop / click ── */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#D7CDC1] hover:border-[#E8603C] bg-[#FDFBF9] hover:bg-[#E8603C]/5 rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center gap-3 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E8603C]/10 group-hover:bg-[#E8603C]/20 flex items-center justify-center transition-colors">
                    <UploadCloud size={22} className="text-[#E8603C]" />
                  </div>
                  <div className="text-center">
                    <p className="text-[#3D332D] font-black text-xs sm:text-sm">
                      Clique pour choisir une image
                    </p>
                    <p className="text-[#3D332D]/40 text-[10px] sm:text-xs font-medium mt-1">
                      JPG, PNG, WEBP — max 5 Mo
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#E8603C] text-[9px] font-black uppercase tracking-widest">
                    <ImageIcon size={11} /> Parcourir les fichiers
                  </div>
                </button>
              )}

              {/* Input caché */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Titre */}
            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-1 mb-2 sm:mb-3 block">
                Nom de ta prestation <span className="text-[#E8603C]">*</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Ex: Coaching Python, Box repas..."
                onChange={handleChange}
                value={form.title}
                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl sm:rounded-2xl focus:border-[#E8603C] outline-none transition-all font-semibold text-[#3D332D] placeholder:text-[#3D332D]/20 text-sm"
                required
              />
            </div>

            {/* Catégorie + Prix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="relative">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-1 mb-2 sm:mb-3 block">
                  Catégorie <span className="text-[#E8603C]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="category"
                    onChange={handleChange}
                    value={form.category}
                    className="w-full px-4 sm:px-6 py-3.5 sm:py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl sm:rounded-2xl focus:border-[#E8603C] outline-none transition-all font-semibold text-[#3D332D] appearance-none cursor-pointer text-sm"
                    required
                  >
                    <option value="">Choisir...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30 pointer-events-none"
                    size={17}
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-1 mb-2 sm:mb-3 block">
                  Prix (DH) <span className="text-[#E8603C]">*</span>
                </label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  placeholder="0"
                  onChange={handleChange}
                  value={form.price}
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl sm:rounded-2xl focus:border-[#E8603C] outline-none transition-all font-semibold text-[#3D332D] text-sm"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#3D332D]/40 ml-1 mb-2 sm:mb-3 block">
                Description <span className="text-[#E8603C]">*</span>
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Détaille ce que tu proposes, tes disponibilités, ton niveau..."
                onChange={handleChange}
                value={form.description}
                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 md:py-5 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl sm:rounded-2xl focus:border-[#E8603C] outline-none transition-all font-semibold text-[#3D332D] resize-none text-sm placeholder:text-[#3D332D]/20"
                required
              />
            </div>

            {/* Bouton soumettre */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8603C] hover:bg-[#3D332D] text-white py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] transition-all shadow-xl shadow-[#E8603C]/25 flex items-center justify-center gap-3 group disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Mise en ligne...
                </>
              ) : (
                <>
                  Publier sur Ventura
                  <PlusCircle
                    size={17}
                    className="group-hover:rotate-90 transition-transform"
                  />
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