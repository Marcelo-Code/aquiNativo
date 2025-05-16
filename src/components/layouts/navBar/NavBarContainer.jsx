import { useContext } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../../context/GeneralContext";

export const NavBarContainer = () => {
  const { cart, isLoggedIn, loggedUser } = useContext(GeneralContext);

  const totalProductsInCart = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const navBarProps = {
    totalProductsInCart,
    isLoggedIn,
    loggedUser,
  };

  return <NavBar {...navBarProps} />;
};
