import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import { BaseLayout } from "../layout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProductCreate from "../pages/products/Create";
import ProductList from "../pages/products/List";
import ProductEdit from "../pages/products/Edit";

const RouteList = () => {
  return (
    <Routes>
      <Route path="" element={<BaseLayout />}>
        <Route path='/' element={<PrivateRoutes />}>
          <Route
            index
            element={<ProductList />}
          />
          <Route
            path="/products/create"
            element={<ProductCreate />}
          />
          <Route
            path="/products/edit/:id"
            element={<ProductEdit />}
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
