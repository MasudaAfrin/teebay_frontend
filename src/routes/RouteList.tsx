import { Routes, Route } from "react-router-dom";
import {  BaseLayout } from "../layout";
import Login from "../pages/Login";

const RouteList = () => {
  return (
      <Routes>
        <Route path="/" element={<BaseLayout />}>
            <Route
                path="/login"
                element={<Login />}
            />
        </Route>
      </Routes>
  )
}

export default RouteList;
