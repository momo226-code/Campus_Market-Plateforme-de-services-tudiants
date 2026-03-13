import { useEffect, useState } from "react";
import { Edit3, Trash2, Plus, Layout, ShoppingBag, Eye, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Récupération des services au montage
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Vérifie que ton endpoint est bien /services/me ou /services/mine
      const res = await API.get("/services/me"); 
      setMyServices(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur de chargement", error);
      setLoading(false);
    }
  };

  // 2. Logique de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 3. LOGIQUE DELETE - Est-elle OK ?
  const handleDelete = async (id) => {
    // Confirmation visuelle avant action irréversible
    const confirmDelete = window.confirm("Es-tu certain de vouloir supprimer ce talent ? Cette action est irréversible.");
    
    if (confirmDelete) {
      try {
        // APPEL API : Vérifie que ton backend accepte DELETE sur /services/:id
        await API.delete(`/services/${id}`);
        
        // MISE À JOUR UI : On filtre l'état local pour faire disparaître le service instantanément
        setMyServices((prevServices) => prevServices.filter(service => service._id !== id));
        
        console.log("Service supprimé avec succès");
      } catch (error) {
        console.error("Erreur suppression:", error);
        alert("Impossible de supprimer le service. Vérifie ta connexion ou tes droits.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      
      {/* --- NAV DASHBOARD --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-[#D7CDC1]/30 z-[100] px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#3D332D] rounded-lg flex items-center justify-center text-[#D7CDC1] font-black">V</div>
           <span className="font-[1000] tracking-tighter text-[#3D332D]">VENTURA.</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#3D332D]/50 hover:text-red-500 font-black uppercase text-[10px] tracking-[0.2em] transition-colors"
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
            <p className="text-[#3D332D]/50 font-medium mt-1">Gère ton catalogue de services UM6P.</p>
          </div>
          <Link to="/add-service" className="bg-[#3D332D] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-[#C59473] transition-all shadow-xl shadow-[#3D332D]/10">
            <Plus size={18} /> Nouveau Service
          </Link>
        </div>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={<Layout />} label="Services" value={myServices.length} color="bg-[#C59473]/10 text-[#C59473]" />
          <StatCard icon={<Eye />} label="Vues" value="--" color="bg-[#3D332D]/5 text-[#3D332D]" />
          <StatCard icon={<ShoppingBag />} label="Commandes" value="--" color="bg-[#D7CDC1]/30 text-[#3D332D]" />
        </div>

        {/* --- LISTE --- */}
        <div className="bg-white border border-[#D7CDC1]/50 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-[#D7CDC1]/30">
            <h3 className="font-black uppercase tracking-widest text-xs text-[#3D332D]">Mes Annonces Actives</h3>
          </div>
          
          <div className="divide-y divide-[#D7CDC1]/20">
            {loading ? (
              <div className="p-20 text-center text-[#3D332D]/30 italic font-bold">Chargement...</div>
            ) : myServices.length > 0 ? myServices.map(service => (
              <div key={service._id} className="p-6 flex flex-col md:flex-row items-center justify-between hover:bg-[#FDFBF9] transition-colors gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 bg-[#D7CDC1]/20 rounded-2xl flex items-center justify-center shrink-0">
                    <Layout className="text-[#3D332D]/20" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#C59473] tracking-widest">{service.category}</span>
                    <h4 className="font-bold text-[#3D332D] leading-tight">{service.title}</h4>
                    <p className="text-[#3D332D]/40 font-black text-sm">{service.price} DH</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button 
                    onClick={() => navigate(`/edit-service/${service._id}`)}
                    className="p-4 bg-[#FDFBF9] border border-[#D7CDC1] text-[#3D332D] rounded-2xl hover:bg-[#3D332D] hover:text-white transition-all shadow-sm group"
                    title="Modifier"
                  >
                    <Edit3 size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={() => handleDelete(service._id)}
                    className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm group"
                    title="Supprimer"
                  >
                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-20 text-center text-[#3D332D]/30 italic font-medium">
                Aucun service trouvé dans ton studio.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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