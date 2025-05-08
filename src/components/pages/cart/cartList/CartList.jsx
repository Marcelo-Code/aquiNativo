import React from "react";
import {
  buttonColor,
  generalBackGroundColor,
  hoverButtonColor,
} from "../../../../utils/helpers";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../../assets/Icons";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";

export const CartList = (cartListProps) => {
  const {
    cart,
    removeProduct,
    addProduct,
    totalPrice,
    removeProductFromCart,
    handleContinue,
  } = cartListProps;
  const addRemoveButtonStyle = {
    width: 28,
    height: 28,
    color: "white",
    backgroundColor: buttonColor,
    "&:hover": {
      backgroundColor: hoverButtonColor,
    },
  };

  if (cart.length === 0)
    return (
      <Box className="generalContainer">
        <Box className="generalSubTitle">No hay productos en el carrito</Box>
        <BackButtonContainer />
      </Box>
    );
  return (
    <Box className="generalContainer">
      <Box className="generalSubTitle">
        Revisá tu compra, presioná el botón continuar para completar los datos
        de tu pedido:{" "}
      </Box>
      <Box className="generalList">
        <Box
          style={{
            overflowX: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: `1px solid ${generalBackGroundColor}`,
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <thead style={{ backgroundColor: generalBackGroundColor }}>
              <tr>
                <th style={{ padding: "5px" }}>Descripción</th>
                <th style={{ padding: "5px" }}>Cantidad</th>
                <th>Precio</th>
                <th style={{ padding: "5px" }}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td
                    style={{
                      minWidth: "120px",
                      WrapText: "wrap",
                      textAlign: "justify",
                      verticalAlign: "middle",
                    }}
                  >
                    {product.description}
                  </td>
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        border: "1px solid black",
                        padding: "4px",
                        borderRadius: "20px",
                        width: "100px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      <IconButton
                        aria-label="remove product"
                        onClick={() => removeProduct(product)}
                        sx={addRemoveButtonStyle}
                      >
                        <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                      <Box>{product.quantity}</Box>
                      <IconButton
                        aria-label="add product"
                        onClick={() => addProduct(product)}
                        sx={addRemoveButtonStyle}
                      >
                        <Icons.AddIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Box>
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      minWidth: "115px",
                      verticalAlign: "middle",
                    }}
                  >
                    {currencyFormat(product.price * product.quantity, "15px")}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <Tooltip
                      title="Eliminar producto"
                      placement="top-end"
                      arrow
                    >
                      <IconButton
                        onClick={() => removeProductFromCart(product)}
                      >
                        <Icons.DeleteIcon
                          color="error"
                          sx={{ fontSize: "30px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot style={{ border: `1px solid ${generalBackGroundColor}` }}>
              <tr>
                <td style={{ padding: "5px", textAlign: "center" }} colSpan={2}>
                  <b>Total:</b>
                </td>
                <td style={{ padding: "5px", textAlign: "right" }}>
                  {currencyFormat(totalPrice)}
                </td>
              </tr>
            </tfoot>
          </table>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            margin: "10px",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "300px" }}>
            <Button
              onClick={() => handleContinue()}
              fullWidth
              type="submit"
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: `${buttonColor}`,
                color: "white",
                "&:active": {
                  backgroundColor: generalBackGroundColor,
                  color: "white",
                  border: `1px solid white`,
                },
                "&.Mui-disabled": {
                  backgroundColor: " #d6d6d6",
                  border: `1px solid  #d6d6d6`,
                  color: "#a1a1a1",
                },
              }}
            >
              Continuar
            </Button>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "300px" }}>
            <Button
              // onClick={() => handleGoBack(modifiedFlag)}
              size="small"
              fullWidth
              sx={{
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                "&:active": {
                  backgroundColor: generalBackGroundColor,
                  color: "white",
                  border: `1px solid white`,
                },
              }}
            >
              Volver
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
