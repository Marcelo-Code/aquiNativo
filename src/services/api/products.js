import { supabaseClient } from "../config/config";

export const getProducts = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*, categories: category_id(name), brands: brand_id(name)")
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

export const createProduct = async (product) => {
  try {
    const { data, error } = await supabaseClient
      .from("products")
      .insert([product]); // Se inserta como array de objetos

    if (error) throw error;

    return {
      status: 201,
      message: "Producto creado con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al crear el producto",
      error,
    };
  }
};
