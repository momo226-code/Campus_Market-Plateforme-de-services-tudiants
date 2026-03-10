import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* La Navbar est en 'fixed', elle flotte au-dessus du reste */}
      <Navbar />

      {/* Le 'pt-32' (padding-top) est crucial ici : 
          Ta Navbar fait environ 80-90px de haut + les marges. 
          Sans ce padding, ton contenu (Home, Login) commencerait tout en haut, caché sous la barre.
      */}
      <main className="pt-32 pb-10 container mx-auto px-4 md:px-6">
        <div className="animate-fadeIn">
           <Outlet /> 
        </div>
      </main>

      {/* Tu pourrais ajouter un Footer ici plus tard */}
    </div>
  );
};

export default Layout;