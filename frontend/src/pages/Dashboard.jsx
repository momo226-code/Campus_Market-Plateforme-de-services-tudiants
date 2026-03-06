import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services/mine");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/services", form);
      setForm({ title: "", description: "", price: "", category: "" });
      fetchServices();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Mon Dashboard</h1>

        <span className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-sm">
          {services.length} services
        </span>
      </div>

      {/* MES SERVICES */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 
                       hover:border-blue-500 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">
              {service.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {service.description}
            </p>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                {service.price} DH
              </span>

              <span className="text-xs text-gray-500">
                {service.category}
              </span>
            </div>

            <button
              onClick={() => handleDelete(service._id)}
              className="w-full bg-red-600/20 text-red-400 py-2 rounded-lg 
                         hover:bg-red-600 hover:text-white transition"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* AJOUT SERVICE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl max-w-3xl">

        <h2 className="text-2xl font-semibold mb-6">
          Ajouter un service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="title"
            placeholder="Titre"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 
                       focus:border-blue-500 focus:outline-none transition"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 
                       focus:border-blue-500 focus:outline-none transition"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              placeholder="Prix"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 
                         focus:border-blue-500 focus:outline-none transition"
            />

            <input
              name="category"
              placeholder="Catégorie"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 
                         focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg 
                       font-medium transition disabled:opacity-50"
          >
            {loading ? "Ajout en cours..." : "Ajouter"}
          </button>

        </form>
      </div>

    </div>
  );
};

export default Dashboard;