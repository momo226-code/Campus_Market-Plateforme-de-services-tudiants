import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Send, Users, Zap, Layout } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(""); // État pour le filtre
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // useEffect intelligent : il se relance quand selectedCategory change
  useEffect(() => {
    setLoading(true);
    
    // Construction de l'URL avec paramètre de filtrage
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
  }, [selectedCategory]); // <--- Dépendance clé

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsSending(true);
    try {
      await API.post("/feedbacks", { 
        comment: feedbackText,
        userName: "Explorateur UM6P",
        rating: 5 
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
      
      {/* --- SECTION HERO --- */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#D7CDC1]/30"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-[#C59473]/10 text-[#C59473] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#C59473]/20">
              <Star size={12} fill="currentColor" />
              Le Marché des Talents UM6P
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-[1000] tracking-tighter leading-[0.8] mb-8">
              VENTURA<span className="text-[#C59473]">.</span>
            </h1>
            <p className="text-xl text-[#3D332D]/70 max-w-lg mb-12 font-medium leading-relaxed">
              La plateforme où les étudiants de l'UM6P s'entraident. 
              <span className="block text-[#3D332D] font-bold italic mt-2">Ton talent a de la valeur ici.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/add-service" className="bg-[#3D332D] text-white px-10 py-5 rounded-2xl shadow-2xl shadow-[#3D332D]/20 hover:bg-[#C59473] transition-all font-black uppercase text-xs tracking-widest group flex items-center justify-center gap-3">
                Proposer mon service
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in zoom-in duration-1000">
            <div className="w-[450px] h-[450px] bg-[#D7CDC1]/40 rounded-[4rem] rotate-6 absolute inset-0 -z-10"></div>
            <div className="w-[450px] h-[450px] bg-[#3D332D] rounded-[4rem] -rotate-3 flex items-center justify-center shadow-3xl">
              <Layout size={180} className="text-[#C59473]/20" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] fill-[#FDFBF9]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.69,126.35,232.4,108.47c51.92-11,98.37-33.84,149-47.5s101.25-24,159.58-15.54"></path>
          </svg>
        </div>
      </section>

      {/* --- SECTION CATÉGORIES (Filtrage Connecté) --- */}
      <div id="categories" className="py-10">
        <CategorySection 
          onSelectCategory={setSelectedCategory} 
          activeCategory={selectedCategory} 
        />
      </div>

      {/* --- SECTION SERVICES --- */}
      <section className="py-24 bg-[#D7CDC1]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-[1000] tracking-tighter">
                {selectedCategory ? `${selectedCategory}` : "Dernières pépites"}
                <span className="text-[#C59473]">.</span>
              </h2>
              <p className="text-[#3D332D]/40 font-black uppercase text-[10px] tracking-widest mt-2">
                {selectedCategory ? `Talents en ${selectedCategory}` : "Fraîchement arrivés sur le campus"}
              </p>
            </div>
            {selectedCategory && (
               <button 
                onClick={() => setSelectedCategory("")}
                className="text-[10px] font-black uppercase tracking-widest text-[#C59473] hover:underline"
               >
                 Voir tout
               </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-[#C59473] border-t-transparent rounded-full mb-4"></div>
                <p className="opacity-40 font-black uppercase tracking-widest text-[10px]">Filtrage des talents...</p>
              </div>
            ) : services.length > 0 ? (
              services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl font-bold opacity-30">Aucun service dans cette catégorie pour le moment. 🌵</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- SECTION FEEDBACK --- */}
      <section className="py-32 px-6 bg-white relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 -translate-y-[99%]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.69,126.35,232.4,108.47c51.92-11,98.37-33.84,149-47.5s101.25-24,159.58-15.54"></path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto bg-[#C59473] rounded-[4rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(197,148,115,0.3)]">
          <div className="md:w-1/2 text-white">
            <h2 className="text-5xl md:text-6xl font-[1000] italic leading-[0.9] mb-8 tracking-tighter">
              Tu reviendrais <br /> <span className="underline decoration-white/20">souvent ici ?</span>
            </h2>
            <p className="text-white/90 text-lg font-medium mb-12 max-w-md leading-relaxed">
              Dis-nous cash si tu trouves ça utile. Ton avis nous aide à construire le futur de l'UM6P.
            </p>
          </div>

          <div className="md:w-1/2 w-full relative">
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-3xl relative z-10">
              <form onSubmit={handleSendFeedback} className="space-y-6">
                <textarea 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Qu'est-ce qui te ferait visiter le site tous les jours ?"
                  className="w-full bg-[#FDFBF9] border border-[#D7CDC1] rounded-3xl p-6 min-h-[150px] focus:outline-none focus:border-[#C59473] transition-all text-[#3D332D] font-semibold placeholder:text-[#3D332D]/20 resize-none shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#3D332D] hover:bg-black text-white py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-[#3D332D]/20 group"
                >
                  {isSending ? "ENVOI..." : "ENVOYER MON AVIS"}
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 bg-white border-t border-[#D7CDC1]/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-3xl font-[1000] tracking-tighter text-[#3D332D] mb-4">
            VENTURA<span className="text-[#C59473]">.</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#3D332D]/30">
            © 2026 — Built for UM6P Students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;