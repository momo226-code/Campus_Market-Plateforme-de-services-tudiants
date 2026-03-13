import { useEffect, useState } from "react";
import { Edit3, Trash2, Plus, Layout, ShoppingBag, Eye, LogOut, Package } from "lucide-react";
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
      // On s'assure que le token est bien présent avant l'appel
      const res = await API.get("/services/me"); 
      
      // SÉCURITÉ : On vérifie si les données sont dans res.data ou res.data.services
      const data = Array.isArray(res.data) ? res.data : (res.data.services || []);
      setMyServices(data);
    } catch (error) {
      console.error("Erreur de chargement des services:", error.response || error);
      if (error.response?.status === 401) {
        // Si le token est expiré ou invalide, retour au login
        handleLogout();
      }
    } finally {
      // On arrête le chargement quoi qu'il arrive pour éviter l'écran blanc
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Es-tu certain de vouloir supprimer ce talent ?");
    
    if (confirmDelete) {
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
      
      {/* --- NAVBAR DASHBOARD --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-[#D7CDC1]/30 z-[100] px-8 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#3D332D] rounded-xl flex items-center justify-center text-[#D7CDC1] font-black group-hover:bg-[#C59473] transition-colors">V</div>
          <span className="font-[1000] tracking-tighter text-[#3D332D] text-xl">VENTURA.</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#3D332D]/40 hover:text-red-500 font-black uppercase text-[10px] tracking-[0.2em] transition-all"
        >
          Déconnexion <LogOut size={16} />
        </button>
      </nav>

      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-[1000] tracking-tighter text-[#3D332D]">
              Mon Studio<span className="text-[#C59473]">.</span>
            </h1>
            <p className="text-[#3D332D]/40 font-bold mt-2 uppercase text-[10px] tracking-[0.2em]">
              Gestion du catalogue UM6P
            </p>
          </div>
          <Link to="/add-service" className="bg-[#3D332D] text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-[#C59473] transition-all shadow-2xl shadow-[#3D332D]/10 active:scale-95">
            <Plus size={18} strokeWidth={3} /> Nouveau Service
          </Link>
        </div>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={<Package size={20}/>} label="Total Services" value={myServices.length} color="bg-white border border-[#D7CDC1]/50 text-[#3D332D]" />
          <StatCard icon={<Eye size={20}/>} label="Visibilité" value="--" color="bg-white border border-[#D7CDC1]/50 text-[#3D332D]" />
          <StatCard icon={<ShoppingBag size={20}/>} label="Ventes" value="--" color="bg-[#C59473] text-white" />
        </div>

        {/* --- LISTE DES SERVICES --- */}
        <div className="bg-white border border-[#D7CDC1]/50 rounded-[3rem] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-[#D7CDC1]/30 bg-[#FDFBF9]/50">
            <h3 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#3D332D]/40">Catalogue Actif</h3>
          </div>
          
          <div className="divide-y divide-[#D7CDC1]/20">
            {loading ? (
              <div className="p-32 text-center">
                <div className="w-8 h-8 border-4 border-[#C59473] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#3D332D]/30 font-bold uppercase text-[10px] tracking-widest">Synchronisation...</p>
              </div>
            ) : myServices.length > 0 ? (
              myServices.map(service => (
                <div key={service._id} className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-[#FDFBF9] transition-all gap-6 group">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-20 h-20 bg-[#3D332D] rounded-[1.5rem] overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                      {service.image ? (
                        <img src={service.image} className="w-full h-full object-cover opacity-80" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#D7CDC1]/20"><Layout /></div>
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-[#C59473] tracking-[0.2em] mb-1 block">{service.category || "Service"}</span>
                      <h4 className="font-[1000] text-xl text-[#3D332D] tracking-tighter leading-none mb-2">{service.title}</h4>
                      <p className="text-[#3D332D] font-black text-lg">{service.price} <span className="text-[10px] opacity-40">DH</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <button 
                      onClick={() => navigate(`/edit-service/${service._id}`)}
                      className="p-4 bg-white border border-[#D7CDC1] text-[#3D332D] rounded-2xl hover:border-[#3D332D] transition-all active:scale-90"
                      title="Modifier"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)}
                      className="p-4 bg-red-50 text-red-500 border border-red-100 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-32 text-center">
                <div className="w-16 h-16 bg-[#FDFBF9] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D7CDC1]">
                    <Package size={30} />
                </div>
                <p className="text-[#3D332D]/30 font-bold uppercase text-[10px] tracking-widest">Ton studio est vide</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-8 rounded-[2.5rem] ${color} flex items-center gap-6 shadow-sm transition-transform hover:-translate-y-1`}>
    <div className="p-4 bg-white/10 rounded-2xl">{icon}</div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">{label}</p>
      <p className="text-4xl font-[1000] tracking-tighter leading-none">{value}</p>
    </div>
  </div>
);

export default Dashboard;