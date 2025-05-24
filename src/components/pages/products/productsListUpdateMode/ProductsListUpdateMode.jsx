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
import { deleteColor } from "../../../../utils/helpers";

export const ProductsListUpdateMode = (productsListProps) => {
  const {
    products,
    handleDeleteProduct,
    handleUpdateProduct,
    ...generalBarContainerProps
  } = productsListProps;

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
                  <Tooltip title="Editar producto" placement="top-end" arrow>
                    <IconButton
                      onClick={() => {
                        handleUpdateProduct(product.id);
                      }}
                    >
                      <Icons.EditIcon
                        sx={{ fontSize: "30px", color: "gray" }}
                      />
                    </IconButton>
                  </Tooltip>
                </CardActions>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    {product.image ? (
                      <Box
                        className="cardMedia"
                        sx={{
                          marginTop: 0,
                          width: "100%",
                          height: "250px",
                          position: "relative", // necesario para posicionar la marca de agua
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={`${product.image}?t=${Date.now()}`}
                          alt="producto"
                          style={{ width: "100%", maxHeight: "250px" }}
                        />
                        {/* Marca al agua, mensaje de inactividad */}
                        {!product.active && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              backgroundColor: "rgba(0,0,0,0.4)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "20px",
                              zIndex: 1,
                            }}
                          >
                            PRODUCTO INACTIVO
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: "250px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        Producto sin imagen
                      </Box>
                    )}

                    <Box
                      sx={{
                        textAlign: "left",
                        paddingLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <b>Marca: </b>
                      {product.brands.name}
                    </Box>

                    <Box
                      sx={{
                        textAlign: "left",
                        paddingLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {" "}
                      <b>Categoria: </b>
                      {product.categories.name}
                    </Box>
                    <Box
                      sx={{
                        textAlign: "left",
                        paddingLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {" "}
                      <b>Código: </b> {product.id}
                    </Box>

                    <Box
                      sx={{
                        textAlign: "left",
                        paddingLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {" "}
                      <b>Descripción: </b>
                      {product.description}
                    </Box>
                    <Box
                      sx={{
                        textAlign: "left",
                        paddingLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {" "}
                      <b>Oferta: </b>
                      {product.special_offer
                        ? product.special_offer
                        : "sin oferta"}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      fontSize: "20px",
                      padding: "10px",
                    }}
                  >
                    {currencyFormat(product.price)}
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </PaginationContainer>
    </Box>
  );
};
