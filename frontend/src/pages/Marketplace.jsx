import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import API from "../services/api";
import ServiceCard from "../components/ServiceCard";
import { SlidersHorizontal, Search, ArrowRight } from "lucide-react";

const CATEGORIES = ["Cours & Tutorat", "Transport", "Art & Design", "Technologie", "Beauté & Soins", "Cuisine"];

const catColors = {
  "Cours & Tutorat": { bg: "#7A9E7E", light: "#E8F0E8" },
  "Transport":       { bg: "#3D332D", light: "#EDE8E3" },
  "Art & Design":    { bg: "#F2C94C", light: "#FDF6DC" },
  "Technologie":     { bg: "#E8603C", light: "#FDE8E0" },
  "Beauté & Soins":  { bg: "#C59473", light: "#F5E6C8" },
  "Cuisine":         { bg: "#7A9E7E", light: "#E8F0E8" },
};

const Marketplace = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { search: urlSearch } = useLocation();
  const queryParams = new URLSearchParams(urlSearch);
  const categoryFilter = queryParams.get("category");

  useEffect(() => {
    setLoading(true);
    const url = categoryFilter
      ? `/services?category=${encodeURIComponent(categoryFilter)}`
      : "/services";
    API.get(url)
      .then((res) => { setServices(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [categoryFilter]);

  const filtered = services.filter((s) =>
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCat = categoryFilter ? catColors[categoryFilter] : null;

  return (
    <div className="min-h-screen text-[#3D332D]" style={{ backgroundColor: "#F5E6C8" }}>

      {/* ── HEADER HERO MARKETPLACE ── */}
      <div
        className="pt-28 sm:pt-36 pb-16 px-4 relative overflow-hidden"
        style={{ backgroundColor: activeCat?.light || "#F5E6C8" }}
      >
        {/* Cercle déco */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ backgroundColor: activeCat?.bg || "#C59473" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#3D332D]/40 mb-6">
            <Link to="/" className="hover:text-[#E8603C] transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-[#3D332D]/60">{categoryFilter || "Tous les talents"}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter leading-[0.9] text-[#3D332D]">
                {categoryFilter || "Tous les"}<br />
                <span className="text-[#E8603C]">Talents.</span>
              </h1>
              <p className="text-[#3D332D]/45 font-black uppercase text-[9px] tracking-widest mt-4">
                {filtered.length} services disponibles sur le campus
              </p>
            </div>

            {/* Search bar */}
            <div className="relative max-w-sm w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D332D]/30" />
              <input
                type="text"
                placeholder="Chercher un service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-white/60 bg-white/70 backdrop-blur focus:outline-none focus:border-[#E8603C] font-medium text-sm text-[#3D332D] placeholder:text-[#3D332D]/30 transition-all"
              />
            </div>
          </div>

          {/* Filtres catégories */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/marketplace"
              className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all border-2 ${
                !categoryFilter
                  ? "bg-[#3D332D] text-white border-[#3D332D]"
                  : "bg-white/60 text-[#3D332D]/60 border-transparent hover:border-[#3D332D]/20"
              }`}
            >
              Tout
            </Link>
            {CATEGORIES.map((cat) => {
              const col = catColors[cat];
              const isActive = categoryFilter === cat;
              return (
                <Link
                  key={cat}
                  to={`/marketplace?category=${encodeURIComponent(cat)}`}
                  className="px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all border-2"
                  style={{
                    backgroundColor: isActive ? col.bg : "rgba(255,255,255,0.6)",
                    color: isActive ? "#fff" : "#3D332D99",
                    borderColor: isActive ? col.bg : "transparent",
                  }}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── GRILLE SERVICES ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14" style={{ backgroundColor: "#F5E6C8" }}>
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin w-10 h-10 border-4 border-[#E8603C] border-t-transparent rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-black text-[#3D332D]/30 uppercase text-xs tracking-widest">Aucun service trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;