import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import { BaseLayout } from "../layout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProductCreate from "../pages/products/Create";
import ProductList from "../pages/products/List";
import ProductEdit from "../pages/products/Edit";
import ProductBrowse from "../pages/browse-products/List";
import MyProducts from "../pages/browse-products/MyProducts";
import ProductDetails from "../pages/browse-products/Details";

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
          <Route
            path="/products/browse"
            element={<ProductBrowse />}
          />
          <Route
            path="/products/my-products"
            element={<MyProducts />}
          />
          <Route
            path="/products/details/:id"
            element={<ProductDetails />}
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
