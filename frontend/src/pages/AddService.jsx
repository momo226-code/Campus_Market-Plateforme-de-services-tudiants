import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.price) {
      return setError("Veuillez remplir tous les champs.");
    }

    try {
      setLoading(true);
      await API.post("/services", form);
      navigate("/");
    } catch (err) {
      setError("Erreur lors de l'ajout du service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-2xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

        <h2 className="text-2xl font-semibold mb-6">
          Ajouter un service
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Titre */}
          <div>
            <label className="text-sm text-gray-400">Titre</label>
            <input
              name="title"
              placeholder="Ex: Développement site web"
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Décrivez votre service..."
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Prix */}
          <div>
            <label className="text-sm text-gray-400">Prix (DH)</label>
            <input
              name="price"
              type="number"
              placeholder="500"
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="text-sm text-gray-400">Catégorie</label>
            <select
              name="category"
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            >
              <option value="">Choisir une catégorie</option>
              <option value="design">Design</option>
              <option value="development">Développement</option>
              <option value="marketing">Marketing</option>
              <option value="architecture">Architecture</option>
            </select>
          </div>

          {/* Bouton */}
          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Ajout en cours..." : "Ajouter le service"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddService;