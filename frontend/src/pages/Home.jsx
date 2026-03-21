import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Send, Sparkles } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `/services?category=${encodeURIComponent(selectedCategory)}`
      : "/services";
    API.get(url)
      .then((res) => { setServices(res.data); setLoading(false); })
      .catch((err) => { console.error("Erreur de chargement:", err); setLoading(false); });
  }, [selectedCategory]);

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsSending(true);
    try {
      await API.post("/feedbacks", { comment: feedbackText, userName: "Explorateur UM6P", rating: 5 });
      alert("Ton feedback a été envoyé cash ! ✨");
      setFeedbackText("");
    } catch (err) {
      alert("Erreur de connexion au backend. Vérifie Vercel !");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#0F1117] overflow-x-hidden font-sans">

      {/* ── HERO — Dark & Premium ── */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-52 pb-16 sm:pb-20 md:pb-28 overflow-hidden bg-[#0F1117]">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] via-[#0F1117] to-[#E8603C]/10 pointer-events-none" />
        <div className="hidden sm:block absolute top-16 right-8 md:right-20 w-48 md:w-72 h-48 md:h-72 rounded-full bg-[#E8603C]/20 blur-[120px] pointer-events-none animate-pulse" />
        <div className="hidden sm:block absolute bottom-10 left-4 md:left-16 w-36 md:w-56 h-36 md:h-56 rounded-full bg-[#7A9E7E]/15 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#E8603C]/20 text-[#E8603C] px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-5 sm:mb-7 border border-[#E8603C]/30 backdrop-blur-md">
              <Star size={11} fill="currentColor" />
              Le Marché des Talents UM6P
            </div>
            <h1 className="text-[3.2rem] xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter leading-[0.88] mb-5 sm:mb-7 md:mb-8 text-white">
              VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span>
            </h1>
            <div className="flex justify-center lg:justify-start gap-2 mb-5 sm:mb-7">
              <span className="h-1.5 w-12 rounded-full bg-[#E8603C]" />
              <span className="h-1.5 w-6 rounded-full bg-[#7A9E7E]" />
              <span className="h-1.5 w-3 rounded-full bg-[#F2C94C]" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-sm sm:max-w-lg mx-auto lg:mx-0 mb-7 sm:mb-10 md:mb-12 font-medium leading-relaxed">
              La plateforme où les étudiants de l'UM6P s'entraident.
              <span className="block text-[#F2C94C] font-bold italic mt-2">Ton talent a de la valeur ici.</span>
            </p>
            <div className="flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <Link to="/add-service" className="w-full xs:w-auto bg-[#E8603C] text-white px-7 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-xl shadow-[#E8603C]/20 hover:scale-105 transition-all font-black uppercase text-[10px] sm:text-xs tracking-widest group flex items-center justify-center gap-3">
                Proposer mon service
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/marketplace" className="w-full xs:w-auto border-2 border-white/20 text-white px-7 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-white hover:text-[#0F1117] transition-all font-black uppercase text-[10px] sm:text-xs tracking-widest flex items-center justify-center gap-3">
                Explorer les talents
              </Link>
            </div>
          </div>

          {/* Image/Illustration Side */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute -top-6 -left-4 bg-[#1A1F2C] rounded-2xl shadow-2xl p-4 border border-white/10 rotate-[-6deg] z-20 backdrop-blur-xl">
              <div className="text-[#E8603C] font-black text-xs uppercase tracking-widest mb-1">Talent</div>
              <div className="text-white font-[1000] text-lg">Coaching Python</div>
              <div className="text-[#7A9E7E] font-black text-xs mt-1">150 DH / session</div>
            </div>
            <div className="w-72 xl:w-96 h-72 xl:h-96 bg-gradient-to-br from-[#1A1F2C] to-[#0F1117] border border-white/10 rounded-[3.5rem] flex items-center justify-center shadow-2xl relative overflow-hidden">
              <Sparkles size={80} className="text-[#C59473]/20" />
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <div className="text-white font-black text-xl mb-1">50+</div>
                <div className="text-white/40 text-[9px] font-black uppercase tracking-widest">Talents actifs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[70px] fill-[#161B22]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.69,126.35,232.4,108.47c51.92-11,98.37-33.84,149-47.5s101.25-24,159.58-15.54" />
          </svg>
        </div>
      </section>

      {/* ── STATS — Dark Sage ── */}
      <section className="pt-8 sm:pt-12 pb-0 bg-[#161B22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {[
              { value: "50+",  label: "Talents",    color: "text-[#E8603C]" },
              { value: "6",    label: "Catégories",  color: "text-[#7A9E7E]" },
              { value: "UM6P", label: "Campus",      color: "text-[#F2C94C]" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 shadow-sm">
                <div className={`text-2xl sm:text-4xl font-[1000] tracking-tighter ${stat.color}`}>{stat.value}</div>
                <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 sm:mt-12 overflow-hidden leading-[0] pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] fill-[#0F1117]">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section className="bg-[#0F1117] py-10">
        <div id="categories">
          <CategorySection onSelectCategory={setSelectedCategory} activeCategory={selectedCategory} />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0F1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] tracking-tighter text-white">
                {selectedCategory ? selectedCategory : "Dernières pépites"}
                <span className="text-[#E8603C]">.</span>
              </h2>
              <p className="text-white/40 font-black uppercase text-[9px] sm:text-[10px] tracking-widest mt-1">
                {selectedCategory ? `Talents en ${selectedCategory}` : "Fraîchement arrivés sur le campus"}
              </p>
            </div>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory("")} className="text-[10px] font-black uppercase tracking-widest text-[#E8603C] hover:text-white transition-colors">
                Voir tout
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 md:gap-10">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-[#E8603C] border-t-transparent rounded-full mb-4" />
                <p className="text-white/30 font-black uppercase tracking-widest text-[10px]">Filtrage des talents...</p>
              </div>
            ) : services.length > 0 ? (
              services.map((service) => <ServiceCard key={service._id} service={service} />)
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-base sm:text-xl font-bold text-white/20 px-4">Aucun service ici. 🌵</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEEDBACK ── */}
      <section className="py-16 sm:py-20 md:py-32 px-4 bg-[#161B22]">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1A1F2C] to-[#0F1117] rounded-[2rem] sm:rounded-[4rem] p-6 sm:p-20 flex flex-col lg:flex-row items-center gap-12 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E8603C] via-[#F2C94C] to-[#7A9E7E]" />
          <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl font-[1000] italic leading-[0.9] mb-8 tracking-tighter">
              Tu reviendrais <br />
              <span className="text-[#F2C94C]">souvent ici ?</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-lg font-medium leading-relaxed">
              Dis-nous cash si tu trouves ça utile. Ton avis nous aide à construire le futur de l'UM6P.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 p-5 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-md">
              <form onSubmit={handleSendFeedback} className="space-y-5">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Qu'est-ce qui te ferait visiter le site tous les jours ?"
                  className="w-full bg-[#0F1117] border border-white/10 rounded-2xl p-5 min-h-[140px] focus:outline-none focus:border-[#E8603C] transition-all text-white font-semibold placeholder:text-white/20 resize-none"
                />
                <button type="submit" disabled={isSending} className="w-full bg-[#E8603C] hover:bg-white hover:text-[#0F1117] text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                  {isSending ? "ENVOI..." : "ENVOYER MON AVIS"}
                  <Send size={13} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 bg-[#0F1117] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="text-3xl font-[1000] tracking-tighter text-white">
            VEN<span className="text-[#C59473]">T</span>URA<span className="text-[#E8603C]">.</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            © 2026 — Built for UM6P Students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;