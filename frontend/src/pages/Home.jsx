import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Send, Sparkles } from "lucide-react";
import CategorySection from "../components/CategorySection";

// Importation de l'image (Assure-toi qu'elle est dans src/assets/)
import heroImg from "../assets/hero-image.jpg";

const Home = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsSending(true);
    try {
      await API.post("/feedbacks", {
        comment: feedbackText,
        userName: "Explorateur UM6P",
        rating: 5,
      });
      alert("Ton feedback a été envoyé cash ! ✨");
      setFeedbackText("");
    } catch (err) {
      alert("Erreur de connexion au backend. Vérifie la configuration !");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen text-[#3D332D] overflow-x-hidden bg-white">
      
      {/* ── SECTION HERO OPTIMISÉE ── */}
      <section 
        className="relative pt-24 sm:pt-36 md:pt-44 lg:pt-52 pb-12 sm:pb-20 overflow-hidden bg-white bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.85), rgba(232, 96, 60, 0.05)), url(${heroImg})` 
        }}
      >
        {/* Cercles décoratifs (cachés sur mobile pour la clarté) */}
        <div className="hidden md:block absolute top-16 right-20 w-72 h-72 rounded-full bg-[#E8603C]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* TEXTE : Centré sur mobile, à gauche sur PC */}
          <div className="text-center lg:text-left order-1">
            <div className="inline-flex items-center gap-2 bg-[#E8603C]/10 text-[#E8603C] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#E8603C]/20">
              <Star size={11} fill="currentColor" />
              Le Marché des Talents UM6P
            </div>
            
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter leading-[0.85] mb-6">
              VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#3D332D]/70 max-w-lg mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
              La plateforme d'entraide étudiante de l'UM6P. 
              <span className="block text-[#3D332D] font-bold italic mt-1 text-[#E8603C]">Ton talent a de la valeur ici.</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 px-4 sm:px-0">
              <Link
                to="/add-service"
                className="bg-[#3D332D] text-white px-8 py-5 rounded-2xl shadow-xl hover:bg-[#E8603C] transition-all font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 active:scale-95"
              >
                Vendre un talent <ArrowRight size={18} />
              </Link>
              <Link
                to="/marketplace"
                className="border-2 border-[#7A9E7E] text-[#7A9E7E] px-8 py-5 rounded-2xl hover:bg-[#7A9E7E] hover:text-white transition-all font-black uppercase text-[10px] tracking-widest text-center active:scale-95"
              >
                Explorer
              </Link>
            </div>
          </div>

          {/* VISUEL : S'adapte sur mobile sans disparaître */}
          <div className="flex items-center justify-center relative order-2 mt-6 lg:mt-0 scale-90 xs:scale-100 sm:scale-110 lg:scale-100">
            {/* Badge Talent */}
            <div className="absolute -top-4 -left-2 sm:-top-8 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-5 border border-[#D7CDC1]/40 rotate-[-6deg] z-20">
              <div className="text-[#E8603C] font-black text-[8px] sm:text-[10px] uppercase mb-1">Talent</div>
              <div className="text-[#3D332D] font-[1000] text-sm sm:text-xl">Coaching Python</div>
              <div className="text-[#7A9E7E] font-black text-[9px] sm:text-xs mt-1 text-right">150 DH</div>
            </div>

            {/* Image Card */}
            <div 
              className="w-64 h-64 xs:w-72 xs:h-72 xl:w-96 xl:h-96 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl relative overflow-hidden border-4 sm:border-8 border-white bg-cover bg-center rotate-2"
              style={{ backgroundImage: `url(${heroImg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D332D]/70 via-transparent to-transparent" />
              <Sparkles size={60} className="text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-5 left-0 right-0 px-6 z-10 text-center">
                <div className="h-1 rounded-full bg-white/20 mb-2 max-w-[100px] mx-auto overflow-hidden">
                   <div className="h-full w-3/4 bg-[#E8603C]" />
                </div>
                <div className="text-white/80 text-[8px] font-black uppercase tracking-widest">50+ talents actifs</div>
              </div>
            </div>

            {/* Badge Livraison */}
            <div className="absolute -bottom-2 -right-2 sm:-bottom-6 sm:-right-4 bg-[#F2C94C] rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-5 rotate-[5deg] z-20">
              <div className="text-[#3D332D] font-black text-[8px] sm:text-[10px] uppercase mb-1">Livraison</div>
              <div className="text-[#3D332D] font-[1000] text-sm sm:text-lg">Box Repas Maison</div>
              <div className="text-[#3D332D]/60 font-black text-[9px] sm:text-xs mt-1">80 DH / box</div>
            </div>
          </div>
        </div>

        {/* Vague adaptable */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[80px] fill-[#F5ECD7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.69,126.35,232.4,108.47c51.92-11,98.37-33.84,149-47.5s101.25-24,159.58-15.54" />
          </svg>
        </div>
      </section>

      {/* ── SECTION STATS ── */}
      <section className="bg-[#F5ECD7] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div className="bg-white/50 backdrop-blur-md p-4 sm:p-8 rounded-[2rem] border border-white/50">
                <div className="text-3xl sm:text-5xl font-[1000] text-[#E8603C]">50+</div>
                <div className="text-[8px] sm:text-[10px] font-black uppercase text-[#3D332D]/40 mt-2 tracking-widest">Talents</div>
            </div>
            <div className="bg-white/50 backdrop-blur-md p-4 sm:p-8 rounded-[2rem] border border-white/50">
                <div className="text-3xl sm:text-5xl font-[1000] text-[#7A9E7E]">6</div>
                <div className="text-[8px] sm:text-[10px] font-black uppercase text-[#3D332D]/40 mt-2 tracking-widest">Catégories</div>
            </div>
            <div className="bg-white/50 backdrop-blur-md p-4 sm:p-8 rounded-[2rem] border border-white/50">
                <div className="text-3xl sm:text-5xl font-[1000] text-[#C59473]">UM6P</div>
                <div className="text-[8px] sm:text-[10px] font-black uppercase text-[#3D332D]/40 mt-2 tracking-widest">Campus</div>
            </div>
        </div>
      </section>

      {/* ── SECTION CATÉGORIES ── */}
      <section className="bg-[#F5ECD7] pb-10">
        <CategorySection />
      </section>

      {/* ── SECTION FEEDBACK ── */}
      <section className="py-20 px-4 bg-[#E8F0E8]">
        <div className="max-w-4xl mx-auto bg-[#3D332D] rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-20 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E8603C] to-[#F2C94C]" />
            <h2 className="text-4xl sm:text-6xl font-[1000] italic mb-8 tracking-tighter">Tu kiffes <span className="text-[#F2C94C]">l'idée ?</span></h2>
            <form onSubmit={handleSendFeedback} className="max-w-md mx-auto space-y-4">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Dis-nous cash ton avis..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 text-white focus:outline-none focus:border-[#E8603C] min-h-[120px] resize-none shadow-inner"
              />
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#E8603C] py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg disabled:opacity-50"
              >
                {isSending ? "ENVOI..." : "ENVOYER L'AVIS"} <Send size={14} />
              </button>
            </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center bg-white">
        <div className="text-2xl font-[1000] tracking-tighter text-[#3D332D]">VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span></div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#3D332D]/30 mt-3">© 2026 — Built with ❤️ for UM6P Students</p>
      </footer>
    </div>
  );
};

export default Home;