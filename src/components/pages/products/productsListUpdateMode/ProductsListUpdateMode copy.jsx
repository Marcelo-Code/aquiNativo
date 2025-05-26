import React from "react";
import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { Icons } from "../../../../assets/Icons";
import "./aaa.css";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";
import { Edit, Inventory2 } from "@mui/icons-material";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";

export const ProductsListUpdateModeCopy = ({
  products,
  handleDeleteProduct,
  handleUpdateProduct,
  ...generalBarContainerProps
}) => {
  return (
    <Box className="generalContainer">
      <Typography variant="h5" className="generalTitle">
        Edición de productos
      </Typography>

      <GeneralBarContainer {...generalBarContainerProps} />

      <Typography variant="subtitle1" className="generalSubTitle">
        {`${products.length} productos disponibles`}
      </Typography>

      <PaginationContainer items={products} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="generalList" sx={{ alignItems: "stretch" }}>
            {recordsToShow.map((product) => (
              <Card
                key={product.id}
                sx={{
                  maxWidth: "400px",
                  minWidth: "300px",
                  minHeight: "300px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "box-shadow 0.2s ease-in-out",
                  boxShadow: 3,

                  "&:hover": {
                    boxShadow: 5,
                    "& .edit-button": {
                      opacity: 1,
                      left: "80px",
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 0,
                    "&:last-child": { pb: 0 },
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      height: "100%",
                    }}
                  >
                    {/* Product Image - Small thumbnail */}
                    <Box
                      sx={{
                        position: "relative",
                        width: 100,
                        height: "auto",
                        flexShrink: 0,
                        bgcolor: "grey.50",
                        borderRadius: 1,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {product.image ? (
                        <img
                          src={`${product.image}?t=${Date.now()}`}
                          alt={product.description || "Producto"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "4px",
                          }}
                        />
                      ) : (
                        <Inventory2 sx={{ color: "grey.400", fontSize: 24 }} />
                      )}

                      {/* Inactive overlay for thumbnail */}
                      {!product.active && (
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Chip
                            label="INACTIVO"
                            color="error"
                            size="small"
                            sx={{ fontSize: "12px" }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Product Info - Main content */}

                    {/* Product name and status */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 1,
                        height: "100%",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="h3"
                        sx={{
                          fontWeight: "medium",
                          color: "text.primary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "wrap",
                          flex: 1,
                          textAlign: "justify",
                        }}
                      >
                        {product.description}
                      </Typography>
                      {/* </Box> */}

                      {/* Brand, Category, and Code */}
                      {/* <Box
                        sx={{
                          flexDirection: "column",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      > */}
                      <Typography variant="body2" color="text.primary">
                        <strong>Marca:</strong> {product.brands?.name || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Categorías:</strong>{" "}
                        {product.products_categories.map((category) => (
                          <Box
                            sx={{
                              display: "inline-block",
                              p: 0.7,
                              m: 0.5,
                              backgroundColor: generalBackGroundColor,
                              borderRadius: 5,
                              color: buttonColor,
                              fontSize: "12px",
                            }}
                          >
                            {category.categories.name}
                          </Box>
                        ))}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Código:</strong>
                        {product.id}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Oferta:</strong>
                        {product.special_offer}
                      </Typography>
                      {/* </Box> */}
                      {/* Price and Actions */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          flexShrink: 0,
                        }}
                      >
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              fontWeight: "bold",
                              color: "text.primary",
                            }}
                          >
                            {currencyFormat(product.price)}
                          </Typography>
                        </Box>

                        {/* Edit Button */}
                        <Tooltip title="Editar producto" placement="top">
                          <IconButton
                            className="edit-button"
                            onClick={() => handleUpdateProduct(product.id)}
                            sx={{
                              position: "absolute",
                              opacity: 0,
                              transition: "0.5s ease-in-out",
                              left: "0px" /* oculto fuera de la tarjeta */,
                              top: "10px" /* oculto fuera de la tarjeta */,
                              color: "grey.600",
                              "&:hover": {
                                color: "primary.main",
                                bgcolor: "grey.100",
                              },
                            }}
                            size="small"
                          >
                            <Edit sx={{ fontSize: 30 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </PaginationContainer>
    </Box>
  );
};
