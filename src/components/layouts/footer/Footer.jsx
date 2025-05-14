import { Box, IconButton } from "@mui/material";
import { generalBackGroundColor } from "../../../utils/helpers";
import "./footer.css";
import { Icons } from "../../../assets/Icons";
export const Footer = () => {
  return (
    <Box
      className="footerContainer"
      sx={{ backgroundColor: generalBackGroundColor }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          backgroundColor: "#25D366",
          position: "fixed",
          bottom: "50px",
          right: "50px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <IconButton>
          <Icons.WhatsAppIcon sx={{ color: "white", fontSize: "1.5em" }} />
        </IconButton>
      </Box>
      <Box className="footerTitle">NATIVO</Box>

      <Box className="footerSocialMedia">
        Seguinos en nuestras redes
        <IconButton>
          <Icons.FacebookIcon sx={{ color: "black", fontSize: "1.5em" }} />
        </IconButton>
        <IconButton>
          <Icons.InstagramIcon sx={{ color: "black", fontSize: "1.5em" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
