import { useState, useEffect } from "react";
import { Trash2, CreditCard, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-[1000] tracking-tighter text-[#3D332D] mb-8">
          Mon Panier<span className="text-[#C59473]">.</span>
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white border border-[#D7CDC1]/50 p-6 rounded-[2rem] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#3D332D] rounded-2xl overflow-hidden">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3D332D]">{item.title}</h3>
                      <p className="text-[#C59473] font-black text-sm">{item.price} DH</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Résumé du paiement */}
            <div className="bg-[#3D332D] text-white p-8 rounded-[2.5rem] h-fit sticky top-32 shadow-2xl shadow-[#3D332D]/20">
              <h2 className="text-xl font-black mb-6 uppercase tracking-widest text-[#D7CDC1]">Résumé</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#D7CDC1]/60 font-medium">
                  <span>Sous-total</span>
                  <span>{total} DH</span>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex justify-between text-xl font-black">
                  <span>Total</span>
                  <span className="text-[#C59473]">{total} DH</span>
                </div>
              </div>

              <button className="w-full bg-[#C59473] hover:bg-white hover:text-[#3D332D] py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3">
                Procéder au paiement <CreditCard size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-[#D7CDC1] rounded-[3rem]">
            <p className="text-[#3D332D]/30 font-bold mb-6">Ton panier est vide...</p>
            <Link to="/" className="bg-[#3D332D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">
              Retourner au marché
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;