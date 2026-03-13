import { useEffect, useState } from "react";
import { Edit3, Trash2, Plus, Layout, ShoppingBag, Eye, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/services/me"); 
      const data = Array.isArray(res.data) ? res.data : (res.data.services || []);
      setMyServices(data);
    } catch (error) {
      console.error("Erreur:", error.response || error);
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Es-tu certain de vouloir supprimer ce talent ?")) {
      try {
        await API.delete(`/services/${id}`);
        setMyServices((prev) => prev.filter(s => s._id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      {/* On retire la Navbar locale car Layout.jsx s'en occupe déjà */}
      
      <div className="max-w-7xl mx-auto pt-10 md:pt-16 pb-20 px-4 md:px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-[1000] tracking-tighter text-[#3D332D]">
              Mon Studio<span className="text-[#C59473]">.</span>
            </h1>
            <p className="text-[#3D332D]/40 font-bold mt-2 uppercase text-[9px] md:text-[10px] tracking-[0.2em]">
              Gestion du catalogue UM6P
            </p>
          </div>
          <Link to="/add-service" className="w-full md:w-auto bg-[#3D332D] text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-[#C59473] transition-all shadow-xl active:scale-95">
            <Plus size={18} strokeWidth={3} /> Nouveau Service
          </Link>
        </div>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <StatCard icon={<Package size={20}/>} label="Total Services" value={myServices.length} color="bg-white border border-[#D7CDC1]/50 text-[#3D332D]" />
          <StatCard icon={<Eye size={20}/>} label="Visibilité" value="--" color="bg-white border border-[#D7CDC1]/50 text-[#3D332D]" />
          <StatCard icon={<ShoppingBag size={20}/>} label="Ventes" value="--" color="bg-[#C59473] text-white" />
        </div>

        {/* --- LISTE DES SERVICES --- */}
        <div className="bg-white border border-[#D7CDC1]/50 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-sm">
          <div className="p-6 md:p-10 border-b border-[#D7CDC1]/30 bg-[#FDFBF9]/50">
            <h3 className="font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] text-[#3D332D]/40">Catalogue Actif</h3>
          </div>
          
          <div className="divide-y divide-[#D7CDC1]/20">
            {loading ? (
              <div className="p-20 md:p-32 text-center">
                <div className="w-8 h-8 border-4 border-[#C59473] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#3D332D]/30 font-bold uppercase text-[9px] tracking-widest">Synchronisation...</p>
              </div>
            ) : myServices.length > 0 ? (
              myServices.map(service => (
                <div key={service._id} className="p-5 md:p-8 flex flex-col md:flex-row items-center justify-between hover:bg-[#FDFBF9] transition-all gap-5 md:gap-6 group">
                  <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-[#3D332D] rounded-[1.2rem] md:rounded-[1.8rem] overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                      {service.image ? (
                        <img src={service.image} className="w-full h-full object-cover opacity-80" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#D7CDC1]/20"><Layout size={24}/></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[8px] md:text-[9px] font-black uppercase text-[#C59473] tracking-[0.2em] mb-1 block">{service.category || "Service"}</span>
                      <h4 className="font-[1000] text-lg md:text-2xl text-[#3D332D] tracking-tighter leading-tight mb-1 truncate">{service.title}</h4>
                      <p className="text-[#3D332D] font-black text-base md:text-xl">{service.price} <span className="text-[10px] opacity-40">DH</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => navigate(`/edit-service/${service._id}`)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 p-4 md:p-5 bg-white border border-[#D7CDC1] text-[#3D332D] rounded-xl md:rounded-2xl hover:border-[#3D332D] transition-all active:scale-95"
                    >
                      <Edit3 size={18} />
                      <span className="md:hidden font-black uppercase text-[10px] tracking-widest">Éditer</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 p-4 md:p-5 bg-red-50 text-red-500 border border-red-100 rounded-xl md:rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                      <Trash2 size={18} />
                      <span className="md:hidden font-black uppercase text-[10px] tracking-widest">Supprimer</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 md:p-32 text-center">
                <p className="text-[#3D332D]/30 font-bold uppercase text-[10px] tracking-widest italic">Aucun service pour le moment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] ${color} flex items-center gap-4 md:gap-6 shadow-sm`}>
    <div className="p-3 md:p-4 bg-white/10 rounded-xl md:rounded-2xl shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mb-1 truncate">{label}</p>
      <p className="text-3xl md:text-4xl font-[1000] tracking-tighter leading-none">{value}</p>
    </div>
  </div>
);

export default Dashboard;