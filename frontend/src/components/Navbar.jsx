import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search, ShoppingCart, User, Zap, LogOut,
  LayoutDashboard, Home as HomeIcon, Briefcase, X, Menu, BookOpen
} from "lucide-react";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mise à jour du compteur panier
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

  // Effet scroll pour ombre et taille dynamique
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu mobile au changement de page
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── NAVBAR PRINCIPALE ── */}
      <nav
        className={`fixed w-full z-[100] top-0 bg-[#FDFBF9]/95 backdrop-blur-md border-b border-[#D7CDC1]/40 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-[#3D332D]/5 h-16 sm:h-20" : "h-20 sm:h-24"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

          {/* ── LOGO ── */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-[#D7CDC1]/30 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:rotate-[360deg]">
              <img
                src={logoImg}
                alt="Logo Ventura"
                className="w-full h-full object-contain scale-[1.6]"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-[1000] tracking-tighter leading-none text-[#3D332D]">
                VEN<span className="text-[#C59473]">T</span>URA
              </h1>
              <div className="flex items-center gap-1 mt-0.5 opacity-40">
                <Zap size={8} fill="currentColor" className="text-[#E8603C]" />
                <span className="text-[7px] font-black uppercase tracking-[0.2em]">UM6P MARKET</span>
              </div>
            </div>
          </Link>

          {/* ── BARRE DE RECHERCHE (Visible à partir de md) ── */}
          <div className="hidden md:flex flex-grow max-w-xs lg:max-w-sm relative group mx-4">
            <input
              type="text"
              placeholder="Chercher un talent..."
              className="w-full bg-white border border-[#D7CDC1] group-hover:border-[#E8603C] focus:border-[#E8603C] rounded-2xl py-2.5 pl-5 pr-12 outline-none text-sm transition-all shadow-inner placeholder:text-[#3D332D]/30"
            />
            <div className="absolute right-2 top-1.5 p-1.5 bg-[#3D332D] rounded-xl text-white group-hover:bg-[#E8603C] transition-colors">
                <Search size={14} />
            </div>
          </div>

          {/* ── NAVIGATION DESKTOP ── */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link 
              to="/" 
              className={`text-[10px] font-black uppercase tracking-widest transition-all ${isActive("/") ? "text-[#E8603C]" : "text-[#3D332D]/60 hover:text-[#3D332D]"}`}
            >
              Accueil
            </Link>

            <Link 
              to="/about" 
              className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${isActive("/about") ? "text-[#E8603C]" : "text-[#3D332D]/60 hover:text-[#E8603C]"}`}
            >
              <BookOpen size={14} className={isActive("/about") ? "animate-pulse" : ""} />
              Guide
            </Link>

            <Link 
              to="/marketplace" 
              className={`text-[10px] font-black uppercase tracking-widest transition-all ${isActive("/marketplace") ? "text-[#E8603C]" : "text-[#3D332D]/60 hover:text-[#3D332D]"}`}
            >
              Explorer
            </Link>
          </div>

          {/* ── ACTIONS ── */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <Link
              to="/add-service"
              className="hidden sm:flex items-center gap-2 bg-[#E8603C]/10 text-[#E8603C] px-4 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest border border-[#E8603C]/20 hover:bg-[#E8603C] hover:text-white transition-all active:scale-95"
            >
              <Briefcase size={14} />
              Vendre
            </Link>

            <div className="hidden sm:block h-8 w-px bg-[#D7CDC1]/50 mx-1" />

            {token ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to="/dashboard"
                  className={`p-2 rounded-xl transition-all ${isActive("/dashboard") ? "bg-[#3D332D] text-white" : "text-[#3D332D]/50 hover:bg-[#D7CDC1]/20"}`}
                >
                  <LayoutDashboard size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-[#3D332D]/30 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`p-2 rounded-xl transition-all ${isActive("/login") ? "text-[#E8603C]" : "text-[#3D332D]/50 hover:text-[#E8603C]"}`}
              >
                <User size={20} />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center bg-[#3D332D] text-white p-2.5 sm:p-3 rounded-xl hover:bg-[#E8603C] transition-all shadow-lg shadow-[#3D332D]/10 active:scale-90"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E8603C] text-white text-[9px] min-w-[20px] h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF9] font-black px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex lg:hidden p-2.5 rounded-xl border border-[#D7CDC1] bg-white text-[#3D332D] transition-all active:scale-90"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MENU MOBILE OVERLAY ── */}
      <div
        className={`fixed inset-x-0 top-0 z-[99] lg:hidden bg-[#FDFBF9] border-b border-[#D7CDC1]/50 shadow-2xl transition-all duration-500 ease-in-out transform ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="pt-24 pb-10 px-6 flex flex-col gap-3">
          
          <div className="relative mb-4 md:hidden px-1">
            <input
              type="text"
              placeholder="Chercher un talent..."
              className="w-full bg-white border border-[#D7CDC1] focus:border-[#E8603C] rounded-2xl py-4 pl-5 pr-12 outline-none text-sm transition-all"
            />
            <Search size={18} className="absolute right-5 top-4 text-[#3D332D]/30" />
          </div>

          <p className="text-[10px] font-black text-[#3D332D]/30 uppercase tracking-[0.3em] mb-2 px-4">Navigation</p>
          
          {[
            { to: "/", icon: <HomeIcon size={18} />, label: "Accueil" },
            { to: "/about", icon: <BookOpen size={18} />, label: "Guide & Esprit Ventura" },
            { to: "/marketplace", icon: <Search size={18} />, label: "Explorer les talents" },
            { to: "/add-service", icon: <Briefcase size={18} />, label: "Proposer mon service", accent: true },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                isActive(item.to)
                  ? "bg-[#3D332D] text-white shadow-lg"
                  : item.accent
                  ? "bg-[#E8603C] text-white"
                  : "bg-white border border-[#D7CDC1]/30 text-[#3D332D]/70 hover:bg-[#D7CDC1]/10"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <div className="h-px bg-[#D7CDC1]/30 my-4" />

          {token ? (
             <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm text-red-500 bg-red-50 transition-all"
            >
              <LogOut size={18} />
              Se déconnecter
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm bg-[#7A9E7E]/10 text-[#7A9E7E] border border-[#7A9E7E]/20"
            >
              <User size={18} />
              Espace membre
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;