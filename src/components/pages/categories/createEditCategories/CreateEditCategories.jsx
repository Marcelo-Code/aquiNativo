import {
  Box,
  CircularProgress,
  FormGroup,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { FormButtonGroupContainer } from "../../../common/formButtonGroup/FormButtonGroupContainer";
import {
  buttonColor,
  deleteColor,
  generalBackGroundColor,
} from "../../../../utils/helpers";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";

import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const CreateEditCategories = (createEditProps) => {
  const {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    categoryId,
  } = createEditProps;

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
    width: "90%",
  };

  console.log(formData);

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">
        {categoryId ? "Editar categoría" : "Crear nueva categoria"}
      </Box>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Box sx={elementStyle}>
              <Icons.DescriptionIcon />
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                name="name"
                onChange={handleChange}
                required
                value={formData.name}
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
                  shrink: true, // ← fuerza el label flotante
                  sx: {
                    color: "gray", // color normal
                    "&.Mui-focused": {
                      color: `${buttonColor}`, // color al enfocar
                    },
                  },
                }}
              />
            </Box>
            <FormButtonGroupContainer {...formButtonGroupContainerProps} />
          </Box>
        </FormGroup>
      </form>
    </Box>
  );
};
