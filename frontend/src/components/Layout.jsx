import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    // Utilisation de la nouvelle couleur ventura-cream pour le fond global
    <div className="min-h-screen bg-ventura-cream font-sans selection:bg-ventura-accent selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* Placeholder pour Home, About, etc. */}
        <Outlet /> 
      </main>
      {/* Ton footer peut aussi être ici s'il est commun à toutes les pages */}
    </div>
  );
};

export default Layout;