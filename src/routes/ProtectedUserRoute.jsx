import { useContext, useEffect } from "react";
import { LoadingContainer } from "../components/pages/loading/LoadingContainer";
import { DeniedAccessContainer } from "../components/pages/deniedAccess/DeniedAccessContainer";
import { GeneralContext } from "../context/GeneralContext";
import { checkAuth } from "../services/api/log";

export const ProtectedUserRoute = ({ children }) => {
  const {
    isLoggedIn = null,
    setIsLoggedIn,
    setLoggedUser,
  } = useContext(GeneralContext);

  //Verificar si el usuario esta logueado
  useEffect(() => {
    checkAuth(setIsLoggedIn, setLoggedUser);
  }, []);

  if (isLoggedIn === null) return <LoadingContainer />;

  return isLoggedIn ? children : <DeniedAccessContainer />;
};
