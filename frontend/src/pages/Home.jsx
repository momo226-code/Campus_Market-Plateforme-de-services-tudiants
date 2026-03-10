import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Star, MessageCircle, Zap, 
  Heart, CheckCircle, Users, Send 
} from "lucide-react";

// Assets (Assure-toi que les noms de fichiers correspondent)
import textureImg from "../assets/texture.png"; // Ta texture tissée (Image 4)
import heroImg from "../assets/texture2.png"; // Ta NOUVELLE image multi-services vivante

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
    <div className="min-h-screen bg-white text-[#0f172a]">

      {/* ================= 1. SECTION HERO (VIBRANCE MULTI-SERVICES) ================= */}
      <section 
        className="relative pt-44 pb-32 overflow-hidden"
        style={{ 
          backgroundImage: `url(${textureImg})`, // Texture tissée
          backgroundSize: '400px', 
          backgroundRepeat: 'repeat'
        }}
      >
        {/* Voile dégradé subtil pour mixage de couleurs sur le blanc */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/10 via-transparent to-[#ff5c5c]/10 opacity-60"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          
          {/* GAUCHE : TEXTE & IMAGE HERO */}
          <div className="flex flex-col items-start text-left relative">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-blue-100">
              <Star size={14} fill="currentColor" />
              Projet Prototype Campus 2024
            </div>
            
            {/* Grand Titre VENTURA Mixé */}
            <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter leading-none mb-8 relative">
               <span className="relative">
                 VENTURA
                 {/* Un petit point bleu qui clignote */}
                 <span className="absolute -top-1 -right-4 w-3 h-3 bg-[#2563eb] rounded-full animate-pulse"></span>
               </span>
               <span className="text-[#ff5c5c]">.</span>
            </h1>
            
            {/* Texte description */}
            <p className="text-xl text-slate-500 max-w-xl mb-12 font-medium leading-relaxed">
              Coiffure, Food Africaine, Mode, Cours... 
              <span className="text-[#0f172a] font-bold"> Le talent de ton campus </span> 
              enfin réuni sur une seule plateforme.
            </p>

            {/* Boutons mixés */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/add-service" className="bg-[#0f172a] text-white px-10 py-5 rounded-2xl shadow-2xl shadow-slate-200 flex items-center gap-3 hover:bg-[#2563eb] transition-all font-bold group">
                Proposer un Service
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#services" className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl hover:border-[#ff5c5c]/30 hover:text-[#ff5c5c] transition-all font-bold">
                Explorer
              </a>
            </div>

            {/* --- LA NOUVELLE IMAGE HERO (MULTI-SERVICES) --- */}
            <div className="absolute -top-16 -right-12 md:-right-24 md:-top-16 md:w-[600px] h-auto z-[-1] opacity-70 group-hover:opacity-100 transition-opacity">
              <img src={heroImg} alt="Ventura Services" className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>
          
          {/* Côté droit vide pour laisser respirer l'image */}
          <div></div>

        </div>

        {/* --- LA VAGUE ROSE GRADIENT (Fusion des couleurs) --- */}
        {/* On applique le dégradé directement dans le SVG pour une fusion parfaite */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1440 320" className="w-full h-auto drop-shadow-[0_-10px_25px_rgba(255,92,92,0.1)]">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* Dégradé fusion : du rose clair au rose vif profond */}
                <stop offset="0%" stopColor="#ff7a7a" />
                <stop offset="100%" stopColor="#ff3c6f" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,224L80,218.7C160,213,320,203,480,192C640,181,800,171,960,181.3C1120,192,1280,224,1360,240L1440,256L1440,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* ================= 2. SECTION AVIS PROTOTYPE (MIX COULEURS VIBRANT) ================= */}
      {/* On utilise un dégradé de fond complexe pour mixage de couleurs au scroll */}
      <section className="bg-gradient-to-b from-[#ff3c6f] to-[#ff5c5c] py-24 text-white -mt-1 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/20 shadow-2xl relative overflow-hidden">
            
            {/* Élément déco discret rappelant le bleu de la marque */}
            <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-[#2563eb]/30 border-2 border-white/30"></div>

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
              <div className="bg-white p-8 rounded-[2rem] text-[#0f172a] shadow-2xl relative">
                 
                 {/* Badge "PROTOTYPE" discret mais pro */}
                 <div className="absolute -top-4 -right-4 bg-[#0f172a] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg rotate-12">
                   BETA
                 </div>

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="text-[#ff5c5c]" /> 
                  Ton feedback cash
                </h3>
                <form className="space-y-4" onSubmit={handleFeedback}>
                  <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Qu'est-ce qui te ferait visiter le site tous les jours ?"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#2563eb] outline-none h-32"
                    required
                  />
                  <button className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2 group">
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Envoyer mon avis
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. SECTION SERVICES (GRID ÉPURÉ MAIS VIBRANT) ================= */}
      <section id="services" className="py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter mb-4">
                Services Récents
              </h2>
              <p className="text-slate-500 font-medium">Les talents fraîchement postés.</p>
            </div>
            <Link to="/services" className="text-[#2563eb] font-bold flex items-center gap-2 hover:translate-x-1 transition-transform border border-[#2563eb]/20 px-6 py-3 rounded-xl hover:bg-[#2563eb]/5">
              Tout voir <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <p className="col-span-3 text-center py-20 text-slate-400 font-bold italic border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                Chargement des services...
              </p>
            ) : (
              services.slice(0, 6).map((service) => (
                <div key={service._id} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-[#ff5c5c]/10 group">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="font-black text-[#2563eb] text-lg">À partir de 15€</span>
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#ff5c5c]">Détails</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ================= 4. SECTION CTA FINALE (VIBRANCE PURE) ================= */}
      <section className="py-40 text-center bg-white relative overflow-hidden">
        {/* Déco discrète rappelant le dégradé */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#ff5c5c] to-transparent opacity-60"></div>
        
        <h2 className="text-5xl font-[1000] tracking-tighter mb-8 leading-tight">
          Prêt à lancer <br /> ton <span className="text-[#ff5c5c]">Business ?</span>
        </h2>
        <Link to="/register" className="inline-flex bg-[#0f172a] text-white px-12 py-5 rounded-2xl shadow-2xl hover:scale-105 hover:bg-[#2563eb] transition-all font-bold group">
          Lancer mon profil prestataire
          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

    </div>
  );
};

export default Home;