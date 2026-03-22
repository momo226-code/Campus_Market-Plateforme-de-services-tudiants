import { GraduationCap, Car, Palette, Code, Sparkles, Coffee, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── Illustrations SVG par catégorie ──
const illustrations = {
  "Cours & Tutorat": (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-15">
      {/* Livre ouvert */}
      <rect x="20" y="35" width="38" height="50" rx="4" fill="#7A9E7E" />
      <rect x="62" y="35" width="38" height="50" rx="4" fill="#7A9E7E" />
      <rect x="56" y="32" width="8" height="56" rx="2" fill="#5a7a5e" />
      <line x1="28" y1="50" x2="52" y2="50" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="60" x2="52" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="70" x2="44" y2="70" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="68" y1="50" x2="92" y2="50" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="68" y1="60" x2="92" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="68" y1="70" x2="84" y2="70" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Étoile */}
      <circle cx="95" cy="28" r="8" fill="#F2C94C" opacity="0.8"/>
      <text x="91" y="32" fontSize="10" fill="white" fontWeight="bold">★</text>
    </svg>
  ),
  "Transport": (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-15">
      {/* Voiture stylisée */}
      <rect x="18" y="55" width="84" height="32" rx="8" fill="#3D332D"/>
      <rect x="28" y="38" width="54" height="26" rx="6" fill="#3D332D"/>
      {/* Vitres */}
      <rect x="32" y="42" width="22" height="16" rx="3" fill="#a0c4c8" opacity="0.8"/>
      <rect x="58" y="42" width="20" height="16" rx="3" fill="#a0c4c8" opacity="0.8"/>
      {/* Roues */}
      <circle cx="38" cy="87" r="11" fill="#2a2420"/>
      <circle cx="38" cy="87" r="5" fill="#888"/>
      <circle cx="82" cy="87" r="11" fill="#2a2420"/>
      <circle cx="82" cy="87" r="5" fill="#888"/>
      {/* Phares */}
      <rect x="96" y="60" width="6" height="10" rx="2" fill="#F2C94C" opacity="0.9"/>
      <rect x="18" y="60" width="6" height="10" rx="2" fill="#F2C94C" opacity="0.6"/>
      {/* Route */}
      <rect x="10" y="96" width="100" height="6" rx="3" fill="#3D332D" opacity="0.3"/>
      <rect x="30" y="98" width="14" height="2" rx="1" fill="white" opacity="0.5"/>
      <rect x="54" y="98" width="14" height="2" rx="1" fill="white" opacity="0.5"/>
      <rect x="78" y="98" width="14" height="2" rx="1" fill="white" opacity="0.5"/>
    </svg>
  ),
  "Art & Design": (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-15">
      {/* Palette */}
      <ellipse cx="60" cy="65" rx="38" ry="32" fill="#F2C94C"/>
      <ellipse cx="60" cy="65" rx="30" ry="24" fill="#fdf6dc"/>
      {/* Trou de pouce */}
      <ellipse cx="72" cy="88" rx="8" ry="6" fill="#F2C94C"/>
      {/* Points de couleur */}
      <circle cx="36" cy="58" r="6" fill="#E8603C"/>
      <circle cx="50" cy="44" r="6" fill="#7A9E7E"/>
      <circle cx="68" cy="42" r="6" fill="#C59473"/>
      <circle cx="82" cy="52" r="6" fill="#3D332D"/>
      <circle cx="84" cy="68" r="6" fill="#E8603C" opacity="0.7"/>
      {/* Pinceau */}
      <rect x="85" y="22" width="6" height="35" rx="3" fill="#C59473" transform="rotate(30 85 22)"/>
      <ellipse cx="100" cy="20" rx="5" ry="8" fill="#7A9E7E" transform="rotate(30 100 20)"/>
    </svg>
  ),
  "Technologie": (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-15">
      {/* Laptop */}
      <rect x="20" y="38" width="80" height="52" rx="6" fill="#E8603C"/>
      <rect x="26" y="44" width="68" height="40" rx="3" fill="#2a1a14"/>
      {/* Code sur l'écran */}
      <line x1="32" y1="54" x2="50" y2="54" stroke="#E8603C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="36" y1="62" x2="60" y2="62" stroke="#7A9E7E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="32" y1="70" x2="56" y2="70" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="36" y1="78" x2="48" y2="78" stroke="#E8603C" strokeWidth="2" strokeLinecap="round"/>
      {/* Curseur clignotant */}
      <rect x="62" y="75" width="2" height="8" rx="1" fill="white" opacity="0.8"/>
      {/* Base laptop */}
      <rect x="10" y="90" width="100" height="6" rx="3" fill="#E8603C"/>
      <rect x="45" y="90" width="30" height="3" rx="1.5" fill="#c44a28"/>
    </svg>
  ),
  "Beauté & Soins": (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-15">
      {/* Flacon de parfum */}
      <rect x="42" y="50" width="36" height="48" rx="8" fill="#C59473"/>
      <rect x="50" y="38" width="20" height="16" rx="4" fill="#C59473"/>
      <rect x="54" y="30" width="12" height="12" rx="3" fill="#a07050"/>
      {/* Bouchon */}
      <rect x="52" y="26" width="16" height="8" rx="3" fill="#7A9E7E"/>
      {/* Reflet */}
      <rect x="48" y="58" width="6" height="24" rx="3" fill="white" opacity="0.3"/>
      {/* Étiquette */}
      <rect x="46" y="68" width="28" height="18" rx="3" fill="white" opacity="0.25"/>
      {/* Étoiles déco */}
      <circle cx="28" cy="42" r="4" fill="#F2C94C" opacity="0.8"/>
      <circle cx="92" cy="35" r="3" fill="#F2C94C" opacity="0.6"/>
      <circle cx="96" cy="72" r="5" fill="#E8603C" opacity="0.5"/>
      {/* Petites fleurs */}
      <circle cx="25" cy="75" r="6" fill="#C59473" opacity="0.5"/>
      <circle cx="22" cy="69" r="3" fill="#C59473" opacity="0.4"/>
      <circle cx="30" cy="70" r="3" fill="#C59473" opacity="0.4"/>
      <circle cx="25" cy="65" r="3" fill="#C59473" opacity="0.4"/>
    </svg>
  ),
  "Cuisine": (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-15">
      {/* Assiette */}
      <circle cx="60" cy="72" r="36" fill="#7A9E7E"/>
      <circle cx="60" cy="72" r="28" fill="#e8f0e8"/>
      <circle cx="60" cy="72" r="18" fill="#7A9E7E" opacity="0.5"/>
      {/* Fourchette */}
      <rect x="28" y="30" width="4" height="40" rx="2" fill="#7A9E7E"/>
      <rect x="24" y="30" width="2" height="16" rx="1" fill="#7A9E7E"/>
      <rect x="32" y="30" width="2" height="16" rx="1" fill="#7A9E7E"/>
      {/* Couteau */}
      <rect x="88" y="30" width="4" height="40" rx="2" fill="#7A9E7E"/>
      <path d="M88 30 Q96 38 92 48 L88 48 Z" fill="#7A9E7E"/>
      {/* Vapeur */}
      <path d="M52 20 Q55 14 52 8" stroke="#7A9E7E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M60 22 Q63 16 60 10" stroke="#7A9E7E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M68 20 Q71 14 68 8" stroke="#7A9E7E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
};

const categories = [
  { id: 1, name: "Cours & Tutorat", icon: <GraduationCap size={28} />, slug: "Cours & Tutorat", bg: "bg-[#7A9E7E]/10", iconBg: "bg-[#7A9E7E]", accent: "group-hover:text-[#7A9E7E]", border: "hover:border-[#7A9E7E]/40" },
  { id: 2, name: "Transport",       icon: <Car size={28} />,          slug: "Transport",       bg: "bg-[#3D332D]/5",  iconBg: "bg-[#3D332D]", accent: "group-hover:text-[#3D332D]", border: "hover:border-[#3D332D]/25" },
  { id: 3, name: "Art & Design",    icon: <Palette size={28} />,      slug: "Art & Design",    bg: "bg-[#F2C94C]/10", iconBg: "bg-[#F2C94C]", accent: "group-hover:text-[#C59473]", border: "hover:border-[#F2C94C]/50" },
  { id: 4, name: "Technologie",     icon: <Code size={28} />,         slug: "Technologie",     bg: "bg-[#E8603C]/8",  iconBg: "bg-[#E8603C]", accent: "group-hover:text-[#E8603C]", border: "hover:border-[#E8603C]/30" },
  { id: 5, name: "Beauté & Soins",  icon: <Sparkles size={28} />,     slug: "Beauté & Soins",  bg: "bg-[#C59473]/10", iconBg: "bg-[#C59473]", accent: "group-hover:text-[#C59473]", border: "hover:border-[#C59473]/40" },
  { id: 6, name: "Cuisine",         icon: <Coffee size={28} />,       slug: "Cuisine",         bg: "bg-[#7A9E7E]/8",  iconBg: "bg-[#7A9E7E]", accent: "group-hover:text-[#7A9E7E]", border: "hover:border-[#7A9E7E]/40" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    navigate(`/marketplace?category=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-[#E8603C]" />
            <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.35em] text-[#E8603C]">
              Explorer le catalogue
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] tracking-tighter text-[#3D332D] leading-[0.9]">
            De quoi as-tu <br className="hidden sm:block" /> besoin <span className="italic font-light text-[#C59473]">maintenant</span>
            <span className="text-[#E8603C]"> ?</span>
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-7">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleClick(cat.slug)}
            className={`group relative bg-white border-2 border-[#D7CDC1]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-400 hover:shadow-xl cursor-pointer hover:-translate-y-1 overflow-hidden ${cat.border}`}
          >
            {/* Illustration SVG en fond coin haut-droit */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
              {illustrations[cat.name]}
            </div>

            {/* Blob coloré décoratif (original) */}
            <div className={`absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 ${cat.bg} rounded-bl-[3rem] sm:rounded-bl-[4rem] -mr-5 -mt-5 group-hover:scale-125 transition-transform duration-500`} />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${cat.iconBg} text-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-md transition-transform group-hover:scale-110`}>
                  {cat.icon}
                </div>
                <h4 className={`text-xl sm:text-2xl font-[1000] text-[#3D332D] tracking-tighter mb-2 transition-colors ${cat.accent}`}>
                  {cat.name}
                </h4>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[#3D332D]/30 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">Découvrir</span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-[#D7CDC1]/50 flex items-center justify-center transition-all bg-[#FDFBF9] text-[#3D332D] group-hover:bg-[#3D332D] group-hover:text-white">
                  <ArrowRight size={15} />
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