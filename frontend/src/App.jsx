import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* --- ROUTES PUBLIQUES --- */}
        {/* La Home gère maintenant tout : affichage global ET filtrage par catégorie */}
        <Route index element={<Home />} />
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />

        {/* --- ROUTES PRIVÉES (SÉCURISÉES) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-service" element={<AddService />} />
          {/* L'id est nécessaire pour savoir quel service modifier dans ton Studio */}
          <Route path="edit-service/:id" element={<EditService />} /> 
        </Route>
      </Route>

      {/* Route de secours si l'utilisateur tape une adresse inexistante */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;