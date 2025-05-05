import { Box, FormGroup, TextField } from "@mui/material";
import React from "react";
import { Icons } from "../../../../assets/Icons";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { FormButtonGroupContainer } from "../../../common/formButtonGroup/FormButtonGroupContainer";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";

export const CreateEditProduct = (createEditProductProps) => {
  const {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    brands,
    categories,
    handleChange,
    formData,
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
  return (
    <Box className="generalContainer">
      <Box className="generalTitle">{"Crear nuevo producto"}</Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <form>
          <FormGroup>
            <Box sx={elementStyle}>
              <Icons.DescriptionIcon />
              <TextField
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
                // disabled={brand ? true : false}
              />
            </Box>
            <Box sx={elementStyle}>
              <Icons.DescriptionIcon />
              <OptionSelect
                getOptionLabel={(option) => `${option.name}`}
                name="category_id"
                placeholder="Seleccionar categoría"
                clients={categories}
                value={formData.category_Id}
                onChange={handleChange}
                label={"Categoría"}
                required
                // disabled={brand ? true : false}
              />
            </Box>
            <FormButtonGroupContainer {...formButtonGroupContainerProps} />
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
};
