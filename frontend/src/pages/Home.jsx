import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Send, Sparkles } from "lucide-react";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Chemin direct vers le dossier public (méthode la plus fiable pour le déploiement)
  const heroImgPath = "/hero-image.jpg";

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
      alert("Ton feedback a été envoyé ! ✨");
      setFeedbackText("");
    } catch (err) {
      alert("Erreur de connexion au backend.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen text-[#3D332D] overflow-x-hidden bg-white">
      {/* ── HERO SECTION OPTIMISÉE MOBILE ── */}
      <section 
        className="relative pt-24 sm:pt-36 md:pt-44 pb-16 sm:pb-28 overflow-hidden bg-cover bg-[center_top] sm:bg-center"
        style={{ 
          // Le gradient est plus opaque sur mobile pour garantir la lisibilité du texte
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(232, 96, 60, 0.05) 100%), url(${heroImgPath})` 
        }}
      >
        {/* Cercles décoratifs (cachés sur tout petit écran pour gagner en performance) */}
        <div className="hidden md:block absolute top-16 right-20 w-72 h-72 rounded-full bg-[#E8603C]/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* TEXTE & BOUTONS : Centrés sur mobile, à gauche sur PC */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#E8603C]/10 text-[#E8603C] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#E8603C]/20">
              <Star size={11} fill="currentColor" />
              Le Marché des Talents UM6P
            </div>
            
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter leading-[0.85] mb-6">
              VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#3D332D]/70 max-w-lg mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
              La plateforme d'entraide étudiante de l'UM6P. 
              <span className="block text-[#3D332D] font-bold italic mt-1">Ton talent a de la valeur ici.</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 px-4 sm:px-0">
              <Link
                to="/add-service"
                className="bg-[#3D332D] text-white px-8 py-5 rounded-2xl shadow-xl hover:bg-[#E8603C] transition-all font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3"
              >
                Vendre un talent
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/marketplace"
                className="border-2 border-[#7A9E7E] text-[#7A9E7E] px-8 py-5 rounded-2xl hover:bg-[#7A9E7E] hover:text-white transition-all font-black uppercase text-[10px] tracking-widest text-center"
              >
                Explorer
              </Link>
            </div>
          </div>

          {/* ILLUSTRATION : Visible uniquement sur Tablettes et PC (trop large pour mobile) */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Badge flottant 1 */}
            <div className="absolute -top-6 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[#D7CDC1]/40 rotate-[-6deg] z-20">
              <div className="text-[#E8603C] font-black text-[10px] uppercase mb-1">Talent</div>
              <div className="text-[#3D332D] font-[1000]">Coaching Python</div>
            </div>

            <div 
              className="w-80 xl:w-96 h-80 xl:h-96 rounded-[3.5rem] shadow-2xl relative overflow-hidden border-8 border-white bg-cover bg-center rotate-3"
              style={{ backgroundImage: `url(${heroImgPath})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D332D]/50 to-transparent" />
              <Sparkles size={60} className="text-white/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Badge flottant 2 */}
            <div className="absolute -bottom-4 -right-2 bg-[#F2C94C] rounded-2xl shadow-xl p-4 rotate-[5deg] z-20">
              <div className="text-[#3D332D] font-[1000]">Box Repas Maison</div>
              <div className="text-[#3D332D]/60 font-black text-[10px]">80 DH</div>
            </div>
          </div>
        </div>

        {/* Vague décorative adaptable */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[80px] fill-[#F5ECD7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.69,126.35,232.4,108.47c51.92-11,98.37-33.84,149-47.5s101.25-24,159.58-15.54" />
          </svg>
        </div>
      </section>

      {/* ── SECTION CATÉGORIES ── */}
      <section className="bg-[#F5ECD7] pb-10">
        <CategorySection />
      </section>

      {/* ── FEEDBACK ── */}
      <section className="py-20 px-4 bg-[#E8F0E8]">
        <div className="max-w-4xl mx-auto bg-[#3D332D] rounded-[2.5rem] p-8 sm:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-[1000] italic mb-6">Tu kiffes <span className="text-[#F2C94C]">l'idée ?</span></h2>
            <form onSubmit={handleSendFeedback} className="max-w-md mx-auto space-y-4">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Ton avis..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white focus:outline-none focus:border-[#E8603C] min-h-[100px] resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#E8603C] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                ENVOYER <Send size={14} />
              </button>
            </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 text-center bg-white border-t border-[#D7CDC1]/20">
        <div className="text-xl font-[1000] tracking-tighter text-[#3D332D]">VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span></div>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3D332D]/30 mt-2">© 2026 — Built for UM6P Students</p>
      </footer>
    </div>
  );
};

export default Home;