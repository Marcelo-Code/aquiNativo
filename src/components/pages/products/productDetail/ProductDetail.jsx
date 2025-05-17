import { Box, Button, Card, IconButton } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import "./productDetail.css";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import {
  buttonColor,
  generalBackGroundColor,
  hoverButtonColor,
} from "../../../../utils/helpers";
import { Icons } from "../../../../assets/Icons";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";

export const ProductDetail = ({ product }) => {
  const addRemoveButtonStyle = {
    width: 28,
    height: 28,
    color: "white",
    backgroundColor: buttonColor,
    "&:active": {
      backgroundColor: generalBackGroundColor + " !important",
    },
    "&:hover": {
      backgroundColor: buttonColor,
    },
  };
  return (
    <Box className="generalContainer">
      <Box className="tarjeta">
        <Box className="productCard">
          <Box className="productCardImage">
            <img
              src={product.image}
              alt={product.name}
              className="productImage"
            />
          </Box>
          <Box className="productCardInfo">
            <ul>
              <li>{product.description}</li>
              <li>{currencyFormat(product.price)}</li>
            </ul>
            <Box className="productCardActions">
              <Box className="productActionsContent">
                <Box className="productCounter">
                  <IconButton
                    sx={addRemoveButtonStyle}
                    aria-label="remove product"
                  >
                    <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                  <Box>{product.counter}</Box>
                  <IconButton
                    sx={addRemoveButtonStyle}
                    aria-label="remove product"
                  >
                    <Icons.AddIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                </Box>
                <Button
                  aria-label="add to cart"
                  startIcon={<Icons.AddShoppingCartIcon />}
                  size="small"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    width: "100%",
                    backgroundColor: buttonColor,
                    color: "white",
                    "&:hover": {
                      backgroundColor: hoverButtonColor,
                    },
                  }}
                >
                  Agregar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <BackButtonContainer />
    </Box>
  );
};
