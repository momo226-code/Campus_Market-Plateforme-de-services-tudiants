import { useEffect, useState } from "react";
import { Trash2, ShoppingBag, CreditCard, ArrowLeft, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 md:pt-40 pb-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - Plus compact sur mobile */}
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-16">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 md:p-4 bg-white border border-[#D7CDC1] rounded-xl md:rounded-2xl text-[#3D332D] hover:bg-[#3D332D] hover:text-white transition-all shadow-sm active:scale-90"
          >
            <ArrowLeft size={18} md:size={20} />
          </button>
          <h1 className="text-3xl md:text-5xl font-[1000] tracking-tighter text-[#3D332D]">
            Mon Panier<span className="text-[#C59473]">.</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-center border border-[#D7CDC1]/30 shadow-sm">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-[#FDFBF9] rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 text-[#D7CDC1]">
              <ShoppingBag size={30} md:size={40} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#3D332D] mb-3 tracking-tight">Ton panier est vide</h2>
            <p className="text-[#3D332D]/40 font-medium mb-8 md:mb-10 max-w-xs mx-auto text-xs md:text-sm leading-relaxed">
              Il semble que tu n'aies pas encore trouvé la pépite qu'il te faut pour tes projets.
            </p>
            <Link to="/marketplace" className="inline-flex items-center gap-3 bg-[#3D332D] text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] hover:bg-[#C59473] transition-all">
              Explorer les talents <Zap size={14} fill="currentColor" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {/* Liste des articles - Layout optimisé pour le swipe tactile */}
            <div className="grid grid-cols-1 gap-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-4 md:p-6 rounded-[1.8rem] md:rounded-[3rem] border border-[#D7CDC1]/30 flex items-center gap-4 md:gap-8 shadow-sm group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#3D332D] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden flex-shrink-0 shadow-inner">
                    <img src={item.image} alt="" className="w-full h-full object-cover opacity-80" />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base md:text-xl font-[1000] text-[#3D332D] tracking-tighter leading-tight group-hover:text-[#C59473] transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-[#C59473] font-black text-sm md:text-base mt-0.5">{item.price} <span className="text-[10px]">DH</span></p>
                  </div>

                  <button 
                    onClick={() => removeItem(item._id)}
                    className="p-3 text-[#3D332D]/10 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Résumé et Paiement - Look Premium & Impactant */}
            <div className="mt-12 md:mt-16 bg-[#3D332D] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#3D332D]/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C59473]/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-10">
                <div className="w-full md:w-auto">
                  <p className="text-white/30 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] mb-2 md:mb-4">Total à régler</p>
                  <div className="text-5xl md:text-7xl font-[1000] tracking-[-0.05em] leading-none">
                    {total}<span className="text-[#C59473] text-2xl md:text-3xl ml-2 font-black italic">DH</span>
                  </div>
                </div>
                
                <button className="w-full md:w-auto bg-[#C59473] hover:bg-white hover:text-[#3D332D] text-white px-8 py-5 md:px-12 md:py-7 rounded-2xl md:rounded-3xl font-[1000] uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95 group">
                  Finaliser la commande 
                  <CreditCard size={18} className="group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;