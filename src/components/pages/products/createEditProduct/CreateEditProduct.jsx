import {
  Box,
  CircularProgress,
  Collapse,
  FormGroup,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { FormButtonGroupContainer } from "../../../common/formButtonGroup/FormButtonGroupContainer";
import {
  buttonColor,
  deleteColor,
  generalBackGroundColor,
} from "../../../../utils/helpers";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { Loading } from "../../loading/Loading";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";

import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const CreateEditProduct = (createEditProductProps) => {
  const {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    brands,
    categories,
    handleChange,
    formData,
    handleSubmit,
    createdProduct,
    fileInputRef,
    handleFileChange,
    handleUploadImage,
    handleDeleteImage,
    isLoadingImage,
    productId,
  } = createEditProductProps;

  const formButtonGroupContainerProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
  };

  const elementStyle = {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    gap: "10px",
  };

  const [openImageDialog, setOpenImageDialog] = useState(false);

  return (
    <Box className="generalContainer">
      {/* Contenedor del formulario */}
      {(!createdProduct || productId) && (
        <>
          <Box className="generalTitle">
            {productId ? "Editar producto" : "Crear nuevo producto"}
          </Box>
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Box sx={elementStyle}>
                  <Icons.DescriptionIcon />
                  <TextField
                    sx={{
                      pr: 2,
                    }}
                    id="outlined-basic"
                    label="Descripción"
                    variant="outlined"
                    name="description"
                    onChange={handleChange}
                    required
                    value={formData.description}
                    multiline
                    rows={3}
                    fullWidth
                    InputProps={{
                      sx: {
                        alignItems: "center",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: `${generalBackGroundColor}`, // borde al enfocar
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "gray", // color normal
                        "&.Mui-focused": {
                          color: `${buttonColor}`, // color al enfocar
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={elementStyle}>
                  <Icons.MonetizationOnIcon />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Precio"
                    variant="outlined"
                    name="price"
                    onChange={handleChange}
                    required
                    value={formData.price}
                    fullWidth
                    sx={{
                      pr: 2,
                      "& label": {
                        top: "-5px",
                        color: "gray", // color normal
                      },
                      "& label.Mui-focused": {
                        color: `${buttonColor}`, // color al enfocar
                      },
                      "& .MuiOutlinedInput-root": {
                        height: 43,
                        alignItems: "center",
                        "& fieldset": {
                          borderColor: "gray", // borde normal
                        },
                        "&:hover fieldset": {
                          borderColor: "black", // hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: `${generalBackGroundColor}`, // borde al enfocar
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={elementStyle}>
                  <Icons.InventoryIcon />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Stock"
                    variant="outlined"
                    name="stock"
                    onChange={handleChange}
                    required
                    value={formData.stock}
                    fullWidth
                    sx={{
                      pr: 2,
                      "& label": {
                        top: "-5px",
                        color: "gray", // color normal
                      },
                      "& label.Mui-focused": {
                        color: `${buttonColor}`, // color al enfocar
                      },
                      "& .MuiOutlinedInput-root": {
                        height: 43,
                        alignItems: "center",
                        "& fieldset": {
                          borderColor: "gray", // borde normal
                        },
                        "&:hover fieldset": {
                          borderColor: "black", // hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: `${generalBackGroundColor}`, // borde al enfocar
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={elementStyle}>
                  <Icons.DescriptionIcon />
                  <OptionSelect
                    getOptionLabel={(option) => `${option.name}`}
                    name="brand_id"
                    placeholder="Seleccionar marca"
                    clients={brands}
                    value={formData.brand_id}
                    onChange={handleChange}
                    label={"Marca"}
                    required
                  />
                </Box>
                <Box sx={elementStyle}>
                  <Icons.DescriptionIcon />
                  <OptionSelect
                    getOptionLabel={(option) => `${option.name}`}
                    name="category_id"
                    placeholder="Seleccionar categoría"
                    clients={categories}
                    value={formData.category_id}
                    onChange={handleChange}
                    label={"Categoría"}
                    required
                  />
                </Box>
                <FormButtonGroupContainer {...formButtonGroupContainerProps} />
              </FormGroup>
            </form>
          </Box>
        </>
      )}
      {/* Contenedor de imagenes */}
      {(createdProduct || productId) && (
        <>
          <Box className="generalTitle">Carga de imagenes</Box>
          {!productId && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              <Typography>
                <b>Descripción: </b>
                {formData.description}
              </Typography>
              <Typography sx={{ paddingBottom: "5px" }}>
                <b>Precio: </b>
                {currencyFormat(formData.price)}
              </Typography>
              <Typography>
                <b>Stock: </b>
                {formData.stock}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              mt: 2,
              width: "100%",
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "300px",
                height: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `3px solid ${generalBackGroundColor}`,
                borderRadius: "5px",
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            >
              {isLoadingImage && (
                <CircularProgress sx={{ color: generalBackGroundColor }} />
              )}
              {!formData.image && !isLoadingImage && (
                <Box sx={{ fontSize: "20px" }}>Sin imagen</Box>
              )}
              {formData.image && !isLoadingImage && (
                // Muestra la imagen actualizada, siempre llamando a una URL distinta
                // para evitar que se cargue la almacenada en el caché del navegador
                <img
                  src={`${formData.image}?t=${Date.now()}`}
                  alt="Producto"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenImageDialog(true)}
                />
              )}
            </Box>
            <Dialog
              open={openImageDialog}
              onClose={() => setOpenImageDialog(false)}
              maxWidth="md"
              fullWidth
              sx={{ maxHeight: "90vh" }}
            >
              <DialogContent
                sx={{
                  position: "relative",
                  backgroundColor: "black",
                  p: 2,
                }}
              >
                <IconButton
                  onClick={() => setOpenImageDialog(false)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "white",
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={`${formData.image}?t=${Date.now()}`}
                  alt="Producto ampliado"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </DialogContent>
            </Dialog>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {/* Llama a la función de carga de archivos */}
              <Tooltip title="Eliminar imagen" placement="top-end" arrow>
                <IconButton onClick={() => handleDeleteImage("image")}>
                  <Icons.DeleteIcon
                    sx={{ fontSize: "30px", color: deleteColor }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Subir imagen" placement="top-end" arrow>
                <IconButton onClick={() => handleUploadImage("image")}>
                  <Icons.UploadIcon sx={{ fontSize: "30px", color: "gray" }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Abre el selector de archivos */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <BackButtonContainer />
          </Box>
        </>
      )}
    </Box>
  );
};
