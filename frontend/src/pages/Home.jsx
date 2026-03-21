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
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

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
      alert("Erreur de connexion au backend. Vérifie Vercel !");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#3D332D] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-52 pb-16 sm:pb-20 md:pb-28 overflow-hidden bg-white">
        {/* Fond dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FDFBF9] to-[#D7CDC1]/30 pointer-events-none" />

        {/* Cercles décoratifs — cachés sur très petit écran */}
        <div className="hidden sm:block absolute top-16 right-8 md:right-20 w-48 md:w-72 h-48 md:h-72 rounded-full bg-[#E8603C]/5 blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute bottom-10 left-4 md:left-16 w-36 md:w-56 h-36 md:h-56 rounded-full bg-[#7A9E7E]/8 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Texte ── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E8603C]/10 text-[#E8603C] px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-5 sm:mb-7 border border-[#E8603C]/20">
              <Star size={11} fill="currentColor" />
              Le Marché des Talents UM6P
            </div>

            {/* Titre — tailles fluides : petit mobile → grand desktop */}
            <h1 className="text-[3.2rem] xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter leading-[0.88] mb-5 sm:mb-7 md:mb-8">
              VEN
              <span className="text-[#C59473]">T</span>
              URA
              <span className="text-[#E8603C]">.</span>
            </h1>

            {/* Accent couleur sous le titre */}
            <div className="flex justify-center lg:justify-start gap-2 mb-5 sm:mb-7">
              <span className="h-1.5 w-8 sm:w-12 rounded-full bg-[#E8603C]" />
              <span className="h-1.5 w-4 sm:w-6 rounded-full bg-[#7A9E7E]" />
              <span className="h-1.5 w-2 sm:w-3 rounded-full bg-[#F2C94C]" />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-[#3D332D]/70 max-w-sm sm:max-w-lg mx-auto lg:mx-0 mb-7 sm:mb-10 md:mb-12 font-medium leading-relaxed">
              La plateforme où les étudiants de l'UM6P s'entraident.
              <span className="block text-[#3D332D] font-bold italic mt-2">
                Ton talent a de la valeur ici.
              </span>
            </p>

            {/* CTA */}
            <div className="flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                to="/add-service"
                className="w-full xs:w-auto bg-[#3D332D] text-white px-7 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-xl shadow-[#3D332D]/20 hover:bg-[#E8603C] transition-all font-black uppercase text-[10px] sm:text-xs tracking-widest group flex items-center justify-center gap-3"
              >
                Proposer mon service
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/marketplace"
                className="w-full xs:w-auto border-2 border-[#7A9E7E] text-[#7A9E7E] px-7 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-[#7A9E7E] hover:text-white transition-all font-black uppercase text-[10px] sm:text-xs tracking-widest flex items-center justify-center gap-3"
              >
                Explorer les talents
              </Link>
            </div>
          </div>

          {/* ── Illustration décorative (lg+) ── */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Card flottante n°1 */}
            <div className="absolute -top-6 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[#D7CDC1]/40 rotate-[-6deg] z-20">
              <div className="text-[#E8603C] font-black text-xs uppercase tracking-widest mb-1">Talent</div>
              <div className="text-[#3D332D] font-[1000] text-lg">Coaching Python</div>
              <div className="text-[#7A9E7E] font-black text-xs mt-1">150 DH / session</div>
            </div>

            {/* Bloc central */}
            <div className="w-72 xl:w-96 h-72 xl:h-96 bg-gradient-to-br from-[#3D332D] to-[#5C4A40] rounded-[3.5rem] flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[#E8603C]/10 mix-blend-overlay" />
              <Sparkles size={80} className="text-[#C59473]/30" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-1.5 rounded-full bg-white/10 mb-2">
                  <div className="h-full w-3/4 rounded-full bg-[#E8603C]" />
                </div>
                <div className="text-white/40 text-[9px] font-black uppercase tracking-widest">50+ talents actifs</div>
              </div>
            </div>

            {/* Card flottante n°2 */}
            <div className="absolute -bottom-4 -right-2 bg-[#F2C94C] rounded-2xl shadow-xl p-4 rotate-[5deg] z-20">
              <div className="text-[#3D332D] font-black text-xs uppercase tracking-widest mb-1">Livraison</div>
              <div className="text-[#3D332D] font-[1000] text-base">Box Repas Maison</div>
              <div className="text-[#3D332D]/60 font-black text-xs mt-1">80 DH / box</div>
            </div>
          </div>
        </div>

        {/* Vague de transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[50px] sm:h-[70px] md:h-[100px] fill-[#FDFBF9]"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.69,126.35,232.4,108.47c51.92-11,98.37-33.84,149-47.5s101.25-24,159.58-15.54" />
          </svg>
        </div>
      </section>

      {/* ── STATS RAPIDES ── */}
      <section className="py-6 sm:py-8 bg-[#FDFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {[
              { value: "50+", label: "Talents", color: "text-[#E8603C]" },
              { value: "6", label: "Catégories", color: "text-[#7A9E7E]" },
              { value: "UM6P", label: "Campus", color: "text-[#F2C94C]" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#D7CDC1]/30 shadow-sm">
                <div className={`text-2xl sm:text-4xl font-[1000] tracking-tighter ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#3D332D]/40 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <div id="categories" className="py-4 sm:py-6 md:py-10">
        <CategorySection
          onSelectCategory={setSelectedCategory}
          activeCategory={selectedCategory}
        />
      </div>

      {/* ── SERVICES ── */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#D7CDC1]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 gap-3 sm:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] tracking-tighter">
                {selectedCategory ? selectedCategory : "Dernières pépites"}
                <span className="text-[#E8603C]">.</span>
              </h2>
              <p className="text-[#3D332D]/40 font-black uppercase text-[9px] sm:text-[10px] tracking-widest mt-1 sm:mt-2">
                {selectedCategory
                  ? `Talents en ${selectedCategory}`
                  : "Fraîchement arrivés sur le campus"}
              </p>
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="text-[10px] font-black uppercase tracking-widest text-[#E8603C] hover:underline"
              >
                Voir tout
              </button>
            )}
          </div>

          {/* Grille : 1 col mobile, 2 tablette, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 md:gap-10">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-[#E8603C] border-t-transparent rounded-full mb-4" />
                <p className="opacity-40 font-black uppercase tracking-widest text-[10px]">
                  Filtrage des talents...
                </p>
              </div>
            ) : services.length > 0 ? (
              services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-base sm:text-xl font-bold opacity-30 px-4">
                  Aucun service dans cette catégorie pour le moment. 🌵
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEEDBACK ── */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-white relative">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#3D332D] to-[#5C4A40] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 relative overflow-hidden shadow-2xl">
          {/* Accent couleur */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E8603C] via-[#F2C94C] to-[#7A9E7E]" />
          <div className="absolute -bottom-16 -right-16 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-[#E8603C]/5 blur-3xl pointer-events-none" />

          <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] italic leading-[0.9] mb-4 sm:mb-6 md:mb-8 tracking-tighter">
              Tu reviendrais{" "}
              <br className="hidden sm:block" />
              <span className="text-[#F2C94C]">souvent ici ?</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg font-medium mb-6 lg:mb-0 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Dis-nous cash si tu trouves ça utile. Ton avis nous aide à
              construire le futur de l'UM6P.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-[#FDFBF9] p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl">
              <form onSubmit={handleSendFeedback} className="space-y-4 sm:space-y-5">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Qu'est-ce qui te ferait visiter le site tous les jours ?"
                  className="w-full bg-white border border-[#D7CDC1] rounded-xl sm:rounded-2xl p-4 sm:p-5 min-h-[110px] sm:min-h-[140px] focus:outline-none focus:border-[#E8603C] transition-all text-[#3D332D] font-semibold placeholder:text-[#3D332D]/25 resize-none shadow-inner text-sm"
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#E8603C] hover:bg-[#3D332D] text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase text-[9px] sm:text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg group"
                >
                  {isSending ? "ENVOI..." : "ENVOYER MON AVIS"}
                  <Send
                    size={13}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 sm:py-14 md:py-20 bg-white border-t border-[#D7CDC1]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-3">
          <div className="text-xl sm:text-2xl md:text-3xl font-[1000] tracking-tighter text-[#3D332D]">
            VEN<span className="text-[#C59473]">T</span>URA
            <span className="text-[#E8603C]">.</span>
          </div>
          {/* Barre tricolore décorative */}
          <div className="flex gap-1.5">
            <span className="h-1 w-6 rounded-full bg-[#E8603C]" />
            <span className="h-1 w-4 rounded-full bg-[#7A9E7E]" />
            <span className="h-1 w-2 rounded-full bg-[#F2C94C]" />
          </div>
          <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#3D332D]/30 text-center">
            © 2026 — Built for UM6P Students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;