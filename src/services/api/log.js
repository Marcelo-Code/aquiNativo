import { supabaseClient } from "../config/config";

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

export const logout = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    return { status: 200, message: "Logout exitoso" };
  } catch (error) {
    return { status: 500, message: "Error al cerrar sesion", error };
  }
};
