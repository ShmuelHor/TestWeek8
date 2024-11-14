import React from "react";
import Login from "./components/RegistrationAndLogin/Login";
import Register from "./components/RegistrationAndLogin/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRouteToken from "./components/PrivateRoute/PrivateRouteToken";
import WarPage from "./components/War/WarPage";

const App: React.FC = () => {

  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/war" element={<PrivateRouteToken><WarPage/></PrivateRouteToken>} />
        </Routes>
    </div>
  );
};

export default App;
