import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { GeneralContext } from "../../../context/GeneralContext";
import { login } from "../../../services/api/log";

export const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, handleGoBack } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password)
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const loginProps = {
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleGoBack,
  };

  return <Login {...loginProps} />;
};
