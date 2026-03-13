import { useEffect, useState } from "react";
import { Trash2, ShoppingBag, CreditCard, ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Récupérer les articles au chargement
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  // Supprimer un article
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Notifier la Navbar pour mettre à jour le badge
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header de la page */}
        <div className="flex items-center gap-6 mb-16">
          <Link to="/" className="p-4 bg-white border border-[#D7CDC1] rounded-2xl text-[#3D332D] hover:bg-[#3D332D] hover:text-white transition-all shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-5xl font-[1000] tracking-tighter text-[#3D332D]">
            Mon Panier<span className="text-[#C59473]">.</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          /* État Vide */
          <div className="bg-white rounded-[4rem] p-20 text-center border border-[#D7CDC1]/30 shadow-sm">
            <div className="w-24 h-24 bg-[#FDFBF9] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#D7CDC1]">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-black text-[#3D332D] mb-4 tracking-tight">Ton panier est vide</h2>
            <p className="text-[#3D332D]/40 font-medium mb-10 max-w-xs mx-auto text-sm">
              Il semble que tu n'aies pas encore trouvé la pépite qu'il te faut.
            </p>
            <Link to="/" className="inline-flex items-center gap-3 bg-[#3D332D] text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#C59473] transition-all shadow-xl shadow-[#3D332D]/10">
              Explorer les talents <Zap size={14} fill="currentColor" />
            </Link>
          </div>
        ) : (
          /* Liste des articles */
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-6 md:p-8 rounded-[3rem] border border-[#D7CDC1]/30 flex items-center gap-8 shadow-sm hover:shadow-md transition-all group">
                  {/* Mini Image */}
                  <div className="w-20 h-20 bg-[#3D332D] rounded-[1.5rem] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover opacity-80" />
                  </div>
                  
                  {/* Infos */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-[1000] text-[#3D332D] tracking-tighter leading-tight group-hover:text-[#C59473] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#C59473] font-black mt-1">{item.price} DH</p>
                  </div>

                  {/* Bouton Delete */}
                  <button 
                    onClick={() => removeItem(item._id)}
                    className="p-4 text-[#3D332D]/20 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    title="Supprimer"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))}
            </div>

            {/* Résumé et Paiement */}
            <div className="mt-16 bg-[#3D332D] rounded-[4rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#3D332D]/20">
              {/* Déco d'arrière-plan */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C59473]/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-10">
                <div>
                  <p className="text-white/30 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Total de la commande</p>
                  <div className="text-7xl font-[1000] tracking-[ -0.05em] leading-none">
                    {total}<span className="text-[#C59473] text-3xl ml-2 font-black">DH</span>
                  </div>
                </div>
                
                <button className="w-full md:w-auto bg-[#C59473] hover:bg-white hover:text-[#3D332D] text-white px-12 py-7 rounded-3xl font-[1000] uppercase text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl group">
                  Passer à l'achat 
                  <CreditCard size={20} className="group-hover:scale-110 transition-transform" />
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