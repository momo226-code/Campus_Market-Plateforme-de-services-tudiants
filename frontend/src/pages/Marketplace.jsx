import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import ServiceCard from "../components/ServiceCard";
import { Search, Sparkles } from "lucide-react";

const CATEGORIES = ["Tous", "Beauté & Soins", "Cuisine", "Cours & Tutorat", "Technologie", "Art & Design", "Transport"];

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || "Tous";
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    // On ne filtre au niveau API que si une catégorie spécifique est choisie
    const url = (category && category !== "Tous") 
      ? `/services?category=${encodeURIComponent(category)}` 
      : "/services";
    
    API.get(url)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  // Filtrage local supplémentaire pour la barre de recherche
  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (cat) => {
    if (cat === "Tous") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-[#D7CDC1]/30 pt-6 md:pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-[1000] tracking-tighter text-[#3D332D]">
                Marketplace<span className="text-[#C59473]">.</span>
              </h1>
              <p className="text-[#3D332D]/40 font-bold mt-2 uppercase text-[9px] md:text-[10px] tracking-[0.2em]">
                {category !== "Tous" ? `Talents en ${category}` : "Explore tous les talents de l'UM6P"}
              </p>
            </div>

            {/* BARRE DE RECHERCHE */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Rechercher un talent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#C59473] transition-all font-semibold text-sm shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30" size={18} />
            </div>
          </div>

          {/* FILTRES PAR CATÉGORIES (Scrollable sur mobile) */}
          <div className="flex items-center gap-3 mt-10 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border ${
                  category === cat
                    ? "bg-[#3D332D] border-[#3D332D] text-white shadow-xl shadow-[#3D332D]/20"
                    : "bg-white border-[#D7CDC1] text-[#3D332D]/40 hover:border-[#3D332D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRILLE DE RÉSULTATS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-80 bg-white/50 border border-[#D7CDC1]/20 rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredServices.map((s) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#D7CDC1]/50">
              <Sparkles className="text-[#D7CDC1]" size={32} />
            </div>
            <p className="text-[#3D332D]/30 font-bold uppercase text-[10px] tracking-widest italic">
              Aucun résultat pour cette recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;