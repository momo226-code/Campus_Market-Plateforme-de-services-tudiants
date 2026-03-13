import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      {/* Navbar fixe avec backdrop-blur déjà géré dans son composant */}
      <Navbar />

      {/* pt-24 : Padding adapté pour mobile (la navbar y est plus courte)
          md:pt-32 : On retrouve ton padding généreux sur ordinateur
          px-4 : Marges de sécurité sur les côtés
          overflow-x-hidden : Sécurité contre les débordements horizontaux
      */}
      <main className="pt-24 md:pt-32 pb-10 px-4 md:px-6 max-w-7xl mx-auto overflow-x-hidden">
        <div className="animate-in fade-in duration-500">
           <Outlet /> 
        </div>
      </main>

      {/* On pourrait imaginer un petit message de bas de page ici */}
    </div>
  );
};

export default Layout;