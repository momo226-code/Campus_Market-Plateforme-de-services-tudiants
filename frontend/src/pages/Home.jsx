import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, MessageSquareQuote } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const [services, setServices] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chargement simultané des services et des avis
    Promise.all([
      API.get("/services"),
      API.get("/feedbacks")
    ])
    .then(([resServices, resFeedbacks]) => {
      setServices(resServices.data);
      // On affiche les 3 avis les mieux notés ou les plus récents
      setFeedbacks(resFeedbacks.data.slice(0, 3));
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erreur de chargement des données:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#3D332D]">
      
      {/* --- SECTION HERO : L'IDENTITÉ VENTURA --- */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#D7CDC1]/20"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C59473]/10 text-[#C59473] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-[#C59473]/20">
            <Star size={14} fill="currentColor" />
            Le Marché des Talents UM6P
          </div>

          <h1 className="text-7xl md:text-9xl font-[1000] tracking-tighter leading-none mb-8 text-[#3D332D]">
            VENTURA<span className="text-[#C59473]">.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#3D332D]/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            La plateforme où les étudiants de l'UM6P s'entraident. <br/>
            <span className="text-[#3D332D] font-bold italic">Ton talent a de la valeur ici.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/add-service" className="bg-[#3D332D] text-white px-10 py-5 rounded-2xl shadow-xl shadow-[#3D332D]/10 hover:bg-[#C59473] transition-all font-bold group flex items-center justify-center gap-3">
              Proposer mon service
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#categories" className="bg-white text-[#3D332D] border-2 border-[#D7CDC1] px-10 py-5 rounded-2xl hover:bg-[#D7CDC1]/20 transition-all font-bold">
              Explorer les catégories
            </a>
          </div>
        </div>
      </section>

      {/* --- SECTION CATÉGORIES (Navigation Principale) --- */}
      <div id="categories">
        <CategorySection />
      </div>

      {/* --- SECTION SERVICES RÉCENTS (Les pépites) --- */}
      <section className="py-24 bg-[#D7CDC1]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-[1000] tracking-tighter text-[#3D332D]">
                Dernières pépites
              </h2>
              <p className="text-[#3D332D]/50 text-sm font-medium mt-1">Les services fraîchement ajoutés sur le campus.</p>
            </div>
            <div className="w-12 h-1 bg-[#C59473] rounded-full hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="col-span-3 text-center py-20 text-[#3D332D]/40 font-bold italic">
                Chargement des pépites...
              </p>
            ) : services.length === 0 ? (
              <div className="col-span-3 text-center py-16 border-2 border-dashed border-[#D7CDC1] rounded-[2.5rem] bg-white/50">
                <p className="text-[#3D332D]/40 font-bold italic uppercase tracking-widest text-[10px]">
                  Aucun service récent
                </p>
              </div>
            ) : (
              services.slice(0, 3).map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- SECTION FEEDBACK : L'AVIS DU CAMPUS --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-[1000] tracking-tighter text-[#3D332D]">
              Le Campus s'exprime<span className="text-[#C59473]">.</span>
            </h2>
            <p className="text-[#3D332D]/50 font-medium mt-2">Ce que les étudiants pensent de Ventura.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <div key={fb._id} className="bg-[#FDFBF9] p-8 rounded-[2.5rem] border border-[#D7CDC1]/30 relative group hover:border-[#C59473]/50 transition-all duration-300">
                  <MessageSquareQuote className="absolute top-6 right-8 text-[#C59473]/10 group-hover:text-[#C59473]/20 transition-colors" size={40} />
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < fb.rating ? "text-[#C59473] fill-[#C59473]" : "text-[#D7CDC1]"} />
                    ))}
                  </div>

                  <p className="text-[#3D332D] font-medium leading-relaxed italic mb-8">
                    "{fb.comment}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3D332D] flex items-center justify-center text-white text-[10px] font-black">
                      {fb.userName?.charAt(0) || "U"}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#3D332D]">
                      {fb.userName || "Anonyme"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-[#3D332D]/30 italic font-medium">
                Pas encore d'avis partagés.
              </p>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link to="/feedback" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C59473] hover:text-[#3D332D] transition-colors group">
              Partager mon expérience sur le prototype
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="py-12 border-t border-[#D7CDC1]/30 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3D332D]/30">
          © 2026 Ventura — Plateforme de services étudiants UM6P
        </p>
      </footer>
    </div>
  );
};

export default Home;