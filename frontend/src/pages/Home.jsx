import { useEffect, useState } from "react";
import API from "../services/api";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

       <Navbar />

{/* Background glow amélioré */}
<div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none"></div>
<div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none"></div>
      {/* HERO */}
      <section className="pt-32 pb-24 text-center px-6 relative">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Marketplace étudiante
          <br />
          <span className="text-blue-500">du campus</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
          Découvrez les services proposés par les étudiants et valorisez
          vos talents au sein de la communauté universitaire.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-medium transition shadow-lg"
          >
            Devenir prestataire
          </Link>

          <Link
            to="#services"
            className="border border-slate-700 hover:bg-slate-800 px-8 py-3 rounded-full transition"
          >
            Explorer les services
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="max-w-7xl mx-auto px-6 pb-32 relative"
      >
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Services disponibles
        </h2>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucun service disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* CTA FINAL */}
      <section className="bg-slate-900 py-20 text-center border-t border-slate-800">
        <h2 className="text-3xl font-semibold mb-4">
          Vous avez un talent à partager ?
        </h2>

        <p className="text-gray-400 mb-8">
          Rejoignez Campus Market et commencez à proposer vos services dès aujourd'hui.
        </p>

        <Link
          to="/dashboard"
          className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full font-medium transition shadow-lg"
        >
          Commencer maintenant
        </Link>
      </section>

    </div>
  );
};

export default Home;