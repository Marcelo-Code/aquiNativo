import React from "react";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import "./navBar.css";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";
import { generalBackGroundColor } from "../../../utils/helpers";
import { Link } from "react-router-dom";

export const NavBar = (navBarProps) => {
  const { totalProductsInCart } = navBarProps;
  const navBarIcon = {
    fontSize: "30px",
    color: "white",
  };

  return (
    <Box
      className="navBarContainer"
      sx={{ backgroundColor: generalBackGroundColor }}
    >
      {/* <IconButton>
        <Icons.MenuIcon sx={navBarIcon} />
      </IconButton> */}
      <BurguerMenuContainer />
      <Box className="logo">
        <img src={"/images/logo2.png"} width={110} />
        {/* <img src={"/images/logo.png"} width={110} /> */}
        {/* <Box>AQUÍ NATIVO</Box> */}
      </Box>

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

      <IconButton>
        <Icons.PersonIcon sx={navBarIcon} />
      </IconButton>
    </Box>
  );
};
