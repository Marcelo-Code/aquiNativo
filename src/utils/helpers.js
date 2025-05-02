export const generalBackGroundColor = "#6BCEBF";

export const buttonColor = "black";
export const hoverButtonColor = "#6BCEBF";

export const commonCurrencyFormat = (number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
};
