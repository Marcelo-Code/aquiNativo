import { supabaseClient } from "../config/config";

export const getProducts = async () => {
  try {
    const { data } = await supabaseClient
      .from("products")
      .select("*")
      .order("description", { ascending: true });

    return { status: 200, message: "registros obtenidos con éxito", data };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registros",
      error,
    };
  }
};
