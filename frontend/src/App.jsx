import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Marketplace from "./pages/Marketplace";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Routes publiques */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="cart" element={<Cart />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="add-service" element={<AddService />} />
          <Route path="edit-service/:id" element={<EditService />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;