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
    return { status: 500, message: "Error al iniciar sesion", error };
  }
};

//Función de logout
export const logout = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    return { status: 200, message: "Logout exitoso" };
  } catch (error) {
    return { status: 500, message: "Error al cerrar sesion", error };
  }
};

//FUnción para verificar si el usuario esta logueado
export const checkAuth = async (setIsloggedIn) => {
  const { data } = await supabaseClient.auth.getSession();

  if (data?.session) {
    setIsloggedIn(true);
    return { status: 200, message: "Sesion activa" };
  } else {
    setIsloggedIn(false);
    return { status: 401, message: "Sesion no activa" };
  }
};

export const updatePassword = async (newPassword, accessToken) => {
  try {
    const { error } = await supabaseClient.auth.updateUser(
      { password: newPassword },
      { access_token: accessToken }
    );
    if (error) throw error;
    return { status: 200, message: "Password actualizado" };
  } catch (error) {
    return {
      status: 500,
      message: error.message || "Error al actualizar password",
    };
  }
};
