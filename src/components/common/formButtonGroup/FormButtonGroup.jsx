import { Box, Button } from "@mui/material";
import React from "react";
import { Icons } from "../../../assets/Icons";
import { buttonColor } from "../../../utils/helpers";

export const FormButtonGroup = (formButtonGroupProps) => {
  const { modifiedFlag, isLoadingButton, handleGoBack } = formButtonGroupProps;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, margin: "10px" }}>
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <Button
            fullWidth
            type="submit"
            loading={isLoadingButton}
            size="small"
            variant="contained"
            startIcon={<Icons.SaveIcon />}
            disabled={!modifiedFlag}
            sx={{ backgroundColor: `${buttonColor}` }}
          >
            Guardar
          </Button>
        </Box>
        <Box sx={{ flex: 2, minWidth: "200px" }}>
          <Button
            onClick={() => handleGoBack(modifiedFlag)}
            size="small"
            fullWidth
            sx={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
            }}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
