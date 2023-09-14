import { Routes, Route } from "react-router-dom";
import {  BaseLayout } from "../layout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const RouteList = () => {
  return (
      <Routes>
        <Route path="/" element={<BaseLayout />}>
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
