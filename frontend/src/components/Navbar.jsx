import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Zap, LogOut, LayoutDashboard, Home as HomeIcon, Briefcase } from "lucide-react";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full z-[100] top-0 bg-[#FDFBF9]/90 border-b border-[#D7CDC1]/50 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between gap-2 md:gap-4">
        
        {/* LOGO - Taille réduite sur mobile */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2 md:gap-4 group">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm border border-[#D7CDC1]/30 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:-rotate-2">
            <img src={logoImg} alt="Logo" className="w-full h-full object-contain scale-[1.5] md:scale-[1.8]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-[1000] tracking-tighter leading-none flex text-[#3D332D]">
              VEN<span className="text-[#C59473]">TURA</span>
            </h1>
            <div className="hidden sm:flex items-center gap-1.5 mt-1 opacity-40">
               <Zap size={8} className="md:size-[10px]" fill="currentColor" />
               <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-nowrap">UM6P Market</span>
            </div>
          </div>
        </Link>

        {/* RECHERCHE - Masquée sur mobile (peut être ajoutée en icône plus tard) */}
        <div className="hidden lg:flex flex-grow max-w-xs relative">
          <input
            type="text"
            placeholder="Rechercher un talent..."
            className="w-full bg-white border border-[#D7CDC1] focus:border-[#C59473] rounded-2xl py-3 pl-5 pr-12 outline-none text-sm transition-all shadow-inner"
          />
          <Search size={18} className="absolute right-4 top-3.5 text-[#3D332D]/30" />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
          {/* Accueil - Texte masqué sur mobile */}
          <Link to="/" className="flex flex-col items-center text-[#3D332D]/50 hover:text-[#3D332D] transition-colors p-1">
            <HomeIcon size={20} className="md:size-[22px]" />
            <span className="hidden md:block text-[9px] font-black uppercase mt-1">Accueil</span>
          </Link>

          {/* Vendre - Version compacte sur mobile */}
          <Link to="/add-service" className="group flex flex-col items-center relative p-1">
            <div className="p-2 md:p-3 bg-white border-2 border-[#C59473]/20 text-[#C59473] rounded-xl md:rounded-2xl group-hover:bg-[#C59473] group-hover:text-white transition-all">
              <Briefcase size={20} className="md:size-[22px]" />
            </div>
            <span className="hidden md:block text-[9px] font-black text-[#C59473] uppercase mt-1 tracking-tighter">Vendre</span>
          </Link>

          <div className="h-8 md:h-10 w-[1px] bg-[#D7CDC1]/50 mx-0.5 md:mx-1"></div>

          {token ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/dashboard" className="flex flex-col items-center text-[#3D332D]/60 hover:text-[#C59473] p-1">
                <LayoutDashboard size={20} className="md:size-[24px]" />
              </Link>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-600 p-1">
                <LogOut size={20} className="md:size-[24px]" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-center text-[#3D332D]/60 hover:text-[#C59473] p-1">
              <User size={20} className="md:size-[24px]" />
              <span className="hidden md:block text-[9px] font-black uppercase mt-1">Login</span>
            </Link>
          )}

          {/* PANIER DYNAMIQUE - Taille adaptée */}
          <Link to="/cart" className="relative flex items-center bg-[#3D332D] text-white p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-[#C59473] transition-all group">
            <ShoppingCart size={18} className="md:size-[22px] group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C59473] text-white text-[8px] md:text-[10px] w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-[#FDFBF9] font-black animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;