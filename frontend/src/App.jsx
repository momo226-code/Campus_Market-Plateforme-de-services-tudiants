import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart"; // 👈 1. Import de la nouvelle page Panier
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* --- Routes publiques --- */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} /> {/* 👈 2. Route Panier ajoutée */}

        {/* --- Routes privées (Sécurisées) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="edit-service/:id" element={<EditService />} /> 
        </Route>
      </Route>
    </Routes>
  );
}

export default App;