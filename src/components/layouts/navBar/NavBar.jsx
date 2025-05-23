import { Badge, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import "./navbar.css";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";
import { generalBackGroundColor } from "../../../utils/helpers";
import { Link } from "react-router-dom";

export const NavBar = (navBarProps) => {
  const { totalProductsInCart, isLoggedIn, loggedUser, alerts } = navBarProps;
  const navBarIcon = {
    fontSize: "30px",
    color: "white",
  };

  return (
    <Box
      className="navBarContainer"
      sx={{ backgroundColor: generalBackGroundColor }}
    >
      <BurguerMenuContainer />
      <Link style={{ textDecoration: "none" }} to="/">
        <Box className="titleLogoContainer">
          <Box className="titleLogo">
            <Box sx={{ fontSize: "30px" }}>NATIVO</Box>
            <Box sx={{ fontSize: "10px" }}>ALMACEN NATURAL</Box>
          </Box>
          <Box>
            <img src={"/images/leaf.png"} width={25} />
          </Box>
        </Box>
      </Link>

      <Tooltip title="Carrito" placement="top-end" arrow>
        <Badge
          badgeContent={totalProductsInCart}
          showZero={true}
          sx={{
            marginTop: "7px",
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <Link to="/cart">
            <IconButton size="small">
              <Icons.ShoppingCartIcon sx={navBarIcon} />
            </IconButton>
          </Link>
        </Badge>
      </Tooltip>

      <Tooltip title="Ordenes pendientes" placement="top-end" arrow>
        <Badge
          badgeContent={alerts}
          showZero={true}
          sx={{
            marginTop: "7px",
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          <Link to="/purchaseOrders">
            <IconButton size="small">
              <Icons.NotificationsActiveIcon sx={navBarIcon} />
            </IconButton>
          </Link>
        </Badge>
      </Tooltip>

      {isLoggedIn ? (
        <Box className="logged">{loggedUser ? loggedUser : "User"}</Box>
      ) : (
        <Tooltip title="Ingresar" placement="top-end" arrow>
          <Link to="/login">
            <IconButton>
              <Icons.PersonIcon sx={navBarIcon} />
            </IconButton>
          </Link>
        </Tooltip>
      )}
    </Box>
  );
};
