import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Info, Briefcase, Plus, Zap, LogOut, LayoutDashboard, Home as HomeIcon } from "lucide-react";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full z-[100] top-0 bg-[#FDFBF9]/80 border-b border-[#D7CDC1]/50 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between gap-4">
        
        {/* --- 1. LOGO & NOM VENTURA --- */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-4 group">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-[#D7CDC1]/30 flex items-center justify-center overflow-hidden relative transition-all duration-300 group-hover:shadow-md group-hover:-rotate-2">
            <img 
              src={logoImg} 
              alt="Logo Ventura" 
              className="w-full h-full object-contain scale-[1.8]"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-3xl font-[1000] tracking-tighter leading-none flex">
              <span className="text-[#3D332D]">VEN</span>
              <span className="text-[#C59473]">TURA</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-1.5">
               <Zap size={12} className="text-[#C59473]" fill="currentColor" />
               <span className="text-[10px] font-black text-[#3D332D]/40 uppercase tracking-[0.15em]">UM6P Market</span>
            </div>
          </div>
        </Link>

        {/* --- 2. BARRE DE RECHERCHE --- */}
        <div className="hidden lg:flex flex-grow max-w-xs relative group">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-white border border-[#D7CDC1] focus:border-[#C59473] rounded-2xl py-3 pl-5 pr-12 outline-none text-sm transition-all text-[#3D332D]"
          />
          <button className="absolute right-2 top-1.5 bg-[#3D332D] text-white p-2 rounded-xl hover:bg-[#C59473] transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* --- 3. ACTIONS NAV --- */}
        <div className="flex items-center gap-2 xl:gap-5">
          
          {/* OPTION ACCUEIL (Nouveau) */}
          <Link to="/" className="flex flex-col items-center group text-[#3D332D]/50 hover:text-[#3D332D] transition-colors px-2">
            <HomeIcon size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold uppercase mt-1">Accueil</span>
          </Link>

          {/* Favoris */}
          <Link to="/wishlist" className="hidden sm:flex flex-col items-center group text-[#3D332D]/50 hover:text-[#C59473] transition-colors px-2">
            <Heart size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold uppercase mt-1">Favoris</span>
          </Link>

          {/* Bouton Prestataire */}
          <Link to="/add-service" className="group flex flex-col items-center relative ml-2">
            <div className="relative p-3 bg-white border-2 border-[#C59473]/20 text-[#C59473] rounded-2xl group-hover:bg-[#C59473] group-hover:text-white transition-all shadow-sm">
              <Briefcase size={22} strokeWidth={2.5} />
              <div className="absolute -top-1.5 -right-1.5 bg-[#3D332D] text-white rounded-full p-0.5 border-2 border-white">
                <Plus size={10} strokeWidth={4} />
              </div>
            </div>
            <span className="text-[10px] font-[1000] text-[#C59473] uppercase mt-1 tracking-tighter text-center leading-[0.85rem]">
              {token ? "Gérer mes" : "Devenir"} <br /> {token ? "services" : "Prestataire"}
            </span>
          </Link>

          <div className="h-12 w-[1px] bg-[#D7CDC1]/50 mx-1 hidden md:block"></div>

          {/* AUTH DYNAMIQUE */}
          {token ? (
            <div className="flex items-center gap-4 xl:gap-5">
              <Link to="/dashboard" className="flex flex-col items-center text-[#3D332D]/60 hover:text-[#C59473] transition-colors">
                <LayoutDashboard size={24} />
                <span className="text-[10px] font-extrabold uppercase mt-1">Dashboard</span>
              </Link>
              
              <button onClick={handleLogout} className="flex flex-col items-center text-red-400 hover:text-red-600 transition-colors">
                <LogOut size={24} />
                <span className="text-[10px] font-extrabold uppercase mt-1">Quitter</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-center text-[#3D332D]/60 hover:text-[#C59473] transition-colors">
              <User size={24} />
              <span className="text-[10px] font-extrabold uppercase mt-1">Connexion</span>
            </Link>
          )}

          {/* Panier */}
          <Link to="/cart" className="relative flex items-center bg-[#3D332D] text-white p-3.5 rounded-2xl hover:bg-[#C59473] transition-all ml-2">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-[#C59473] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF9] font-black">
              0
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;