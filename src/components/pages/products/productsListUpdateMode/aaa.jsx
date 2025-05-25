"use client"
import { Card, CardContent, Chip, Typography, Box, IconButton, Tooltip } from "@mui/material"
import { Edit, Inventory2 } from "@mui/icons-material"

interface Product {
  id: string
  description: string
  price: number
  special_offer?: string
  image?: string
  active: boolean
  brands?: {
    name: string
  }
  categories?: {
    name: string
  }
}

interface ProductsListUpdateModeProps {
  products: Product[]
  handleUpdateProduct: (id: string) => void
  handleDeleteProduct?: (id: string) => void
}

const currencyFormat = (amount: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export default function ProductsListUpdateMode({
  products,
  handleUpdateProduct,
  handleDeleteProduct,
}: ProductsListUpdateModeProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
          Edición de productos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {products.length} productos disponibles
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              position: "relative",
              overflow: "hidden",
              transition: "box-shadow 0.2s ease-in-out",
              "&:hover": {
                boxShadow: 3,
                "& .edit-button": {
                  opacity: 1,
                },
              },
            }}
          >
            <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                {/* Product Image - Small thumbnail */}
                <Box
                  sx={{
                    position: "relative",
                    width: 64,
                    height: 64,
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
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "error.main",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Product Info - Main content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {/* Product name and status */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography
                          variant="body1"
                          component="h3"
                          sx={{
                            fontWeight: "medium",
                            color: "text.primary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                          }}
                        >
                          {product.description}
                        </Typography>
                        {!product.active && (
                          <Chip label="INACTIVO" color="error" size="small" sx={{ fontSize: "0.75rem" }} />
                        )}
                        {product.special_offer && (
                          <Chip
                            label={product.special_offer}
                            sx={{
                              bgcolor: "error.main",
                              color: "white",
                              fontSize: "0.75rem",
                              "&:hover": { bgcolor: "error.dark" },
                            }}
                            size="small"
                          />
                        )}
                      </Box>

                      {/* Brand, Category, and Code */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Marca:</strong> {product.brands?.name || "N/A"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Categoría:</strong> {product.categories?.name || "N/A"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Código:</strong> #{product.id}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Price and Actions */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "text.primary" }}>
                          {currencyFormat(product.price)}
                        </Typography>
                      </Box>

                      {/* Edit Button */}
                      <Tooltip title="Editar producto" placement="top">
                        <IconButton
                          className="edit-button"
                          onClick={() => handleUpdateProduct(product.id)}
                          sx={{
                            opacity: 0,
                            transition: "opacity 0.2s ease-in-out",
                            color: "grey.600",
                            "&:hover": {
                              color: "primary.main",
                              bgcolor: "grey.100",
                            },
                          }}
                          size="small"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {products.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Inventory2 sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
          <Typography variant="h6" component="h3" sx={{ fontWeight: "medium", color: "text.primary", mb: 1 }}>
            No hay productos disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agrega productos para comenzar a gestionarlos.
          </Typography>
        </Box>
      )}
    </Box>
  )
}
