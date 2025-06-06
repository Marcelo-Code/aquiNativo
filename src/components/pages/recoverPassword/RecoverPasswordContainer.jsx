import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoverPassword } from "./RecoverPassword";
import { supabaseClient } from "../../../services/config/config";

export const RecoverPasswordContainer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/updatePassword`, // Added a dummy query parameter
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage(
          "Se ha enviado un enlace de restablecimiento a tu correo electrónico."
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const recoverPasswordProps = {
    handleGoBack,
    handleRecoverPassword,
    email,
    setEmail,
    error,
    successMessage,
  };

  return <RecoverPassword {...recoverPasswordProps} />;
};
