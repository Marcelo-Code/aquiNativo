import { Box, Button } from "@mui/material";
import "./backButton.css";
import { hoverButtonColor } from "../../../utils/helpers";

export const BackButton = (BackButtonProps) => {
  const { handleGoBack, modifiedFlag } = BackButtonProps;
  return (
    <Box className="backButtonContainer">
      <Button
        size="small"
        onClick={() => handleGoBack(modifiedFlag)}
        sx={{
          color: "black",
          backgroundColor: "white",
          border: "1px solid black",
          width: "80%",
          "&:hover": {
            backgroundColor: hoverButtonColor,
            color: "white",
            border: `1px solid ${hoverButtonColor}`,
          },
        }}
      >
        Volver
      </Button>
    </Box>
  );
};
