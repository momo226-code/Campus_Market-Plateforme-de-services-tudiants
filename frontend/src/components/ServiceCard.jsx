import { ShoppingCart, User, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  
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
    <div className="group bg-white border border-[#D7CDC1]/50 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-[#3D332D]/5 transition-all duration-500 flex flex-col h-full">
      
      {/* HEADER IMAGE / PRIX - Hauteur réduite sur mobile (h-40) */}
      <div className="h-40 md:h-52 bg-[#3D332D] relative overflow-hidden flex-shrink-0">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#D7CDC1]/20 italic text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-center px-4">
            Ventura Preview
          </div>
        )}
        
        {/* Badge Prix - Plus compact sur mobile */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-xl border border-[#D7CDC1]/30">
          <span className="text-[#3D332D] font-[1000] text-xs md:text-sm tracking-tighter">{service.price} DH</span>
        </div>
      </div>

      {/* Contenu - Padding réduit (p-5 sur mobile) */}
      <div className="p-5 md:p-8 flex flex-col flex-grow">
        {/* PRESTATAIRE */}
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#C59473]/10 flex items-center justify-center text-[#C59473]">
            <User size={10} className="md:size-[12px]" />
          </div>
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#3D332D]/30 truncate">
            {service.userId?.name || "Membre UM6P"}
          </span>
        </div>

        {/* TITRE & DESCRIPTION */}
        <h3 className="text-xl md:text-2xl font-[1000] tracking-tighter text-[#3D332D] mb-2 md:mb-3 group-hover:text-[#C59473] transition-colors leading-none">
          {service.title}
        </h3>
        <p className="text-[#3D332D]/50 text-xs md:text-sm mb-6 md:mb-8 line-clamp-2 font-medium leading-relaxed">
          {service.description}
        </p>

        {/* ACTIONS : Toujours alignées en bas */}
        <div className="flex gap-2 md:gap-3 mt-auto">
          <button 
            onClick={handleAddToCart}
            className="flex-grow bg-[#3D332D] hover:bg-[#C59473] text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-[1000] uppercase text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-[#3D332D]/10 active:scale-95 group/btn"
          >
            <Plus size={14} md:size={16} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
            <span className="hidden xs:inline">Ajouter au panier</span>
            <span className="xs:hidden">Ajouter</span>
          </button>

          <Link 
            to={`/service/${service._id}`}
            className="p-3.5 md:p-4 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl md:rounded-2xl text-[#3D332D] hover:border-[#3D332D] transition-all flex items-center justify-center active:scale-95"
            title="Détails"
          >
            <ArrowRight size={18} md:size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;