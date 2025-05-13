import { bucketName, supabaseClient } from "../config/config";
import { updateProduct } from "./products";

//Funcion para subir un archivo
export const uploadImage = async (
  file,
  documentName,
  formData
  //   setUploadingDocumentName,
) => {
  //   setUploadingDocumentName(documentName);

  console.log(formData);

  try {
    if (!file || !file.name) {
      throw new Error("Archivo inválido");
    }
    //define la extensión del archivo
    const extension = file.name.split(".").pop();

    //Define el nombre del archivo
    const fileName = `${documentName}_${formData.id}.${extension}`;

    console.log("📁 Intentando subir archivo:");
    console.log("bucketName:", bucketName);
    console.log("fileName:", fileName);
    console.log("file.name:", file.name);
    console.log("file.size:", file.size);
    console.log("file.type:", file.type);

    // Sube el archivo a Supabase
    const { error: uploadError } = await supabaseClient.storage
      .from(bucketName)
      .upload(fileName, file, {
        //Tiempo de vida del archivo en el cache
        cacheControl: "0",

        //Sobreescribe el archivo en caso de que ya exista
        upsert: true,
        contentType: file.type || "image/webp", // 👈 línea agregada
      });

    if (uploadError) throw uploadError;

    //Obtiene la URL pública del archivo subido
    const { data: publicData } = supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    //Ejecuta la función de actualizar paciente
    if (publicData.publicUrl) {
      //Reemplaza %20 por un espacio
      const decodedUrl = decodeURIComponent(publicData.publicUrl);

      if (!publicData)
        throw new Error("No se pudo obtener la URL pública del archivo");

      const updatedRecord = {
        ...formData,
        [documentName]: decodedUrl,
      };

      //Actualiza el registro correspondiente
      const response = await updateProduct(updatedRecord);
      return response;
    }
  } catch (error) {
    console.error("Error al cargar archivo:", error);
  }
};

//Funcion para eliminar un archivo
export const deleteImage = async (documentName, formData) => {
  try {
    const currentUrl = formData[documentName];
    if (!currentUrl)
      throw new Error("No se encontró una URL válida en formData");

    // Obtener extensión desde la URL
    const extension = currentUrl.split(".").pop();

    // Reconstruir el nombre del archivo como en uploadDocument
    const fileName = `${documentName}_${formData.id}.${extension}`;

    // Eliminar archivo del bucket (requiere un array)
    const { error: deleteError } = await supabaseClient.storage
      .from(bucketName)
      .remove([fileName]);

    if (deleteError) throw deleteError;

    // Actualiza el formData (deja ese campo vacío)
    const updatedRecord = {
      ...formData,
      [documentName]: "",
    };

    await updateProduct(updatedRecord);

    console.log("Archivo eliminado correctamente:", fileName);
    return { success: true, file: fileName };
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return { success: false, error };
  }
};
