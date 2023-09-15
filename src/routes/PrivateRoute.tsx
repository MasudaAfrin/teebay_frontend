import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const auth = Cookies.get("token" || "");
  const result = auth ? <Outlet /> : <Navigate to="/login" />;
  return result;
};

export default PrivateRoutes;
