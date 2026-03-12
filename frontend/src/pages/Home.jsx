import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, MessageCircle, Zap, CheckCircle, Users, Send } from "lucide-react";

// On importe juste ton image multi-services, le reste se fait par code
import heroImg from "../assets/texture2.png"; 

const Home = () => {
  const [services, setServices] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFeedback = (e) => {
    e.preventDefault();
    alert("Merci ! Ton avis va nous aider à améliorer VENTURA.");
    setFeedback("");
  };

  return (
    // On utilise le Beige de ton image 2 pour le fond par défaut
    <div className="min-h-screen bg-[#D7CDC1]/20 text-[#3D332D]">

      {/* ================= 1. SECTION HERO (WARM GRADIENT) ================= */}
      <section className="relative pt-44 pb-32 overflow-hidden bg-white">
        
        {/* --- STYLE : DÉGRADÉ DE COULEUR DOUX (Comme image_4) --- */}
        {/* On crée un dégradé très subtil qui part de ton beige (#D7CDC1) vers le blanc */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#D7CDC1]/30"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start text-left relative">
            
            {/* --- STYLE : BADGE À BORDS ARRONDIS (PILL) (Comme image_6) --- */}
            <div className="inline-flex items-center gap-2 bg-[#C59473]/10 text-[#C59473] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-[#C59473]/20">
              <Star size={14} fill="currentColor" />
              Projet Prototype Campus Market 2026
            </div>
            
            <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter leading-none mb-8 relative">
               VENTURA<span className="text-[#C59473]">.</span>
               {/* Un petit point qui clignote */}
               <span className="absolute -top-1 -right-4 w-3 h-3 bg-[#C59473] rounded-full animate-pulse"></span>
            </h1>
            
            <p className="text-xl text-[#3D332D]/70 max-w-xl mb-12 font-medium leading-relaxed">
              Le talent de ton campus, <span className="text-[#3D332D] font-bold">enfin réuni</span> sur une seule plateforme chaleureuse.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/add-service" className="bg-[#C59473] text-white px-10 py-5 rounded-2xl shadow-xl shadow-[#C59473]/20 flex items-center gap-3 hover:bg-[#3D332D] transition-all font-bold group">
                Proposer un Service
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#services" className="bg-white text-[#3D332D] border-2 border-[#D7CDC1] px-10 py-5 rounded-2xl hover:bg-[#D7CDC1]/20 transition-all font-bold">
                Explorer
              </a>
            </div>
          </div>

          {/* Ton image illustrative multi-services (On la garde !) */}
          <div className="relative">
             <img src={heroImg} alt="Ventura Services" className="w-full h-auto drop-shadow-2xl z-10 relative" />
             {/* Un cercle flouté derrière pour donner de la profondeur */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D7CDC1] rounded-full blur-[100px] opacity-40"></div>
          </div>
        </div>

        {/* --- STYLE : VAGUE / SÉPARATEUR DE SECTION COURBE (Comme image_3 et image_5) --- */}
        {/* J'ai pris le code SVG d'une vague douce pour faire la transition */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1440 320" className="w-full h-auto">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* On mixe les deux couleurs dans le dégradé de la vague */}
                <stop offset="0%" stopColor="#C59473" />
                <stop offset="100%" stopColor="#D7CDC1" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,224L80,218.7C160,213,320,203,480,192C640,181,800,171,960,181.3C1120,192,1280,224,1360,240L1440,256L1440,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* ================= 2. SECTION AVIS PROTOTYPE (MIX VIBRANT) ================= */}
      {/* Ici, on applique un dégradé de fond plus complexe pour le mixage de couleurs 
          (Comme sur l'image_4)
      */}
      <section className="bg-gradient-to-b from-[#C59473] to-[#B07E60] py-24 text-white -mt-1 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/20 shadow-2xl relative overflow-hidden">
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-[1000] tracking-tighter mb-6 leading-none">
                  Tu reviendrais <br />
                  <span className="text-white italic">souvent ici ?</span>
                </h2>
                <p className="text-white/90 font-medium mb-10 leading-relaxed">
                  On prépare le lancement. Dis-nous cash si tu trouves ça utile et si tu serais prêt à utiliser le site régulièrement pour tes besoins sur le campus.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl flex flex-col gap-2 border border-white/10 hover:border-white/30 transition-all">
                    <Users className="text-white" size={24} />
                    <p className="text-xs font-black uppercase tracking-widest">Communauté</p>
                    <p className="text-[10px] opacity-70">Rejoins +50 testeurs</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl flex flex-col gap-2 border border-white/10 hover:border-white/30 transition-all">
                    <Zap className="text-white" size={24} />
                    <p className="text-xs font-black uppercase tracking-widest">Futuriste</p>
                    <p className="text-[10px] opacity-70">Zéro intermédiaire</p>
                  </div>
                </div>
              </div>

              {/* FORMULAIRE D'AVIS */}
              <div className="bg-white p-8 rounded-[2rem] text-[#3D332D] shadow-2xl relative">
                 {/* Badge discret */}
                 <div className="absolute -top-4 -right-4 bg-[#3D332D] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg rotate-12">
                   BETA
                 </div>

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="text-[#C59473]" /> 
                  Ton feedback cash
                </h3>
                <form className="space-y-4" onSubmit={handleFeedback}>
                  <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Qu'est-ce qui te ferait visiter le site tous les jours ?"
                    className="w-full bg-[#D7CDC1]/10 border border-[#D7CDC1] rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#C59473] outline-none h-32"
                    required
                  />
                  <button className="w-full bg-[#3D332D] text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#C59473] transition-all flex items-center justify-center gap-2 group">
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Envoyer mon avis
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. SECTION SERVICES (GRID ÉPURÉ MAIS VIBRANT) ================= */}
      {/* On utilise ton Beige Sablé (#D7CDC1) pour le fond de cette section */}
      <section id="services" className="py-32 bg-[#D7CDC1]/10 border-t border-[#D7CDC1]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter mb-4 text-[#3D332D]">
                Services Récents
              </h2>
              <p className="text-[#3D332D]/60 font-medium">Les talents fraîchement postés.</p>
            </div>
            <Link to="/services" className="text-[#C59473] font-bold flex items-center gap-2 hover:translate-x-1 transition-transform border border-[#C59473]/20 px-6 py-3 rounded-xl hover:bg-[#C59473]/5">
              Tout voir <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <p className="col-span-3 text-center py-20 text-[#3D332D]/40 font-bold italic border-2 border-dashed border-[#D7CDC1] rounded-2xl bg-white">
                Chargement des pépites...
              </p>
            ) : (
              services.slice(0, 6).map((service) => (
                <div key={service._id} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-[#D7CDC1]/30 hover:border-[#C59473]/10 group">
                  <div className="w-14 h-14 bg-[#D7CDC1]/20 text-[#C59473] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C59473] group-hover:text-white transition-colors">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-[#3D332D]">{service.title}</h3>
                  <p className="text-[#3D332D]/60 text-sm leading-relaxed mb-6 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-[#D7CDC1]/10">
                    <span className="font-black text-[#C59473] text-lg">À partir de 15€</span>
                    <button className="text-[10px] font-black uppercase tracking-widest text-[#3D332D]/30 hover:text-[#C59473]">Détails</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;