import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-white tracking-wide">
          <span className="text-blue-500">VENT</span>URA
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">

      
      
          {!token && (
            <>
              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Connexion
              </Link>

              
            </>
          )}

          {token && (
            <>
              <Link
                to="/dashboard"
                className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white transition shadow-md"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition"
              >
                Déconnexion
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;