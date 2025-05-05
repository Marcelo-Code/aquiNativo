import { Box, FormGroup, TextField } from "@mui/material";
import { useState } from "react";
import { Icons } from "../../../../assets/Icons";
import "../../../../assets/css/generalStyles.css";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";

export const CreateEditProductContainer = () => {
  const elementStyle = {
    margin: "10px",
    width: "250px",
    backgroundColor: "white",
  };

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  //   const formButtonGroupProps = {
  //     modifiedFlag,
  //     isLoadingButton,
  //   };

  const patients = [];

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">{"Crear nuevo producto"}</Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          <FormGroup>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
                gap: "10px",
              }}
            >
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
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
                gap: "10px",
              }}
            >
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
                InputProps={{
                  sx: {
                    height: 45,
                    alignItems: "center",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    transform: "translate(14px, 11px) scale(1)", // Ajustar label más arriba
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
                gap: "10px",
              }}
            >
              <Icons.MonetizationOnIcon />
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
                InputProps={{
                  sx: {
                    height: 45,
                    alignItems: "center",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    transform: "translate(14px, 11px) scale(1)", // Ajustar label más arriba
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
                gap: "10px",
              }}
            >
              <Icons.DescriptionIcon />
              <OptionSelect
                getOptionLabel={(option) => `${option.nombreyapellidopaciente}`}
                name="idpaciente"
                placeholder="Seleccionar marca"
                clients={patients}
                value={formData.brand}
                onChange={handleChange}
                label={"Marca"}
                required
                // disabled={brand ? true : false}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
                gap: "10px",
              }}
            >
              <Icons.DescriptionIcon />
              <OptionSelect
                getOptionLabel={(option) => `${option.nombreyapellidopaciente}`}
                name="idpaciente"
                placeholder="Seleccionar categoría"
                clients={patients}
                value={formData.brand}
                onChange={handleChange}
                label={"Categoría"}
                required
                // disabled={brand ? true : false}
              />
            </Box>
            {/* <FormButtonGroupContainer {...formButtonGroupProps} /> */}
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
};
