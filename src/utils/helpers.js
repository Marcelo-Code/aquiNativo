export const generalBackGroundColor = "#6BCEBF";
export const buttonColor = "black";
export const hoverButtonColor = "#6BCEBF";
export const deleteColor = "#E53935";

//Función para formatear el precio
export const commonCurrencyFormat = (number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
};

//Función para obtener opciones unicas y ordenadas
export const getUniqueSortedOptions = (items, key, initialOption = null) => {
  const path = key.split(".");

  const getValue = (item) =>
    path.reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : ""),
      item
    );

  const uniqueValues = Array.from(new Set(items.map(getValue))).sort((a, b) =>
    a?.toString().localeCompare(b?.toString(), "es", { sensitivity: "base" })
  );

  const options = uniqueValues.map((value) => ({
    value,
    label: value,
  }));

  return initialOption ? [initialOption, ...options] : options;
};

//Función para limpiar el nombre de un archivo, elimina los acentos y carácteres especiales
export const sanitizeFileName = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.-]/g, "_");
};
