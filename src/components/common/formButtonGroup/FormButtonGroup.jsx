import { Box, Button } from "@mui/material";
import React from "react";
import { Icons } from "../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";

export const FormButtonGroup = (formButtonGroupProps) => {
  const {
    modifiedFlag,
    isLoadingButton,
    handleGoBack,
    buttonText = "Guardar",
    startIcon = <Icons.SaveIcon />,
  } = formButtonGroupProps;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
        margin: "10px",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "300px" }}>
        <Button
          fullWidth
          type="submit"
          loading={isLoadingButton}
          size="small"
          variant="outlined"
          startIcon={startIcon}
          disabled={!modifiedFlag}
          sx={{
            backgroundColor: `${buttonColor}`,
            color: "white",
            "&:active": {
              backgroundColor: generalBackGroundColor,
              color: "white",
              border: `1px solid white`,
            },
            "&.Mui-disabled": {
              backgroundColor: " #d6d6d6",
              border: `1px solid  #d6d6d6`,
              color: "#a1a1a1",
            },
          }}
        >
          {buttonText}
        </Button>
      </Box>
      <Box sx={{ width: "100%", maxWidth: "300px" }}>
        <Button
          onClick={() => handleGoBack(modifiedFlag)}
          size="small"
          fullWidth
          sx={{
            color: "black",
            backgroundColor: "white",
            border: "1px solid black",
            "&:active": {
              backgroundColor: generalBackGroundColor,
              color: "white",
              border: `1px solid white`,
            },
          }}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
};
