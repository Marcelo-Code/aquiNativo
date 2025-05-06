import React from "react";
import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { Icons } from "../../../../assets/Icons";
import { buttonColor, hoverButtonColor } from "../../../../utils/helpers";
import "./productsList.css";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";

const addRemoveButtonStyle = {
  width: 28,
  height: 28,
  color: "white",
  backgroundColor: buttonColor,
  "&:hover": {
    backgroundColor: hoverButtonColor,
  },
};

export const ProductsList = (productsListProps) => {
  const {
    products,
    setProducts,
    addProduct,
    removeProduct,
    addProductToCart,
    ...generalBarContainerProps
  } = productsListProps;

  return (
    <Box className="generalContainer">
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{`${products.length} productos disponibles`}</Box>
      <PaginationContainer items={products} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="generalList">
            {recordsToShow.map((product) => (
              <Card className="card" key={product.id}>
                <Box>
                  <CardMedia
                    className="cardMedia"
                    component="img"
                    height="240"
                    image="/images/foodImage.jpg"
                    alt="green iguana"
                  />
                  <CardActions className="cardActions">
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
                          onClick={() => removeProduct(product, setProducts)}
                          sx={addRemoveButtonStyle}
                        >
                          <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                        <Box>{product.counter}</Box>
                        <IconButton
                          aria-label="add product"
                          onClick={() => addProduct(product, setProducts)}
                          sx={addRemoveButtonStyle}
                        >
                          <Icons.AddIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      </Box>
                      <Button
                        onClick={() =>
                          addProductToCart(product, products, setProducts)
                        }
                        aria-label="add to cart"
                        startIcon={<Icons.AddShoppingCartIcon />}
                        size="small"
                        fullWidth
                        sx={{
                          marginTop: 2,
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
                  </CardActions>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "110px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      {product.brands.name}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      <b>Categoria: </b>
                      {product.categories.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      <b>Código: </b> {product.id}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ textAlign: "center", marginTop: "30px" }}
                  >
                    {currencyFormat(product.price)}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </PaginationContainer>
    </Box>
  );
};
