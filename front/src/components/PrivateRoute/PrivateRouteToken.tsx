import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteTokenProps {
  children: ReactNode;
}
const PrivateRouteToken: React.FC<PrivateRouteTokenProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const ifHaveToken = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      return true;
    }
    return false;
  };
  const token: boolean = ifHaveToken();
  console.log("token", token);
  useEffect(() => {
    setTimeout(() => {
      if (token) {
        setIsLoading(false);
      } else {
        navigate("/");
      }
    }, 1500);
  }, []);

  return <>{isLoading ? <h1>Loading...</h1> : children}</>;
};

export default PrivateRouteToken;
