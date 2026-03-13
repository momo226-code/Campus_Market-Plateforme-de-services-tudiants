import { GraduationCap, Car, Palette, Code, Coffee, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Cours & Tutorat", icon: <GraduationCap size={32} />, slug: "Cours & Tutorat", color: "bg-[#C59473]/10", border: "hover:border-[#C59473]/40" },
  { id: 2, name: "Transport", icon: <Car size={32} />, slug: "Transport", color: "bg-[#3D332D]/5", border: "hover:border-[#3D332D]/20" },
  { id: 3, name: "Art & Design", icon: <Palette size={32} />, slug: "Art & Design", color: "bg-[#D7CDC1]/20", border: "hover:border-[#D7CDC1]/60" },
  { id: 4, name: "Technologie", icon: <Code size={32} />, slug: "Technologie", color: "bg-[#C59473]/10", border: "hover:border-[#C59473]/40" },
  { id: 5, name: "Beauté & Soins", icon: <Sparkles size={32} />, slug: "Beauté & Soins", color: "bg-[#3D332D]/5", border: "hover:border-[#3D332D]/20" },
  { id: 6, name: "Cuisine", icon: <Coffee size={32} />, slug: "Cuisine", color: "bg-[#D7CDC1]/20", border: "hover:border-[#D7CDC1]/60" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleExplore = (slug) => {
    // encodeURIComponent gère parfaitement les "&" de tes catégories
    navigate(`/marketplace?category=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* HEADER DE SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-[#C59473]"></span>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C59473]">
              Explorer le catalogue
            </h2>
          </div>
          <h3 className="text-4xl md:text-6xl font-[1000] tracking-tighter text-[#3D332D] leading-[0.9]">
            De quoi as-tu <br className="hidden md:block" /> besoin <span className="italic font-light text-[#C59473]">maintenant</span> ?
          </h3>
        </div>
      </div>

      {/* GRILLE RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => handleExplore(cat.slug)}
            className={`group relative bg-white border border-[#D7CDC1]/40 rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-2 overflow-hidden ${cat.border}`}
          >
            {/* Décoration d'angle dynamique */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} rounded-bl-[5rem] -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-700`}></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="text-[#3D332D] mb-8 w-16 h-16 bg-[#FDFBF9] rounded-2xl flex items-center justify-center group-hover:bg-[#3D332D] group-hover:text-white transition-all duration-500 shadow-sm">
                  {cat.icon}
                </div>
                <h4 className="text-2xl font-[1000] text-[#3D332D] tracking-tighter mb-4 group-hover:text-[#C59473] transition-colors">
                  {cat.name}
                </h4>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#3D332D]/30 group-hover:text-[#3D332D] font-black text-[9px] uppercase tracking-[0.2em] transition-all">
                  Découvrir
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FDFBF9] border border-[#D7CDC1]/50 text-[#3D332D] flex items-center justify-center group-hover:bg-[#C59473] group-hover:text-white group-hover:border-[#C59473] transition-all duration-300">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER DE SECTION (Optionnel) */}
      <div className="mt-20 text-center">
        <p className="text-[#3D332D]/30 font-bold text-xs uppercase tracking-widest">
          Plus de 50 talents vérifiés t'attendent à l'UM6P
        </p>
      </div>
    </section>
  );
};

export default CategorySection;