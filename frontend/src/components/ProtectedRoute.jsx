import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location }} 
      />
    );
  }

  // SI children existe (usage classique), on affiche children.
  // SINON (usage parent de route), on affiche <Outlet />.
  return children ? children : <Outlet />;
};

export default ProtectedRoute;