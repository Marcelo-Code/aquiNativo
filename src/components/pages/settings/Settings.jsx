import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import "../../../assets/css/generalStyles.css";
import "./settings.css";
import { DonutChart } from "../../common/donutChart/DonutChart";
import { Icons } from "../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";
export const Settings = (settingsProps) => {
  const {
    totalSize,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    isLoadingButton,
    handleGoBack,
  } = settingsProps;
  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Ajustes</Box>
      <Box className="generalSubTitle" sx={{ marginTop: "10px" }}>
        Espacio utilizado en Supabase
      </Box>
      <Box className="chartContainer" sx={{ height: "auto" }}>
        <DonutChart
          usedSize={totalSize.database_size_mb}
          totalSize={500}
          nameChart={"Base de Datos"}
        />
        <DonutChart
          usedSize={totalSize.storage_size_mb}
          totalSize={1000}
          nameChart={"Storage"}
        />
      </Box>
      <Box className="generalSubTitle" sx={{ marginTop: "10px" }}>
        Actualizar contraseña
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box width={300}>
          <TextField
            margin="normal"
            required
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            autoFocus
            sx={{
              backgroundColor: "white",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: generalBackGroundColor,
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // color normal
                "&.Mui-focused": {
                  color: buttonColor, // color al enfocar
                },
              },
            }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            sx={{
              backgroundColor: "white",
              width: "300px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: generalBackGroundColor,
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // color normal
                "&.Mui-focused": {
                  color: buttonColor, // color al enfocar
                },
              },
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            size="small"
            sx={{
              marginTop: "10px",
              width: "300px",
              color: "white",
              backgroundColor: buttonColor,
              "&:active": {
                backgroundColor: generalBackGroundColor,
                color: "white",
                border: `1px solid white`,
              },
            }}
            onClick={handleUpdatePassword}
            startIcon={<Icons.KeyIcon />}
            loading={isLoadingButton}
            loadingIndicator={
              <CircularProgress size={16} sx={{ color: "white" }} />
            }
          >
            Actualizar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={handleGoBack}
            sx={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
              marginTop: "10px",
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
    </Box>
  );
};
