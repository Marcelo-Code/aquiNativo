/* eslint-disable no-useless-catch */
import { getInitials } from "../../utils/helpers";
import { supabaseClient } from "../config/config";

//Función de login
export const login = async (email, password) => {
  try {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;
    return { status: 200, message: "Login exitoso" };
  } catch (error) {
    return { status: 500, message: `Error en el login:  ${error.message}` };
  }
};

//Función de logout
export const logout = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    return { status: 200, message: "Logout exitoso" };
  } catch (error) {
    return { status: 500, message: `Error al cerrar sesion ${error}` };
  }
};

//FUnción para verificar si el usuario esta logueado
export const checkAuth = async (setIsloggedIn, setLoggedUser) => {
  try {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) throw new Error("Error al obtener la sesión");

    //Obtiene la sesión
    if (!data?.session) {
      setIsloggedIn(false);
      setLoggedUser("");
      throw new Error("Sesión no activa");
    }

    //Obtiene el email de la sesión
    const email = data.session.user.email;

    //Obtiene los datos del usuario a partir del email
    const { data: userData, error: userError } = await supabaseClient
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError) throw new Error("Error al obtener usuario: ");

    //Si el usuario no esta activo no deja hacer el login
    if (userData.active === false) {
      setIsloggedIn(false);
      setLoggedUser("");
      throw new Error();
    }

    const userInitials = getInitials(userData.name, userData.last_name);

    //Obtiene los datos del usuario
    setLoggedUser(userInitials);
    setIsloggedIn(true);

    return { status: 200, message: "Sesión activa" };
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { status: 200, message: "Contraseña actualizada" };
  } catch (error) {
    return {
      status: 500,
      message: error.message || "Error al actualizar contraseña",
    };
  }
};
