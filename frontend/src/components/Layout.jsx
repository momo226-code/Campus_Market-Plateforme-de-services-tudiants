import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * Layout global.
 *
 * IMPORTANT : on ne met PAS de pt-* ici.
 * Chaque page gère son propre padding-top pour s'adapter à la hauteur
 * de la Navbar (h-16 mobile / h-20 sm / h-24 md).
 *
 * Règle à respecter dans chaque page :
 *   pt-20    (mobile  — navbar h-16 + marge 4)
 *   sm:pt-24 (sm      — navbar h-20 + marge 4)
 *   md:pt-28 (md+     — navbar h-24 + marge 4)
 *
 * Home.jsx a son propre pt hero plus grand, donc elle dépasse ces valeurs.
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF9]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;