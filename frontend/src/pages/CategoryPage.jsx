import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, LayoutGrid, Sparkles, Search } from "lucide-react";
import API from "../services/api";
import ServiceCard from "../components/ServiceCard";

const CategoryPage = () => {
  const { categorySlug } = useParams(); 
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset le scroll quand on change de catégorie
    setLoading(true);
    
    // On simule une petite attente pour le côté "smooth" de l'animation
    API.get("/services")
      .then((res) => {
        // Filtrage (insensible à la casse pour plus de sécurité)
        const filtered = res.data.filter(s => 
          s.category.toLowerCase() === categorySlug.toLowerCase()
        );
        setServices(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-28 md:pt-40 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* FIL D'ARIANE / HEADER */}
        <div className="mb-12 md:mb-20">
          <Link 
            to="/marketplace" 
            className="inline-flex items-center gap-2 text-[#3D332D]/30 hover:text-[#C59473] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Retour à la marketplace
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter text-[#3D332D] capitalize">
                  {categorySlug}<span className="text-[#C59473]">.</span>
                </h1>
              </div>
              <p className="text-[#3D332D]/40 font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                <Sparkles size={14} className="text-[#C59473]" /> 
                {services.length} pépites dénichées à l'UM6P
              </p>
            </div>

            {/* Badge de Stats */}
            <div className="hidden md:flex items-center gap-4 bg-white border border-[#D7CDC1]/50 p-2 rounded-2xl shadow-sm">
              <div className="bg-[#3D332D] text-white p-3 rounded-xl">
                <LayoutGrid size={20} />
              </div>
              <div className="pr-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#3D332D]/30 leading-none mb-1">Affichage</p>
                <p className="text-sm font-black text-[#3D332D]">Grille Premium</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRILLE DE SERVICES */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[420px] bg-white border border-[#D7CDC1]/20 rounded-[2.5rem] animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D7CDC1]/5 to-transparent animate-shimmer"></div>
              </div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          /* ÉTAT VIDE */
          <div className="relative group overflow-hidden">
             <div className="text-center py-32 md:py-48 bg-white border border-[#D7CDC1]/30 rounded-[3rem] shadow-sm relative z-10">
                <div className="w-20 h-20 bg-[#FDFBF9] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#D7CDC1] group-hover:rotate-12 transition-transform duration-500">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-black text-[#3D332D] mb-2 tracking-tight">C'est un peu calme ici...</h3>
                <p className="text-[#3D332D]/40 font-medium mb-10 max-w-xs mx-auto text-sm leading-relaxed">
                  Aucun service n'a encore été posté dans la catégorie <span className="font-bold text-[#3D332D]">{categorySlug}</span>.
                </p>
                <Link 
                  to="/add-service" 
                  className="bg-[#3D332D] text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#C59473] transition-all shadow-xl shadow-[#3D332D]/10"
                >
                  Devenir le premier vendeur
                </Link>
             </div>
             {/* Déco d'arrière-plan */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C59473]/5 blur-[100px] rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;