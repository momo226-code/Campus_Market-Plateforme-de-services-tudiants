import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import ServiceCard from "../components/ServiceCard";

const Marketplace = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hook pour récupérer les paramètres de l'URL (?category=...)
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryFilter = queryParams.get("category");

  useEffect(() => {
    setLoading(true);
    // On construit l'URL de l'API avec le filtre s'il existe
    const url = categoryFilter 
      ? `/services?category=${encodeURIComponent(categoryFilter)}` 
      : "/services";

    API.get(url)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur Marketplace:", err);
        setLoading(false);
      });
  }, [categoryFilter]); // Se déclenche dès que la catégorie dans l'URL change

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#FDFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tighter text-[#3D332D]">
            {categoryFilter ? categoryFilter : "Tous les Talents"}
            <span className="text-[#E8603C]">.</span>
          </h1>
          <p className="text-[#3D332D]/40 font-black uppercase text-xs tracking-widest mt-4">
            {services.length} services trouvés sur le campus
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-[#E8603C] border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;