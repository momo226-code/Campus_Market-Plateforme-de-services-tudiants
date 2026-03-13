import { GraduationCap, Car, Palette, Code, Coffee, ArrowRight, Sparkles } from "lucide-react";

// On garde tes catégories avec les mêmes noms que dans ta base MongoDB
const categories = [
  { id: 1, name: "Cours & Tutorat", icon: <GraduationCap size={32} />, count: "12 services", slug: "Cours & Tutorat", color: "bg-[#C59473]/10" },
  { id: 2, name: "Transport", icon: <Car size={32} />, count: "8 services", slug: "Transport", color: "bg-[#3D332D]/5" },
  { id: 3, name: "Art & Design", icon: <Palette size={32} />, count: "15 services", slug: "Art & Design", color: "bg-[#D7CDC1]/20" },
  { id: 4, name: "Technologie", icon: <Code size={32} />, count: "10 services", slug: "Technologie", color: "bg-[#C59473]/10" },
  { id: 5, name: "Beauté & Soins", icon: <Sparkles size={32} />, count: "5 services", slug: "Beauté & Soins", color: "bg-[#3D332D]/5" },
  { id: 6, name: "Cuisine", icon: <Coffee size={32} />, count: "20 services", slug: "Cuisine", color: "bg-[#D7CDC1]/20" },
];

const CategorySection = ({ onSelectCategory, activeCategory }) => {
  
  const handleExplore = (slug) => {
    // Si on clique sur la catégorie déjà active, on retire le filtre (toggle)
    if (activeCategory === slug) {
      onSelectCategory("");
    } else {
      // Sinon, on envoie le slug (ex: "Cours & Tutorat") à Home.jsx
      onSelectCategory(slug);
      
      // Petit scroll automatique vers les services pour voir le résultat
      const servicesSection = document.getElementById("services-list");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
        <p className="max-w-xs text-[#3D332D]/50 font-medium text-sm leading-relaxed">
          Trouve les meilleurs services proposés par les talents de l'UM6P, filtrés par catégories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => handleExplore(cat.slug)} // Toute la carte devient cliquable
            className={`group relative border rounded-[2.5rem] p-8 transition-all duration-500 cursor-pointer overflow-hidden
              ${activeCategory === cat.slug 
                ? "border-[#C59473] bg-[#C59473]/5 shadow-xl -translate-y-2" 
                : "bg-white border-[#D7CDC1]/50 hover:shadow-2xl hover:shadow-[#3D332D]/5 hover:-translate-y-2"
              }`}
          >
            {/* Background Decor */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} rounded-bl-[5rem] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110`}></div>

            <div className="relative z-10">
              <div className={`mb-6 transition-colors duration-300 
                ${activeCategory === cat.slug ? "text-[#C59473]" : "text-[#3D332D] group-hover:text-[#C59473]"}`}>
                {cat.icon}
              </div>
              
              <h4 className="text-2xl font-black text-[#3D332D] tracking-tighter mb-1">
                {cat.name}
              </h4>
              <p className="text-[#3D332D]/40 text-xs font-bold uppercase tracking-widest mb-8">
                {cat.count}
              </p>

              <div className="flex items-center gap-3 text-[#3D332D] font-black text-xs uppercase tracking-[0.15em]">
                {activeCategory === cat.slug ? "Filtré" : "Explorer"}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${activeCategory === cat.slug ? "bg-[#C59473] text-white" : "bg-[#3D332D] text-white group-hover:bg-[#C59473]"}`}>
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