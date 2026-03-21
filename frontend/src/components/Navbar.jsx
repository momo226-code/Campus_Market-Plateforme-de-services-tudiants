import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search, ShoppingCart, User, Zap, LogOut,
  LayoutDashboard, Home as HomeIcon, Briefcase, X, Menu,
} from "lucide-react";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const token     = localStorage.getItem("token");
  const [cartCount,    setCartCount]    = useState(0);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);

  // Mise à jour du compteur panier
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage",     updateCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage",     updateCount);
    };
  }, []);

  // Effet scroll pour ombre dynamique
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
        className={`fixed w-full z-[100] top-0 bg-[#FDFBF9]/95 backdrop-blur-md border-b border-[#D7CDC1]/40 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-[#3D332D]/5" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-3">

          {/* ── LOGO ── */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-[#D7CDC1]/30 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:-rotate-3">
              <img
                src={logoImg}
                alt="Logo Ventura"
                className="w-full h-full object-contain scale-[1.5] sm:scale-[1.7]"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-[1000] tracking-tighter leading-none text-[#3D332D]">
                VEN<span className="text-[#C59473]">T</span>URA
              </h1>
              <div className="hidden sm:flex items-center gap-1 mt-0.5 opacity-35">
                <Zap size={8} fill="currentColor" className="text-[#E8603C]" />
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-nowrap">
                  UM6P Market
                </span>
              </div>
            </div>
          </Link>

          {/* ── BARRE DE RECHERCHE (lg+) ── */}
          <div className="hidden lg:flex flex-grow max-w-xs xl:max-w-sm relative">
            <input
              type="text"
              placeholder="Rechercher un talent..."
              className="w-full bg-white border border-[#D7CDC1] focus:border-[#E8603C] rounded-2xl py-3 pl-5 pr-12 outline-none text-sm transition-all shadow-inner placeholder:text-[#3D332D]/30"
            />
            <Search size={16} className="absolute right-4 top-3.5 text-[#3D332D]/30" />
          </div>

          {/* ── ACTIONS desktop (sm+) ── */}
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            {/* Accueil */}
            <Link
              to="/"
              className={`flex flex-col items-center p-1 transition-colors ${
                isActive("/") ? "text-[#E8603C]" : "text-[#3D332D]/50 hover:text-[#3D332D]"
              }`}
            >
              <HomeIcon size={20} />
              <span className="hidden md:block text-[8px] font-black uppercase mt-0.5 tracking-widest">Accueil</span>
            </Link>

            {/* Vendre */}
            <Link
              to="/add-service"
              className={`group flex flex-col items-center p-1 ${
                isActive("/add-service") ? "text-[#E8603C]" : ""
              }`}
            >
              <div className={`p-2 md:p-2.5 border-2 rounded-xl md:rounded-2xl transition-all ${
                isActive("/add-service")
                  ? "bg-[#E8603C] border-[#E8603C] text-white"
                  : "border-[#E8603C]/20 text-[#E8603C] group-hover:bg-[#E8603C] group-hover:text-white"
              }`}>
                <Briefcase size={18} className="md:size-[20px]" />
              </div>
              <span className="hidden md:block text-[8px] font-black text-[#E8603C] uppercase mt-0.5 tracking-tighter">Vendre</span>
            </Link>

            <div className="h-7 md:h-9 w-px bg-[#D7CDC1]/60 mx-0.5" />

            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex flex-col items-center p-1 transition-colors ${
                    isActive("/dashboard") ? "text-[#E8603C]" : "text-[#3D332D]/50 hover:text-[#E8603C]"
                  }`}
                >
                  <LayoutDashboard size={20} className="md:size-[22px]" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[#3D332D]/40 hover:text-red-500 p-1 transition-colors"
                >
                  <LogOut size={20} className="md:size-[22px]" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`flex flex-col items-center p-1 transition-colors ${
                  isActive("/login") ? "text-[#E8603C]" : "text-[#3D332D]/50 hover:text-[#E8603C]"
                }`}
              >
                <User size={20} className="md:size-[22px]" />
                <span className="hidden md:block text-[8px] font-black uppercase mt-0.5">Login</span>
              </Link>
            )}

            {/* Panier */}
            <Link
              to="/cart"
              className="relative flex items-center bg-[#3D332D] text-white p-2.5 md:p-3.5 rounded-xl md:rounded-2xl hover:bg-[#E8603C] transition-all group"
            >
              <ShoppingCart size={17} className="md:size-[20px] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E8603C] text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF9] font-black">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* ── ACTIONS mobile ── */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Panier mobile */}
            <Link
              to="/cart"
              className="relative flex items-center bg-[#3D332D] text-white p-2.5 rounded-xl hover:bg-[#E8603C] transition-all"
            >
              <ShoppingCart size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E8603C] text-white text-[8px] w-4.5 h-4.5 w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-[#FDFBF9] font-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border border-[#D7CDC1] bg-white text-[#3D332D] transition-colors hover:border-[#E8603C]"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* ── MENU MOBILE (slide-down) ── */}
      <div
        className={`fixed inset-x-0 top-16 z-[99] sm:hidden bg-[#FDFBF9] border-b border-[#D7CDC1]/50 shadow-xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 flex flex-col gap-2">
          {/* Recherche */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Rechercher un talent..."
              className="w-full bg-white border border-[#D7CDC1] focus:border-[#E8603C] rounded-2xl py-3 pl-5 pr-12 outline-none text-sm transition-all"
            />
            <Search size={16} className="absolute right-4 top-3.5 text-[#3D332D]/30" />
          </div>

          {[
            { to: "/",            icon: <HomeIcon size={18} />,        label: "Accueil" },
            { to: "/add-service", icon: <Briefcase size={18} />,       label: "Proposer un service", accent: true },
            { to: "/marketplace", icon: <Search size={18} />,          label: "Explorer" },
            ...(token
              ? [{ to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Mon dashboard" }]
              : [{ to: "/login",     icon: <User size={18} />,            label: "Connexion" }]
            ),
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                isActive(item.to)
                  ? "bg-[#E8603C] text-white"
                  : item.accent
                  ? "bg-[#E8603C]/10 text-[#E8603C] hover:bg-[#E8603C] hover:text-white"
                  : "text-[#3D332D]/70 hover:bg-[#D7CDC1]/20 hover:text-[#3D332D]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm text-red-400 hover:bg-red-50 hover:text-red-600 transition-all mt-1"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;