import { ShoppingCart, User, Plus, ArrowRight, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

// Badge de catégorie avec couleur selon le type
const categoryColor = (cat = "") => {
  const map = {
    "Technologie":    { bg: "bg-[#3D332D]",    text: "text-white" },
    "Art & Design":   { bg: "bg-[#7A9E7E]",    text: "text-white" },
    "Cuisine":        { bg: "bg-[#F2C94C]",    text: "text-[#3D332D]" },
    "Transport":      { bg: "bg-[#D7CDC1]",    text: "text-[#3D332D]" },
    "Beauté & Soins": { bg: "bg-[#E8603C]",    text: "text-white" },
    "Cours & Tutorat":{ bg: "bg-[#C59473]",    text: "text-white" },
  };
  return map[cat] || { bg: "bg-[#3D332D]/10", text: "text-[#3D332D]" };
};

const ServiceCard = ({ service }) => {
  const { bg, text } = categoryColor(service.category);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = cart.some((item) => item._id === service._id);

    if (isAlreadyInCart) {
      alert("Ce service est déjà dans votre panier !");
      return;
    }

    const updatedCart = [...cart, service];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="group bg-white border border-[#D7CDC1]/40 rounded-[1.75rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-[#3D332D]/8 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">

      {/* ── IMAGE EN HAUT ── hauteur responsive */}
      <div className="relative h-44 sm:h-48 md:h-52 flex-shrink-0 overflow-hidden bg-[#3D332D]">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* Placeholder élégant quand pas d'image */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#3D332D] to-[#5C4A40]">
            <ImageOff size={28} className="text-[#D7CDC1]/30" />
            <span className="text-[#D7CDC1]/25 text-[9px] font-black uppercase tracking-[0.2em]">
              Ventura Preview
            </span>
          </div>
        )}

        {/* Overlay dégradé bas pour la lisibilité du badge prix */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge Prix — en bas à gauche sur l'image */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-[#D7CDC1]/20">
          <span className="text-[#3D332D] font-[1000] text-xs sm:text-sm tracking-tighter">
            {service.price} DH
          </span>
        </div>

        {/* Badge Catégorie — en haut à droite */}
        {service.category && (
          <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${bg} ${text} px-2.5 py-1 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-wider shadow-sm`}>
            {service.category}
          </div>
        )}
      </div>

      {/* ── CONTENU ── */}
      <div className="p-4 sm:p-5 md:p-7 flex flex-col flex-grow">

        {/* Prestataire */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E8603C]/10 flex items-center justify-center text-[#E8603C] flex-shrink-0">
            <User size={10} />
          </div>
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#3D332D]/35 truncate">
            {service.userId?.name || "Membre UM6P"}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-[1000] tracking-tighter text-[#3D332D] mb-1.5 sm:mb-2 group-hover:text-[#E8603C] transition-colors leading-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#3D332D]/50 text-xs sm:text-sm mb-5 sm:mb-6 md:mb-7 line-clamp-2 font-medium leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 sm:gap-3 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-grow bg-[#3D332D] hover:bg-[#E8603C] text-white py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-[1000] uppercase text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3D332D]/10 active:scale-95 group/btn"
          >
            <Plus
              size={13}
              strokeWidth={3}
              className="group-hover/btn:rotate-90 transition-transform"
            />
            <span className="hidden xs:inline sm:hidden md:inline">Ajouter au panier</span>
            <span className="xs:hidden sm:inline md:hidden">Panier</span>
          </button>

          <Link
            to={`/service/${service._id}`}
            className="p-3 sm:p-3.5 md:p-4 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl sm:rounded-2xl text-[#3D332D] hover:border-[#E8603C] hover:text-[#E8603C] transition-all flex items-center justify-center active:scale-95"
            title="Voir les détails"
          >
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;