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
          <Box className="generalList" sx={{ alignItems: "stretch" }}>
            {recordsToShow.map((product) => (
              <Card
                sx={{
                  boxShadow: "0px 0px 10px black",
                }}
                className="card"
                key={product.id}
              >
                <Box className="cardImage">
                  <CardMedia
                    component="img"
                    image={
                      product.image
                        ? `${product.image}?t=${Date.now()}`
                        : "/images/logo2.png"
                    }
                    alt="producto"
                    sx={{
                      width: product.image ? "100%" : "80%",
                      height: product.image ? "250px" : "80%",
                      objectFit: "cover",
                      margin: product.image ? "0 auto" : "20px auto",
                      display: "block",
                      backgroundColor: "white",
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  component="div"
                  className="categoryBox"
                  sx={{
                    paddingLeft: "10px",
                  }}
                >
                  {product.products_categories.map((category, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: generalBackGroundColor,
                        borderRadius: "20px",
                        padding: "2px 10px 2px 10px",
                        width: "auto",
                        margin: "1px",
                        display: "inline-block",
                        color: "black",
                        fontSize: "12px",
                        textWrap: "nowrap",
                      }}
                    >
                      {category.categories.name}
                    </Box>
                  ))}
                </Typography>
                <Box className="cardText">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    {product.brands.name}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      textAlign: "justify",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    {product.description}
                  </Typography>

                  {product.special_offer?.trim() && (
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textAlign: "center", marginTop: "15px" }}
                    >
                      Oferta {product.special_offer}
                    </Typography>
                  )}
                  {product.previous_price && (
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      {currencyFormat(product.previous_price, true)}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "center",
                      marginBottom: "15px",
                    }}
                  >
                    {currencyFormat(product.price)}
                  </Typography>
                </Box>
                <CardActions className="cardActions">
                  <Box
                    sx={{
                      width: "250px",
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
                        type="button"
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
                        type="button"
                        aria-label="add product"
                        onClick={() => addProduct(product, setFilteredProducts)}
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
              </Card>
            ))}
          </Box>
        )}
      </PaginationContainer>
    </Box>
  );
};
