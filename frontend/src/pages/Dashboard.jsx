import { useEffect, useState } from "react";
import { Edit3, Trash2, Plus, Layout, ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Imaginons que ton API ait une route pour récupérer les services de l'utilisateur connecté
  useEffect(() => {
    API.get("/services/me")
      .then(res => {
        setMyServices(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER DU DASHBOARD --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-[1000] tracking-tighter text-[#3D332D]">
              Mon Studio<span className="text-[#C59473]">.</span>
            </h1>
            <p className="text-[#3D332D]/50 font-medium">Gère tes talents et tes activités sur le campus.</p>
          </div>
          <Link to="/add-service" className="bg-[#3D332D] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-[#C59473] transition-all shadow-xl shadow-[#3D332D]/10">
            <Plus size={18} /> Nouveau Service
          </Link>
        </div>

        {/* --- GRILLE DE STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={<Layout />} label="Services" value={myServices.length} color="bg-[#C59473]/10 text-[#C59473]" />
          <StatCard icon={<Eye />} label="Vues totales" value="124" color="bg-[#3D332D]/5 text-[#3D332D]" />
          <StatCard icon={<ShoppingBag />} label="Commandes" value="12" color="bg-[#D7CDC1]/30 text-[#3D332D]" />
        </div>

        {/* --- LISTE DES SERVICES --- */}
        <div className="bg-white border border-[#D7CDC1]/50 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-[#D7CDC1]/30 flex justify-between items-center">
            <h3 className="font-black uppercase tracking-widest text-xs text-[#3D332D]">Mes Annonces</h3>
          </div>
          
          <div className="divide-y divide-[#D7CDC1]/20">
            {myServices.length > 0 ? myServices.map(service => (
              <div key={service._id} className="p-6 flex flex-col md:flex-row items-center justify-between hover:bg-[#FDFBF9] transition-colors gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 bg-[#3D332D] rounded-2xl overflow-hidden shrink-0">
                    <img src={service.image} alt="" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3D332D] leading-tight">{service.title}</h4>
                    <p className="text-[#C59473] font-black text-sm">{service.price} DH</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button className="flex-1 md:flex-none p-3 bg-[#FDFBF9] border border-[#D7CDC1] text-[#3D332D] rounded-xl hover:bg-[#3D332D] hover:text-white transition-all">
                    <Edit3 size={18} />
                  </button>
                  <button className="flex-1 md:flex-none p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-20 text-center text-[#3D332D]/30 italic font-medium">
                Tu n'as pas encore proposé de service.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Petit composant interne pour les stats
const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-8 rounded-[2rem] ${color} flex items-center gap-6`}>
    <div className="p-4 bg-white/50 rounded-2xl shadow-sm">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</p>
      <p className="text-3xl font-[1000] tracking-tighter">{value}</p>
    </div>
  </div>
);

export default Dashboard;