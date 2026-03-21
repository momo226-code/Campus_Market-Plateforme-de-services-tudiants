import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Send, Sparkles } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `/services?category=${encodeURIComponent(selectedCategory)}`
      : "/services";

    API.get(url)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSending(true);
    try {
      await API.post("/feedbacks", {
        comment: feedbackText,
        userName: "Explorateur UM6P",
        rating: 5,
      });
      alert("Feedback envoyé ✨");
      setFeedbackText("");
    } catch {
      alert("Erreur backend");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen text-[#3D332D] overflow-x-hidden">

      {/* 🔥 BACKGROUND WOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF9] via-white to-[#FAEADE]" />

        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[#E8603C]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-[#7A9E7E]/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-[#F2C94C]/10 rounded-full blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3D332D 1px, transparent 1px),
              linear-gradient(to bottom, #3D332D 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* HERO */}
      <section className="pt-32 pb-20 text-center">
        <h1 className="text-7xl font-black tracking-tight">
          VEN<span className="text-[#C59473]">T</span>URA
          <span className="text-[#E8603C]">.</span>
        </h1>

        <p className="mt-6 text-lg opacity-70">
          La marketplace des talents UM6P
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/add-service"
            className="bg-[#3D332D] text-white px-6 py-3 rounded-xl"
          >
            Proposer
          </Link>

          <Link
            to="/marketplace"
            className="border border-[#7A9E7E] px-6 py-3 rounded-xl"
          >
            Explorer
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold mb-10">
          {selectedCategory || "Services récents"}
        </h2>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        )}
      </section>

      {/* FEEDBACK */}
      <section className="py-20 px-6">
        <form
          onSubmit={handleSendFeedback}
          className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow"
        >
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            placeholder="Ton avis..."
          />

          <button className="bg-[#E8603C] text-white px-6 py-3 rounded-lg w-full">
            {isSending ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </section>

    </div>
  );
};

export default Home;
