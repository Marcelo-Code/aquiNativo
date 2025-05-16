import { Box, Button, IconButton } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { buttonColor, hoverButtonColor } from "../../../../utils/helpers";
import { Icons } from "../../../../assets/Icons";

export const ProductDetail = (productDetailProps) => {
  const { product } = productDetailProps;
  return (
    <Box className="generalContainer">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "300px", height: "300px" }}
            />
          </Box>
          <Box>
            <ul>
              <li>{product.description}</li>
              <li>{currencyFormat(product.price)}</li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box className="actions" sx={{ width: "300px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
              padding: "4px",
              borderRadius: "20px",
              width: "60%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <IconButton
              aria-label="remove product"
              // onClick={() => removeProduct(product, setFilteredProducts)}
              // sx={addRemoveButtonStyle}
            >
              <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <Box>{product.counter}</Box>
            <IconButton
              aria-label="add product"
              // onClick={() => addProduct(product, setFilteredProducts)}
              // sx={addRemoveButtonStyle}
            >
              <Icons.AddIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
          <Button
            // onClick={() =>
            //   addProductToCart(
            //     product,
            //     filteredProducts,
            //     setFilteredProducts
            //   )
            // }
            aria-label="add to cart"
            startIcon={<Icons.AddShoppingCartIcon />}
            size="small"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: buttonColor,
              color: "white",
              "&:active": {
                backgroundColor: hoverButtonColor,
              },
            }}
          >
            Agregar
          </Button>
        </Box>
      </Box>

      <BackButtonContainer />
    </Box>
  );
};
