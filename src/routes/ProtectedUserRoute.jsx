import { useEffect, useState } from "react";
import { supabaseClient } from "../services/config/config";
import { LoadingContainer } from "../components/pages/loading/LoadingContainer";
import { DeniedAccessContainer } from "../components/pages/deniedAccess/DeniedAccessContainer";

export const ProtectedUserRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = aún cargando

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabaseClient.auth.getSession();

      if (data?.session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <LoadingContainer />;

  return isAuthenticated ? children : <DeniedAccessContainer />;
};
