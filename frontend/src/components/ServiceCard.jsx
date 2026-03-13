import { ShoppingCart, Zap, User } from "lucide-react";

const ServiceCard = ({ service }) => {
  
  const handleAddToCart = () => {
    // 1. Récupérer le panier actuel ou un tableau vide
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // 2. Vérifier si le service est déjà présent pour éviter les doublons
    const isAlreadyInCart = cart.some((item) => item._id === service._id);

    if (isAlreadyInCart) {
      alert("Ce service est déjà dans votre panier !");
      return;
    }

    // 3. Ajouter le nouveau service et sauvegarder
    const updatedCart = [...cart, service];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // 4. Optionnel : Déclencher un événement pour que la Navbar se mette à jour
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Ajouté au panier !");
  };

  return (
    <div className="group bg-white border border-[#D7CDC1]/50 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-[#3D332D]/5 transition-all duration-500 hover:-translate-y-1">
      
      {/* Image avec Overlay Ventura */}
      <div className="h-48 bg-[#3D332D] relative overflow-hidden">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#D7CDC1]/30 italic text-xs font-bold uppercase tracking-widest text-center px-4">
            Ventura Preview
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-[#D7CDC1]/30">
          <span className="text-[#3D332D] font-[1000] text-sm">{service.price} DH</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full bg-[#C59473]/20 flex items-center justify-center text-[#C59473]">
            <User size={12} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40">
            {service.userId?.name || "Prestataire UM6P"}
          </span>
        </div>

        <h3 className="text-xl font-[1000] tracking-tighter text-[#3D332D] mb-2 group-hover:text-[#C59473] transition-colors">
          {service.title}
        </h3>

        <p className="text-[#3D332D]/60 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
          {service.description}
        </p>

        <div className="flex gap-2">
          {/* Bouton Panier avec la nouvelle logique */}
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-[#FDFBF9] border border-[#D7CDC1] rounded-xl text-[#3D332D] hover:bg-[#3D332D] hover:text-white transition-all shadow-sm active:scale-95"
            title="Ajouter au panier"
          >
            <ShoppingCart size={18} />
          </button>

          {/* Bouton Commander (WhatsApp) */}
          <button
            onClick={() => {
              if (service.userId?.phone) {
                window.open(`https://wa.me/${service.userId.phone}`, "_blank");
              } else {
                alert("Numéro de téléphone non disponible.");
              }
            }}
            className="flex-grow bg-[#3D332D] hover:bg-[#C59473] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3D332D]/10 active:scale-95"
          >
            Commander <Zap size={14} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;