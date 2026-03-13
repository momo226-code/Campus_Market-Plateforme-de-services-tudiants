import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace"; // 👈 Import
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="marketplace" element={<Marketplace />} /> {/* 👈 Nouvelle Route */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="edit-service/:id" element={<EditService />} /> 
        </Route>
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;