import { Box, Button } from "@mui/material";
import "../../../assets/css/generalStyles.css";
import "./categories.css";
import { Icons } from "../../../assets/Icons";
import { BackButtonContainer } from "../../common/backButton/BackButtonContainer";
import { generalBackGroundColor } from "../../../utils/helpers";
import { GeneralBarContainer } from "../../layouts/generalBar/GeneralBarContainer";

export const Categories = (categoriesProps) => {
  const { categories, ...generalBarContainerProps } = categoriesProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Categorias</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalList" sx={{ marginBottom: "20px" }}>
        {categories.map((category) => {
          return (
            <Button
              className="categoriesCard"
              key={category.id}
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
              {category.name}
            </Button>
          );
        })}
      </Box>

      <BackButtonContainer />
    </Box>
  );
};
