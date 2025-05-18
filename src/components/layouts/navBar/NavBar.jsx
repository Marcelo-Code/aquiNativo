import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import "./navbar.css";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";
import { generalBackGroundColor } from "../../../utils/helpers";
import { Link } from "react-router-dom";

export const NavBar = (navBarProps) => {
  const { totalProductsInCart, isLoggedIn, loggedUser } = navBarProps;
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
      {/* <Box className="logo"></Box> */}
      <Link style={{ textDecoration: "none" }} to="/">
        <Box className="titleLogo">
          NATIVO
          <img
            src={"/images/leaf.png"}
            style={{ paddingBottom: "5px" }}
            width={25}
          />
        </Box>
      </Link>

      <Tooltip title="Carrito" placement="top-end" arrow>
        <Badge
          badgeContent={totalProductsInCart}
          showZero={true}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white", // opcional, para el número
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
