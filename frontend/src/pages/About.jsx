import { Star, ShieldCheck, Zap, BookOpen, UserPlus, ShoppingBag, MessageCircle , ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const steps = [
    {
      icon: <UserPlus className="text-[#E8603C]" />,
      title: "1. Crée ton profil",
      desc: "Inscris-toi avec ton mail UM6P pour rejoindre la communauté."
    },
    {
      icon: <ShoppingBag className="text-[#7A9E7E]" />,
      title: "2. Propose ou Explore",
      desc: "Publie ton talent (cours, cuisine, tech) ou cherche un service dont tu as besoin."
    },
    {
      icon: <MessageCircle className="text-[#F2C94C]" />,
      title: "3. Deal direct",
      desc: "Contacte l'étudiant, fixez vos conditions et réalisez l'échange sur le campus."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#E8603C]/10 text-[#E8603C] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            L'esprit Ventura
          </div>
          <h1 className="text-5xl sm:text-7xl font-[1000] text-[#3D332D] tracking-tighter mb-6">
            PAR LES ÉTUDIANTS,<br/>POUR LES <span className="text-[#E8603C]">ÉTUDIANTS.</span>
          </h1>
          <p className="text-xl text-[#3D332D]/60 max-w-2xl mx-auto font-medium">
            Ventura est le premier marché de talents interne à l'UM6P. 
            On croit que chaque étudiant a une compétence qui peut aider un autre.
          </p>
        </div>

        {/* SECTION QUI SOMMES-NOUS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#D7CDC1]/30">
            <ShieldCheck size={32} className="text-[#7A9E7E] mb-4" />
            <h3 className="font-black text-lg mb-2">Sécurisé</h3>
            <p className="text-sm text-[#3D332D]/60">Uniquement accessible aux étudiants UM6P. Confiance et proximité garanties.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#D7CDC1]/30">
            <Zap size={32} className="text-[#E8603C] mb-4" />
            <h3 className="font-black text-lg mb-2">Rapide</h3>
            <p className="text-sm text-[#3D332D]/60">Trouve une solution à ton problème (ou un client) en quelques clics sur le campus.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#D7CDC1]/30">
            <Star size={32} className="text-[#F2C94C] mb-4" />
            <h3 className="font-black text-lg mb-2">Valorisé</h3>
            <p className="text-sm text-[#3D332D]/60">Monétise tes passions et construis-toi une réputation solide avant même ton diplôme.</p>
          </div>
        </div>

        {/* GUIDE D'UTILISATION */}
        <div className="bg-[#3D332D] rounded-[3.5rem] p-10 sm:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <BookOpen size={150} />
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-[1000] mb-12 relative z-10 tracking-tight">
            Comment ça <span className="text-[#F2C94C]">marche ?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="space-y-4">
                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>
                <h4 className="font-[1000] text-xl">{step.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <Link to="/add-service" className="inline-flex items-center gap-3 bg-[#E8603C] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
              Prêt à commencer ? <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;