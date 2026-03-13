import { GraduationCap, Car, Palette, Code, Coffee, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Cours & Tutorat", icon: <GraduationCap size={32} />, slug: "Cours & Tutorat", color: "bg-[#C59473]/10" },
  { id: 2, name: "Transport", icon: <Car size={32} />, slug: "Transport", color: "bg-[#3D332D]/5" },
  { id: 3, name: "Art & Design", icon: <Palette size={32} />, slug: "Art & Design", color: "bg-[#D7CDC1]/20" },
  { id: 4, name: "Technologie", icon: <Code size={32} />, slug: "Technologie", color: "bg-[#C59473]/10" },
  { id: 5, name: "Beauté & Soins", icon: <Sparkles size={32} />, slug: "Beauté & Soins", color: "bg-[#3D332D]/5" },
  { id: 6, name: "Cuisine", icon: <Coffee size={32} />, slug: "Cuisine", color: "bg-[#D7CDC1]/20" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleExplore = (slug) => {
    // Redirige vers la nouvelle page Marketplace avec le paramètre
    navigate(`/marketplace?category=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C59473] mb-3">
            Explore le catalogue
          </h2>
          <h3 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-[#3D332D]">
            De quoi as-tu <br /> besoin aujourd'hui ?
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => handleExplore(cat.slug)}
            className="group relative bg-white border border-[#D7CDC1]/50 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-2 overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} rounded-bl-[5rem] -mr-8 -mt-8`}></div>
            <div className="relative z-10">
              <div className="text-[#3D332D] mb-6 group-hover:text-[#C59473] transition-colors">
                {cat.icon}
              </div>
              <h4 className="text-2xl font-black text-[#3D332D] tracking-tighter mb-8">{cat.name}</h4>
              <div className="flex items-center gap-3 text-[#3D332D] font-black text-xs uppercase tracking-[0.15em]">
                Voir les services 
                <div className="w-8 h-8 rounded-full bg-[#3D332D] text-white flex items-center justify-center group-hover:bg-[#C59473] transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;