import { Box, Button } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import "./brandsList.css";
import { Icons } from "../../../../assets/Icons";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { generalBackGroundColor } from "../../../../utils/helpers";
import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";

export const BrandsList = (brandsListProps) => {
  const { brands, handleUpdateBrand, ...generalBarContainerProps } =
    brandsListProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Marcas</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{brands.length} marcas encontradas</Box>
      <Box className="generalList" sx={{ marginBottom: "20px" }}>
        {brands.map((brand) => {
          return (
            <Button
              onClick={() => handleUpdateBrand(brand.id)}
              className="brandsCard"
              key={brand.id}
              variant="outlined"
              // startIcon={<Icons.EditIcon sx={{ fontSize: "30px" }} />}
              sx={{
                textTransform: "none",
                color: "black",
                border: "1px solid black",
                backgroundColor: "white",
                borderRadius: "45px",
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
        <BackButtonContainer />
      </Box>
    </Box>
  );
};
