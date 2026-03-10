import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Info, Briefcase, Plus, Zap } from "lucide-react";
import logoImg from "../assets/logo.png"; // Assure-toi que le chemin est correct

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="fixed w-full z-[100] top-0 bg-[#f8fafc] border-b border-slate-200/60 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between gap-4">
        
        {/* --- 1. LOGO & NOM VENTURA (Optimisé pour ton image) --- */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-4 group">
          {/* Conteneur du logo avec correction de zoom pour remplir la forme */}
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden relative transition-all duration-300 group-hover:shadow-md group-hover:-rotate-2">
            <img 
              src={logoImg} 
              alt="Logo Ventura" 
              className="w-full h-full object-contain scale-[1.8] transition-transform duration-300 group-hover:scale-[1.9]"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-3xl font-[1000] tracking-tighter leading-none flex">
              <span className="text-[#0f172a]">VEN</span>
              <span className="text-[#2563eb]">TURA</span>
              <span className="text-[#ff5c5c]">.</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-1.5">
               <Zap size={12} className="text-[#ff5c5c]" fill="currentColor" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                 Services & Marketplace
               </span>
            </div>
          </div>
        </Link>

        {/* --- 2. BARRE DE RECHERCHE (Format Pill) --- */}
        <div className="hidden lg:flex flex-grow max-w-sm relative group">
          <input
            type="text"
            placeholder="Un service ou un produit ?"
            className="w-full bg-white border border-slate-200 focus:border-[#2563eb] rounded-2xl py-3 pl-5 pr-12 outline-none text-sm transition-all shadow-sm focus:ring-4 focus:ring-blue-500/5"
          />
          <button className="absolute right-2 top-1.5 bg-[#0f172a] text-white p-2 rounded-xl hover:bg-[#2563eb] transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* --- 3. ACTIONS NAV (Favoris, Prestataire, Panier) --- */}
        <div className="flex items-center gap-2 xl:gap-6">
          
          {/* Qui sommes-nous */}
          <Link to="/about" className="hidden xl:flex flex-col items-center group text-slate-500 hover:text-[#0f172a] transition-colors">
            <Info size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold uppercase mt-1">L'équipe</span>
          </Link>

          {/* Favoris */}
          <Link to="/wishlist" className="flex flex-col items-center group text-slate-500 hover:text-[#ff5c5c] transition-colors px-2">
            <Heart size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-extrabold uppercase mt-1">Favoris</span>
          </Link>

          {/* --- LE BOUTON "DEVENIR PRESTATAIRE" --- */}
          <Link to="/add-service" className="group flex flex-col items-center relative ml-2">
            <div className="relative p-3 bg-white border-2 border-blue-600/20 text-[#2563eb] rounded-2xl group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb] transition-all duration-300 shadow-sm">
              <Briefcase size={24} strokeWidth={2.5} />
              {/* Badge Plus en rouge corail */}
              <div className="absolute -top-1.5 -right-1.5 bg-[#ff5c5c] text-white rounded-full p-0.5 border-2 border-white group-hover:border-[#2563eb] transition-all">
                <Plus size={12} strokeWidth={4} />
              </div>
            </div>
            <span className="text-[10px] font-[1000] text-[#2563eb] uppercase mt-1 tracking-tighter text-center leading-tight">
              Devenir <br /> Prestataire
            </span>
          </Link>

          <div className="h-12 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Connexion / Compte */}
          <Link to="/login" className="flex flex-col items-center text-slate-600 hover:text-[#2563eb] transition-colors">
            <User size={24} />
            <span className="text-[10px] font-extrabold uppercase mt-1">
              {token ? "Mon Espace" : "Connexion"}
            </span>
          </Link>

          {/* Panier (Noir Profond) */}
          <Link to="/cart" className="relative flex items-center bg-[#0f172a] text-white p-3.5 rounded-2xl hover:bg-[#2563eb] transition-all shadow-lg shadow-slate-200 ml-2">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-[#ff5c5c] text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#f8fafc] font-black">
              0
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;