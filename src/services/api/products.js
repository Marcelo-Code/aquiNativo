import { supabaseClient } from "../config/config";

export const getProducts = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("description", { ascending: true });

    if (error) throw error;

    return { status: 200, message: "registros obtenidos con éxito", data };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registros",
      error,
    };
  }
};
