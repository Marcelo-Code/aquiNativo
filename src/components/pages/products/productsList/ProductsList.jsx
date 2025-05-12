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
import {
  buttonColor,
  generalBackGroundColor,
  hoverButtonColor,
} from "../../../../utils/helpers";
import "./productsList.css";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";

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

export const ProductsList = (productsListProps) => {
  const {
    filteredProducts,
    setFilteredProducts,
    addProduct,
    removeProduct,
    addProductToCart,
    ...generalBarContainerProps
  } = productsListProps;

  return (
    <Box className="generalContainer">
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{`${filteredProducts.length} productos disponibles`}</Box>
      <PaginationContainer items={filteredProducts} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="generalList">
            {recordsToShow.map((product) => (
              <Card
                sx={{ boxShadow: "0px 0px 10px black" }}
                className="card"
                key={product.id}
              >
                <Box>
                  {product.image ? (
                    <CardMedia
                      className="cardMedia"
                      component="img"
                      image={`${product.image}?t=${Date.now()}`}
                      alt="producto"
                      sx={{
                        width: "100%",
                        height: "250px",
                        objectFit: "contain",
                        margin: "0 auto",
                        display: "block",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: "250px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Producto sin imagen
                    </Box>
                  )}
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
                          onClick={() =>
                            removeProduct(product, setFilteredProducts)
                          }
                          sx={addRemoveButtonStyle}
                        >
                          <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                        <Box>{product.counter}</Box>
                        <IconButton
                          aria-label="add product"
                          onClick={() =>
                            addProduct(product, setFilteredProducts)
                          }
                          sx={addRemoveButtonStyle}
                        >
                          <Icons.AddIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      </Box>
                      <Button
                        onClick={() =>
                          addProductToCart(
                            product,
                            filteredProducts,
                            setFilteredProducts
                          )
                        }
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
                      {product.categories.name}
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
