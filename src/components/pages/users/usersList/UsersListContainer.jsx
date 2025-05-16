import { useEffect, useState } from "react";
import { UsersList } from "./UsersList";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../../services/api/users";
import { Icons } from "../../../../assets/Icons";

export const UsersListContainer = () => {
  //hook para el array de pacientes
  const [users, setUsers] = useState([]);

  const [error, setError] = useState(null);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //Función para restaurar un usuario
  const handleUpdateUser = (userId) => {
    navigate(`/updateUsers/updateUser/${userId}`);
  };

  //Obtener usuarios
  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingContainer />;
  }
  if (error) {
    const errorContainerProps = {
      error: error.message,
    };
    console.log(errorContainerProps);
    return <ErrorContainer {...errorContainerProps} />;
  }

  const generalBarContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Usuario",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/users/createUser",
  };

  const usersListProps = {
    users,
    handleUpdateUser,
    ...generalBarContainerProps,
  };

  return <UsersList {...usersListProps} />;
};
