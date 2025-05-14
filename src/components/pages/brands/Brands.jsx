import { Box, Button } from "@mui/material";
import "../../../assets/css/generalStyles.css";
import "./brands.css";
import { Icons } from "../../../assets/Icons";
import { BackButtonContainer } from "../../common/backButton/BackButtonContainer";
import { generalBackGroundColor } from "../../../utils/helpers";
import { GeneralBarContainer } from "../../layouts/generalBar/GeneralBarContainer";

export const Brands = (brandsProps) => {
  const { brands, ...generalBarContainerProps } = brandsProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Categorias</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalList" sx={{ marginBottom: "20px" }}>
        {brands.map((brand) => {
          return (
            <Button
              className="brandsCard"
              key={brand.id}
              variant="outlined"
              startIcon={<Icons.EditIcon sx={{ fontSize: "30px" }} />}
              sx={{
                color: "black",
                border: "1px solid black",
                backgroundColor: "white",
                "&:active": {
                  backgroundColor: generalBackGroundColor,
                  color: "white",
                  border: `1px solid ${generalBackGroundColor}`,
                },
              }}
            >
              {brand.name}
            </Button>
          );
        })}
      </Box>

      <BackButtonContainer />
    </Box>
  );
};
