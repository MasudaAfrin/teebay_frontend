import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import { BaseLayout } from "../layout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProductCreate from "../pages/products/Create";

const RouteList = () => {
  return (
    <Routes>
      <Route path="" element={<BaseLayout />}>
        <Route path='/*' element={<PrivateRoutes />}>
          <Route
            index
            // path="/products/create"
            element={<ProductCreate />}
          />
        </Route>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Registration />}
        />
      </Route>
    </Routes>
  )
}

export default RouteList;
