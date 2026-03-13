import { ShoppingCart, User, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Pour éviter de trigger le Link si on clique sur le bouton
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = cart.some((item) => item._id === service._id);

    if (isAlreadyInCart) {
      alert("Ce service est déjà dans votre panier !");
      return;
    }

    const updatedCart = [...cart, service];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // On notifie la Navbar du changement
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="group bg-white border border-[#D7CDC1]/50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-[#3D332D]/5 transition-all duration-500">
      
      {/* HEADER IMAGE / PRIX */}
      <div className="h-52 bg-[#3D332D] relative overflow-hidden">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#D7CDC1]/20 italic text-[10px] font-black uppercase tracking-[0.3em]">
            Ventura Preview
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-[#D7CDC1]/30">
          <span className="text-[#3D332D] font-[1000] text-sm tracking-tighter">{service.price} DH</span>
        </div>
      </div>

      <div className="p-8">
        {/* PRESTATAIRE */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#C59473]/10 flex items-center justify-center text-[#C59473]">
            <User size={12} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#3D332D]/30">
            {service.userId?.name || "Membre UM6P"}
          </span>
        </div>

        {/* TITRE & DESCRIPTION */}
        <h3 className="text-2xl font-[1000] tracking-tighter text-[#3D332D] mb-3 group-hover:text-[#C59473] transition-colors leading-none">
          {service.title}
        </h3>
        <p className="text-[#3D332D]/50 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
          {service.description}
        </p>

        {/* ACTIONS : PANIER + VOIR PLUS */}
        <div className="flex gap-3 mt-auto">
          <button 
            onClick={handleAddToCart}
            className="flex-grow bg-[#3D332D] hover:bg-[#C59473] text-white py-4 rounded-2xl font-[1000] uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#3D332D]/10 active:scale-95 group/btn"
          >
            <Plus size={16} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
            Ajouter au panier
          </button>

          <Link 
            to={`/service/${service._id}`}
            className="p-4 bg-[#FDFBF9] border border-[#D7CDC1] rounded-2xl text-[#3D332D] hover:border-[#3D332D] transition-all flex items-center justify-center active:scale-95"
            title="Détails"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;