import { Box, Button, FormGroup, TextField } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";
import { FormButtonGroupContainer } from "../../../common/formButtonGroup/FormButtonGroupContainer";

export const BuyersData = (buyerDataProps) => {
  const { formData, handleChange, handleSubmit, handleGoBack } = buyerDataProps;

  const inputStyles = {
    "& label": {
      top: "-5px",
      color: "gray",
    },
    "& label.Mui-focused": {
      color: buttonColor,
    },
    "& .MuiOutlinedInput-root": {
      height: 43,
      alignItems: "center",
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: generalBackGroundColor,
      },
    },
  };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Datos del comprador</Box>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mt: 3,
              mb: 3,
            }}
          >
            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%" },
                minWidth: "250px",
                maxWidth: "300px",
              }}
            >
              <TextField
                label="Nombre"
                variant="outlined"
                name="name"
                onChange={handleChange}
                required
                value={formData.name}
                fullWidth
                sx={inputStyles}
              />
            </Box>

            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%" },
                minWidth: "250px",
                maxWidth: "300px",
              }}
            >
              <TextField
                label="Apellido"
                variant="outlined"
                name="lastName"
                onChange={handleChange}
                required
                value={formData.lastName}
                fullWidth
                sx={inputStyles}
              />
            </Box>

            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%" },
                minWidth: "250px",
                maxWidth: "300px",
              }}
            >
              <TextField
                label="Dirección"
                variant="outlined"
                name="address"
                onChange={handleChange}
                required
                value={formData.address}
                fullWidth
                sx={inputStyles}
              />
            </Box>

            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%" },
                minWidth: "250px",
                maxWidth: "300px",
              }}
            >
              <TextField
                label="Teléfono"
                variant="outlined"
                name="phoneNumber"
                onChange={handleChange}
                required
                value={formData.phoneNumber}
                fullWidth
                sx={inputStyles}
              />
            </Box>
            <Box
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%" },
                minWidth: "250px",
                maxWidth: "300px",
              }}
            >
              <TextField
                type="email"
                label="email"
                variant="outlined"
                name="email"
                onChange={handleChange}
                required
                value={formData.email}
                fullWidth
                sx={inputStyles}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
              margin: "10px",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <Button
                fullWidth
                type="submit"
                size="small"
                variant="outlined"
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
                Continuar
              </Button>
            </Box>
            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <Button
                onClick={() => handleGoBack()}
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
          </Box>{" "}
        </FormGroup>
      </form>
    </Box>
  );
};
