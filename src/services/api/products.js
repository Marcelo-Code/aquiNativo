import { errorToastifyAlert, successToastifyAlert } from "../../utils/alerts";
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
    const { error } = await supabaseClient.from("products").insert([product]);

    if (error) throw error;

    const { data: fetched, error: fetchError } = await supabaseClient
      .from("products")
      .select("*")
      .order("id", { ascending: false })
      .limit(1);

    if (fetchError) throw fetchError;

    return {
      status: 201,
      message: "Producto creado con éxito",
      data: fetched[0],
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al crear el producto",
      error,
    };
  }
};

export const getProduct = async (productId) => {
  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .eq("id", productId);
    if (error) throw error;

    return {
      status: 200,
      message: "Registro obtenido con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registro",
      error: error.message,
    };
  }
};

export const updateProduct = async (updatedProduct) => {
  try {
    const { id, ...fieldsToUpdate } = updatedProduct;

    console.log(fieldsToUpdate, id);

    const { data, error } = await supabaseClient
      .from("products")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) throw error;

    successToastifyAlert(`Producto actualizado con éxito`);

    console.log(id);

    console.log(data);

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    errorToastifyAlert("Error al actualizar registro");

    return {
      status: 400,
      message: "Error al actualizar registro",
      error: error.message,
    };
  }
};
