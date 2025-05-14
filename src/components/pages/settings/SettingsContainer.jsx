import { useContext, useEffect, useState } from "react";
import { Settings } from "./Settings";
import { getTotalStorageAndDbSize } from "../../../services/api/generalFunctions";
import { LoadingContainer } from "../loading/LoadingContainer";
import { authToken } from "../../../services/config/config";
import { ErrorContainer } from "../error/ErrorContainer";
import { updatePassword } from "../../../services/api/log";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../utils/alerts";
import { GeneralContext } from "../../../context/GeneralContext";

export const SettingsContainer = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [settingsError, setSettingsError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [totalSize, setTotalSize] = useState({});

  const { handleGoBack } = useContext(GeneralContext);

  useEffect(() => {
    //Recupera el token de localStorage
    const checkToken = () => {
      const tokenData = localStorage.getItem(authToken);
      if (tokenData) {
        const parsedToken = JSON.parse(tokenData);
        setAccessToken(parsedToken.access_token);
        setIsLoading(false);
      } else {
        setTimeout(checkToken, 100); // Esperar 100ms y volver a intentar
      }
    };

    checkToken();
  }, [accessToken]);

  //Función para actualizar la contraseña
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    if (newPassword !== confirmPassword) {
      errorToastifyAlert("Las contraseñas no coinciden");
      return;
    }

    updatePassword(newPassword, accessToken)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.message);
        successToastifyAlert(response.message);
      })
      .catch((error) => {
        errorToastifyAlert(error.message);
      })
      .finally(() => setIsLoadingButton(false));
  };

  //Función para obtener el tamaño total
  useEffect(() => {
    setIsLoading(true);
    getTotalStorageAndDbSize()
      .then((response) => {
        setTotalSize(response.data);
      })
      .catch((error) => {
        setSettingsError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;
  if (settingsError) {
    const errorContainerProps = {
      error: settingsError.message,
    };
    console.log(errorContainerProps);
    return <ErrorContainer {...errorContainerProps} />;
  }

  const settingsProps = {
    totalSize,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    isLoadingButton,
    handleGoBack,
  };

  return <Settings {...settingsProps} />;
};
