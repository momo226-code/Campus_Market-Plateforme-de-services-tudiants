import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, LayoutGrid } from "lucide-react";
import API from "../services/api";
import ServiceCard from "../components/ServiceCard";

const CategoryPage = () => {
  const { categorySlug } = useParams(); // Récupère "academique", "transport", etc.
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // On appelle tous les services, puis on filtrera côté client 
    // (Ou tu peux adapter ton backend pour : API.get(`/services?category=${categorySlug}`))
    API.get("/services")
      .then((res) => {
        const filtered = res.data.filter(s => s.category === categorySlug);
        setServices(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation / Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[#3D332D]/40 hover:text-[#C59473] font-black text-[10px] uppercase tracking-widest mb-6 transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Retour à l'accueil
            </Link>
            <h1 className="text-5xl md:text-6xl font-[1000] tracking-tighter text-[#3D332D] capitalize">
              {categorySlug}<span className="text-[#C59473]">.</span>
            </h1>
            <p className="text-[#3D332D]/50 font-medium mt-2">
              Découvre les pépites disponibles dans cette catégorie.
            </p>
          </div>

          {/* Petit compteur/filtre visuel */}
          <div className="flex items-center gap-4">
             <div className="bg-white border border-[#D7CDC1] px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                <LayoutGrid size={18} className="text-[#C59473]" />
                <span className="text-sm font-black text-[#3D332D]">{services.length} Services</span>
             </div>
          </div>
        </div>

        {/* Grille de Services */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] bg-[#D7CDC1]/10 animate-pulse rounded-[2.5rem]"></div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white border border-dashed border-[#D7CDC1] rounded-[3rem]">
            <p className="text-[#3D332D]/30 font-black uppercase tracking-[0.2em] text-xs">
              Aucun service pour le moment dans cette catégorie
            </p>
            <Link to="/add-service" className="inline-block mt-6 text-[#C59473] font-bold hover:underline">
              Sois le premier à en proposer un !
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;