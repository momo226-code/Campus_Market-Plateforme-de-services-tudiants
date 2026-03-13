import { useNavigate } from "react-router-dom";

const AddService = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-40">
      <h1 className="text-3xl font-bold text-black mb-4">Page AddService Détectée !</h1>
      <button 
        onClick={() => navigate("/dashboard")}
        className="bg-[#C59473] text-white px-6 py-2 rounded-xl"
      >
        Retour au Dashboard
      </button>
    </div>
  );
};

export default AddService;