import { supabaseClient } from "../config/config";

export const getBrands = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("brands")
      .select("*")
      .order("name", { ascending: true });

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
