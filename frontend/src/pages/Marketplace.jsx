import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ServiceCard from "../components/ServiceCard";

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // Récupère "Cuisine" depuis ?category=Cuisine
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category ? `/services?category=${encodeURIComponent(category)}` : "/services";
    
    API.get(url)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black mb-10">
        {category ? `Services : ${category}` : "Tous les services"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? <p>Chargement...</p> : services.map(s => <ServiceCard key={s._id} service={s} />)}
      </div>
    </div>
  );
};

export default Marketplace;