import { GraduationCap, Car, Palette, Code, Coffee, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Palette enrichie : chaque catégorie a sa couleur signature
const categories = [
  {
    id: 1,
    name: "Cours & Tutorat",
    icon: <GraduationCap size={28} />,
    slug: "Cours & Tutorat",
    bg: "bg-[#7A9E7E]/10",
    iconBg: "bg-[#7A9E7E]",
    accent: "group-hover:text-[#7A9E7E]",
    border: "hover:border-[#7A9E7E]/40",
    dot: "bg-[#7A9E7E]",
  },
  {
    id: 2,
    name: "Transport",
    icon: <Car size={28} />,
    slug: "Transport",
    bg: "bg-[#3D332D]/5",
    iconBg: "bg-[#3D332D]",
    accent: "group-hover:text-[#3D332D]",
    border: "hover:border-[#3D332D]/25",
    dot: "bg-[#3D332D]",
  },
  {
    id: 3,
    name: "Art & Design",
    icon: <Palette size={28} />,
    slug: "Art & Design",
    bg: "bg-[#F2C94C]/10",
    iconBg: "bg-[#F2C94C]",
    accent: "group-hover:text-[#C59473]",
    border: "hover:border-[#F2C94C]/50",
    dot: "bg-[#F2C94C]",
  },
  {
    id: 4,
    name: "Technologie",
    icon: <Code size={28} />,
    slug: "Technologie",
    bg: "bg-[#E8603C]/8",
    iconBg: "bg-[#E8603C]",
    accent: "group-hover:text-[#E8603C]",
    border: "hover:border-[#E8603C]/30",
    dot: "bg-[#E8603C]",
  },
  {
    id: 5,
    name: "Beauté & Soins",
    icon: <Sparkles size={28} />,
    slug: "Beauté & Soins",
    bg: "bg-[#C59473]/10",
    iconBg: "bg-[#C59473]",
    accent: "group-hover:text-[#C59473]",
    border: "hover:border-[#C59473]/40",
    dot: "bg-[#C59473]",
  },
  {
    id: 6,
    name: "Cuisine",
    icon: <Coffee size={28} />,
    slug: "Cuisine",
    bg: "bg-[#7A9E7E]/8",
    iconBg: "bg-[#7A9E7E]",
    accent: "group-hover:text-[#7A9E7E]",
    border: "hover:border-[#7A9E7E]/40",
    dot: "bg-[#7A9E7E]",
  },
];

const CategorySection = ({ onSelectCategory, activeCategory }) => {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    if (onSelectCategory) {
      // Utilisé depuis Home — filtre les services sur place
      onSelectCategory(slug === activeCategory ? "" : slug);
    } else {
      // Utilisé depuis d'autres pages — redirige vers le marketplace
      navigate(`/marketplace?category=${encodeURIComponent(slug)}`);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-[#E8603C]" />
            <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[#E8603C]">
              Explorer le catalogue
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] tracking-tighter text-[#3D332D] leading-[0.9]">
            De quoi as-tu{" "}
            <br className="hidden sm:block" />
            besoin{" "}
            <span className="italic font-light text-[#C59473]">maintenant</span>
            <span className="text-[#E8603C]"> ?</span>
          </h3>
        </div>
      </div>

      {/* ── Grille catégories ── */}
      {/* 1 col mobile, 2 cols sm, 3 cols lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-7">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.slug)}
              className={`group relative bg-white border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-400 hover:shadow-xl cursor-pointer hover:-translate-y-1 overflow-hidden ${
                isActive
                  ? `border-[#E8603C] shadow-lg shadow-[#E8603C]/10`
                  : `border-[#D7CDC1]/40 ${cat.border}`
              }`}
            >
              {/* Décoration coin */}
              <div
                className={`absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 ${cat.bg} rounded-bl-[3rem] sm:rounded-bl-[4rem] -mr-5 -mt-5 group-hover:scale-125 transition-transform duration-500`}
              />

              {/* Indicateur actif */}
              {isActive && (
                <div className="absolute top-3 left-3 bg-[#E8603C] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                  Actif
                </div>
              )}

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Icône */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${cat.iconBg} text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-md transition-transform group-hover:scale-110 duration-300`}
                  >
                    {cat.icon}
                  </div>

                  {/* Nom */}
                  <h4
                    className={`text-xl sm:text-2xl font-[1000] text-[#3D332D] tracking-tighter mb-2 sm:mb-3 transition-colors ${cat.accent}`}
                  >
                    {cat.name}
                  </h4>
                </div>

                {/* Footer carte */}
                <div className="flex items-center justify-between mt-4 sm:mt-6">
                  <span className="text-[#3D332D]/30 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">
                    Découvrir
                  </span>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-[#D7CDC1]/50 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#E8603C] border-[#E8603C] text-white"
                        : `group-hover:${cat.iconBg} group-hover:text-white bg-[#FDFBF9] text-[#3D332D]`
                    }`}
                  >
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer section ── */}
      <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E8603C]" />
          <span className="w-2 h-2 rounded-full bg-[#7A9E7E]" />
          <span className="w-2 h-2 rounded-full bg-[#F2C94C]" />
        </div>
        <p className="text-[#3D332D]/30 font-bold text-[9px] sm:text-[10px] sm:text-xs uppercase tracking-widest text-center">
          50+ talents vérifiés t'attendent sur le campus
        </p>
      </div>
    </section>
  );
};

export default CategorySection;