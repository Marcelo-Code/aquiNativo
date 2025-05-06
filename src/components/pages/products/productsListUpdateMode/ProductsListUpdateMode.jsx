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
  Tooltip,
  Typography,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { Icons } from "../../../../assets/Icons";

import "./productsListUpdateMode.css";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";

export const ProductsListUpdateMode = (productsListProps) => {
  const { products, handleDeleteProduct, ...generalBarContainerProps } =
    productsListProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Edición de productos</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{`${products.length} productos disponibles`}</Box>
      <PaginationContainer items={products} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="generalList">
            {recordsToShow.map((product) => (
              <Card className="updateCard" key={product.id}>
                <CardActions className="updateCardActions">
                  <Tooltip title="Eliminar producto" placement="top-end" arrow>
                    <IconButton
                      onClick={() => {
                        handleDeleteProduct(product);
                      }}
                    >
                      <Icons.DeleteIcon
                        sx={{ fontSize: "30px", color: "#E53935" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar producto" placement="top-end" arrow>
                    <IconButton>
                      <Icons.EditIcon
                        sx={{ fontSize: "30px", color: "gray" }}
                      />
                    </IconButton>
                  </Tooltip>
                </CardActions>
                <Box>
                  <CardMedia
                    className="cardMedia"
                    component="img"
                    height="240"
                    image="/images/foodImage.jpg"
                    alt="green iguana"
                  />

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "110px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      <b>Marca: </b>
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
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      <b>Stock: </b> {product.stock}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      <b>Descripción: </b>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ textAlign: "center", marginTop: "40px" }}
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
