import { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Send, Tag, Zap, Facebook, Instagram, Linkedin } from "lucide-react";
import CategorySection from "../components/CategorySection";
import heroImg from "../assets/hero-image.jpg";

const Home = () => {
  const [services, setServices] = useState([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.get("/services");
        setServices(response.data.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error("Erreur services:", err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const interval = setInterval(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % services.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [services]);

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsSending(true);
    try {
      await API.post("/feedbacks", { comment: feedbackText, rating: 5 });
      alert("Merci pour ton retour ! ✨");
      setFeedbackText("");
    } catch (err) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setIsSending(false);
    }
  };

  const badgeThemes = [
    { bg: "bg-[#F2C94C]", text: "text-[#3D332D]", accent: "text-[#3D332D]" },
    { bg: "bg-white",     text: "text-[#3D332D]", accent: "text-[#E8603C]" },
    { bg: "bg-[#7A9E7E]", text: "text-white",     accent: "text-white"     },
  ];

  const currentSvc = services[currentServiceIndex];
  const theme = badgeThemes[currentServiceIndex % badgeThemes.length];

  const floatingAvatars = [
    { initials: "SA", color: "#E8603C", top: "12%", left: "5%",   size: 60, rotate: -8 },
    { initials: "MY", color: "#7A9E7E", top: "52%", left: "7%",   size: 52, rotate: 5  },
    { initials: "IB", color: "#C59473", top: "78%", left: "20%",  size: 56, rotate: -4 },
    { initials: "LH", color: "#E8603C", top: "10%", right: "5%",  size: 54, rotate: 7  },
    { initials: "ZO", color: "#7A9E7E", top: "58%", right: "5%",  size: 62, rotate: -6 },
    { initials: "AM", color: "#C59473", top: "78%", right: "16%", size: 50, rotate: 4  },
  ];

  return (
    <div className="min-h-screen text-[#3D332D] overflow-x-hidden" style={{ backgroundColor: "#F5E6C8" }}>

      {/* ── HERO ── */}
      <section
        className="relative pt-24 sm:pt-36 md:pt-44 lg:pt-52 pb-0 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgb(243, 234, 215), rgba(245,230,200,0.60)), url(${heroImg})`,
          backgroundColor: "#F5E6C8",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-36">

          {/* LEFT */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#E8603C]/10 text-[#E8603C] px-4 py-1.5 rounded-full text-[10px] font-[1000] uppercase tracking-widest mb-6 border border-[#E8603C]/20">
              <Star size={11} fill="currentColor" /> Le marché des talents UM6P
            </div>
            <h1 className="text-6xl xs:text-7xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter leading-[0.85] mb-6 text-[#3D332D]">
              VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span>
            </h1>
            <p className="text-base md:text-lg text-[#3D332D]/65 max-w-xl mx-auto lg:mx-0 mb-2 font-medium">
              La plateforme exclusive d'échange de services pour la communauté UM6P.
            </p>
            <p className="text-base md:text-lg text-[#3D332D] max-w-xl mx-auto lg:mx-0 mb-10 font-bold italic">
              Ton talent a de la valeur ici. Postule pour financer tes projets !
            </p>
            <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
              <Link to="/add-service" className="bg-[#3D332D] text-white px-8 py-4 rounded-2xl shadow-xl hover:bg-[#E8603C] transition-all font-black uppercase text-xs tracking-widest flex items-center gap-3">
                Vendre un talent <ArrowRight size={16} />
              </Link>
              <Link to="/marketplace" className="border-2 border-[#3D332D]/30 text-[#3D332D] px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-[#E8603C] hover:text-[#E8603C] transition-all">
                Explorer →
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center relative scale-90 sm:scale-100">
            {!loading && currentSvc && (
              <div
                key={currentSvc._id}
                className={`absolute -top-6 -right-4 ${theme.bg} ${theme.text} rounded-2xl shadow-2xl p-5 border border-[#D7CDC1]/40 rotate-[6deg] z-20`}
              >
                <div className={`${theme.accent} font-[1000] text-[10px] uppercase mb-1 tracking-widest flex items-center gap-1`}>
                  <Tag size={12} /> {currentSvc.category}
                </div>
                <div className="font-[1000] text-xl leading-tight min-w-[140px]">{currentSvc.title}</div>
                <div className="font-black text-xs mt-2 opacity-80">{currentSvc.price} DH</div>
              </div>
            )}
            <div
              className="w-72 h-72 lg:w-96 lg:h-96 rounded-[4rem] shadow-2xl relative overflow-hidden border-8 border-white/70 rotate-2 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentSvc?.imageUrl || heroImg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D332D]/40 to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                <div className="text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                  <Zap size={10} fill="#F2C94C" className="text-[#F2C94C]" /> 50+ Talents Actifs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vague organique → beige */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="block w-full h-[100px] md:h-[160px]">
            <path d="M0,180 L0,80 C120,120 240,160 400,130 C560,100 640,50 800,40 C960,30 1080,80 1200,100 C1320,120 1400,80 1440,65 L1440,180 Z" fill="#F5E6C8" />
            <path d="M0,180 L0,120 C160,90 300,70 480,80 C660,90 760,130 920,140 C1080,150 1240,110 1440,100 L1440,180 Z" fill="#F5E6C8" opacity="0.6" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: "#F5E6C8" }} className="pt-6 pb-14">
        <div className="max-w-2xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { val: "50+", label: "Talents", color: "#E8603C" },
            { val: "6",   label: "Catégories", color: "#7A9E7E" },
            { val: "UM6P",label: "Campus", color: "#C59473" },
          ].map((s) => (
            <div key={s.label} className="py-6 px-4 rounded-3xl border border-white/60" style={{ backgroundColor: "rgba(255,255,255,0.55)" }}>
              <div className="text-3xl font-[1000]" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[9px] font-black uppercase tracking-widest mt-1" style={{ color: "#3D332D", opacity: 0.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section style={{ backgroundColor: "#F5E6C8" }} className="pb-20">
        <CategorySection />
      </section>

      {/* ── TALENTS FLOTTANTS ── */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#F5E6C8" }}>
        {/* Cercles */}
        {[400, 620, 840].map((s, i) => (
          <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full border-2" style={{ width: s, height: s, borderColor: `rgba(197,148,115,${0.18 - i * 0.05})` }} />
          </div>
        ))}

        {/* Avatars */}
        {floatingAvatars.map((av, i) => (
          <div
            key={i}
            className="absolute z-10 rounded-full border-4 border-white flex items-center justify-center font-black text-sm select-none"
            style={{
              width: av.size, height: av.size,
              top: av.top, left: av.left, right: av.right,
              backgroundColor: "#ffffff",
              color: av.color,
              transform: `rotate(${av.rotate}deg)`,
              boxShadow: `0 8px 28px ${av.color}35`,
            }}
          >
            {av.initials}
          </div>
        ))}

        {/* Texte */}
        <div className="relative z-20 max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-[1000] leading-tight mb-6 tracking-tight text-[#3D332D]">
            Un campus rempli<br />
            <span className="italic font-light text-[#C59473]">de talents</span> qui n'attendent<br />
            que <span className="text-[#E8603C]">toi.</span>
          </h2>
          <p className="text-[#3D332D]/55 text-lg font-medium max-w-lg mx-auto mb-3">
            Quelles sont les chances que l'étudiant qu'il te faut soit à deux pas de toi ? Sur Ventura, on te rapproche des meilleurs talents du campus.
          </p>
          <p className="text-[#3D332D]/40 text-base font-medium max-w-lg mx-auto">
            Une communauté soudée, des services de confiance, et la proximité du campus — tout ça au même endroit.
          </p>
        </div>

        {/* Vague vers le vert */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="block w-full h-[80px] md:h-[120px]">
            <path d="M0,120 L0,60 C240,120 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 Z" fill="#DDE8DC" />
          </svg>
        </div>
      </section>

      {/* ── FEEDBACK ── */}
      <section className="py-24 px-4" style={{ backgroundColor: "#DDE8DC" }}>
        <div className="max-w-3xl mx-auto bg-[#3D332D] rounded-[3rem] p-12 sm:p-16 text-white text-center shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-[1000] italic mb-3 tracking-tighter">
            C'est par <span className="text-[#F2C94C]">les étudiants,</span>
          </h2>
          <h2 className="text-4xl sm:text-5xl font-[1000] italic mb-10 tracking-tighter">
            pour <span className="text-[#E8603C]">les étudiants.</span>
          </h2>
          <form onSubmit={handleSendFeedback} className="max-w-md mx-auto space-y-4">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Ton avis nous aide à améliorer le campus..."
              className="w-full bg-white/10 border border-white/15 rounded-2xl p-5 text-white focus:outline-none focus:border-[#F2C94C] min-h-[110px] resize-none font-medium text-sm placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#F2C94C] text-[#3D332D] py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-[#E8603C] hover:text-white transition-all"
            >
              {isSending ? "ENVOI..." : "ENVOYER MON FEEDBACK ✨"} <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white text-[#3D332D] pt-16 pb-10 border-t border-[#D7CDC1]/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <h1 className="text-2xl font-[1000] tracking-tighter text-[#3D332D] mb-3">
              VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span>
            </h1>
            <p className="text-xs text-[#3D332D]/45 leading-relaxed mb-5">Le marché exclusif de l'UM6P. Confiance, proximité et opportunités.</p>
            <div className="flex gap-4" style={{ opacity: 0.3 }}>
              <Instagram size={18} className="hover:text-[#E8603C] cursor-pointer" />
              <Facebook  size={18} className="hover:text-[#E8603C] cursor-pointer" />
              <Linkedin  size={18} className="hover:text-[#E8603C] cursor-pointer" />
            </div>
          </div>
          {[
            { title: "Plateforme", links: [{ label: "Explorer les talents", to: "/marketplace" }, { label: "Proposer un service", to: "/add-service" }, { label: "Mon Dashboard", to: "/dashboard" }] },
            { title: "Aide",       links: [{ label: "Guide Ventura", to: "/about" }, { label: "F.A.Q", to: "/faq" }, { label: "Sécurité", to: "/safety" }] },
            { title: "L'Esprit",   links: [{ label: "Qui sommes-nous ?", to: "/about" }, { label: "Notre Impact", to: "/impact" }, { label: "Contact", to: "/impact" }] },
            { title: "Légal",      links: [{ label: "Conditions", to: "/terms" }, { label: "Confidentialité", to: "/privacy" }] },
          ].map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-black text-[9px] uppercase tracking-widest text-[#3D332D]/50">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-xs text-[#3D332D]/55 font-medium hover:text-[#E8603C] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-[#D7CDC1]/20 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-20 flex items-center justify-center gap-2">
            © 2026 — Built with ❤️ by UM6P Students <Zap size={9} fill="currentColor" />
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;