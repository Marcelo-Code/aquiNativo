import { Box, Button } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import "./categoriesList.css";
import { Icons } from "../../../../assets/Icons";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { generalBackGroundColor } from "../../../../utils/helpers";
import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";

export const CategoriesList = (categoriesListProps) => {
  const { categories, handleUpdateCategory, ...generalBarContainerProps } =
    categoriesListProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Categorías</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">
        {categories.length} categorías encontradas
      </Box>
      <Box className="generalList" sx={{ marginBottom: "20px" }}>
        {categories.map((category) => {
          return (
            <Button
              onClick={() => handleUpdateCategory(category.id)}
              className="categoriesCard"
              key={category.id}
              variant="outlined"
              // startIcon={<Icons.EditIcon sx={{ fontSize: "30px" }} />}
              sx={{
                color: "black",
                border: "1px solid black",
                backgroundColor: "white",
                textTransform: "none",
                borderRadius: "45px",
                "&:active": {
                  backgroundColor: generalBackGroundColor,
                  color: "white",
                  border: `1px solid ${generalBackGroundColor}`,
                },
              }}
            >
              {category.name}
            </Button>
          );
        })}
        <BackButtonContainer />
      </Box>
    </Box>
  );
};
